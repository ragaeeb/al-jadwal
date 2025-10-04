'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface LogoCloudAnimatedProps {
    title?: string;
    description?: string;
    logos?: Array<{ name: string; src: string; url?: string }>;
}

export function LogoCloudAnimated({
    title = "Trusted by the world's most innovative teams",
    description = 'Join thousands of developers and designers who are already building with Smoothui',
    logos = [
        { name: 'Islam Archive', src: '/islamarchive.svg', url: 'https://example.com' },
        { name: 'Ketab Online', src: '/ketabonline.svg', url: 'https://example.com' },
        { name: 'Shamela', src: '/shamela.svg', url: 'https://example.com' },
    ],
}: LogoCloudAnimatedProps) {
    return (
        <section className="overflow-hidden py-20">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 font-bold text-2xl text-foreground lg:text-3xl">{title}</h2>
                    <p className="text-foreground/70 text-lg">{description}</p>
                </motion.div>

                {/* Infinite scrolling logos */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        maskImage:
                            'linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))',
                        WebkitMaskImage:
                            'linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))',
                    }}
                >
                    <motion.div
                        className="flex min-w-full flex-shrink-0 items-center justify-around gap-8"
                        animate={{ x: [0, -33.333 * logos.length] }}
                        transition={{ x: { duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'loop' } }}
                    >
                        {/* First set */}
                        {logos.map((logo, index) => (
                            <motion.a
                                key={`first-${logo.name}`}
                                href={logo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="group flex flex-shrink-0 flex-col items-center justify-center p-6 transition-all hover:scale-105"
                            >
                                <motion.div
                                    className="relative h-12 w-32"
                                    whileHover={{ rotate: 5, scale: 1.2 }}
                                    transition={{ stiffness: 300, type: 'spring' }}
                                >
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                                </motion.div>
                            </motion.a>
                        ))}
                        {/* Second set for seamless loop */}
                        {logos.map((logo, index) => (
                            <motion.a
                                key={`second-${logo.name}`}
                                href={logo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="group flex flex-shrink-0 flex-col items-center justify-center p-6 transition-all hover:scale-105"
                            >
                                <motion.div
                                    className="relative h-12 w-32"
                                    whileHover={{ rotate: 5, scale: 1.2 }}
                                    transition={{ stiffness: 300, type: 'spring' }}
                                >
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                                </motion.div>
                            </motion.a>
                        ))}
                        {/* Third set for even smoother loop */}
                        {logos.map((logo, index) => (
                            <motion.a
                                key={`third-${logo.name}`}
                                href={logo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="group flex flex-shrink-0 flex-col items-center justify-center p-6 transition-all hover:scale-105"
                            >
                                <motion.div
                                    className="relative h-12 w-32"
                                    whileHover={{ rotate: 5, scale: 1.2 }}
                                    transition={{ stiffness: 300, type: 'spring' }}
                                >
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                                </motion.div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
