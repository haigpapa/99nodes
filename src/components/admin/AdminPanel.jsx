import { useState, useMemo } from 'react';
import { NODES, CATEGORIES } from '../../data/nodes';
import NodeEditor from './NodeEditor';

export default function AdminPanel() {
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('');
    const [editingNode, setEditingNode] = useState(null);
    const [savedIds, setSavedIds] = useState(new Set());

    const filtered = useMemo(() => {
        return NODES.filter(n => {
            const matchSearch = !search ||
                n.title.toLowerCase().includes(search.toLowerCase()) ||
                n.subtitle.toLowerCase().includes(search.toLowerCase());
            const matchCat = !filterCat || n.categories.includes(filterCat);
            return matchSearch && matchCat;
        });
    }, [search, filterCat]);

    const handleSaved = (nodeId) => {
        setSavedIds(prev => new Set([...prev, nodeId]));
        setEditingNode(null);
    };

    // ── If editing a node, show the editor full-screen ───────────────────────
    if (editingNode) {
        return (
            <NodeEditor
                node={editingNode}
                onBack={() => setEditingNode(null)}
                onSaved={handleSaved}
            />
        );
    }

    return (
        <div
            className="min-h-screen bg-black text-white"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
            {/* Header */}
            <div className="sticky top-0 bg-black border-b border-white/10 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
                    <div>
                        <span className="text-white text-sm font-medium tracking-[0.2em] uppercase">
                            PAPAZIAN
                        </span>
                        <span className="text-white/20 text-xs ml-3 tracking-widest uppercase">
                            Content Admin
                        </span>
                    </div>

                    <div className="flex items-center gap-3 flex-1 max-w-xl">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search nodes..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-white text-xs tracking-wide outline-none focus:border-white/30 transition-colors placeholder-white/20"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        />
                        {/* Category filter */}
                        <select
                            value={filterCat}
                            onChange={e => setFilterCat(e.target.value)}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-white/60 text-xs outline-none focus:border-white/30 transition-colors"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                            <option value="">All categories</option>
                            {CATEGORIES.map(c => (
                                <option key={c.key} value={c.key}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <span className="text-white/25 text-xs tracking-wide">
                        {filtered.length} / {NODES.length} nodes
                    </span>
                </div>
            </div>

            {/* Instructions banner */}
            <div className="max-w-6xl mx-auto px-6 pt-6 pb-2">
                <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
                    Click any node to edit · Changes save directly to nodes.js · Reload the main app to see updates
                </p>
            </div>

            {/* Node grid */}
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filtered.map(node => (
                        <NodeCard
                            key={node.id}
                            node={node}
                            saved={savedIds.has(node.id)}
                            onClick={() => setEditingNode(node)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Small node card for the grid ─────────────────────────────────────────────
function NodeCard({ node, saved, onClick }) {
    const tierLabel = node.tier === 1 ? 'T1' : node.tier === 2 ? 'T2' : 'T3';
    const isPlaceholder = node.image?.includes('picsum.photos');

    return (
        <button
            onClick={onClick}
            className="group text-left border border-white/8 hover:border-white/30 transition-all duration-150 relative"
        >
            {/* Saved badge */}
            {saved && (
                <div className="absolute top-2 right-2 z-10 w-2 h-2 bg-white rounded-full" />
            )}

            {/* Thumbnail */}
            <div className="aspect-video bg-white/5 overflow-hidden relative">
                <img
                    src={node.image}
                    alt={node.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-200"
                    loading="lazy"
                />
                {isPlaceholder && (
                    <div className="absolute inset-0 flex items-end p-1.5">
                        <span className="text-white/30 text-[8px] tracking-widest uppercase">placeholder</span>
                    </div>
                )}
                {/* Tier badge */}
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 text-white/40 text-[8px] tracking-widest uppercase">
                    {tierLabel}
                </div>
            </div>

            {/* Info */}
            <div className="p-2.5">
                <div className="text-white/80 text-xs font-medium leading-snug mb-0.5 group-hover:text-white transition-colors line-clamp-2">
                    {node.title}
                </div>
                <div className="text-white/25 text-[10px] leading-snug line-clamp-1">
                    {node.subtitle}
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                    {node.categories.map(c => (
                        <span key={c} className="text-[8px] tracking-widest uppercase text-white/20 border border-white/10 px-1 py-0.5">
                            {c}
                        </span>
                    ))}
                </div>
            </div>
        </button>
    );
}
