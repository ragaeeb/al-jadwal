import { NextResponse } from 'next/server';
import { ERROR_MESSAGES } from './constants';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleApiError = (error: unknown): NextResponse => {
    console.error('API Error:', error);

    if (error instanceof AppError) {
        return NextResponse.json({ code: error.code, error: error.message }, { status: error.statusCode });
    }

    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
};

export const createApiError = {
    badRequest: (message: string) => new AppError(400, message, 'BAD_REQUEST'),

    forbidden: (message = ERROR_MESSAGES.FORBIDDEN) => new AppError(403, message, 'FORBIDDEN'),

    internal: (message = ERROR_MESSAGES.SERVER_ERROR) => new AppError(500, message, 'INTERNAL_ERROR'),

    notFound: (message = ERROR_MESSAGES.NOT_FOUND) => new AppError(404, message, 'NOT_FOUND'),

    rateLimited: (message = ERROR_MESSAGES.RATE_LIMIT) => new AppError(429, message, 'RATE_LIMITED'),
    unauthorized: (message = ERROR_MESSAGES.UNAUTHORIZED) => new AppError(401, message, 'UNAUTHORIZED'),
};

export const logError = (error: unknown, context?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const errorInfo = {
        context,
        error: error instanceof Error ? { message: error.message, name: error.name, stack: error.stack } : error,
        timestamp,
    };

    console.error('Error Log:', JSON.stringify(errorInfo, null, 2));
};
