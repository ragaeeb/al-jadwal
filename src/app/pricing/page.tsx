import { ArrowLeft, BookOpen, Check } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/landing/Footer';
import { PricingTiers } from '@/components/PricingTiers';

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

            <PricingTiers />

            <Footer />
        </div>
    );
}
