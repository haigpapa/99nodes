import { useRef, useEffect, useState, useCallback } from 'react';
import useConstellationStore from '../store/useConstellationStore';
import { CATEGORY_RGB, CATEGORY_STYLES, getNodeCategoryRGB } from '../utils/colors';
import { getNodeImage } from '../utils/nodeImage';

export default function ConstellationCanvas({ preview = false }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // Store selectors
    const {
        positionedNodes, edges,
        hoveredNodeId, selectedNodeId, activeFilters, searchQuery, searchMatchIds,
        setHoveredNode, selectNode, clearSelection,
        hasStarted, activePanel,
        enterProject, setActivePanel,
        viewMode
    } = useConstellationStore();

    // Local state for interaction
    const transformRef = useRef({ x: 0, y: 0, scale: 0.6 }); // Start zoomed out
    const targetTransformRef = useRef({ x: 0, y: 0, scale: 0.6 }); // For smooth damping
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const imagesRef = useRef(new Map());
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [tooltip, setTooltip] = useState(null); // { x, y, title, subtitle, color }
    const [hintVisible, setHintVisible] = useState(true); // scroll hint auto-hide
    // Mobile "tap to focus" mode
    const [mobileFocused, setMobileFocused] = useState(false);
    const [mobileHintVisible, setMobileHintVisible] = useState(false);
    const mobileHasDragged = useRef(false);
    const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 768);
    const bloomProgress = useRef(0);  // 0 = not started, 1 = fully revealed
    const prevHasStarted = useRef(false);
    const haloPhase = useRef(0);  // For "You Are Here" pulsing animation
    const velocityRef = useRef({ vx: 0, vy: 0 });  // For drag momentum
    const lastDragTime = useRef(0);
    const momentumFrame = useRef(null);
    const tabVisible = useRef(true);  // Track tab visibility for perf

    // ── Aspect-ratio-aware node dimensions ────────────────────────────────
    // Target areas per tier — exaggerated contrast for visual hierarchy
    const TIER_AREA = { 1: 110 * 82 * 1.3, 2: 80 * 60, 3: 60 * 45 * 0.8 };
    const TIER_BRIGHTNESS = { 1: 1.0, 2: 0.82, 3: 0.62 };
    // Parallax depth multipliers — tier 1 is "closest", tier 3 is "furthest back"
    // Offset is applied on top of the main transform so tier 3 lags behind slightly
    const TIER_PARALLAX = { 1: 0.0, 2: 0.04, 3: 0.09 }; // fraction of pan offset to subtract
    const getNodeDims = (node) => {
        const area = TIER_AREA[node.tier] || TIER_AREA[3];
        const img = imagesRef.current.get(node.id);
        if (img && img.naturalWidth && img.naturalHeight) {
            const aspect = img.naturalWidth / img.naturalHeight;
            // w * h = area, w/h = aspect → w = sqrt(area * aspect), h = sqrt(area / aspect)
            const w = Math.sqrt(area * aspect);
            const h = Math.sqrt(area / aspect);
            return { w, h };
        }
        // Fallback: original fixed 4:3-ish ratio
        return {
            w: node.tier === 1 ? 110 : node.tier === 2 ? 80 : 60,
            h: node.tier === 1 ? 82 : node.tier === 2 ? 60 : 45,
        };
    };

    // Auto-zoom when selection changes
    const prevTransformRef = useRef(null); // Remember pre-zoom camera to restore on deselect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (!selectedNodeId) {
            // Zoom back out to previous view
            if (prevTransformRef.current) {
                targetTransformRef.current = { ...prevTransformRef.current };
                prevTransformRef.current = null;
                requestAnimationFrame(renderFrame);
            }
            return;
        }

        const node = positionedNodes.find(n => n.id === selectedNodeId);
        if (node) {
            // Save current camera position before zooming in (only on first selection)
            if (!prevTransformRef.current) {
                prevTransformRef.current = { ...transformRef.current };
            }

            const rect = canvas.getBoundingClientRect();

            // Node base dimensions (aspect-ratio-aware)
            const dims = getNodeDims(node);
            let baseW = dims.w;
            let baseH = dims.h;

            // The multiplier we use in the render loop for selected nodes
            let enlargedW = baseW * 4.5;
            let enlargedH = baseH * 4.5;

            // Plunge camera & full-bleed scaling
            // Measure actual UI element heights for precise centering
            const filterBar = document.querySelector('[data-filterbar]') || document.querySelector('.fixed.top-0');
            const topHeaderSpace = filterBar ? filterBar.getBoundingClientRect().height + 16 : 56;
            // NodeCard is ~280px on desktop, ~240px on mobile
            const bottomPanelSpace = window.innerWidth < 768 ? 240 : 280;
            const availableHeight = Math.max(200, rect.height - topHeaderSpace - bottomPanelSpace);
            const availableWidth = Math.max(200, rect.width - 80);

            // Calculate exact zoom scale required to fit the enlarged image in the available space
            const scaleY = availableHeight / enlargedH;
            const scaleX = availableWidth / enlargedW;
            const targetScale = Math.min(scaleX, scaleY, 4.0); // Don't exceed maximum zoom capability

            // Center horizontally, and perfectly vertically within the 'available' space slot
            const cx = rect.width / 2;
            const targetCy = topHeaderSpace + (availableHeight / 2);

            // Account for parallax: the rendered position shifts based on camera pan
            // For tier 1 (parallax=0) this has no effect; for tier 2/3 it corrects the offset
            const pf = TIER_PARALLAX[node.tier] || 0;
            // Solve: targetX = cx - (node.x + (-targetX * pf) / targetScale) * targetScale
            // => targetX = cx - node.x * targetScale + targetX * pf
            // => targetX * (1 - pf) = cx - node.x * targetScale
            // => targetX = (cx - node.x * targetScale) / (1 - pf)
            const rawTx = cx - node.x * targetScale;
            const rawTy = targetCy - node.y * targetScale;

            targetTransformRef.current = {
                scale: targetScale,
                x: rawTx / (1 - pf),
                y: rawTy / (1 - pf)
            };
            requestAnimationFrame(renderFrame);
        }
    }, [selectedNodeId, positionedNodes]);

    // Bloom entrance animation: when hasStarted transitions false→true, animate nodes in
    useEffect(() => {
        if (hasStarted && !prevHasStarted.current) {
            prevHasStarted.current = true;
            const duration = 1200; // ms
            const start = performance.now();
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);
            const animate = (now) => {
                const progress = Math.min(1, (now - start) / duration);
                bloomProgress.current = easeOut(progress);
                requestAnimationFrame(renderFrame);
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
        if (!hasStarted) prevHasStarted.current = false;
    }, [hasStarted]);

    // Helper: check if node is visible/active
    const isVisible = (node) => {
        // When searching, use tag-based fuzzy matching from the store
        if (searchQuery && searchQuery.trim().length >= 2) {
            return searchMatchIds.has(node.id);
        }
        // Otherwise, use category filters
        return activeFilters.length === 0 || node.categories.some(c => activeFilters.includes(c));
    };

    const isActive = (nodeId) => {
        if (!hoveredNodeId && !selectedNodeId) return true;
        const focusId = hoveredNodeId || selectedNodeId;
        if (nodeId === focusId) return true;
        return edges.some(e =>
            (e.source === focusId && e.target === nodeId) ||
            (e.target === focusId && e.source === nodeId)
        );
    };

    // Preload images — use node.id as cache key, getNodeImage() as src
    useEffect(() => {
        positionedNodes.forEach(node => {
            if (!imagesRef.current.has(node.id)) {
                const img = new Image();
                img.src = getNodeImage(node);
                img.crossOrigin = 'anonymous';
                img.onload = () => setImagesLoaded(prev => prev + 1);
                imagesRef.current.set(node.id, img);
            }
        });
    }, [positionedNodes]);

    // Keyboard navigation
    useEffect(() => {
        if (!hasStarted) return;
        const onKey = (e) => {
            // Escape: deselect node (clears both panel + selection in one press)
            if (e.key === 'Escape') {
                const { activePanel, selectedNodeId } = useConstellationStore.getState();
                if (selectedNodeId || activePanel) { clearSelection(); return; }
            }
            // Enter: when a node is selected and it's tier 1, enter the project
            if (e.key === 'Enter' && selectedNodeId) {
                const node = positionedNodes.find(n => n.id === selectedNodeId);
                if (node?.tier === 1) enterProject(node.id);
                return;
            }
            // Arrow keys: traverse connections of selected node
            if ((e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') && selectedNodeId) {
                e.preventDefault();
                const node = positionedNodes.find(n => n.id === selectedNodeId);
                if (!node?.connections?.length) return;
                const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
                const currentIdx = node.connections.indexOf(hoveredNodeId);
                const nextIdx = forward
                    ? (currentIdx + 1) % node.connections.length
                    : (currentIdx - 1 + node.connections.length) % node.connections.length;
                selectNode(node.connections[nextIdx]);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [hasStarted, selectedNodeId, hoveredNodeId, positionedNodes]);


    const getNodeColor = getNodeCategoryRGB;

    // Main Draw Loop
    const renderFrame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Skip rendering if tab is hidden
        if (tabVisible.current === false) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Smooth Interpolation (Lerp)
        const t = transformRef.current;
        const tgt = targetTransformRef.current;

        // Lerp factor
        const alpha = 0.1;

        if (Math.abs(t.x - tgt.x) > 0.1 || Math.abs(t.y - tgt.y) > 0.1 || Math.abs(t.scale - tgt.scale) > 0.001) {
            t.x += (tgt.x - t.x) * alpha;
            t.y += (tgt.y - t.y) * alpha;
            t.scale += (tgt.scale - t.scale) * alpha;
            requestAnimationFrame(renderFrame); // Keep animating if moving
        }

        // Handle Resize
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        // Clear
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, rect.width, rect.height);

        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.scale(t.scale, t.scale);

        // Draw Edges (reuse cached map to avoid per-frame allocation)
        if (!renderFrame._nodeMap || renderFrame._nodeMapSrc !== positionedNodes) {
            renderFrame._nodeMap = new Map(positionedNodes.map(n => [n.id, n]));
            renderFrame._nodeMapSrc = positionedNodes;
        }
        const nodeMap = renderFrame._nodeMap;
        edges.forEach(edge => {
            const src = nodeMap.get(edge.source);
            const tgt = nodeMap.get(edge.target);
            if (!src || !tgt) return;

            const isSrcActive = isActive(src.id);
            const isTgtActive = isActive(tgt.id);
            const isHighlighted = isSrcActive && isTgtActive &&
                (src.id === (hoveredNodeId || selectedNodeId) || tgt.id === (hoveredNodeId || selectedNodeId));

            let opacity = 0.15;
            let edgeColor = '255, 255, 255';
            if (hoveredNodeId || selectedNodeId) {
                if (isHighlighted) {
                    opacity = 0.5;
                    const focusNode = nodeMap.get(hoveredNodeId || selectedNodeId);
                    const c = getNodeColor(focusNode);
                    edgeColor = `${c.r}, ${c.g}, ${c.b}`;
                } else {
                    opacity = 0.05;
                }
            }

            // Apply parallax to edge endpoints so lines match rendered node positions
            const srcPF = TIER_PARALLAX[src.tier] || 0;
            const tgtPF = TIER_PARALLAX[tgt.tier] || 0;
            const srcX = src.x + (-t.x * srcPF) / t.scale;
            const srcY = src.y + (-t.y * srcPF) / t.scale;
            const tgtX = tgt.x + (-t.x * tgtPF) / t.scale;
            const tgtY = tgt.y + (-t.y * tgtPF) / t.scale;

            ctx.beginPath();
            ctx.moveTo(srcX, srcY);
            ctx.lineTo(tgtX, tgtY);
            ctx.strokeStyle = `rgba(${edgeColor}, ${opacity})`;
            ctx.lineWidth = (isHighlighted ? 2.5 : 1.2) / t.scale;
            ctx.stroke();
        });

        // Draw Nodes — selected node drawn last (skip sort, just defer)
        let deferredNode = null;
        let deferredIdx = -1;
        positionedNodes.forEach((node, idx) => {
            if (node.id === selectedNodeId) { deferredNode = node; deferredIdx = idx; return; }
            const visible = isVisible(node);
            const active = isActive(node.id);

            // Bloom entrance: stagger each node so they animate in as a wave
            const stagger = bloomProgress.current < 1
                ? Math.min(1, Math.max(0, (bloomProgress.current - (idx / positionedNodes.length) * 0.4) / 0.6))
                : 1;
            // In preview mode, show all nodes at full opacity so the intro overlay can peek at them
            const bloomAlpha = (hasStarted ? stagger : (preview ? 1 : 0));
            const bloomScale = 0.3 + bloomAlpha * 0.7;
            if (bloomAlpha <= 0.01) return; // Not yet revealed

            let opacity = TIER_BRIGHTNESS[node.tier] || 1.0;
            if (!visible) opacity = 0.06;
            else if (!active) opacity = 0.2;
            if (activePanel && activePanel !== 'node') opacity *= 0.3;
            opacity *= bloomAlpha;

            ctx.globalAlpha = opacity;

            // Dimensions (aspect-ratio-aware)
            const dims = getNodeDims(node);
            let w = dims.w;
            let h = dims.h;

            // ── Depth parallax: tier 3 nodes are "further back" and lag behind pan ──
            // We temporarily restore, apply parallax offset, then draw
            const parallaxFactor = TIER_PARALLAX[node.tier] || 0;
            const parallaxOffsetX = -t.x * parallaxFactor;
            const parallaxOffsetY = -t.y * parallaxFactor;
            // These are in world-space, so divide by scale to get canvas-space shift
            const px = parallaxOffsetX / t.scale;
            const py = parallaxOffsetY / t.scale;
            // nodeX/nodeY = world coords + parallax shift (will be scaled by ctx transform)
            const nx = node.x + px;
            const ny = node.y + py;

            // Scale up selected node dramatically
            if (node.id === selectedNodeId) {
                w *= 4.5;
                h *= 4.5;
            } else if (node.id === hoveredNodeId) {
                // Pre-click hover state (+10% scale)
                w *= 1.1;
                h *= 1.1;
            }

            // Apply bloom scale during entrance animation
            const bw = w * bloomScale;
            const bh = h * bloomScale;

            // Draw Image - SHARP CORNERS (rect)
            const img = imagesRef.current.get(node.id);
            if (img && img.complete) {
                // Draw image without expensive ctx.filter — use globalAlpha for dimming instead
                ctx.drawImage(img, nx - bw / 2, ny - bh / 2, bw, bh);
            } else {
                ctx.fillStyle = '#222';
                ctx.fillRect(nx - bw / 2, ny - bh / 2, bw, bh);
            }

            // Draw Border (category-colored on hover/select)
            if ((node.id === hoveredNodeId || node.id === selectedNodeId) && visible) {
                const c = getNodeColor(node);
                ctx.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
                ctx.lineWidth = (node.id === selectedNodeId ? 2.5 : 1.5) / t.scale;
                ctx.strokeRect(nx - bw / 2, ny - bh / 2, bw, bh);
            }

            // ── "You Are Here" pulsing halo for selected node ─────────────
            if (node.id === selectedNodeId && visible) {
                const c = getNodeColor(node);
                const pulseAlpha = 0.15 + 0.15 * Math.sin(haloPhase.current);
                const haloExpand = 8 / t.scale;
                ctx.save();
                ctx.globalAlpha = pulseAlpha;
                ctx.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
                ctx.lineWidth = 2 / t.scale;
                ctx.setLineDash([6 / t.scale, 4 / t.scale]);
                ctx.strokeRect(
                    nx - bw / 2 - haloExpand,
                    ny - bh / 2 - haloExpand,
                    bw + haloExpand * 2,
                    bh + haloExpand * 2
                );
                ctx.setLineDash([]);
                ctx.restore();
            }

            // Draw title label — progressive disclosure
            // Category tag at mid-zoom (1.2+), full title at higher zoom (2.0+)
            const catTagOpacity = Math.min(1, Math.max(0, (t.scale - 1.2) / 0.4)) * (visible ? 1 : 0.2);
            const labelOpacity = Math.min(1, Math.max(0, (t.scale - 2.0) / 0.5)) * (visible ? 1 : 0.3);

            // Show category tag at mid-zoom
            if (catTagOpacity > 0.02 && labelOpacity < 0.5 && node.id !== hoveredNodeId && node.id !== selectedNodeId && !(activePanel && activePanel !== 'node')) {
                ctx.globalAlpha = opacity * catTagOpacity * 0.5;
                const tagSize = Math.max(6, 7 / t.scale);
                ctx.font = `400 ${tagSize}px 'DM Sans', sans-serif`;
                const c = getNodeColor(node);
                ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.6)`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                const catLabel = (node.categories[0] || '').toUpperCase();
                ctx.fillText(catLabel, nx, ny + bh / 2 + 4 / t.scale);
            }

            // Show full title at high zoom
            if (labelOpacity > 0.02 && node.id !== hoveredNodeId && !(activePanel && activePanel !== 'node')) {
                ctx.globalAlpha = opacity * labelOpacity;
                const fontSize = Math.max(8, 10 / t.scale);
                ctx.font = `300 ${fontSize}px 'DM Sans', sans-serif`;
                ctx.fillStyle = node.id === selectedNodeId ? '#FFFFFF' : 'rgba(255,255,255,0.6)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                const label = node.title.length > 22 ? node.title.slice(0, 21) + '…' : node.title;
                ctx.fillText(label, nx, ny + bh / 2 + 5 / t.scale);
            }

            ctx.globalAlpha = 1.0;
        });
        // Draw deferred (selected) node last so it renders on top
        if (deferredNode) {
            const node = deferredNode;
            const idx = deferredIdx;
            const visible = isVisible(node);
            const active = isActive(node.id);
            const stagger = bloomProgress.current < 1
                ? Math.min(1, Math.max(0, (bloomProgress.current - (idx / positionedNodes.length) * 0.4) / 0.6))
                : 1;
            const bloomAlpha = (hasStarted ? stagger : (preview ? 1 : 0));
            const bloomScale = 0.3 + bloomAlpha * 0.7;
            if (bloomAlpha > 0.01) {
                let opacity = TIER_BRIGHTNESS[node.tier] || 1.0;
                if (!visible) opacity = 0.06;
                else if (!active) opacity = 0.2;
                if (activePanel && activePanel !== 'node') opacity *= 0.3;
                opacity *= bloomAlpha;
                ctx.globalAlpha = opacity;
                const dims = getNodeDims(node);
                let w = dims.w * 4.5;
                let h = dims.h * 4.5;
                const parallaxFactor = TIER_PARALLAX[node.tier] || 0;
                const px = (-t.x * parallaxFactor) / t.scale;
                const py = (-t.y * parallaxFactor) / t.scale;
                const nx = node.x + px;
                const ny = node.y + py;
                const bw = w * bloomScale;
                const bh = h * bloomScale;
                const img = imagesRef.current.get(node.id);
                if (img && img.complete) {
                    ctx.drawImage(img, nx - bw / 2, ny - bh / 2, bw, bh);
                } else {
                    ctx.fillStyle = '#222';
                    ctx.fillRect(nx - bw / 2, ny - bh / 2, bw, bh);
                }
                if (visible) {
                    const c = getNodeColor(node);
                    ctx.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
                    ctx.lineWidth = 2.5 / t.scale;
                    ctx.strokeRect(nx - bw / 2, ny - bh / 2, bw, bh);
                    const pulseAlpha = 0.15 + 0.15 * Math.sin(haloPhase.current);
                    const haloExpand = 8 / t.scale;
                    ctx.globalAlpha = pulseAlpha;
                    ctx.setLineDash([6 / t.scale, 4 / t.scale]);
                    ctx.strokeRect(nx - bw / 2 - haloExpand, ny - bh / 2 - haloExpand, bw + haloExpand * 2, bh + haloExpand * 2);
                    ctx.setLineDash([]);
                }
                ctx.globalAlpha = 1.0;
            }
        }

        ctx.restore();

        // ── Mini-map (bird's-eye view) ──────────────────────────────────
        if (positionedNodes.length > 0 && hasStarted && !selectedNodeId) {
            const mmW = 120, mmH = 80;
            const mmX = rect.width - mmW - 16;
            const mmY = rect.height - mmH - 16;
            const pad = 4;

            // Compute bounding box of all nodes
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            positionedNodes.forEach(n => {
                if (n.x < minX) minX = n.x;
                if (n.x > maxX) maxX = n.x;
                if (n.y < minY) minY = n.y;
                if (n.y > maxY) maxY = n.y;
            });
            const rangeX = maxX - minX || 1;
            const rangeY = maxY - minY || 1;
            const scaleMap = Math.min((mmW - pad * 2) / rangeX, (mmH - pad * 2) / rangeY);
            const offX = mmX + pad + ((mmW - pad * 2) - rangeX * scaleMap) / 2;
            const offY = mmY + pad + ((mmH - pad * 2) - rangeY * scaleMap) / 2;

            // Mini-map background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(mmX, mmY, mmW, mmH);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.strokeRect(mmX, mmY, mmW, mmH);

            // Draw node dots — colored by primary category
            positionedNodes.forEach(n => {
                const nx = offX + (n.x - minX) * scaleMap;
                const ny = offY + (n.y - minY) * scaleMap;
                const visible = isVisible(n);
                const c = getNodeColor(n);
                ctx.fillStyle = visible
                    ? `rgba(${c.r},${c.g},${c.b},0.6)`
                    : `rgba(${c.r},${c.g},${c.b},0.1)`;
                ctx.fillRect(nx - 1, ny - 1, 2, 2);
            });

            // Draw viewport rectangle
            const vx1 = (0 - t.x) / t.scale;
            const vy1 = (0 - t.y) / t.scale;
            const vx2 = (rect.width - t.x) / t.scale;
            const vy2 = (rect.height - t.y) / t.scale;
            const vrx = offX + (vx1 - minX) * scaleMap;
            const vry = offY + (vy1 - minY) * scaleMap;
            const vrw = (vx2 - vx1) * scaleMap;
            const vrh = (vy2 - vy1) * scaleMap;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 1;
            ctx.strokeRect(
                Math.max(mmX, vrx), Math.max(mmY, vry),
                Math.min(vrw, mmW), Math.min(vrh, mmH)
            );
        }

        // Advance halo animation
        if (selectedNodeId) {
            haloPhase.current += 0.05;
            requestAnimationFrame(renderFrame);
        }
    };

    // ── Drag momentum with friction ─────────────────────────────────────
    const applyMomentum = useCallback(() => {
        const v = velocityRef.current;
        const friction = 0.92;
        v.vx *= friction;
        v.vy *= friction;
        if (Math.abs(v.vx) < 0.1 && Math.abs(v.vy) < 0.1) {
            momentumFrame.current = null;
            return;
        }
        targetTransformRef.current.x += v.vx;
        targetTransformRef.current.y += v.vy;
        transformRef.current.x += v.vx;
        transformRef.current.y += v.vy;
        requestAnimationFrame(renderFrame);
        momentumFrame.current = requestAnimationFrame(applyMomentum);
    }, []);

    // Auto-hide scroll hint after 12s
    useEffect(() => {
        if (!hasStarted) return;
        const timer = setTimeout(() => setHintVisible(false), 12000);
        return () => clearTimeout(timer);
    }, [hasStarted]);

    // ── Tab visibility API (pause rendering when hidden) ────────────
    useEffect(() => {
        const handleVisibility = () => {
            tabVisible.current = !document.hidden;
            if (!document.hidden) requestAnimationFrame(renderFrame);
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    // Trigger draw on state change
    useEffect(() => {
        requestAnimationFrame(renderFrame);
    }, [positionedNodes, edges, hoveredNodeId, selectedNodeId, activeFilters, searchQuery, searchMatchIds, imagesLoaded, activePanel]);

    // ── Shared hit-test ──────────────────────────────────────────────────
    const hitTest = (wx, wy) => {
        const t = transformRef.current;
        for (let i = positionedNodes.length - 1; i >= 0; i--) {
            const node = positionedNodes[i];
            if (!isVisible(node)) continue;
            const dims = getNodeDims(node);
            let w = dims.w;
            let h = dims.h;
            if (node.id === selectedNodeId) { w *= 1.5; h *= 1.5; }
            // Apply same parallax offset as render
            const parallaxFactor = TIER_PARALLAX[node.tier] || 0;
            const px = (-t.x * parallaxFactor) / t.scale;
            const py = (-t.y * parallaxFactor) / t.scale;
            const nx = node.x + px;
            const ny = node.y + py;
            if (wx >= nx - w / 2 && wx <= nx + w / 2 &&
                wy >= ny - h / 2 && wy <= ny + h / 2) {
                return node.id;
            }
        }
        return null;
    };

    // ── Mouse handlers ───────────────────────────────────────────────────
    const getCanvasCoords = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleMouseMove = (e) => {
        if (!hasStarted) return;
        const { x, y } = getCanvasCoords(e);

        if (isDragging.current) {
            const dx = x - startPos.current.x;
            const dy = y - startPos.current.y;
            const now = performance.now();
            const dt = Math.max(1, now - lastDragTime.current);
            velocityRef.current = { vx: dx * (16 / dt), vy: dy * (16 / dt) };
            lastDragTime.current = now;
            targetTransformRef.current.x += dx;
            targetTransformRef.current.y += dy;
            transformRef.current.x += dx;
            transformRef.current.y += dy;
            startPos.current = { x, y };
            requestAnimationFrame(renderFrame);
            return;
        }

        const t = transformRef.current;
        const wx = (x - t.x) / t.scale;
        const wy = (y - t.y) / t.scale;
        const hitId = hitTest(wx, wy);
        if (hitId !== hoveredNodeId) setHoveredNode(hitId);

        // Update tooltip position + content
        if (hitId) {
            const hovered = positionedNodes.find(n => n.id === hitId);
            if (hovered) {
                const c = getNodeColor(hovered);
                setTooltip({
                    x: x + 14, y: y - 10,
                    title: hovered.title,
                    subtitle: hovered.subtitle,
                    color: `rgb(${c.r},${c.g},${c.b})`
                });
            }
        } else {
            setTooltip(null);
        }
    };

    const handleMouseDown = (e) => {
        if (!hasStarted) return;
        isDragging.current = true;
        if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
        velocityRef.current = { vx: 0, vy: 0 };
        const { x, y } = getCanvasCoords(e);
        startPos.current = { x, y };
        lastDragTime.current = performance.now();
        canvasRef.current.dataset.dragStartX = x;
        canvasRef.current.dataset.dragStartY = y;
    };

    const handleMouseUp = (e) => {
        if (!hasStarted) return;
        isDragging.current = false;
        const { x, y } = getCanvasCoords(e);
        const startX = parseFloat(canvasRef.current.dataset.dragStartX || 0);
        const startY = parseFloat(canvasRef.current.dataset.dragStartY || 0);
        const dist = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        if (dist < 5) {
            velocityRef.current = { vx: 0, vy: 0 };
            if (hoveredNodeId) selectNode(hoveredNodeId);
            else clearSelection();
        } else {
            // Apply momentum on release
            momentumFrame.current = requestAnimationFrame(applyMomentum);
        }
    };

    const handleWheel = useCallback((e) => {
        if (!hasStarted) return;
        e.preventDefault();
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const t = transformRef.current;
        const wx = (x - t.x) / t.scale;
        const wy = (y - t.y) / t.scale;
        const scroll = e.deltaY * -1;
        let newScale = t.scale + (scroll * 0.001 * t.scale);
        newScale = Math.max(0.4, Math.min(newScale, 4.0));
        const newTx = x - wx * newScale;
        const newTy = y - wy * newScale;
        targetTransformRef.current = { x: newTx, y: newTy, scale: newScale };
        requestAnimationFrame(renderFrame);
    }, [hasStarted]);

    // Attach wheel listener with { passive: false } to allow preventDefault
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.addEventListener('wheel', handleWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    // ── Touch handlers (mobile) ──────────────────────────────────────────
    const lastPinchDist = useRef(null);
    const lastPinchMid = useRef(null);
    const tapStart = useRef(null);

    const getPinchDist = (touches) => {
        const dx = touches[1].clientX - touches[0].clientX;
        const dy = touches[1].clientY - touches[0].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const getPinchMid = (touches, rect) => ({
        x: ((touches[0].clientX + touches[1].clientX) / 2) - rect.left,
        y: ((touches[0].clientY + touches[1].clientY) / 2) - rect.top,
    });

    const handleTouchStart = (e) => {
        e.preventDefault();
        if (!hasStarted) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        if (e.touches.length === 1) {
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;

            // Mobile: first touch focuses the canvas, subsequent touches can pan/tap
            if (isMobile.current && !mobileFocused) {
                setMobileFocused(true);
                setMobileHintVisible(true);
                mobileHasDragged.current = false;
                tapStart.current = null;
                return; // Don't start drag yet — just focus
            }

            isDragging.current = true;
            startPos.current = { x, y };
            tapStart.current = { x, y, time: Date.now() };
            lastPinchDist.current = null;
        } else if (e.touches.length === 2) {
            isDragging.current = false;
            lastPinchDist.current = getPinchDist(e.touches);
            lastPinchMid.current = getPinchMid(e.touches, rect);
            tapStart.current = null;
        }
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (!hasStarted) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        if (e.touches.length === 2) {
            // Pinch-to-zoom around midpoint
            const newDist = getPinchDist(e.touches);
            const mid = getPinchMid(e.touches, rect);
            if (lastPinchDist.current !== null) {
                const scaleFactor = newDist / lastPinchDist.current;
                const t = transformRef.current;
                const wx = (mid.x - t.x) / t.scale;
                const wy = (mid.y - t.y) / t.scale;
                let newScale = t.scale * scaleFactor;
                // Lock zoom boundaries
                newScale = Math.max(0.4, Math.min(newScale, 4.0));
                // Pan with midpoint delta too
                const pmx = mid.x - (lastPinchMid.current?.x ?? mid.x);
                const pmy = mid.y - (lastPinchMid.current?.y ?? mid.y);
                const newTx = mid.x - wx * newScale + pmx;
                const newTy = mid.y - wy * newScale + pmy;
                transformRef.current = { x: newTx, y: newTy, scale: newScale };
                targetTransformRef.current = { x: newTx, y: newTy, scale: newScale };
                requestAnimationFrame(renderFrame);
            }
            lastPinchDist.current = newDist;
            lastPinchMid.current = mid;
            tapStart.current = null;
        } else if (e.touches.length === 1 && isDragging.current) {
            // 1-finger pan
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            const dx = x - startPos.current.x;
            const dy = y - startPos.current.y;
            targetTransformRef.current.x += dx;
            targetTransformRef.current.y += dy;
            transformRef.current.x += dx;
            transformRef.current.y += dy;
            startPos.current = { x, y };
            requestAnimationFrame(renderFrame);
            // Cancel tap if drifted too far
            if (tapStart.current) {
                const ddx = x - tapStart.current.x;
                const ddy = y - tapStart.current.y;
                if (Math.sqrt(ddx * ddx + ddy * ddy) > 8) tapStart.current = null;
            }
            // Hide mobile hint after first drag gesture
            if (!mobileHasDragged.current) {
                mobileHasDragged.current = true;
                setTimeout(() => setMobileHintVisible(false), 1200);
            }
        }
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        if (!hasStarted) return;
        isDragging.current = false;
        lastPinchDist.current = null;
        lastPinchMid.current = null;

        // Tap = short duration + minimal movement
        if (tapStart.current && (Date.now() - tapStart.current.time) < 300) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const touch = e.changedTouches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const t = transformRef.current;
            const wx = (x - t.x) / t.scale;
            const wy = (y - t.y) / t.scale;
            const hitId = hitTest(wx, wy);
            if (hitId) selectNode(hitId);
            else clearSelection();
        }
        tapStart.current = null;
    };

    // Center Map: reset to default view
    const handleCenterMap = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        clearSelection();
        targetTransformRef.current = { x: 0, y: 0, scale: 0.6 };
        requestAnimationFrame(renderFrame);
    }, [clearSelection]);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full bg-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-crosshair touch-none"
                role="img"
                aria-label="Interactive constellation map of portfolio projects. Drag to explore, scroll to zoom, click nodes to view projects."
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => { isDragging.current = false; setHoveredNode(null); setTooltip(null); }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />
            {/* Hover tooltip — left border tinted with node's category color */}
            {tooltip && (
                <div
                    className="fixed pointer-events-none z-30"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        fontFamily: '"DM Sans", sans-serif',
                        animation: 'fadeIn 0.1s ease-out',
                    }}
                >
                    <div
                        className="bg-black/90 border border-white/10 px-3 py-2 max-w-[200px]"
                        style={{ borderLeftColor: tooltip.color, borderLeftWidth: 2 }}
                    >
                        <div className="text-white text-xs font-medium leading-snug">{tooltip.title}</div>
                        <div className="text-white/40 text-[10px] tracking-wide mt-0.5 leading-snug">{tooltip.subtitle}</div>
                    </div>
                </div>
            )}

            {/* Step 10: Clear Escape Route (Close Button) */}
            {selectedNodeId && (
                <button
                    onClick={clearSelection}
                    className="fixed top-24 right-8 z-40 text-white/40 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/10"
                    style={{ animation: 'fadeIn 0.4s ease-out', fontFamily: '"DM Sans", sans-serif' }}
                >
                    <span className="text-[9px] tracking-[0.2em] uppercase">Close</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}

            {/* Center Map button — icon only, tooltip on hover */}
            {hasStarted && !selectedNodeId && !activePanel && (
                <button
                    onClick={handleCenterMap}
                    className="fixed bottom-6 left-6 z-40 text-white/30 hover:text-white/70 transition-all duration-200 p-2 bg-black/50 backdrop-blur-sm border border-white/8 hover:border-white/20"
                    style={{ animation: 'fadeIn 1s ease-out 2s both' }}
                    aria-label="Center map and reset zoom (C)"
                    title="Center map (C)"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                </button>
            )}

            {/* Scroll hint — auto-hides after 12s (desktop only) */}
            {hasStarted && !selectedNodeId && !activePanel && hintVisible && !isMobile.current && (
                <div
                    className="fixed bottom-6 left-0 right-0 text-center pointer-events-none z-30 transition-opacity duration-1000"
                    style={{ animation: 'fadeIn 1s ease-out 2s both' }}
                >
                    <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase"
                        style={{ fontFamily: '"DM Sans", sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        scroll · drag · click
                    </p>
                </div>
            )}

            {/* Mobile bottom-sheet: node preview before entering full ProjectPage */}
            {hasStarted && selectedNodeId && isMobile.current && (() => {
                const selectedNode = positionedNodes.find(n => n.id === selectedNodeId);
                if (!selectedNode) return null;

                const primaryCat = selectedNode.categories?.[0];
                const accent = CATEGORY_STYLES[primaryCat] || { text: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)' };
                return (
                    <div
                        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto"
                        style={{
                            animation: 'mobileSheetUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
                            fontFamily: '"DM Sans", sans-serif',
                        }}
                    >


                        {/* Backdrop gradient so canvas is still legible above */}
                        <div style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.97) 40%)' }} className="px-5 pt-10 pb-6">
                            {/* Drag handle */}
                            <div className="flex justify-center mb-5">
                                <div className="w-8 h-0.5 bg-white/15 rounded-full" />
                            </div>

                            {/* Thumbnail + info */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-16 h-12 flex-shrink-0 overflow-hidden bg-white/5">
                                    {selectedNode.image && (
                                        <img src={selectedNode.image} alt="" className="w-full h-full object-cover opacity-70" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-white text-sm font-medium leading-snug mb-1 truncate">
                                        {selectedNode.title}
                                    </div>
                                    <div className="text-white/35 text-[10px] truncate">{selectedNode.subtitle}</div>
                                </div>
                            </div>

                            {/* Category tag + year */}
                            <div className="flex items-center gap-2 mb-6">
                                <span
                                    className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
                                    style={{ backgroundColor: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}
                                >
                                    {primaryCat}
                                </span>
                                {selectedNode.year && (
                                    <span className="text-white/25 text-[10px] tabular-nums">
                                        <span style={{ opacity: 0.4 }}>{String(selectedNode.year).slice(0, 2)}</span>
                                        <span>{String(selectedNode.year).slice(2)}</span>
                                    </span>
                                )}
                                <span className="text-white/15 text-[10px] ml-auto">
                                    {selectedNode.tier === 1 ? '● tier 1' : selectedNode.tier === 2 ? '◐ tier 2' : '· tier 3'}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                {selectedNode.tier === 1 && (
                                    <button
                                        onClick={() => enterProject(selectedNode.id)}
                                        className="flex-1 py-3 text-[10px] tracking-[0.25em] uppercase text-black bg-white transition-colors"
                                    >
                                        View Project →
                                    </button>
                                )}
                                <button
                                    onClick={clearSelection}
                                    className="py-3 px-5 text-[10px] tracking-[0.2em] uppercase text-white/35 border border-white/10 hover:text-white/60 transition-colors"
                                    style={{ flex: selectedNode.tier === 1 ? '0 0 auto' : '1' }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Mobile: "tap to explore" prompt before focus */}
            {hasStarted && !selectedNodeId && !activePanel && isMobile.current && !mobileFocused && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center py-4 pointer-events-none"
                    style={{ animation: 'fadeIn 1s ease-out 2s both', fontFamily: '"DM Sans", sans-serif' }}
                >
                    <div className="bg-black/70 backdrop-blur-sm border border-white/10 px-5 py-2.5">
                        <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase text-center">
                            tap to explore
                        </p>
                    </div>
                </div>
            )}

            {/* Mobile: "drag to explore" hint shown after focus, fades after first drag */}
            {hasStarted && !selectedNodeId && !activePanel && isMobile.current && mobileFocused && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between"
                    style={{
                        animation: 'fadeIn 0.3s ease-out both',
                        opacity: mobileHintVisible ? 1 : 0,
                        transition: 'opacity 0.8s ease',
                        fontFamily: '"DM Sans", sans-serif',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                        paddingBottom: '16px',
                        paddingTop: '24px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    <p className="text-white/45 text-[10px] tracking-[0.3em] uppercase">
                        drag to explore · pinch to zoom
                    </p>
                    <button
                        onClick={(e) => { e.stopPropagation(); setMobileFocused(false); setMobileHintVisible(false); }}
                        className="text-white/30 hover:text-white/60 transition-colors text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-white/10"
                    >
                        done
                    </button>
                </div>
            )}

        </div>
    );
}
