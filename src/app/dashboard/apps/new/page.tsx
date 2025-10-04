'use client';

import { Book, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Library } from '@/types';

const LIBRARIES: { value: Library; label: string; description: string }[] = [
    { description: 'Access to the comprehensive Shamela library', label: 'Shamela', value: 'shamela.ws' },
    { description: 'Islamic books and resources from Ketab Online', label: 'Ketab Online', value: 'ketabonline.com' },
    { description: 'Heritage Islamic texts and manuscripts', label: 'Turath', value: 'turath.io' },
];

const LibrarySelector = ({
    libraries,
    selectedLibraries,
    onToggle,
}: {
    libraries: typeof LIBRARIES;
    selectedLibraries: Library[];
    onToggle: (library: Library) => void;
}) => {
    return (
        <div className="space-y-4">
            {libraries.map((library) => (
                <Card key={library.value} className={selectedLibraries.includes(library.value) ? 'border-primary' : ''}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    checked={selectedLibraries.includes(library.value)}
                                    onCheckedChange={() => onToggle(library.value)}
                                    id={library.value}
                                />
                                <div>
                                    <Label htmlFor={library.value} className="cursor-pointer font-semibold text-base">
                                        {library.label}
                                    </Label>
                                    <CardDescription className="mt-1">{library.description}</CardDescription>
                                </div>
                            </div>
                            {selectedLibraries.includes(library.value) && <Check className="h-5 w-5 text-primary" />}
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};

export default function NewAppPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLibraries, setSelectedLibraries] = useState<Library[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const toggleLibrary = (library: Library) => {
        setSelectedLibraries((prev) =>
            prev.includes(library) ? prev.filter((l) => l !== library) : [...prev, library],
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedLibraries.length === 0) {
            setError('Please select at least one library');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/apps', {
                body: JSON.stringify({ description, libraries: selectedLibraries, name }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            const data = await response.json();

            console.log('Result', data);
            router.push('/dashboard/apps');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create app');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div>
                <h1 className="font-bold text-3xl">Create App</h1>
                <p className="text-muted-foreground">Set up a new app to access Islamic libraries</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>App Details</CardTitle>
                        <CardDescription>Basic information about your app</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">App Name</Label>
                            <Input
                                id="name"
                                placeholder="My Islamic App"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                placeholder="A brief description of what your app does"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Library Access</CardTitle>
                        <CardDescription>Select which libraries your app can access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LibrarySelector
                            libraries={LIBRARIES}
                            selectedLibraries={selectedLibraries}
                            onToggle={toggleLibrary}
                        />
                    </CardContent>
                </Card>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        <Book className="mr-2 h-4 w-4" />
                        {loading ? 'Creating...' : 'Create App'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
