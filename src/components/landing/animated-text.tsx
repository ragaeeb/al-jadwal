'use client';

import { motion } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

interface AnimatedTextProps {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedText({ as: Tag = 'span', children, className, delay = 0 }: AnimatedTextProps) {
    return (
        <motion.div
            initial={{ filter: 'blur(12px)', opacity: 0, y: 12 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ bounce: 0.3, delay, duration: 1.5, type: 'spring' }}
        >
            <Tag className={className}>{children}</Tag>
        </motion.div>
    );
}
