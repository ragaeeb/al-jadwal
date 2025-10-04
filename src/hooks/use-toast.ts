import { useCallback, useState } from 'react';

interface ToastMessage {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
}

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const toast = useCallback((message: Omit<ToastMessage, 'id'>) => {
        const id =
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
                ? crypto.randomUUID()
                : Math.random().toString(36).slice(2);
        const newToast = { ...message, id };

        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);

        return id;
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { dismiss, toast, toasts };
};
