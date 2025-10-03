import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { revokeApiKey } from '@/lib/unkey';

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the API key with app ownership check
        const { data: apiKey, error: fetchError } = await supabase
            .from('api_keys')
            .select(`
                *,
                apps!inner(user_id)
            `)
            .eq('id', id)
            .eq('apps.user_id', user.id)
            .single();

        if (fetchError || !apiKey) {
            return NextResponse.json({ error: 'API key not found' }, { status: 404 });
        }

        // Revoke with Unkey
        await revokeApiKey(apiKey.key_id);

        // Delete from database
        const { error } = await supabase.from('api_keys').delete().eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
