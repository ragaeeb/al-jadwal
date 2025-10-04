export type Library = 'shamela.ws' | 'ketabonline.com' | 'turath.io';

export type App = {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    libraries: Library[];
    created_at: string;
    updated_at: string;
};

export type ApiKey = {
    id: string;
    app_id: string;
    key_id: string;
    key_prefix: string;
    name: string;
    created_at: string;
    last_used_at: string | null;
    expires_at: string | null;
};

export type LibraryScope = { library: Library; enabled: boolean };
