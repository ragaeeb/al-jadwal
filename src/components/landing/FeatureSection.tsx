import type { LucideIcon } from 'lucide-react';

type Feature = { icon: LucideIcon; title: string; description: string };

type FeatureSectionProps = { features: Feature[] };

export const FeatureSection = ({ features }: FeatureSectionProps) => (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
                <div
                    key={feature.title}
                    className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <feature.icon className="mb-4 h-12 w-12 text-primary" />
                    <h3 className="mb-2 font-semibold text-xl">{feature.title}</h3>
                    <p className="text-foreground/80">{feature.description}</p>
                </div>
            ))}
        </div>
    </section>
);
