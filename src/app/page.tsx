import { ArrowRight, BookOpen, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { Footer } from '@/components/landing/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { LogoClouds } from '@/components/landing/LogoClouds';

const features = [
    {
        description: 'Access Shamela, Ketab Online, and Turath libraries through one simple API',
        icon: BookOpen,
        title: 'Unified Access',
    },
    { description: 'Built on Next.js 15 and Bun for maximum performance', icon: Zap, title: 'Lightning Fast' },
    { description: 'Enterprise-grade security with Supabase and Unkey', icon: Shield, title: 'Secure & Reliable' },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl">Al-Jadwal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/pricing"
                            className="hidden text-foreground/80 transition-colors hover:text-foreground sm:block"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/auth/login"
                            className="rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-secondary"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            <HeroSection />

            <FeatureSection features={features} />

            <LogoClouds />

            <div className="border-t bg-secondary/50 py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 font-bold text-3xl tracking-tight">Ready to get started?</h2>
                    <p className="mb-8 text-foreground/80 text-lg">
                        Join developers building the next generation of Islamic applications
                    </p>
                    <Link
                        href="/auth/signup"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 font-semibold text-lg text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Start Building Today
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
