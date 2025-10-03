import type { ApiKey, App, Library } from '@/types';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: { 'Content-Type': 'application/json', ...options.headers },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(error.error || 'Request failed');
        }

        return response.json();
    }

    // Apps
    async getApps(): Promise<{ apps: App[] }> {
        return this.request('/api/apps');
    }

    async getApp(id: string): Promise<{ app: App }> {
        return this.request(`/api/apps/${id}`);
    }

    async createApp(data: { name: string; description?: string; libraries: Library[] }): Promise<{ app: App }> {
        return this.request('/api/apps', { body: JSON.stringify(data), method: 'POST' });
    }

    async updateApp(id: string, data: Partial<Pick<App, 'name' | 'description' | 'libraries'>>): Promise<{ app: App }> {
        return this.request(`/api/apps/${id}`, { body: JSON.stringify(data), method: 'PATCH' });
    }

    async deleteApp(id: string): Promise<{ success: boolean }> {
        return this.request(`/api/apps/${id}`, { method: 'DELETE' });
    }

    // API Keys
    async getApiKeys(): Promise<{ apiKeys: ApiKey[] }> {
        return this.request('/api/api-keys');
    }

    async createApiKey(data: { app_id: string; name: string }): Promise<{ apiKey: ApiKey & { key: string } }> {
        return this.request('/api/api-keys', { body: JSON.stringify(data), method: 'POST' });
    }

    async deleteApiKey(id: string): Promise<{ success: boolean }> {
        return this.request(`/api/api-keys/${id}`, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();
