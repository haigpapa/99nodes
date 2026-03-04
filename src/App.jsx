import { useEffect } from 'react';
import { NODES } from './data/nodes';
import { LAYOUTS } from './utils/layouts';
import useConstellationStore from './store/useConstellationStore';
import ConstellationCanvas from './components/ConstellationCanvas';
import FilterBar from './components/FilterBar';
import NodeCard from './components/NodeCard';
import ProjectPage from './components/ProjectPage';
import IntroOverlay from './components/IntroOverlay';
import ListView from './components/ListView';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import AdminPanel from './components/admin/AdminPanel';

// Show admin panel when URL is /admin (dev only)
const IS_ADMIN = window.location.pathname === '/admin';

function ConstellationApp() {
  const {
    enteredProjectId,
    selectedNodeId,
    activePanel,
    computeLayout,
    setWindowSize,
    setActivePanel,
    positionedNodes,
    selectNode,
    enterProject,
    exitProject,
    clearSelection,
    startApp,
    hasStarted,
    viewMode
  } = useConstellationStore();

  // Recompute layout on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute layout when window size changes
  const windowSize = useConstellationStore(s => s.windowSize);
  useEffect(() => {
    computeLayout(NODES, LAYOUTS);
  }, [windowSize]);

  // ── Deep links: sync URL hash ↔ state ──────────────────────────────
  // Write state → hash
  useEffect(() => {
    if (enteredProjectId) {
      const node = NODES.find(n => n.id === enteredProjectId);
      const slug = node ? node.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') : enteredProjectId;
      window.history.pushState(null, '', `#/project/${slug}`);
    } else if (selectedNodeId) {
      const node = NODES.find(n => n.id === selectedNodeId);
      const slug = node ? node.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') : selectedNodeId;
      window.history.pushState(null, '', `#/node/${slug}`);
    } else {
      window.history.pushState(null, '', '#/');
    }
  }, [selectedNodeId, enteredProjectId]);

  // Read hash → state on mount + popstate (back button)
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || '#/';
      const projectMatch = hash.match(/^#\/project\/(.+)$/);
      const nodeMatch = hash.match(/^#\/node\/(.+)$/);

      if (projectMatch) {
        const slug = projectMatch[1];
        const node = NODES.find(n => n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') === slug);
        if (node) {
          if (!hasStarted) startApp();
          enterProject(node.id);
        }
      } else if (nodeMatch) {
        const slug = nodeMatch[1];
        const node = NODES.find(n => n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') === slug);
        if (node) {
          if (!hasStarted) startApp();
          selectNode(node.id);
        }
      } else {
        // Hash is #/ — clear everything
        if (enteredProjectId) exitProject();
        if (selectedNodeId) clearSelection();
      }
    };

    // Parse on mount (for direct-link entry)
    if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
      // Delay to let layout compute first
      setTimeout(parseHash, 500);
    }

    // Listen for back/forward
    window.addEventListener('popstate', parseHash);
    return () => window.removeEventListener('popstate', parseHash);
  }, [hasStarted]);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative" style={{ fontFamily: '"DM Sans", sans-serif' }}
      role="application" aria-label="PAPAZIAN — Creative constellation portfolio"
    >

      <IntroOverlay />
      <KeyboardShortcuts />

      {/* Canvas pre-renders dimly behind IntroOverlay — constellation visible as a curtain peek */}
      {!enteredProjectId && !hasStarted && (
        <div className="fixed inset-0 z-[5] pointer-events-none" style={{ opacity: 0.22 }}>
          <ConstellationCanvas preview={true} />
        </div>
      )}

      {!enteredProjectId && (
        <>
          <FilterBar
            onOpenInfo={() => setActivePanel('about')}
            onOpenRead={() => setActivePanel('read')}
            onOpenContact={() => setActivePanel('contact')}
          />
          {/* Cross-fade between map and list views */}
          <div key={viewMode} style={{ animation: 'viewCrossFade 0.22s ease-out both' }}>
            {viewMode === 'list' ? (
              <ListView />
            ) : (
              <ConstellationCanvas />
            )}
          </div>

          {activePanel && <NodeCard />}
        </>
      )}

      {enteredProjectId && <ProjectPage />}
    </div>
  );
}

export default function App() {
  if (IS_ADMIN) return <AdminPanel />;
  return <ConstellationApp />;
}
