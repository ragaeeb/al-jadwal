import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { ApiKey } from '@/types';

export const useApiKeys = () => {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApiKeys = useCallback(async () => {
        try {
            setLoading(true);
            const { apiKeys: data } = await apiClient.getApiKeys();
            setApiKeys(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch API keys');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApiKeys();
    }, [fetchApiKeys]);

    const createApiKey = async (data: { app_id: string; name: string }) => {
        const { apiKey } = await apiClient.createApiKey(data);
        setApiKeys((prev) => [apiKey, ...prev]);
        return apiKey;
    };

    const deleteApiKey = async (id: string) => {
        try {
            await apiClient.deleteApiKey(id);
            setApiKeys((prev) => prev.filter((k) => k.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete API key');
            throw err;
        }
    };

    return { apiKeys, createApiKey, deleteApiKey, error, loading, refetch: fetchApiKeys };
};
