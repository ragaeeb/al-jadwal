'use client';

import { Copy, Key, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ApiKey, App } from '@/types';

const mockApps: App[] = [
    {
        created_at: new Date().toISOString(),
        description: 'An app for accessing Islamic texts',
        id: '1',
        libraries: ['shamela.ws', 'turath.io'],
        name: 'My Islamic App',
        updated_at: new Date().toISOString(),
        user_id: '1',
    },
];

const mockApiKeys: ApiKey[] = [];

const ApiKeyRow = ({
    apiKey,
    appName,
    onRevoke,
}: {
    apiKey: ApiKey;
    appName: string;
    onRevoke: (id: string) => void;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${apiKey.key_prefix}${'•'.repeat(32)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-base">{apiKey.name}</CardTitle>
                        <CardDescription className="mt-1">App: {appName}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => onRevoke(apiKey.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="rounded-md bg-muted p-3 font-mono text-sm">{apiKey.key_prefix}••••••••••••••••</div>
                <div className="flex flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(apiKey.created_at).toLocaleDateString()}</span>
                    </div>
                    {apiKey.last_used_at && (
                        <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Last used:</span>
                            <span>{new Date(apiKey.last_used_at).toLocaleDateString()}</span>
                        </div>
                    )}
                    {apiKey.expires_at ? (
                        <Badge variant="outline">Expires {new Date(apiKey.expires_at).toLocaleDateString()}</Badge>
                    ) : (
                        <Badge variant="secondary">Never expires</Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const CreateApiKeyDialog = ({ apps, onCreate }: { apps: App[]; onCreate: (appId: string, name: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!selectedApp || !name) {
            return;
        }

        setLoading(true);
        try {
            await onCreate(selectedApp, name);
            setOpen(false);
            setName('');
            setSelectedApp('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create API Key
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create API Key</DialogTitle>
                    <DialogDescription>Generate a new API key for one of your apps</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="app">App</Label>
                        <Select value={selectedApp} onValueChange={setSelectedApp}>
                            <SelectTrigger id="app">
                                <SelectValue placeholder="Select an app" />
                            </SelectTrigger>
                            <SelectContent>
                                {apps.map((app) => (
                                    <SelectItem key={app.id} value={app.id}>
                                        {app.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Key Name</Label>
                        <Input
                            id="name"
                            placeholder="Production Key"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={loading || !selectedApp || !name}>
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <Key className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 font-semibold text-lg">No API keys yet</h3>
        <p className="mb-4 text-muted-foreground text-sm">Create an API key to start accessing the Islamic libraries</p>
        <p className="mb-4 text-muted-foreground text-xs">
            You need to create an app first before you can generate API keys
        </p>
        <Button asChild variant="outline">
            <Link href="/dashboard/apps/new">Create App First</Link>
        </Button>
    </div>
);

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
    const apps = mockApps;

    const handleCreate = async (appId: string, name: string) => {
        // TODO: Replace with actual API call to Unkey
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newKey: ApiKey = {
            app_id: appId,
            created_at: new Date().toISOString(),
            expires_at: null,
            id: Math.random().toString(),
            key_id: `key_${Math.random().toString(36).substring(7)}`,
            key_prefix: 'aj_test_',
            last_used_at: null,
            name,
        };

        setApiKeys([...apiKeys, newKey]);
    };

    const handleRevoke = async (id: string) => {
        // TODO: Replace with actual API call to Unkey
        await new Promise((resolve) => setTimeout(resolve, 500));
        setApiKeys(apiKeys.filter((key) => key.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl">API Keys</h1>
                    <p className="text-muted-foreground">Manage your API keys for accessing Islamic libraries</p>
                </div>
                {apps.length > 0 && <CreateApiKeyDialog apps={apps} onCreate={handleCreate} />}
            </div>

            {apps.length === 0 ? (
                <EmptyState />
            ) : apiKeys.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                    <Key className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 font-semibold text-lg">No API keys yet</h3>
                    <p className="mb-4 text-muted-foreground text-sm">
                        Create your first API key to start making requests
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {apiKeys.map((apiKey) => {
                        const app = apps.find((a) => a.id === apiKey.app_id);
                        return (
                            <ApiKeyRow
                                key={apiKey.id}
                                apiKey={apiKey}
                                appName={app?.name || 'Unknown'}
                                onRevoke={handleRevoke}
                            />
                        );
                    })}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Using Your API Keys</CardTitle>
                    <CardDescription>How to authenticate your requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="mb-2 font-medium text-sm">Include your API key in the Authorization header:</p>
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                            <code>Authorization: Bearer YOUR_API_KEY</code>
                        </pre>
                    </div>
                    <div>
                        <p className="mb-2 font-medium text-sm">Example request:</p>
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                            <code>{`curl -X GET "https://api.al-jadwal.com/v1/books/333" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
