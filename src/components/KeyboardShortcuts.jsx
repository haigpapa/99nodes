// src/components/KeyboardShortcuts.jsx
// Shows keyboard shortcuts when '?' is pressed, handles global keyboard nav

import { useState, useEffect, useCallback } from 'react';
import useConstellationStore from '../store/useConstellationStore';

const SHORTCUTS = [
    { keys: ['?'], desc: 'Show this help' },
    { keys: ['Esc'], desc: 'Close / go back' },
    { keys: ['M'], desc: 'Toggle Map ↔ List view' },
    { keys: ['/'], desc: 'Focus search' },
    { keys: ['C'], desc: 'Center map (reset view)' },
    { keys: ['←', '→'], desc: 'Navigate between projects' },
];

export default function KeyboardShortcuts() {
    const [visible, setVisible] = useState(false);
    const {
        clearSelection, exitProject, enteredProjectId,
        viewMode, setViewMode, selectNode, positionedNodes
    } = useConstellationStore();

    const handleKeyDown = useCallback((e) => {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key) {
            case '?':
                e.preventDefault();
                setVisible(v => !v);
                break;
            case 'Escape':
                if (visible) { setVisible(false); break; }
                if (enteredProjectId) { exitProject(); break; }
                clearSelection();
                break;
            case 'm':
            case 'M':
                if (!enteredProjectId) {
                    setViewMode(viewMode === 'map' ? 'list' : 'map');
                }
                break;
            case '/':
                if (!enteredProjectId) {
                    e.preventDefault();
                    const searchInput = document.querySelector('input[type="text"]');
                    if (searchInput) searchInput.focus();
                }
                break;
        }
    }, [visible, enteredProjectId, viewMode, clearSelection, exitProject, setViewMode]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={() => setVisible(false)}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div
                className="relative bg-black/90 border border-white/10 p-6 w-[320px]"
                style={{ animation: 'tourFade 0.2s ease-out' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white/60 text-[10px] tracking-[0.3em] uppercase">Keyboard Shortcuts</h3>
                    <button
                        onClick={() => setVisible(false)}
                        className="text-white/20 hover:text-white/50 transition-colors"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.3" />
                            <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-2.5">
                    {SHORTCUTS.map(s => (
                        <div key={s.desc} className="flex items-center justify-between gap-4">
                            <span className="text-white/40 text-[11px]">{s.desc}</span>
                            <div className="flex gap-1">
                                {s.keys.map(k => (
                                    <kbd
                                        key={k}
                                        className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/50 text-[10px] rounded font-mono min-w-[22px] text-center"
                                    >
                                        {k}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-white/15 text-[9px] tracking-wider mt-5 text-center">
                    Press <kbd className="px-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono">?</kbd> to close
                </p>
            </div>

            <style>{`
                @keyframes tourFade {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
