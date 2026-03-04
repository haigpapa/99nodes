import { create } from 'zustand';

const useConstellationStore = create((set, get) => ({
    // ── Intro State ──────────────────────────────────────
    hasStarted: false,
    startApp: () => set({ hasStarted: true }),

    // ── Filter state ─────────────────────────────────────
    activeFilters: [],          // Array of category keys currently active
    searchQuery: '',            // Text search string
    searchMatchIds: new Set(),  // Set of node IDs matching current search

    toggleFilter: (key) => set((state) => ({
        activeFilters: state.activeFilters.includes(key)
            ? state.activeFilters.filter(k => k !== key)
            : [...state.activeFilters, key],
    })),
    clearFilters: () => set({ activeFilters: [] }),
    setSearchQuery: (query) => {
        const { positionedNodes } = get();
        if (query.trim().length >= 2) {
            import('../utils/search.js').then(({ getMatchingNodeIds }) => {
                const matchIds = getMatchingNodeIds(positionedNodes, query);
                set({ searchQuery: query, searchMatchIds: matchIds });
            });
        } else {
            set({ searchQuery: query, searchMatchIds: new Set() });
        }
    },


    // ── Constellation interaction ─────────────────────────
    hoveredNodeId: null,        // ID of node under cursor
    selectedNodeId: null,       // ID of clicked node (shows NodeCard)
    activePanel: null,          // 'node' | 'about' | 'contact' | null

    setHoveredNode: (id) => set({ hoveredNodeId: id }),

    selectNode: (id) => set((state) => {
        // If clicking same node, deselect
        if (state.selectedNodeId === id) {
            return { selectedNodeId: null, activePanel: null, hoveredNodeId: null };
        }
        // Select new node and show node panel
        return { selectedNodeId: id, activePanel: 'node', hoveredNodeId: null };
    }),

    setActivePanel: (panel) => set({
        activePanel: panel,
        selectedNodeId: panel === 'node' ? get().selectedNodeId : null
    }),

    clearSelection: () => set({ selectedNodeId: null, activePanel: null }),

    // ── Project page navigation ──────────────────────────
    enteredProjectId: null,     // When set, renders ProjectPage instead of constellation

    enterProject: (id) => set({ enteredProjectId: id, selectedNodeId: null }),
    exitProject: () => set({ enteredProjectId: null }),
    navigateProject: (id) => set({ enteredProjectId: id }),  // Jump between projects

    // ── View mode ───────────────────────────────────────
    viewMode: 'map',  // 'map' | 'list'
    setViewMode: (mode) => set({ viewMode: mode }),

    // ── Layout ──────────────────────────────────────────
    windowSize: { w: window.innerWidth, h: window.innerHeight },
    setWindowSize: (w, h) => set({ windowSize: { w, h } }),

    // Computed: generate positioned nodes + edges from raw data
    // Call computeLayout() after windowSize changes
    positionedNodes: [],
    edges: [],
    layoutIndex: Math.floor(Math.random() * 3),  // Picks layout on mount, stays fixed per session

    computeLayout: (rawNodes, layoutFns) => {
        const { windowSize, layoutIndex, activeFilters } = get();
        const { w, h } = windowSize;
        if (w <= 0 || h <= 0 || rawNodes.length === 0) return;

        // Position all nodes using chosen layout algorithm
        const positioned = layoutFns[layoutIndex](rawNodes, w, h);

        // Generate edges from connection arrays (deduplicated)
        const seen = new Set();
        const edgeList = [];
        const nodeMap = new Map(rawNodes.map(n => [n.id, true]));

        rawNodes.forEach(node => {
            node.connections.forEach(targetId => {
                const key = [node.id, targetId].sort().join('--');
                if (!seen.has(key) && nodeMap.has(targetId)) {
                    seen.add(key);
                    edgeList.push({ source: node.id, target: targetId });
                }
            });
        });

        set({ positionedNodes: positioned, edges: edgeList });
    },
}));

export default useConstellationStore;
