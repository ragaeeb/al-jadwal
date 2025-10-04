import { describe, expect, it } from 'bun:test';
import type { Library } from '@/types';
import {
    validateApiKeyName,
    validateAppName,
    validateBookId,
    validateEmail,
    validateLibraries,
    validatePassword,
} from './validation';

describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
        expect(validateEmail('user@example.com')).toBe(true);
        expect(validateEmail('test.user@domain.co.uk')).toBe(true);
        expect(validateEmail('name+tag@company.com')).toBe(true);
        expect(validateEmail('user123@test-domain.org')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
        expect(validateEmail('invalid')).toBe(false);
        expect(validateEmail('user@')).toBe(false);
        expect(validateEmail('@domain.com')).toBe(false);
        expect(validateEmail('user @domain.com')).toBe(false);
        expect(validateEmail('user@domain')).toBe(false);
        expect(validateEmail('')).toBe(false);
        expect(validateEmail('user@.com')).toBe(false);
    });
});

describe('validatePassword', () => {
    it('should return valid true for passwords with 6 or more characters', () => {
        const result = validatePassword('password123');
        expect(result.valid).toBe(true);
        expect(result.errors).toEqual([]);
    });

    it('should return valid true for exactly 6 characters', () => {
        const result = validatePassword('123456');
        expect(result.valid).toBe(true);
        expect(result.errors).toEqual([]);
    });

    it('should return valid false for passwords with less than 6 characters', () => {
        const result = validatePassword('12345');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must be at least 6 characters');
    });

    it('should return valid false for empty password', () => {
        const result = validatePassword('');
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Password must be at least 6 characters');
    });

    it('should return valid false for very short passwords', () => {
        const result = validatePassword('a');
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(1);
    });
});

describe('validateAppName', () => {
    it('should return valid true for valid app names', () => {
        expect(validateAppName('My App').valid).toBe(true);
        expect(validateAppName('Test Application').valid).toBe(true);
        expect(validateAppName('a').valid).toBe(true);
        expect(validateAppName('App123').valid).toBe(true);
    });

    it('should return valid false for empty app name', () => {
        const result = validateAppName('');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('App name is required');
    });

    it('should return valid false for whitespace-only app name', () => {
        const result = validateAppName('   ');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('App name is required');
    });

    it('should return valid false for app names over 100 characters', () => {
        const longName = 'a'.repeat(101);
        const result = validateAppName(longName);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('App name must be less than 100 characters');
    });

    it('should return valid true for app name with exactly 100 characters', () => {
        const name = 'a'.repeat(100);
        expect(validateAppName(name).valid).toBe(true);
    });

    it('should have no error property when valid', () => {
        const result = validateAppName('Valid App');
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
    });
});

describe('validateLibraries', () => {
    it('should return valid true for valid library arrays', () => {
        expect(validateLibraries(['shamela.ws']).valid).toBe(true);
        expect(validateLibraries(['shamela.ws', 'ketabonline.com']).valid).toBe(true);
        expect(validateLibraries(['shamela.ws', 'ketabonline.com', 'turath.io']).valid).toBe(true);
    });

    it('should return valid false for empty array', () => {
        const result = validateLibraries([]);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('At least one library must be selected');
    });

    it('should return valid false for non-array input', () => {
        const result = validateLibraries(null as any);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('At least one library must be selected');
    });

    it('should return valid false for invalid library', () => {
        const result = validateLibraries(['invalid.library' as Library]);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Invalid library: invalid.library');
    });

    it('should return valid false when array contains one invalid library', () => {
        const result = validateLibraries(['shamela.ws', 'invalid.com' as Library]);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Invalid library: invalid.com');
    });

    it('should have no error property when valid', () => {
        const result = validateLibraries(['shamela.ws']);
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
    });
});

describe('validateApiKeyName', () => {
    it('should return valid true for valid API key names', () => {
        expect(validateApiKeyName('Production Key').valid).toBe(true);
        expect(validateApiKeyName('Dev').valid).toBe(true);
        expect(validateApiKeyName('Key123').valid).toBe(true);
    });

    it('should return valid false for empty API key name', () => {
        const result = validateApiKeyName('');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('API key name is required');
    });

    it('should return valid false for whitespace-only API key name', () => {
        const result = validateApiKeyName('   ');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('API key name is required');
    });

    it('should return valid false for API key names over 50 characters', () => {
        const longName = 'a'.repeat(51);
        const result = validateApiKeyName(longName);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('API key name must be less than 50 characters');
    });

    it('should return valid true for API key name with exactly 50 characters', () => {
        const name = 'a'.repeat(50);
        expect(validateApiKeyName(name).valid).toBe(true);
    });

    it('should have no error property when valid', () => {
        const result = validateApiKeyName('Valid Key');
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
    });
});

describe('validateBookId', () => {
    it('should return valid true for valid book IDs', () => {
        expect(validateBookId('book123').valid).toBe(true);
        expect(validateBookId('BOOK_123').valid).toBe(true);
        expect(validateBookId('book-123').valid).toBe(true);
        expect(validateBookId('book_id-123').valid).toBe(true);
        expect(validateBookId('a').valid).toBe(true);
        expect(validateBookId('ABC123xyz').valid).toBe(true);
    });

    it('should return valid false for empty book ID', () => {
        const result = validateBookId('');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Book ID is required');
    });

    it('should return valid false for whitespace-only book ID', () => {
        const result = validateBookId('   ');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Book ID is required');
    });

    it('should return valid false for book IDs with invalid characters', () => {
        const result1 = validateBookId('book 123');
        expect(result1.valid).toBe(false);
        expect(result1.error).toBe('Book ID can only contain letters, numbers, hyphens, and underscores');

        const result2 = validateBookId('book@123');
        expect(result2.valid).toBe(false);
        expect(result2.error).toBe('Book ID can only contain letters, numbers, hyphens, and underscores');

        const result3 = validateBookId('book.123');
        expect(result3.valid).toBe(false);
        expect(result3.error).toBe('Book ID can only contain letters, numbers, hyphens, and underscores');

        const result4 = validateBookId('book#123');
        expect(result4.valid).toBe(false);
        expect(result4.error).toBe('Book ID can only contain letters, numbers, hyphens, and underscores');
    });

    it('should return valid false for book IDs with special characters', () => {
        const result = validateBookId('book!@#$%^&*()');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Book ID can only contain letters, numbers, hyphens, and underscores');
    });

    it('should have no error property when valid', () => {
        const result = validateBookId('valid_book-123');
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
    });
});
