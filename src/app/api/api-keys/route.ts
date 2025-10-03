import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createApiKey, verifyApiKey } from '@/lib/unkey';

export async function GET() {
    try {
        const supabase = await createClient();
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: apiKeys, error } = await supabase
            .from('api_keys')
            .select(`
                *,
                apps!inner(user_id)
            `)
            .eq('apps.user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ apiKeys });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { app_id, name } = body;

        if (!app_id || !name) {
            return NextResponse.json({ error: 'App ID and name are required' }, { status: 400 });
        }

        // Verify app ownership
        const { data: app, error: appError } = await supabase
            .from('apps')
            .select('*')
            .eq('id', app_id)
            .eq('user_id', user.id)
            .single();

        if (appError || !app) {
            return NextResponse.json({ error: 'App not found' }, { status: 404 });
        }

        // Create API key with Unkey
        const unkeyKey = await createApiKey(app_id, app.libraries);

        // Store in database
        const { data: apiKey, error } = await supabase
            .from('api_keys')
            .insert({ app_id, key_id: unkeyKey.keyId, key_prefix: unkeyKey.key.substring(0, 8), name })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ apiKey: { ...apiKey, key: unkeyKey.key } }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
