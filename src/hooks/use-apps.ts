import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { App, Library } from '@/types';

export const useApps = () => {
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApps = useCallback(async () => {
        try {
            setLoading(true);
            const { apps: data } = await apiClient.getApps();
            setApps(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch apps');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApps();
    }, [fetchApps]);

    const createApp = async (data: { name: string; description?: string; libraries: Library[] }) => {
        const { app } = await apiClient.createApp(data);
        setApps((prev) => [app, ...prev]);
        return app;
    };

    const updateApp = async (id: string, data: Partial<Pick<App, 'name' | 'description' | 'libraries'>>) => {
        const { app } = await apiClient.updateApp(id, data);
        setApps((prev) => prev.map((a) => (a.id === id ? app : a)));
        return app;
    };

    const deleteApp = async (id: string) => {
        await apiClient.deleteApp(id);
        setApps((prev) => prev.filter((a) => a.id !== id));
    };

    return { apps, createApp, deleteApp, error, loading, refetch: fetchApps, updateApp };
};
