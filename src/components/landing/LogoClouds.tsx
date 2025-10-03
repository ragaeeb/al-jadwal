const libraries = [
    { name: 'Shamela', url: 'shamela.ws' },
    { name: 'Ketab Online', url: 'ketabonline.com' },
    { name: 'Turath', url: 'turath.io' },
];

export const LogoClouds = () => (
    <section className="border-t bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center font-semibold text-foreground/60 text-sm uppercase tracking-wide">
                Powered by Leading Islamic Libraries
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-12">
                {libraries.map((library) => (
                    <div key={library.name} className="flex flex-col items-center gap-2">
                        <div className="rounded-lg bg-card p-6 shadow-sm">
                            <p className="font-bold text-2xl text-foreground">{library.name}</p>
                        </div>
                        <p className="font-mono text-foreground/60 text-xs">{library.url}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
