'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AnimatedInput from '@/components/smoothui/ui/AnimatedInput';
import PowerOffSlide from '@/components/smoothui/ui/PowerOffSlide';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleAuth = async () => {
        setLoading(true);
        setError(null);
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                throw error;
            }
            router.push('/dashboard');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex justify-center">
                        <Image src="/icon.svg" alt="al-Jadwal" width={128} height={128} />
                    </div>
                    <h1 className="font-bold text-3xl">Al-Jadwal</h1>
                    <p className="mt-2 text-muted-foreground">Create your account</p>
                </div>

                <form onSubmit={handleAuth} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <AnimatedInput
                            aria-label="Email address"
                            label="Email address"
                            value={email}
                            onChange={setEmail}
                            placeholder="you@example.com"
                        />

                        <Input
                            type="password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            minLength={6}
                        />
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <PowerOffSlide
                        onPowerOff={handleAuth}
                        label="Slide to sign up"
                        powerOffLabel="Creating account..."
                    />

                    <div className="text-center text-muted-foreground text-sm">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
