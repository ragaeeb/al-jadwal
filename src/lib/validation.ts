import type { Library } from '@/types';

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    return { errors, valid: errors.length === 0 };
};

export const validateAppName = (name: string): { valid: boolean; error?: string } => {
    if (!name || name.trim().length === 0) {
        return { error: 'App name is required', valid: false };
    }

    if (name.length > 100) {
        return { error: 'App name must be less than 100 characters', valid: false };
    }

    return { valid: true };
};

export const validateLibraries = (libraries: Library[]): { valid: boolean; error?: string } => {
    if (!Array.isArray(libraries) || libraries.length === 0) {
        return { error: 'At least one library must be selected', valid: false };
    }

    const validLibraries = ['shamela.ws', 'ketabonline.com', 'turath.io'];
    const invalidLibrary = libraries.find((lib) => !validLibraries.includes(lib));

    if (invalidLibrary) {
        return { error: `Invalid library: ${invalidLibrary}`, valid: false };
    }

    return { valid: true };
};

export const validateApiKeyName = (name: string): { valid: boolean; error?: string } => {
    if (!name || name.trim().length === 0) {
        return { error: 'API key name is required', valid: false };
    }

    if (name.length > 50) {
        return { error: 'API key name must be less than 50 characters', valid: false };
    }

    return { valid: true };
};

export const validateBookId = (bookId: string): { valid: boolean; error?: string } => {
    if (!bookId || bookId.trim().length === 0) {
        return { error: 'Book ID is required', valid: false };
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(bookId)) {
        return { error: 'Book ID can only contain letters, numbers, hyphens, and underscores', valid: false };
    }

    return { valid: true };
};
