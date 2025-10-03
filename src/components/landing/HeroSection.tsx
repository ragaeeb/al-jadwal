import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
            <h1 className="mb-6 font-extrabold text-4xl text-foreground tracking-tight sm:text-5xl md:text-6xl">
                Islamic Libraries,
                <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    One Unified API
                </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-foreground/80 text-lg sm:text-xl">
                Access Shamela, Ketab Online, and Turath heritage libraries through a single, powerful API. Build
                Islamic applications faster than ever before.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                    href="/auth/signup"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 font-semibold text-lg text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                >
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                    href="/pricing"
                    className="inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-8 py-3 font-semibold text-lg transition-colors hover:bg-secondary sm:w-auto"
                >
                    View Pricing
                </Link>
            </div>
        </div>

        <div className="mt-16 rounded-lg border bg-card p-4 shadow-2xl">
            <div className="rounded bg-muted p-4 font-mono text-sm">
                <div className="mb-2 text-foreground/60">
                    <span className="text-green-500">GET</span> /api/v1/books/333?provider=shamela.ws
                </div>
                <div className="text-foreground/60">
                    <span className="text-blue-500">Authorization:</span> Bearer aj_your_api_key
                </div>
            </div>
        </div>
    </section>
);
