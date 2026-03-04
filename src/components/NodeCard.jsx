import { useState, useRef } from 'react';
import useConstellationStore from '../store/useConstellationStore';
import { NODES, CATEGORIES } from '../data/nodes';

// Reusable swipe-to-dismiss wrapper
function SwipePanel({ onClose, children }) {
    const panelRef = useRef(null);
    const startY = useRef(null);
    const currentY = useRef(0);

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (startY.current === null) return;
        const dy = e.touches[0].clientY - startY.current;
        if (dy > 0) {
            currentY.current = dy;
            if (panelRef.current) {
                panelRef.current.style.transform = `translateY(${dy}px)`;
                panelRef.current.style.transition = 'none';
            }
        }
    };

    const handleTouchEnd = () => {
        if (currentY.current > 80) {
            // Swiped far enough — dismiss
            onClose();
        } else {
            // Snap back
            if (panelRef.current) {
                panelRef.current.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                panelRef.current.style.transform = 'translateY(0)';
            }
        }
        startY.current = null;
        currentY.current = 0;
    };

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
            style={{ animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: '"DM Sans", sans-serif' }}
        >
            <div
                ref={panelRef}
                className="w-full max-w-xl pointer-events-auto"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {children}
            </div>
        </div>
    );
}

export default function NodeCard() {
    const { selectedNodeId, activePanel, setActivePanel, enterProject } = useConstellationStore();
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState('idle');
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState('idle');

    if (!activePanel) return null;

    const close = () => setActivePanel(null);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setEmailStatus('sending');
        try {
            // TODO: replace with real endpoint
            await new Promise(r => setTimeout(r, 800));
            setEmailStatus('done');
        } catch {
            setEmailStatus('error');
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.email || !contactForm.message) return;
        setContactStatus('sending');
        try {
            // TODO: replace with real endpoint
            await new Promise(r => setTimeout(r, 800));
            setContactStatus('done');
        } catch {
            setContactStatus('error');
        }
    };

    const INNER = 'bg-black border-t border-white/10 px-8 pt-8 pb-12 relative';
    const CLOSE = 'absolute top-7 right-7 text-white/25 hover:text-white/70 transition-colors text-xl leading-none';

    // ── ABOUT PANEL ──────────────────────────────────────────────────────
    if (activePanel === 'about') {
        return (
            <SwipePanel onClose={close}>
                <div className={INNER}>
                    <button onClick={close} className={CLOSE} aria-label="Close">×</button>

                    <h2 className="text-white text-2xl font-light tracking-tight mb-1">Haig Papazian</h2>
                    <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-6">
                        Music · Architecture · Code
                    </p>

                    <div className="space-y-4 text-white/55 text-sm leading-7 max-w-md mb-7">
                        <p>
                            Haig Papazian works across music, architecture, code, and the spaces between them.
                        </p>
                        <p>
                            Trained as an architect at AUB and the Bartlett (UCL). Co-founder of Mashrou' Leila. Now building Walaw Studio — a practice that treats a violin bow, a line of TypeScript, and a surrealist text as different tools for the same project: mapping where people belong, and building the infrastructure for belonging where it doesn't exist yet.
                        </p>
                        <p>
                            Based in New York.
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-4 mb-8">
                        {[
                            { label: 'Instagram', href: 'https://instagram.com/haigpapazian' },
                            { label: 'Spotify', href: 'https://open.spotify.com/artist/1wS9bkJMsIQzAJR8FNvjQN' },
                            { label: 'Soundcloud', href: 'https://soundcloud.com/haigpapazian' },
                            { label: 'Email', href: 'mailto:haig@papazian.com' },
                        ].map(({ label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer"
                                className="text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-white/70 transition-colors border-b border-white/10 hover:border-white/40 pb-px">
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Email signup */}
                    <div className="pt-6 border-t border-white/8">
                        <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase mb-4">Stay updated</p>
                        {emailStatus === 'done' ? (
                            <p className="text-white/40 text-xs tracking-wider">You're on the list.</p>
                        ) : (
                            <form onSubmit={handleEmailSubmit} className="flex gap-0">
                                <input type="email" placeholder="your@email.com" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent border border-white/15 px-4 py-2 text-white/60 text-xs tracking-wider outline-none focus:border-white/40 transition-colors placeholder-white/20"
                                    style={{ fontFamily: '"DM Sans", sans-serif' }} />
                                <button type="submit" disabled={emailStatus === 'sending'}
                                    className="px-5 py-2 bg-white text-black text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-white/85 transition-colors disabled:opacity-50">
                                    {emailStatus === 'sending' ? '…' : 'Join'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </SwipePanel>
        );
    }

    // ── CONTACT PANEL ─────────────────────────────────────────────────────
    if (activePanel === 'contact') {
        return (
            <SwipePanel onClose={close}>
                <div className={INNER}>
                    <button onClick={close} className={CLOSE} aria-label="Close">×</button>

                    <h2 className="text-white text-2xl font-light tracking-tight mb-1">Get in Touch</h2>
                    <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-7">
                        Commissions · Collaborations · Press
                    </p>

                    {contactStatus === 'done' ? (
                        <p className="text-white/50 text-sm leading-relaxed">Message received. I'll be in touch.</p>
                    ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-3">
                            <input type="text" placeholder="Your name" value={contactForm.name}
                                onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full bg-transparent border border-white/15 px-4 py-2.5 text-white/60 text-xs tracking-wider outline-none focus:border-white/40 transition-colors placeholder-white/20"
                                style={{ fontFamily: '"DM Sans", sans-serif' }} />
                            <input type="email" placeholder="your@email.com" value={contactForm.email}
                                onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                                className="w-full bg-transparent border border-white/15 px-4 py-2.5 text-white/60 text-xs tracking-wider outline-none focus:border-white/40 transition-colors placeholder-white/20"
                                style={{ fontFamily: '"DM Sans", sans-serif' }} />
                            <textarea placeholder="What's on your mind..." value={contactForm.message}
                                onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                                rows={3}
                                className="w-full bg-transparent border border-white/15 px-4 py-2.5 text-white/60 text-xs tracking-wider outline-none focus:border-white/40 transition-colors placeholder-white/20 resize-none"
                                style={{ fontFamily: '"DM Sans", sans-serif' }} />
                            <button type="submit" disabled={contactStatus === 'sending'}
                                className="w-full py-2.5 bg-white text-black text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-white/85 transition-colors disabled:opacity-50">
                                {contactStatus === 'sending' ? 'Sending…' : 'Send Message'}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 pt-5 border-t border-white/8">
                        <a href="mailto:haig@papazian.com"
                            className="text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors">
                            haig@papazian.com
                        </a>
                    </div>
                </div>
            </SwipePanel>
        );
    }

    // ── READ PANEL ────────────────────────────────────────────────────────
    if (activePanel === 'read') {
        return (
            <SwipePanel onClose={close}>
                <div className={INNER}>
                    <button onClick={close} className={CLOSE} aria-label="Close">×</button>

                    <h2 className="text-white text-2xl font-light tracking-tight mb-1">Writing</h2>
                    <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-8">
                        Essays · Notes · Process
                    </p>

                    {/* Placeholder — replace with real writing entries */}
                    <div className="space-y-5 max-w-md">
                        <p className="text-white/25 text-sm leading-relaxed">
                            Writing coming soon. This section will hold essays, process notes, and other long-form text.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/8">
                        <a href="mailto:haig@papazian.com"
                            className="text-[9px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors">
                            Want to commission a piece? haig@papazian.com
                        </a>
                    </div>
                </div>
            </SwipePanel>
        );
    }

    // ── NODE DETAILS PANEL ───────────────────────────────────────────────
    const node = NODES.find(n => n.id === selectedNodeId);
    if (!node) return null;

    const connectedNodes = node.connections
        .map(id => NODES.find(n => n.id === id))
        .filter(Boolean)
        .slice(0, 6);

    return (
        <SwipePanel onClose={close}>
            <div className={INNER} style={{ paddingBottom: '2.5rem' }}>

                <button onClick={close} className={CLOSE} aria-label="Close">×</button>

                <div className="flex flex-col gap-5">

                    {/* Category + year tags */}
                    <div className="flex gap-1.5 flex-wrap">
                        {node.categories.map(catKey => {
                            const cat = CATEGORIES.find(c => c.key === catKey);
                            return (
                                <span key={catKey} className="px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase border border-white/15 text-white/40">
                                    {cat?.label}
                                </span>
                            );
                        })}
                        <span className="px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase border border-white/10 text-white/25">
                            {node.year}
                        </span>
                    </div>

                    {/* Title */}
                    <div>
                        <h2 className="text-white text-2xl font-light tracking-tight leading-tight mb-1">
                            {node.title}
                        </h2>
                        <p className="text-white/30 text-xs tracking-[0.15em] uppercase">
                            {node.subtitle}
                        </p>
                    </div>

                    {/* Body + Connections */}
                    <div className="grid md:grid-cols-[1.6fr_1fr] gap-6">

                        <div className="space-y-5">
                            <p className="text-white/55 text-sm leading-relaxed">
                                {node.description}
                            </p>

                            {node.tier === 1 && (
                                <button
                                    onClick={() => enterProject(node.id)}
                                    className="group inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40 border border-white/15 px-5 py-2.5 hover:bg-white hover:text-black hover:border-white transition-all duration-250"
                                >
                                    Enter Project
                                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                                </button>
                            )}
                        </div>

                        {/* Connections — visible on all screen sizes */}
                        <div className="md:border-l md:border-white/8 md:pl-5 mt-4 md:mt-0">
                            <p className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-3">Connections</p>
                            {/* Desktop: vertical list */}
                            <div className="hidden md:flex flex-col gap-1.5">
                                {connectedNodes.map(cn => (
                                    <div key={cn.id} className="flex items-center gap-2 text-white/40 text-xs py-0.5">
                                        <span className="w-1 h-1 bg-white/20 shrink-0" />
                                        <span className="leading-snug">{cn.title}</span>
                                    </div>
                                ))}
                                {node.connections.length > 6 && (
                                    <div className="text-white/20 text-[9px] mt-1 pl-3">
                                        +{node.connections.length - 6} more
                                    </div>
                                )}
                            </div>
                            {/* Mobile: horizontal scrolling strip */}
                            <div className="flex md:hidden gap-2 overflow-x-auto pb-1 -mx-2 px-2"
                                style={{ scrollbarWidth: 'none' }}>
                                {connectedNodes.map(cn => (
                                    <div
                                        key={cn.id}
                                        className="flex-shrink-0 border border-white/10 px-2.5 py-1.5 text-white/35 text-[10px] leading-snug max-w-[120px]"
                                    >
                                        <div className="truncate">{cn.title}</div>
                                    </div>
                                ))}
                                {node.connections.length > 6 && (
                                    <div className="flex-shrink-0 border border-white/6 px-2.5 py-1.5 text-white/20 text-[10px]">
                                        +{node.connections.length - 6}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwipePanel>
    );
}
