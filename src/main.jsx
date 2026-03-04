import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import App from './App.jsx'
import useConstellationStore from './store/useConstellationStore.js'

// Syncs URL hash ↔ Zustand store for deep linking
function RouterSync() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enteredProjectId, enterProject, exitProject } = useConstellationStore();

  // URL → Store: on load/back-navigate, read the project from URL
  useEffect(() => {
    const match = location.pathname.match(/^\/project\/(.+)$/);
    if (match) {
      enterProject(match[1]);
    } else if (!match && location.pathname === '/') {
      exitProject();
    }
  }, [location.pathname]);

  // Store → URL: when project changes, update the URL
  useEffect(() => {
    if (enteredProjectId) {
      navigate(`/project/${enteredProjectId}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [enteredProjectId]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <RouterSync />
      <App />
    </HashRouter>
  </StrictMode>,
)
