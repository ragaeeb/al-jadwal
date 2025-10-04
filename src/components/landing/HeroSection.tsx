'use client';

import { ArrowDownRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { AnimatedGroup } from '@/components/landing/animated-group';
import { AnimatedText } from '@/components/landing/animated-text';
import { Button } from '@/components/ui/button';

interface HeroShowcaseProps {
    heading?: string;
    description?: string;
    buttons?: { primary?: { text: string; url: string }; secondary?: { text: string; url: string } };
    reviews?: { count: number; rating?: number };
    backgroundOpacity?: number;
}

export function HeroShowcase({
    heading = 'Build beautiful UIs, effortlessly.',
    description = 'Smoothui gives you the building blocks to create stunning, animated interfaces in minutes.',
    buttons = { primary: { text: 'Get Started', url: '#link' }, secondary: { text: 'Watch demo', url: '#link' } },
    reviews = { count: 200, rating: 5.0 },
    backgroundOpacity = 0.15,
}: HeroShowcaseProps) {
    return (
        <section>
            <motion.section
                className="relative overflow-hidden bg-gradient-to-b from-background to-muted"
                initial={{ filter: 'blur(12px)', opacity: 0, scale: 1.04 }}
                animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
                transition={{ bounce: 0.32, duration: 0.9, type: 'spring' }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero.jpg"
                        alt="Hero background"
                        fill
                        className="object-cover object-center"
                        style={{ height: '100%', objectFit: 'cover', opacity: backgroundOpacity, width: '100%' }}
                        priority
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 px-6 py-24 lg:grid-cols-1">
                    <AnimatedGroup
                        preset="blur-slide"
                        className="mx-auto flex flex-col items-center text-center lg:max-w-3xl"
                    >
                        <AnimatedText as="h1" className="my-6 text-pretty font-bold text-4xl lg:text-6xl xl:text-7xl">
                            {heading}
                        </AnimatedText>
                        <AnimatedText as="p" className="mb-8 max-w-xl text-foreground/70 lg:text-xl" delay={0.12}>
                            {description}
                        </AnimatedText>
                        <AnimatedGroup
                            preset="slide"
                            className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row"
                        >
                            <div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((starNumber) => (
                                        <Star
                                            key={`star-${starNumber}`}
                                            className="size-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                    <span className="mr-1 font-semibold">{reviews.rating?.toFixed(1)}</span>
                                </div>
                                <p className="text-left font-medium text-foreground/70">
                                    from {reviews.count}+ reviews
                                </p>
                            </div>
                        </AnimatedGroup>
                        <AnimatedGroup preset="slide" className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                            {buttons.primary && (
                                <Button asChild variant="default" className="w-full sm:w-auto">
                                    <a href={buttons.primary.url}>{buttons.primary.text}</a>
                                </Button>
                            )}
                            {buttons.secondary && (
                                <Button asChild variant="outline">
                                    <a href={buttons.secondary.url}>
                                        {buttons.secondary.text}
                                        <ArrowDownRight className="size-4" />
                                    </a>
                                </Button>
                            )}
                        </AnimatedGroup>
                    </AnimatedGroup>
                </div>
            </motion.section>
        </section>
    );
}
