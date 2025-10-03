import { ArrowLeft, BookOpen, Check } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/landing/Footer';

type PricingTier = {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
};

const tiers: PricingTier[] = [
    {
        cta: 'Get Started',
        description: 'Perfect for getting started and small projects',
        features: [
            '1,000 API requests/month',
            'Access to 1 library',
            'Basic support',
            'Community access',
            'Rate limiting: 10 req/min',
        ],
        name: 'Free',
        price: '$0',
    },
    {
        cta: 'Start Free Trial',
        description: 'For growing applications and developers',
        features: [
            '50,000 API requests/month',
            'Access to all 3 libraries',
            'Priority email support',
            'Advanced analytics',
            'Rate limiting: 100 req/min',
            'Custom API keys',
        ],
        highlighted: true,
        name: 'Basic',
        price: '$29',
    },
    {
        cta: 'Contact Sales',
        description: 'For production applications at scale',
        features: [
            '500,000 API requests/month',
            'Access to all 3 libraries',
            '24/7 priority support',
            'Advanced analytics & insights',
            'Rate limiting: 1000 req/min',
            'Unlimited API keys',
            'Webhook support',
            'SLA guarantee',
        ],
        name: 'Premium',
        price: '$99',
    },
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl">Al-Jadwal</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                        <Link
                            href="/auth/login"
                            className="rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-secondary"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h1 className="mb-4 font-extrabold text-4xl tracking-tight sm:text-5xl">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-foreground/80 text-lg">
                        Choose the perfect plan for your needs. Upgrade or downgrade anytime.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col rounded-lg border p-8 shadow-sm transition-shadow hover:shadow-md ${
                                tier.highlighted
                                    ? 'border-primary bg-primary/5 ring-2 ring-primary ring-offset-2'
                                    : 'bg-card'
                            }`}
                        >
                            {tier.highlighted && (
                                <div className="-top-4 -translate-x-1/2 absolute left-1/2 rounded-full bg-primary px-4 py-1 font-semibold text-primary-foreground text-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="mb-2 font-bold text-2xl">{tier.name}</h3>
                                <div className="mb-2 flex items-baseline gap-1">
                                    <span className="font-bold text-4xl">{tier.price}</span>
                                    <span className="text-foreground/60 text-sm">/month</span>
                                </div>
                                <p className="text-foreground/80 text-sm">{tier.description}</p>
                            </div>

                            <ul className="mb-8 flex-1 space-y-3">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/auth/signup"
                                className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-center font-semibold transition-colors ${
                                    tier.highlighted
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'border border-input bg-background hover:bg-secondary'
                                }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-foreground/60 text-sm">
                        All plans include access to our API documentation and community support.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
