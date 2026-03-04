import { useState, useEffect } from 'react';
import useConstellationStore from '../store/useConstellationStore';
import { CATEGORY_LIST } from '../utils/colors';

export default function IntroOverlay() {
    const { startApp, hasStarted } = useConstellationStore();
    const [visible, setVisible] = useState(true);
    const [peekReady, setPeekReady] = useState(false);

    // Delay the dim-constellation peek so the canvas has time to render first
    useEffect(() => {
        const t = setTimeout(() => setPeekReady(true), 400);
        return () => clearTimeout(t);
    }, []);

    if (!visible) return null;

    const handleEnter = () => {
        startApp();
        setTimeout(() => setVisible(false), 700);
    };


    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ${hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={handleEnter}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
            {/* Background: dark overlay — NOT solid black, so constellation peeks through */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.95) 100%)',
                    opacity: peekReady ? 1 : 0,
                }}
            />
            {/* Extra solid layer that fades out to reveal the peeking constellation */}
            <div
                className="absolute inset-0 bg-black transition-opacity duration-1000"
                style={{ opacity: peekReady ? 0 : 1 }}
            />

            {/* Content — sits above the overlay layers */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Wordmark */}
                <h1 className="text-white text-[clamp(3rem,12vw,9rem)] font-medium tracking-[-0.02em] leading-none mb-4 select-none"
                    style={{ textShadow: '0 0 80px rgba(255,255,255,0.08)' }}>
                    PAPAZIAN
                </h1>

                {/* Micro-copy */}
                <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase mb-8 max-w-sm text-center leading-relaxed">
                    A map of things built, unbuilt, and still becoming.
                </p>

                {/* Category color dots — primer for the color system inside */}
                <div className="flex items-center gap-3 mb-10">
                    {CATEGORY_LIST.map(p => (
                        <div key={p.label} className="flex flex-col items-center gap-1.5">
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: p.color, opacity: 0.75, boxShadow: `0 0 6px ${p.color}` }}
                            />
                            <span
                                className="text-[8px] tracking-[0.2em] uppercase"
                                style={{ color: p.color, opacity: 0.45 }}
                            >
                                {p.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Sub-line */}
                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase animate-pulse">
                    click anywhere to enter
                </p>
            </div>

            {/* Node count hint */}
            <p className="absolute bottom-8 left-0 right-0 text-center text-white/15 text-[10px] tracking-[0.3em] uppercase z-10">
                99 nodes · 14 years
            </p>
        </div>
    );
}
