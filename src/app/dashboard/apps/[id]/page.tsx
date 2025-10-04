'use client';

import { Key, Settings, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { ApiKey, App } from '@/types';

const mockApp: App = {
    created_at: new Date().toISOString(),
    description: 'An app for accessing Islamic texts',
    id: '1',
    libraries: ['shamela.ws', 'turath.io'],
    name: 'My Islamic App',
    updated_at: new Date().toISOString(),
    user_id: '1',
};

const mockApiKeys: ApiKey[] = [
    {
        app_id: '1',
        created_at: new Date().toISOString(),
        expires_at: null,
        id: '1',
        key_id: 'key_123',
        key_prefix: 'aj_test_',
        last_used_at: new Date().toISOString(),
        name: 'Production Key',
    },
];

const ApiKeyCard = ({ apiKey }: { apiKey: ApiKey }) => (
    <Card>
        <CardHeader>
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle className="text-base">{apiKey.name}</CardTitle>
                    <CardDescription className="mt-1 font-mono text-xs">{apiKey.key_prefix}••••••••</CardDescription>
                </div>
                <Key className="h-4 w-4 text-muted-foreground" />
            </div>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(apiKey.created_at).toLocaleDateString()}</span>
            </div>
            {apiKey.last_used_at && (
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Last used</span>
                    <span>{new Date(apiKey.last_used_at).toLocaleDateString()}</span>
                </div>
            )}
        </CardContent>
    </Card>
);

export default function AppDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    // Mock data - replace with actual fetch
    const app = mockApp;
    const apiKeys = mockApiKeys;

    const handleDelete = async () => {
        setDeleting(true);
        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/apps');
            router.refresh();
        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="font-bold text-3xl">{app.name}</h1>
                    <p className="text-muted-foreground">{app.description || 'No description'}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete App</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete the app and all associated API keys. This action cannot
                                    be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Library Access</CardTitle>
                    <CardDescription>Libraries this app can access</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {app.libraries.map((library) => (
                            <Badge key={library} variant="secondary">
                                {library}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-xl">API Keys</h2>
                        <p className="text-muted-foreground text-sm">Manage API keys for this app</p>
                    </div>
                    <Button>
                        <Key className="mr-2 h-4 w-4" />
                        Create API Key
                    </Button>
                </div>

                {apiKeys.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Key className="mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 font-semibold">No API keys</h3>
                            <p className="text-muted-foreground text-sm">Create an API key to start using this app</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {apiKeys.map((apiKey) => (
                            <ApiKeyCard key={apiKey.id} apiKey={apiKey} />
                        ))}
                    </div>
                )}
            </div>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Usage Example</CardTitle>
                    <CardDescription>Example API request</CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                        <code>{`curl -X GET "https://api.al-jadwal.com/v1/books/333?provider=shamela.ws" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
}
