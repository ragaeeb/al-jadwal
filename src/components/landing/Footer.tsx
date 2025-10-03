import { BookOpen, Github } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
    company: [
        { href: '#', label: 'About' },
        { href: '#', label: 'Blog' },
        { href: 'https://github.com/ragaeeb/al-jadwal', label: 'GitHub' },
    ],
    legal: [
        { href: '#', label: 'Privacy' },
        { href: '#', label: 'Terms' },
        { href: 'https://opensource.org/licenses/MIT', label: 'License' },
    ],
    product: [
        { href: '#', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: 'https://docs.claude.com', label: 'Documentation' },
        { href: '#', label: 'API Reference' },
    ],
};

export const Footer = () => (
    <footer className="border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">Al-Jadwal</span>
                    </div>
                    <p className="text-foreground/60 text-sm">
                        Islamic API-first platform for accessing Islamic libraries through a unified API.
                    </p>
                    <a
                        href="https://github.com/ragaeeb/al-jadwal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-foreground/60 text-sm transition-colors hover:text-foreground"
                    >
                        <Github className="h-4 w-4" />
                        Open Source
                    </a>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-sm">Product</h3>
                    <ul className="space-y-2">
                        {footerLinks.product.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-foreground/60 text-sm transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-sm">Company</h3>
                    <ul className="space-y-2">
                        {footerLinks.company.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-foreground/60 text-sm transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-sm">Legal</h3>
                    <ul className="space-y-2">
                        {footerLinks.legal.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-foreground/60 text-sm transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-12 border-t pt-8">
                <p className="text-center text-foreground/60 text-sm">
                    © {new Date().getFullYear()} Al-Jadwal. Licensed under MIT. Built by{' '}
                    <a
                        href="https://github.com/ragaeeb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground transition-colors hover:text-primary"
                    >
                        Ragaeeb Haq
                    </a>
                    .
                </p>
            </div>
        </div>
    </footer>
);
