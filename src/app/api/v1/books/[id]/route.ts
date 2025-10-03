import { type NextRequest, NextResponse } from 'next/server';
import { fetchBookFromProvider } from '@/lib/providers';
import { createClient } from '@/lib/supabase/server';
import { verifyApiKey } from '@/lib/unkey';
import type { Library } from '@/types';

const extractApiKey = (request: NextRequest): string | null => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: bookId } = await params;
        const apiKey = extractApiKey(request);

        if (!apiKey) {
            return NextResponse.json({ error: 'Missing API key' }, { status: 401 });
        }

        const provider = request.nextUrl.searchParams.get('provider') as Library | null;

        if (!provider) {
            return NextResponse.json({ error: 'Missing provider parameter' }, { status: 400 });
        }

        // Verify API key with Unkey
        const verification = await verifyApiKey(apiKey);

        if (!verification.valid) {
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
        }

        // Check if the key has access to this provider
        const hasAccess = verification.meta?.libraries?.includes(provider);

        if (!hasAccess) {
            return NextResponse.json({ error: `No access to ${provider}` }, { status: 403 });
        }

        // Update last_used_at
        const supabase = await createClient();
        await supabase
            .from('api_keys')
            .update({ last_used_at: new Date().toISOString() })
            .eq('key_id', verification.keyId);

        // Fetch book from provider
        const book = await fetchBookFromProvider(provider, bookId);

        return NextResponse.json({ book });
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
