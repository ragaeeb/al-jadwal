import { motion } from 'motion/react';
import { useRef, useState } from 'react';

const SPRING = {
    // Damping controls how quickly the spring comes to rest (higher = less oscillation)
    damping: 10,
    // Mass affects the weight of the spring (higher = slower, heavier motion)
    mass: 0.75,
    // Stiffness controls the tension of the spring (higher = snappier, lower = softer)
    stiffness: 100,
    type: 'spring',
};

const LABEL_TRANSITION = {
    duration: 0.28,
    ease: [0.4, 0, 0.2, 1], // standard material easing
};

export interface AnimatedInputProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    labelClassName?: string;
    icon?: React.ReactNode;
}

export default function AnimatedInput({
    value,
    defaultValue = '',
    onChange,
    label,
    placeholder = '',
    disabled = false,
    className = '',
    inputClassName = '',
    labelClassName = '',
    icon,
}: AnimatedInputProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const val = isControlled ? value : internalValue;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const isFloating = !!val || isFocused;

    return (
        <div className={`relative flex items-center ${className}`}>
            {icon && <span className="-translate-y-1/2 absolute top-1/2 left-3">{icon}</span>}
            <input
                ref={inputRef}
                type="text"
                value={val}
                onChange={(e) => {
                    if (!isControlled) {
                        setInternalValue(e.target.value);
                    }
                    onChange?.(e.target.value);
                }}
                placeholder={isFloating ? placeholder : ''}
                disabled={disabled}
                className={`peer w-full rounded-sm border bg-background px-3 py-2 text-sm outline-none transition focus:ring-1 focus:ring-primary ${icon ? 'pl-10' : ''} ${inputClassName}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <motion.label
                className={`-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 origin-left rounded-sm border border-transparent bg-background px-1 text-foreground transition-all ${labelClassName}`}
                animate={
                    isFloating
                        ? { borderColor: 'var(--color-brand)', color: 'var(--color-brand)', scale: 0.85, y: -24 }
                        : { color: '#6b7280', scale: 1, y: 0 }
                }
                transition={LABEL_TRANSITION}
                style={{ zIndex: 2 }}
            >
                {label}
            </motion.label>
        </div>
    );
}
