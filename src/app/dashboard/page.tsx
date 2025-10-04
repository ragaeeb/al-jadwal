import { ArrowRight, Book, Key, Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';

const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="font-bold text-2xl">{value}</div>
            <p className="text-muted-foreground text-xs">{description}</p>
        </CardContent>
    </Card>
);

const QuickAction = ({
    href,
    icon: Icon,
    title,
    description,
}: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}) => (
    <Link href={href} className="group block">
        <Card className="transition-colors hover:bg-accent">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-primary" />
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    </Link>
);

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Mock data - replace with actual queries
    const appCount = 0;
    const apiKeyCount = 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-bold text-3xl">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.email}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Apps" value={appCount.toString()} description="Total apps created" icon={Book} />
                <StatCard title="API Keys" value={apiKeyCount.toString()} description="Active API keys" icon={Key} />
            </div>

            <div>
                <h2 className="mb-4 font-semibold text-xl">Quick Actions</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <QuickAction
                        href="/dashboard/apps/new"
                        icon={Plus}
                        title="Create App"
                        description="Create a new app and select libraries"
                    />
                    <QuickAction
                        href="/dashboard/apps"
                        icon={Book}
                        title="View Apps"
                        description="Manage your existing apps"
                    />
                    <QuickAction
                        href="/dashboard/api-keys"
                        icon={Key}
                        title="Manage API Keys"
                        description="View and create API keys"
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Start using Al-Jadwal in three simple steps</CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
                                1
                            </div>
                            <div>
                                <p className="font-medium">Create an App</p>
                                <p className="text-muted-foreground">
                                    Set up your app and choose which Islamic libraries to access
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
                                2
                            </div>
                            <div>
                                <p className="font-medium">Generate API Key</p>
                                <p className="text-muted-foreground">
                                    Create an API key with the appropriate scopes for your app
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
                                3
                            </div>
                            <div>
                                <p className="font-medium">Start Making Requests</p>
                                <p className="text-muted-foreground">
                                    Use your API key to access books from Shamela, Ketab Online, and Turath
                                </p>
                            </div>
                        </li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    );
}
