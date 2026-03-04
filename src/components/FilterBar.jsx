// src/components/FilterBar.jsx
// Nav: works · read · info · contact · ⌕
// Works mode: category pills that expand into a domain-index dropdown
// Search: suggested tag pills on open, fuzzy matching, clickable suggestions

import { useState, useRef, useEffect, useCallback } from 'react';
import { CATEGORIES, NODES } from '../data/nodes.js';
import { getSuggestions } from '../utils/search.js';
import useConstellationStore from '../store/useConstellationStore.js';
import { CATEGORY_STYLES } from '../utils/colors.js';

const FONT = { fontFamily: '"DM Sans", sans-serif' };
const PILL = 'rounded-full transition-all duration-200 border whitespace-nowrap';
const PILL_SM = 'px-2.5 py-1 text-[10px] tracking-wider uppercase';
const PILL_INACTIVE = 'bg-transparent text-white/40 border-white/10 hover:text-white/70 hover:border-white/25';
const PILL_ACTIVE = 'bg-white text-black border-white';

// Tier indicators
const TIER_DOT = { 1: '●', 2: '◐', 3: '·' };

export default function FilterBar({ onOpenInfo, onOpenRead, onOpenContact }) {
    const { activeFilters, toggleFilter, clearFilters, setSearchQuery, selectNode, viewMode, setViewMode } = useConstellationStore();
    const [mode, setMode] = useState('default'); // 'default' | 'works' | 'search' | 'domain-index'
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState(getSuggestions(''));
    const [activeDomain, setActiveDomain] = useState(null); // which domain's dropdown is open
    const [closingDomain, setClosingDomain] = useState(false); // for exit animation
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (mode === 'search' && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [mode]);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (mode !== 'domain-index') return;
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDomainDropdown();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mode]);

    const handleSearchChange = useCallback((e) => {
        const val = e.target.value;
        setSearchText(val);
        setSearchQuery(val);
        setSuggestions(getSuggestions(val));
    }, [setSearchQuery]);

    const handleSuggestionClick = useCallback((tag) => {
        setSearchText(tag);
        setSearchQuery(tag);
        setSuggestions([]);
        inputRef.current?.focus();
    }, [setSearchQuery]);

    const closeAll = useCallback(() => {
        setMode('default');
        setActiveDomain(null);
        setSearchText('');
        setSearchQuery('');
        // Intentionally preserve activeFilters — clicking the logo resets view, not filters
        setSuggestions(getSuggestions(''));
    }, [setSearchQuery]);

    // Animate-out helper — plays exit animation then clears state
    const closeDomainDropdown = useCallback(() => {
        setClosingDomain(true);
        setTimeout(() => {
            setActiveDomain(null);
            setClosingDomain(false);
            setMode('works');
        }, 200);
    }, []);

    // Handle domain pill click — toggle between filter + dropdown
    const handleDomainClick = useCallback((catKey) => {
        if (activeDomain === catKey) {
            // Clicking same domain again → close dropdown, keep filter
            closeDomainDropdown();
        } else {
            // Open dropdown for this domain
            setClosingDomain(false);
            setActiveDomain(catKey);
            setMode('domain-index');
            // Also set the filter so the canvas highlights
            if (!activeFilters.includes(catKey)) {
                toggleFilter(catKey);
            }
        }
    }, [activeDomain, activeFilters, toggleFilter, closeDomainDropdown]);

    // Handle clicking a project in the dropdown
    const handleProjectClick = useCallback((nodeId) => {
        selectNode(nodeId);
        setMode('default');
        setActiveDomain(null);
    }, [selectNode]);

    const hasFilters = activeFilters.length > 0;

    // Get projects for the active domain, sorted by tier then year
    const domainProjects = activeDomain
        ? NODES.filter(n => n.categories.includes(activeDomain))
            .sort((a, b) => a.tier - b.tier || parseInt(b.year) - parseInt(a.year))
        : [];

    return (
        <div data-filterbar className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">

            {/* TITLE */}
            <div className="w-full flex items-center justify-center px-4 pt-3 pb-1.5 pointer-events-auto">
                <button
                    onClick={closeAll}
                    className="text-white font-medium tracking-[0.3em] text-[13px] uppercase select-none hover:text-white/70 transition-colors"
                    style={FONT}
                >
                    PAPAZIAN
                </button>
            </div>

            {/* NAV */}
            <div className="flex items-center gap-1 px-3 pb-2 pointer-events-auto justify-center" style={FONT}>

                {mode === 'search' ? (
                    <div style={{ animation: 'pillExpand 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm" style={{ minWidth: '260px' }}>
                            <SearchIcon />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                placeholder="search anything..."
                                className="flex-1 bg-transparent text-white text-[10px] tracking-wider outline-none placeholder:text-white/20"
                                style={FONT}
                                onKeyDown={e => { if (e.key === 'Escape') closeAll(); }}
                            />
                            {searchText && (
                                <button onClick={() => { setSearchText(''); setSearchQuery(''); setSuggestions(getSuggestions('')); }} className="text-white/20 hover:text-white/40 transition-colors">
                                    <CloseIcon size={9} />
                                </button>
                            )}
                            <button onClick={closeAll} className="text-white/20 hover:text-white/40 transition-colors">
                                <CloseIcon size={9} />
                            </button>
                        </div>
                        {suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2 justify-center max-w-sm" style={{ animation: 'pillExpand 0.2s ease-out' }}>
                                {suggestions.map(tag => (
                                    <button key={tag} onClick={() => handleSuggestionClick(tag)}
                                        className={`${PILL} px-2 py-0.5 text-[9px] tracking-wider ${PILL_INACTIVE}`} style={FONT}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                ) : (mode === 'works' || mode === 'domain-index') ? (
                    <div ref={dropdownRef} className="relative">
                        {/* Category pills row */}
                        <div className="flex items-center gap-1 flex-wrap justify-center"
                            style={{ animation: mode === 'works' && !activeDomain ? 'pillExpand 0.25s cubic-bezier(0.16, 1, 0.3, 1)' : undefined }}>
                            {CATEGORIES.map(cat => {
                                const isActive = activeDomain === cat.key;
                                const isFiltered = activeFilters.includes(cat.key);
                                const accent = CATEGORY_STYLES[cat.key];

                                // Active (dropdown open): use category color as background
                                // Filtered (highlighted on canvas): tinted background, colored text
                                // Default: standard inactive style
                                const pillStyle = isActive
                                    ? { backgroundColor: accent?.bg, borderColor: accent?.border, color: accent?.text }
                                    : isFiltered
                                        ? { backgroundColor: accent ? accent.bg : 'rgba(255,255,255,0.05)', borderColor: accent ? accent.border : 'rgba(255,255,255,0.2)', color: accent?.text || 'rgba(255,255,255,0.7)' }
                                        : {};

                                return (
                                    <button key={cat.key}
                                        onClick={() => handleDomainClick(cat.key)}
                                        className={`${PILL} ${PILL_SM} ${isActive || isFiltered ? 'border' : PILL_INACTIVE}`}
                                        style={{ ...FONT, ...pillStyle }}>
                                        {cat.label}
                                        {isActive && <ChevronDown />}
                                    </button>
                                );
                            })}
                            {hasFilters && !activeDomain && (
                                <button onClick={clearFilters} className={`${PILL} ${PILL_SM} ${PILL_INACTIVE} opacity-50`} style={FONT}>
                                    clear
                                </button>
                            )}
                            <button onClick={closeAll} className={`${PILL} px-1.5 py-1 border-white/10 text-white/20 hover:text-white/40`}>
                                <CloseIcon size={8} />
                            </button>
                        </div>

                        {/* Domain Index Dropdown — with enter + exit animations */}
                        {(mode === 'domain-index' || closingDomain) && activeDomain && (
                            <div
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] max-h-[50vh] overflow-y-auto pointer-events-auto
                                    bg-black/95 backdrop-blur-md border border-white/10"
                                style={{
                                    animation: closingDomain
                                        ? 'dropdownSlideOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards'
                                        : 'dropdownSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    borderTopColor: CATEGORY_STYLES[activeDomain]?.border || 'rgba(255,255,255,0.1)',
                                    fontFamily: '"DM Sans", sans-serif',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'rgba(255,255,255,0.1) transparent',
                                }}
                            >
                                {/* Header — tinted with category color */}
                                <div className="sticky top-0 bg-black/95 backdrop-blur-md border-b border-white/8 px-4 py-3 flex items-center justify-between">
                                    <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: CATEGORY_STYLES[activeDomain]?.text || 'rgba(255,255,255,0.3)' }}>
                                        {CATEGORIES.find(c => c.key === activeDomain)?.label} · {domainProjects.length} projects
                                    </span>
                                    <button
                                        onClick={closeDomainDropdown}
                                        className="text-white/20 hover:text-white/50 transition-colors"
                                    >
                                        <CloseIcon size={8} />
                                    </button>
                                </div>

                                {/* Project list */}
                                <div className="py-1">
                                    {domainProjects.map((node, i) => (
                                        <button
                                            key={node.id}
                                            onClick={() => handleProjectClick(node.id)}
                                            className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors group"
                                        >
                                            {/* Tier dot */}
                                            <span className="text-white/20 text-[10px] w-3 text-center shrink-0">
                                                {TIER_DOT[node.tier] || '·'}
                                            </span>

                                            {/* Title + subtitle */}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white/70 text-xs leading-snug group-hover:text-white transition-colors truncate">
                                                    {node.title}
                                                </div>
                                                <div className="text-white/25 text-[10px] leading-snug truncate mt-0.5">
                                                    {node.subtitle}
                                                </div>
                                            </div>

                                            {/* Year */}
                                            <span className="text-white/15 text-[10px] tracking-wider shrink-0">
                                                {node.year}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                ) : (
                    <>
                        <button onClick={() => setMode('works')}
                            className={`${PILL} ${PILL_SM} ${hasFilters ? 'bg-white/8 text-white/70 border-white/20' : PILL_INACTIVE}`} style={FONT}>
                            {hasFilters ? `works · ${activeFilters.length}` : 'works'}
                        </button>
                        {/* Toggle: always shows the *destination*, not current state */}
                        <button
                            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                            className={`${PILL} ${PILL_SM} ${viewMode === 'list' ? PILL_ACTIVE : PILL_INACTIVE}`}
                            style={FONT}
                        >
                            {viewMode === 'list' ? 'map' : 'list'}
                        </button>
                        <button onClick={onOpenRead} className={`${PILL} ${PILL_SM} ${PILL_INACTIVE}`} style={FONT}>read</button>
                        <button onClick={onOpenInfo} className={`${PILL} ${PILL_SM} ${PILL_INACTIVE}`} style={FONT}>info</button>
                        <button onClick={onOpenContact} className={`${PILL} ${PILL_SM} ${PILL_INACTIVE}`} style={FONT}>contact</button>
                        <button onClick={() => setMode('search')} className={`${PILL} px-2 py-1 ${PILL_INACTIVE} flex items-center`}>
                            <SearchIcon />
                        </button>
                    </>
                )}
            </div>



        </div>
    );
}

function SearchIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 18 18" fill="none" className="text-white/30 flex-shrink-0">
            <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function CloseIcon({ size = 9 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
            <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.3" />
            <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.3" />
        </svg>
    );
}

function ChevronDown() {
    return (
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="ml-1 inline-block">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
