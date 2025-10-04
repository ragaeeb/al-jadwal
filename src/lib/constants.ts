import type { Library } from '@/types';

export const LIBRARIES: Record<Library, { label: string; description: string; url: string }> = {
    'ketabonline.com': {
        description: 'Islamic books and resources online',
        label: 'Ketab Online',
        url: 'https://ketabonline.com',
    },
    'shamela.ws': {
        description: 'Comprehensive Islamic library with thousands of books',
        label: 'Shamela',
        url: 'https://shamela.ws',
    },
    'turath.io': { description: 'Heritage Islamic texts and manuscripts', label: 'Turath', url: 'https://turath.io' },
};

export const API_KEY_PREFIX = 'aj_';

export const ROUTES = {
    API_KEYS: '/dashboard/api-keys',
    APPS: '/dashboard/apps',
    DASHBOARD: '/dashboard',
    HOME: '/',
    LOGIN: '/auth/login',
    NEW_APP: '/dashboard/apps/new',
    SIGNUP: '/auth/signup',
} as const;

export const API_ENDPOINTS = { API_KEYS: '/api/api-keys', APPS: '/api/apps', BOOKS: '/api/v1/books' } as const;

export const ERROR_MESSAGES = {
    FORBIDDEN: 'You do not have permission to access this resource',
    INVALID_API_KEY: 'Invalid or expired API key',
    NO_LIBRARY_ACCESS: 'Your API key does not have access to this library',
    NOT_FOUND: 'The requested resource was not found',
    RATE_LIMIT: 'Rate limit exceeded. Please try again later',
    SERVER_ERROR: 'An unexpected error occurred. Please try again',
    UNAUTHORIZED: 'You must be logged in to access this resource',
};

export const SUCCESS_MESSAGES = {
    API_KEY_CREATED: 'API key created successfully',
    API_KEY_DELETED: 'API key deleted successfully',
    APP_CREATED: 'App created successfully',
    APP_DELETED: 'App deleted successfully',
    APP_UPDATED: 'App updated successfully',
    COPIED: 'Copied to clipboard',
} as const;
