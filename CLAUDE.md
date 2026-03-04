# 99 Nodes — Claude Code Memory

## What this is
A React + Vite portfolio constellation for Haig Papazian. An interactive full-screen graph of 85 nodes representing a 14-year multidisciplinary creative practice, rendered on HTML Canvas.

## Critical files
- `src/data/nodes.js` — ALL content. Edit here to add nodes or update text/images.
- `src/store/useConstellationStore.js` — ALL global state (Zustand).
- `src/utils/layouts.js` — 3 spatial layout algorithms.

## Architecture rules
- Canvas is rendered by ConstellationCanvas.jsx using native 2D API. No D3, no SVG, no libraries.
- State lives in Zustand store only. No Context, no Redux, no prop drilling beyond one level.
- Two UI modes: constellation (default) and project page. App.jsx toggles between them based on enteredProjectId.
- All node data in src/data/nodes.js — single source of truth. No data in components.

## Adding a node
1. Add entry to NODES array in src/data/nodes.js
2. Add connections to/from that node in other nodes' connections arrays
3. Optionally add to LONG_DESCRIPTIONS object for full project page content
4. No code changes needed anywhere else

## Replacing placeholder images
Change the `image` field on any node to a real URL. Picsum placeholder: `https://picsum.photos/seed/{node-id}/400/300`

## Style rules
- Font: DM Sans only
- Colors: white at opacity variants on black only (#000000)
- No Tailwind color classes — use white/N opacity (e.g. text-white/60)
- All animations defined in src/index.css as @keyframes

## Deployment
`npm run build` → `dist/` folder → deploy to Netlify/Vercel/GitHub Pages (static, no server needed)
