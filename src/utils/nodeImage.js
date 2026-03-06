// utils/nodeImage.js
// Resolves node images — real images as-is, fallback to SVG placeholder.

import { CATEGORY_RGB_STRING } from './colors';

/**
 * Returns the resolved image src for a node.
 * If the node has a real image (not picsum), returns it as-is.
 * Otherwise generates an SVG data URI using the node's primary category color.
 */
export function getNodeImage(node) {
  if (node.image && !node.image.includes('picsum.photos')) {
    return node.image;
  }

  const primaryCat = node.categories?.[0] || 'systems';
  const rgb = CATEGORY_RGB_STRING[primaryCat] || CATEGORY_RGB_STRING.systems;
  const title = (node.title || 'UNKNOWN').toUpperCase();
  
  // Calculate text scale based on length so it doesn't break entirely,
  // but we WANT it to stretch (Brutalist style)
  const stretchWidth = Math.max(800, title.length * 90);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.25 0" />
      </filter>
      
      <clipPath id="slice1">
        <rect x="0" y="0" width="800" height="200" />
      </clipPath>
      <clipPath id="slice2">
        <rect x="0" y="200" width="800" height="150" />
      </clipPath>
      <clipPath id="slice3">
        <rect x="0" y="350" width="800" height="250" />
      </clipPath>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="600" fill="#050505"/>
    <rect width="800" height="600" fill="rgb(${rgb})" opacity="0.15"/>
    
    <!-- Deep structural shadow / extruded text -->
    <!-- Using Impact/sans-serif, heavily condensed visually by the viewBox stretching -->
    <g font-family="Impact, 'Helvetica Neue', sans-serif" font-weight="900" font-size="320" text-anchor="middle" letter-spacing="-5">
       
       <!-- Shadow layer (offset down and right) -->
       <text x="420" y="420" textLength="${stretchWidth}" lengthAdjust="spacingAndGlyphs" fill="none" stroke="rgb(${rgb})" stroke-width="4" opacity="0.6">${title}</text>
       
       <!-- Offset glitch layer -->
       <text x="380" y="380" textLength="${stretchWidth}" lengthAdjust="spacingAndGlyphs" fill="rgb(${rgb})" opacity="0.8" clip-path="url(#slice2)">${title}</text>
       
       <!-- Main Sliced Text: off-white/silver -->
       <!-- Slice 1: shifted left -->
       <text x="340" y="400" textLength="${stretchWidth}" lengthAdjust="spacingAndGlyphs" fill="#F0F0F0" clip-path="url(#slice1)">${title}</text>
       
       <!-- Slice 2: shifted right -->
       <text x="460" y="400" textLength="${stretchWidth}" lengthAdjust="spacingAndGlyphs" fill="#FFFFFF" clip-path="url(#slice2)">${title}</text>
       
       <!-- Slice 3: shifted left further -->
       <text x="300" y="400" textLength="${stretchWidth}" lengthAdjust="spacingAndGlyphs" fill="#D0D0D0" clip-path="url(#slice3)">${title}</text>
    </g>

    <!-- Structural Grid Lines (Swiss/Brutalist framing) -->
    <path d="M 0 200 L 800 200 M 0 350 L 800 350 M 400 0 L 400 600" stroke="rgb(${rgb})" stroke-width="3" opacity="0.8" />
    <path d="M 40 40 L 760 40 L 760 560 L 40 560 Z" fill="none" stroke="rgb(${rgb})" stroke-width="2" opacity="0.5" />
    
    <!-- Category Label (Small brutalist badge) -->
    <rect x="40" y="40" width="220" height="60" fill="rgb(${rgb})" />
    <text x="55" y="80" fill="#050505" font-family="monospace" font-size="28" font-weight="bold" letter-spacing="4">${primaryCat.toUpperCase()}</text>
    
    <!-- Technical Metadata Overlay -->
    <text x="50" y="540" fill="rgb(${rgb})" font-family="monospace" font-size="16" letter-spacing="2">SYS_ID: ${Math.random().toString(36).substr(2, 8).toUpperCase()}</text>
    <text x="750" y="540" fill="rgb(${rgb})" font-family="monospace" font-size="16" text-anchor="end" letter-spacing="2">INDEX_${node.id || '00'}</text>

    <!-- Noise Overlay -->
    <rect width="800" height="600" style="pointer-events:none;" filter="url(#noise)"/>
  </svg>`;

  // Needs to handle the fact that some titles might have special characters
  // We use encodeURIComponent for SVGs instead of btoa sometimes, but btoa is fine if we unescape
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}