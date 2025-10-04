import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createApiError } from './error-handler';

export const requireAuth = async (request: NextRequest) => {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        throw createApiError.unauthorized();
    }

    return user;
};

export const requireAppOwnership = async (appId: string, userId: string) => {
    const supabase = await createClient();

    const { data: app, error } = await supabase.from('apps').select('*').eq('id', appId).eq('user_id', userId).single();

    if (error || !app) {
        throw createApiError.notFound('App not found');
    }

    return app;
};

export const requireApiKeyOwnership = async (keyId: string, userId: string) => {
    const supabase = await createClient();

    const { data: apiKey, error } = await supabase
        .from('api_keys')
        .select(`
            *,
            apps!inner(user_id)
        `)
        .eq('id', keyId)
        .eq('apps.user_id', userId)
        .single();

    if (error || !apiKey) {
        throw createApiError.notFound('API key not found');
    }

    return apiKey;
};
