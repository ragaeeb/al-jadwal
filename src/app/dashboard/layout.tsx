import { Book, Key, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';

const NavLink = ({
    href,
    icon: Icon,
    children,
}: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}) => (
    <Link
        href={href}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
        <Icon className="h-4 w-4" />
        {children}
    </Link>
);

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const handleSignOut = async () => {
        'use server';
        const supabase = await createClient();
        await supabase.auth.signOut();
        redirect('/auth/login');
    };

    return (
        <div className="flex min-h-screen">
            <aside className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-background">
                <div className="flex h-full flex-col">
                    <div className="border-b p-6">
                        <h2 className="font-bold text-xl">Al-Jadwal</h2>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>

                    <nav className="flex-1 space-y-1 p-4">
                        <NavLink href="/dashboard" icon={LayoutDashboard}>
                            Overview
                        </NavLink>
                        <NavLink href="/dashboard/apps" icon={Book}>
                            Apps
                        </NavLink>
                        <NavLink href="/dashboard/api-keys" icon={Key}>
                            API Keys
                        </NavLink>
                    </nav>

                    <div className="border-t p-4">
                        <form action={handleSignOut}>
                            <Button variant="ghost" className="w-full justify-start" type="submit">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </aside>

            <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
    );
}
