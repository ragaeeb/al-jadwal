import type { Library } from '@/types';

const UNKEY_API_URL = 'https://api.unkey.dev';
const UNKEY_ROOT_KEY = process.env.UNKEY_ROOT_KEY!;
const UNKEY_API_ID = process.env.UNKEY_API_ID!;

interface CreateApiKeyResponse {
    keyId: string;
    key: string;
}

interface VerifyApiKeyResponse {
    valid: boolean;
    keyId?: string;
    meta?: { appId?: string; libraries?: Library[] };
}

export const createApiKey = async (appId: string, libraries: Library[]): Promise<CreateApiKeyResponse> => {
    const response = await fetch(`${UNKEY_API_URL}/v1/keys.createKey`, {
        body: JSON.stringify({ apiId: UNKEY_API_ID, meta: { appId, libraries }, prefix: 'aj' }),
        headers: { Authorization: `Bearer ${UNKEY_ROOT_KEY}`, 'Content-Type': 'application/json' },
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to create API key with Unkey');
    }

    const data = await response.json();
    return { key: data.key, keyId: data.keyId };
};

export const verifyApiKey = async (key: string): Promise<VerifyApiKeyResponse> => {
    const response = await fetch(`${UNKEY_API_URL}/v1/keys.verifyKey`, {
        body: JSON.stringify({ apiId: UNKEY_API_ID, key }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    });

    if (!response.ok) {
        return { valid: false };
    }

    const data = await response.json();

    return { keyId: data.keyId, meta: data.meta, valid: data.valid };
};

export const revokeApiKey = async (keyId: string): Promise<void> => {
    const response = await fetch(`${UNKEY_API_URL}/v1/keys.deleteKey`, {
        body: JSON.stringify({ keyId }),
        headers: { Authorization: `Bearer ${UNKEY_ROOT_KEY}`, 'Content-Type': 'application/json' },
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to revoke API key with Unkey');
    }
};
