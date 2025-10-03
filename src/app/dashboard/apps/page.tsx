import { Book, Plus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import type { App } from '@/types';

const LibraryBadge = ({ library }: { library: string }) => (
    <Badge variant="secondary" className="text-xs">
        {library}
    </Badge>
);

const AppCard = ({ app }: { app: App }) => (
    <Link href={`/dashboard/apps/${app.id}`}>
        <Card className="transition-colors hover:bg-accent">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <CardDescription className="mt-1">{app.description || 'No description'}</CardDescription>
                    </div>
                    <Book className="h-5 w-5 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {app.libraries.map((library) => (
                        <LibraryBadge key={library} library={library} />
                    ))}
                </div>
                <p className="mt-3 text-muted-foreground text-xs">
                    Created {new Date(app.created_at).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    </Link>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <Book className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 font-semibold text-lg">No apps yet</h3>
        <p className="mb-4 text-muted-foreground text-sm">Create your first app to start accessing Islamic libraries</p>
        <Button asChild>
            <Link href="/dashboard/apps/new">
                <Plus className="mr-2 h-4 w-4" />
                Create App
            </Link>
        </Button>
    </div>
);

export default async function AppsPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Mock data - replace with actual query
    const apps: App[] = [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl">Apps</h1>
                    <p className="text-muted-foreground">Manage your apps and library access</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/apps/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create App
                    </Link>
                </Button>
            </div>

            {apps.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {apps.map((app) => (
                        <AppCard key={app.id} app={app} />
                    ))}
                </div>
            )}
        </div>
    );
}
