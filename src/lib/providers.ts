import type { Library } from '@/types';

interface Book {
    id: string;
    title: string;
    author?: string;
    content?: string;
    metadata?: Record<string, unknown>;
}

const fetchFromShamela = async (bookId: string): Promise<Book> => {
    // TODO: Implement actual Shamela API integration
    const response = await fetch(`https://shamela.ws/api/book/${bookId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch book from Shamela');
    }

    const data = await response.json();

    return { author: data.author, content: data.content, id: bookId, metadata: data, title: data.title || 'Unknown' };
};

const fetchFromKetabOnline = async (bookId: string): Promise<Book> => {
    // TODO: Implement actual Ketab Online API integration
    const response = await fetch(`https://ketabonline.com/api/book/${bookId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch book from Ketab Online');
    }

    const data = await response.json();

    return { author: data.author, content: data.content, id: bookId, metadata: data, title: data.title || 'Unknown' };
};

const fetchFromTurath = async (bookId: string): Promise<Book> => {
    // TODO: Implement actual Turath API integration
    const response = await fetch(`https://turath.io/api/book/${bookId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch book from Turath');
    }

    const data = await response.json();

    return { author: data.author, content: data.content, id: bookId, metadata: data, title: data.title || 'Unknown' };
};

export const fetchBookFromProvider = async (provider: Library, bookId: string): Promise<Book> => {
    switch (provider) {
        case 'shamela.ws':
            return fetchFromShamela(bookId);
        case 'ketabonline.com':
            return fetchFromKetabOnline(bookId);
        case 'turath.io':
            return fetchFromTurath(bookId);
        default:
            throw new Error(`Unknown provider: ${provider}`);
    }
};
