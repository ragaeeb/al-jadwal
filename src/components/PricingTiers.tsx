'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import PriceFlow from '@/components/smoothui/ui/PriceFlow';

export function PricingTiers() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section>
            <div className="relative bg-muted/50 py-16 md:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-balance font-bold text-3xl md:text-4xl lg:text-5xl lg:tracking-tight">
                            Choose your perfect plan
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-balance text-foreground/70 text-lg">
                            Modern pricing plans designed for teams of all sizes. Scale your business with confidence.
                        </p>
                        <div className="my-12">
                            <div
                                data-period={isAnnual ? 'annually' : 'monthly'}
                                className="relative mx-auto grid w-fit grid-cols-2 rounded-full border bg-background p-1 *:block *:h-8 *:w-24 *:rounded-full *:text-foreground *:text-sm *:hover:opacity-75"
                            >
                                <div
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute inset-1 w-1/2 rounded-full border border-transparent bg-brand shadow ring-1 ring-foreground/5 transition-transform duration-500 ease-in-out ${
                                        isAnnual ? 'translate-x-full' : 'translate-x-0'
                                    }`}
                                ></div>
                                <button
                                    type="button"
                                    onClick={() => setIsAnnual(false)}
                                    data-active={!isAnnual}
                                    className="relative duration-500 data-[active=true]:font-medium data-[active=true]:text-white"
                                >
                                    Monthly
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAnnual(true)}
                                    data-active={isAnnual}
                                    className="relative duration-500 data-[active=true]:font-medium data-[active=true]:text-white"
                                >
                                    Annually
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="mx-auto max-w-6xl">
                            <div className="grid grid-cols-1 gap-6 *:p-8 md:grid-cols-3">
                                {/* Basic Plan */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative flex h-[650px] cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background p-8"
                                    data-animate-card
                                >
                                    <div className="card-content relative z-10 flex h-full flex-col">
                                        {/* Title */}
                                        <h3 className="mb-4 font-bold text-2xl text-foreground">Basic</h3>

                                        {/* Price & Duration */}
                                        <div className="mb-6">
                                            <span className="font-semibold text-3xl text-foreground">
                                                <PriceFlow value={isAnnual ? 10 : 15} />€
                                            </span>
                                            <span className="mx-2 text-foreground/70">•</span>
                                            <span className="text-foreground/70">Perfect for startups</span>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            type="button"
                                            className="mb-6 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            Get Started
                                        </button>

                                        {/* Description */}
                                        <p className="mb-6 flex-grow text-foreground/70 text-sm leading-relaxed">
                                            Essential features for growing businesses. Get started with everything you
                                            need to launch your project.
                                        </p>

                                        {/* What's Included */}
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-foreground/70 text-xs uppercase tracking-wider">
                                                What&apos;s included:
                                            </h4>
                                            <ul className="space-y-3">
                                                {[
                                                    '1 Project',
                                                    'Email Support',
                                                    'Core Features',
                                                    'Basic Analytics',
                                                    'Standard Security',
                                                    'Community Access',
                                                ].map((item) => (
                                                    <li
                                                        className="flex items-center gap-3 text-foreground text-sm"
                                                        key={item}
                                                    >
                                                        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-foreground">
                                                            <svg
                                                                className="h-2 w-2 text-background"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    clipRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    fillRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Pro Plan (Featured) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative flex h-[650px] cursor-pointer flex-col overflow-hidden rounded-2xl border p-8"
                                    data-animate-card
                                >
                                    {/* Gradient Accent */}
                                    <div className="gradient-accent absolute top-0 right-0 h-4 w-32 rounded-bl-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />

                                    <div className="card-content relative z-10 flex h-full flex-col">
                                        {/* Title */}
                                        <h3 className="mb-4 flex items-center gap-2 font-bold text-2xl text-foreground">
                                            Pro{' '}
                                            <div className="rounded-full bg-brand px-2 py-1 font-bold text-white text-xs">
                                                Most Popular
                                            </div>
                                        </h3>

                                        {/* Price & Duration */}
                                        <div className="mb-6">
                                            <span className="font-semibold text-3xl text-foreground">
                                                <PriceFlow value={isAnnual ? 25 : 35} />€
                                            </span>
                                            <span className="mx-2 text-foreground/70">•</span>
                                            <span className="text-foreground/70">Best for teams</span>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            type="button"
                                            className="mb-6 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            Get Started
                                        </button>

                                        {/* Description */}
                                        <p className="mb-6 flex-grow text-foreground/70 text-sm leading-relaxed">
                                            Advanced features for professional teams. Everything you need to scale your
                                            business with confidence.
                                        </p>

                                        {/* What's Included */}
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-foreground/70 text-xs uppercase tracking-wider">
                                                What&apos;s included:
                                            </h4>
                                            <ul className="space-y-3">
                                                {[
                                                    'Unlimited Projects',
                                                    'Priority Support',
                                                    'Team Collaboration',
                                                    'Advanced Analytics',
                                                    'Custom Integrations',
                                                    'API Access',
                                                    'White-label Options',
                                                    'Priority Updates',
                                                ].map((item) => (
                                                    <li
                                                        className="flex items-center gap-3 text-foreground text-sm"
                                                        key={item}
                                                    >
                                                        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-foreground">
                                                            <svg
                                                                className="h-2 w-2 text-background"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    clipRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    fillRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Enterprise Plan */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative flex h-[650px] cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background p-8"
                                    data-animate-card
                                >
                                    <div className="card-content relative z-10 flex h-full flex-col">
                                        {/* Title */}
                                        <h3 className="mb-4 font-bold text-2xl text-foreground">Enterprise</h3>

                                        {/* Price & Duration */}
                                        <div className="mb-6">
                                            <span className="font-semibold text-3xl text-foreground">Custom</span>
                                            <span className="mx-2 text-foreground/70">•</span>
                                            <span className="text-foreground/70">Tailored solutions</span>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            type="button"
                                            className="mb-6 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            Contact Sales
                                        </button>

                                        {/* Description */}
                                        <p className="mb-6 flex-grow text-foreground/70 text-sm leading-relaxed">
                                            Custom solutions for large organizations. Get dedicated support and tailored
                                            features for your enterprise needs.
                                        </p>

                                        {/* What's Included */}
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-foreground/70 text-xs uppercase tracking-wider">
                                                What&apos;s included:
                                            </h4>
                                            <ul className="space-y-3">
                                                {[
                                                    'Everything in Pro',
                                                    'Dedicated Manager',
                                                    'Custom Integrations',
                                                    'SLA & Support',
                                                    'On-premise Options',
                                                    'Advanced Security',
                                                    'Training & Onboarding',
                                                    '24/7 Phone Support',
                                                ].map((item) => (
                                                    <li
                                                        className="flex items-center gap-3 text-foreground text-sm"
                                                        key={item}
                                                    >
                                                        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-foreground">
                                                            <svg
                                                                className="h-2 w-2 text-background"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    clipRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    fillRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
