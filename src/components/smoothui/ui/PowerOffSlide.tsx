'use client';

import { Power } from 'lucide-react';
import { motion, useAnimation, useAnimationFrame, useMotionValue } from 'motion/react';
import { type RefObject, useEffect, useRef, useState } from 'react';

export type PowerOffSlideProps = {
    onPowerOff?: () => void;
    label?: string;
    className?: string;
    duration?: number;
    disabled?: boolean;
    powerOffLabel: string;
};

export const PowerOffSlide = ({
    onPowerOff,
    label = 'Slide to power off',
    className = '',
    duration = 2000,
    disabled = false,
    powerOffLabel = 'Shutting down...',
}: PowerOffSlideProps) => {
    const [isPoweringOff, setIsPoweringOff] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const constraintsRef = useRef(null);
    const textRef: RefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useAnimationFrame((t) => {
        const animDuration = duration;
        const progress = (t % animDuration) / animDuration;
        if (textRef.current) {
            textRef.current.style.setProperty('--x', `${(1 - progress) * 100}%`);
        }
    });

    const handleDragEnd = async () => {
        if (disabled || !isMounted) {
            return;
        }
        const dragDistance = x.get();
        if (dragDistance > 160) {
            await controls.start({ x: 168 });
            setIsPoweringOff(true);
            if (onPowerOff) {
                onPowerOff();
            }
            setTimeout(() => {
                setIsPoweringOff(false);
                if (isMounted) {
                    controls.start({ x: 0 });
                    x.set(0);
                }
            }, duration);
        } else {
            controls.start({ x: 0 });
        }
    };

    return (
        <div className={`flex h-auto items-center justify-center ${className}`}>
            <div className="w-56">
                {isPoweringOff ? (
                    <div className="text-center text-foreground">
                        <p className="mb-2 font-light text-xl">{powerOffLabel}</p>
                    </div>
                ) : (
                    <div
                        ref={constraintsRef}
                        className="relative h-14 overflow-hidden rounded-full border bg-secondary"
                    >
                        <div className="absolute inset-0 left-8 z-0 flex items-center justify-center overflow-hidden">
                            <div
                                ref={textRef}
                                className="loading-shimmer relative w-full select-none text-center font-normal text-foreground text-md"
                            >
                                {label}
                            </div>
                        </div>
                        <motion.div
                            drag={disabled ? false : 'x'}
                            dragConstraints={{ left: 0, right: 168 }}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragEnd={handleDragEnd}
                            animate={controls}
                            style={{ x }}
                            className={`absolute top-1 left-1 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}`}
                            tabIndex={disabled ? -1 : 0}
                            aria-disabled={disabled}
                        >
                            <Power size={32} className="text-red-600" />
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};
