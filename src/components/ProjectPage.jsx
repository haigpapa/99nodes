import { useEffect, useRef, useState } from 'react';
import useConstellationStore from '../store/useConstellationStore';
import { NODES, CATEGORIES, LONG_DESCRIPTIONS } from '../data/nodes';
import { getNodeImage } from '../utils/nodeImage';
import { CATEGORY_STYLES } from '../utils/colors';



export default function ProjectPage() {
    const { enteredProjectId, exitProject, navigateProject } = useConstellationStore();
    const scrollRef = useRef(null);
    const [bannerLoaded, setBannerLoaded] = useState(false);

    const node = NODES.find(n => n.id === enteredProjectId);
    if (!node) return null;

    const data = LONG_DESCRIPTIONS[node.id] || {
        longDescription: "Project details coming soon.",
        details: [],
        sections: []
    };

    const connectedNodes = node.connections.map(id => NODES.find(n => n.id === id)).filter(Boolean);

    // Prev / next within connected nodes for quick traversal
    const allNodeIds = NODES.map(n => n.id);
    const currentIdx = allNodeIds.indexOf(enteredProjectId);
    const prevNode = currentIdx > 0 ? NODES[currentIdx - 1] : null;
    const nextNode = currentIdx < allNodeIds.length - 1 ? NODES[currentIdx + 1] : null;

    // Primary category accent for this project
    const primaryCat = node.categories[0];
    const primaryAccent = CATEGORY_STYLES[primaryCat];

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
        setBannerLoaded(false); // reset shimmer on project change
    }, [enteredProjectId]);

    return (
        <div
            className="fixed inset-0 bg-black z-50 overflow-y-auto"
            ref={scrollRef}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
            <style>{`
                @keyframes navFadeDown {
                    from { opacity: 0; transform: translateY(-12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroSlideUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes contentFadeIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            {/* Sticky Nav — fades in from above */}
            <div className="sticky top-0 left-0 right-0 z-50 bg-black border-b border-white/8 px-6 py-4 flex items-center justify-between"
                style={{ animation: 'navFadeDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both', fontFamily: '"DM Sans", sans-serif' }}>
                <button
                    onClick={exitProject}
                    className="text-white/30 hover:text-white/70 transition-colors text-sm tracking-widest"
                    aria-label="Back to constellation"
                >
                    ←
                </button>
                <span className="text-white/50 text-xs tracking-[0.3em] uppercase">PAPAZIAN</span>
                {/* Prev / next arrows */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => prevNode && navigateProject(prevNode.id)}
                        disabled={!prevNode}
                        className="text-white/20 hover:text-white/60 transition-colors disabled:opacity-10 text-sm tracking-widest"
                        aria-label="Previous project"
                        title={prevNode?.title}
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => nextNode && navigateProject(nextNode.id)}
                        disabled={!nextNode}
                        className="text-white/20 hover:text-white/60 transition-colors disabled:opacity-10 text-sm tracking-widest"
                        aria-label="Next project"
                        title={nextNode?.title}
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Hero — slides up */}
            <div className="relative h-[45vh] w-full overflow-hidden"
                style={{ animation: 'heroSlideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both' }}
            >
                {/* Shimmer placeholder — shows until image loads */}
                {!bannerLoaded && (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: primaryAccent
                                ? `linear-gradient(135deg, ${primaryAccent.bg} 0%, rgba(0,0,0,0.8) 100%)`
                                : 'rgba(255,255,255,0.03)',
                            animation: 'shimmerPulse 1.8s ease-in-out infinite',
                        }}
                    />
                )}
                <img
                    src={data.banner || getNodeImage(node)}
                    alt={node.title}
                    className="w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: bannerLoaded ? 0.5 : 0 }}
                    onLoad={() => setBannerLoaded(true)}
                />
                {/* Gradient: strong black at bottom, subtle at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

                <div className="absolute bottom-8 left-6 right-6 max-w-3xl">
                    {/* Category tags — colored by discipline */}
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                        {node.categories.map(catKey => {
                            const cat = CATEGORIES.find(c => c.key === catKey);
                            const accent = CATEGORY_STYLES[catKey];
                            return (
                                <span
                                    key={catKey}
                                    className="px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase"
                                    style={accent
                                        ? { backgroundColor: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }
                                        : { border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.6)' }
                                    }
                                >
                                    {cat?.label}
                                </span>
                            );
                        })}
                    </div>
                    <h1
                        className="text-white text-[clamp(2.2rem,7vw,5rem)] font-light leading-none tracking-tight mb-2"
                    >
                        {node.title}
                    </h1>
                    <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
                        {node.subtitle}
                    </p>
                </div>

                <style>{`
                    @keyframes shimmerPulse {
                        0%, 100% { opacity: 0.55; }
                        50% { opacity: 0.9; }
                    }
                `}</style>
            </div>

            {/* Content — fades in slightly after hero */}
            <div className="max-w-3xl mx-auto px-6 py-16 space-y-16"
                style={{ animation: 'contentFadeIn 0.5s ease-out 0.25s both' }}
            >

                {/* Details grid */}
                {data.details.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t pt-8"
                        style={{ borderColor: primaryAccent ? primaryAccent.border.replace('0.4', '0.15') : 'rgba(255,255,255,0.08)' }}>
                        {data.details.map((d, i) => {
                            // Year fields: split the century prefix from the last two digits
                            const isYear = /^\d{4}$/.test(String(d.value));
                            return (
                                <div key={i}>
                                    <div className="text-white/25 text-[9px] tracking-[0.25em] uppercase mb-2">{d.label}</div>
                                    {isYear ? (
                                        <div className="text-sm tabular-nums">
                                            <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
                                                {String(d.value).slice(0, 2)}
                                            </span>
                                            <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>
                                                {String(d.value).slice(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="text-white/70 text-sm">{d.value}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Long description */}
                <div className="text-white/65 text-base md:text-lg leading-relaxed font-light max-w-xl space-y-5">
                    {data.longDescription}
                </div>

                {/* Sections */}
                {data.sections.length > 0 && (
                    <div className="space-y-10">
                        {data.sections.map((sec, i) => (
                            <div key={i} className="border-t border-white/8 pt-8">
                                <h3 className="text-white/25 text-[9px] tracking-[0.25em] uppercase mb-5">{sec.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed max-w-xl">
                                    {sec.body}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Media gallery */}
                {data.media && data.media.length > 0 && (
                    <div className="border-t border-white/8 pt-12">
                        <h3 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-8">Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.media.map((m, i) => (
                                <div key={i} className="group">
                                    {m.src.match(/\.(mp4|webm)$/i) ? (
                                        <video src={m.src} controls className="w-full bg-black" />
                                    ) : (
                                        <img
                                            src={m.src}
                                            alt={m.caption || ''}
                                            className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    )}
                                    {m.caption && (
                                        <p className="text-white/30 text-[10px] tracking-wide mt-2">{m.caption}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Connected nodes */}
                {connectedNodes.length > 0 && (
                    <div className="border-t border-white/8 pt-12">
                        <h3 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-8">Related Nodes</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {connectedNodes.map(cn => (
                                <button
                                    key={cn.id}
                                    onClick={() => navigateProject(cn.id)}
                                    className="group text-left"
                                >
                                    {/* Thumbnail — sharp, no rounded */}
                                    <div className="aspect-video bg-white/5 mb-2 overflow-hidden">
                                        <img
                                            src={cn.image}
                                            alt={cn.title}
                                            className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-400"
                                        />
                                    </div>
                                    <div className="text-white/60 text-xs font-medium group-hover:text-white/90 transition-colors leading-snug">
                                        {cn.title}
                                    </div>
                                    <div className="text-white/25 text-[10px] mt-0.5 leading-snug">{cn.subtitle}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back button */}
                <div className="pt-16 pb-8 flex justify-center">
                    <button
                        onClick={exitProject}
                        className="text-[10px] tracking-[0.25em] uppercase text-white/25 border border-white/10 px-8 py-3 hover:bg-white hover:text-black hover:border-white transition-all duration-250"
                    >
                        Return to Constellation
                    </button>
                </div>

            </div>
        </div>
    );
}
