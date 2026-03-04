import { useState, useMemo, useRef, useEffect } from 'react';
import useConstellationStore from '../store/useConstellationStore';
import { NODES } from '../data/nodes';
import { getNodeImage } from '../utils/nodeImage';

// Category color mapping — keys match data/nodes.js CATEGORIES exactly
const CAT_COLORS = {
    music: { bg: 'bg-amber-400/15', text: 'text-amber-400', dot: 'bg-amber-400' },
    words: { bg: 'bg-sky-400/15', text: 'text-sky-400', dot: 'bg-sky-400' },
    images: { bg: 'bg-rose-400/15', text: 'text-rose-400', dot: 'bg-rose-400' },
    code: { bg: 'bg-emerald-400/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    spaces: { bg: 'bg-violet-400/15', text: 'text-violet-400', dot: 'bg-violet-400' },
    systems: { bg: 'bg-orange-400/15', text: 'text-orange-400', dot: 'bg-orange-400' },
};

const SORT_OPTIONS = [
    { key: 'year-desc', label: 'Newest' },
    { key: 'year-asc', label: 'Oldest' },
    { key: 'alpha', label: 'A → Z' },
    { key: 'tier', label: 'Importance' },
];

// Custom pill-style sort dropdown — matches the FilterBar aesthetic
function SortPicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const current = SORT_OPTIONS.find(o => o.key === value);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    return (
        <div ref={ref} className="relative" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white/70 hover:border-white/25 transition-all duration-200 bg-transparent"
            >
                {current?.label}
                <svg width="7" height="7" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div
                    className="absolute right-0 top-full mt-1.5 bg-black/95 backdrop-blur-md border border-white/10 py-1 z-50 min-w-[110px]"
                    style={{ animation: 'sortDropIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                    {SORT_OPTIONS.map(opt => (
                        <button
                            key={opt.key}
                            onClick={() => { onChange(opt.key); setOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-[10px] tracking-[0.15em] uppercase transition-colors ${opt.key === value
                                    ? 'text-white bg-white/5'
                                    : 'text-white/35 hover:text-white/70 hover:bg-white/[0.03]'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}



        </div>
    );
}

export default function ListView() {
    const { activeFilters, searchQuery, searchMatchIds, enterProject } = useConstellationStore();
    const [sortBy, setSortBy] = useState('year-desc');

    const filteredNodes = useMemo(() => {
        let nodes = [...NODES];

        // Apply category filters
        if (activeFilters.length > 0) {
            nodes = nodes.filter(n => n.categories.some(c => activeFilters.includes(c)));
        }

        // Apply search
        if (searchQuery.trim().length >= 2 && searchMatchIds.size > 0) {
            nodes = nodes.filter(n => searchMatchIds.has(n.id));
        }

        // Sort
        switch (sortBy) {
            case 'year-desc': nodes.sort((a, b) => (b.year || 0) - (a.year || 0)); break;
            case 'year-asc': nodes.sort((a, b) => (a.year || 0) - (b.year || 0)); break;
            case 'alpha': nodes.sort((a, b) => a.title.localeCompare(b.title)); break;
            case 'tier': nodes.sort((a, b) => (a.tier || 3) - (b.tier || 3)); break;
        }

        return nodes;
    }, [activeFilters, searchQuery, searchMatchIds, sortBy]);

    return (
        <div
            className="fixed inset-0 bg-black overflow-y-auto pt-20 pb-12 px-6 z-10"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
                        {filteredNodes.length} project{filteredNodes.length !== 1 ? 's' : ''}
                    </p>

                    {/* Custom sort picker — matches pill nav aesthetic */}
                    <SortPicker value={sortBy} onChange={setSortBy} />
                </div>

                {/* Table header */}
                <div className="grid grid-cols-[1fr_120px_60px_60px] gap-4 px-4 py-2 border-b border-white/5 text-[9px] tracking-[0.2em] uppercase text-white/20">
                    <span>Project</span>
                    <span>Discipline</span>
                    <span className="text-right">Year</span>
                    <span className="text-right">Tier</span>
                </div>

                {/* Project rows */}
                {filteredNodes.map((node, i) => {
                    const primaryCat = node.categories[0] || 'code';
                    const catStyle = CAT_COLORS[primaryCat] || CAT_COLORS.code;
                    return (
                        <button
                            key={node.id}
                            onClick={() => enterProject(node.id)}
                            className="w-full grid grid-cols-[1fr_120px_60px_60px] gap-4 px-4 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.03] transition-all duration-200 group text-left"
                            style={{ animation: `fadeIn 0.3s ease-out ${i * 0.02}s both` }}
                        >
                            {/* Title + image */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 bg-white/5 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={getNodeImage(node)}
                                        alt=""
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="min-w-0">
                                    {/* Variable font-weight: slides from 300→500 on hover via font-variation-settings */}
                                    <div
                                        className="text-white/80 text-xs truncate group-hover:text-white transition-colors duration-200"
                                        style={{
                                            fontVariationSettings: '"wght" 350',
                                            transition: 'color 0.2s, font-variation-settings 0.25s ease',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.fontVariationSettings = '"wght" 500'; }}
                                        onMouseLeave={e => { e.currentTarget.style.fontVariationSettings = '"wght" 350'; }}
                                    >
                                        {node.title}
                                    </div>
                                    {node.subtitle && (
                                        <div className="text-white/25 text-[10px] truncate mt-0.5">
                                            {node.subtitle}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category */}
                            <div className="flex items-center">
                                <span className={`inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${catStyle.bg} ${catStyle.text}`}>
                                    <span className={`w-1 h-1 rounded-full ${catStyle.dot}`} />
                                    {primaryCat}
                                </span>
                            </div>

                            {/* Year — split into two parts: digits muted, century prefix lighter */}
                            <div className="flex items-center justify-end tabular-nums text-[11px] tracking-wide">
                                {node.year ? (
                                    <>
                                        <span style={{ color: 'rgba(255,255,255,0.12)', fontWeight: 300 }}>
                                            {String(node.year).slice(0, 2)}
                                        </span>
                                        <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>
                                            {String(node.year).slice(2)}
                                        </span>
                                    </>
                                ) : (
                                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                                )}
                            </div>

                            {/* Tier */}
                            <div className="flex items-center justify-end gap-0.5">
                                {[1, 2, 3].map(t => (
                                    <div
                                        key={t}
                                        className={`w-1.5 h-1.5 rounded-full ${t <= (node.tier || 3) ? 'bg-white/30' : 'bg-white/5'}`}
                                    />
                                ))}
                            </div>
                        </button>
                    );
                })}

                {filteredNodes.length === 0 && (
                    <div className="py-20 text-center text-white/20 text-xs tracking-[0.2em] uppercase">
                        No projects match current filters
                    </div>
                )}
            </div>
        </div>
    );
}
