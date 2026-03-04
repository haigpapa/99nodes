// utils/nodeImage.js
// Resolves node images — real images as-is, fallback to dithered typographic SVG.

import { CATEGORY_RGB_STRING } from './colors';

/**
 * Returns the resolved image src for a node.
 * If the node has a real image (not picsum), returns it as-is.
 * Otherwise generates a dithered typographic SVG with the node's title.
 */
export function getNodeImage(node) {
  if (node.image && !node.image.includes('picsum.photos')) {
    return node.image;
  }

  const primaryCat = node.categories?.[0] || 'systems';
  const rgb = CATEGORY_RGB_STRING[primaryCat] || CATEGORY_RGB_STRING.systems;
  const title = (node.title || 'UNTITLED').toUpperCase();
  
  // Deterministic seed from node id for consistent randomness
  const seed = hashCode(node.id || title);
  
  // Split title into lines
  const words = title.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if (current && (current + ' ' + word).length > 12) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) lines.push(current);

  // Calculate font size
  const maxLen = Math.max(...lines.map(l => l.length));
  const fontSize = maxLen <= 5 ? 72 : maxLen <= 8 ? 56 : maxLen <= 12 ? 42 : 32;
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = 150 - totalHeight / 2 + fontSize * 0.35;

  // Build text elements with slight random offsets for hand-crafted feel
  const textEls = lines.map((line, i) => {
    const y = startY + i * lineHeight;
    const xOff = ((seed + i * 17) % 7) - 3;
    const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<text x="${200 + xOff}" y="${y}" text-anchor="middle" font-family="'Helvetica Neue','Arial Black',Impact,sans-serif" font-weight="900" font-size="${fontSize}" fill="rgb(${rgb})" letter-spacing="0.08em" filter="url(#rough)">${escaped}</text>`;
  }).join('\n  ');

  // Generate scattered dither dots based on seed
  const dots = [];
  for (let i = 0; i < 120; i++) {
    const px = seededRandom(seed + i * 3) * 400;
    const py = seededRandom(seed + i * 7 + 1) * 300;
    const r = seededRandom(seed + i * 11 + 2) * 1.5 + 0.3;
    const op = seededRandom(seed + i * 13 + 3) * 0.15 + 0.03;
    dots.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(1)}" fill="rgb(${rgb})" opacity="${op.toFixed(2)}"/>`);
  }

  // Horizontal scan lines
  const scanLines = [];
  for (let y = 0; y < 300; y += 4) {
    const op = ((seed + y) % 3 === 0) ? 0.04 : 0.015;
    scanLines.push(`<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="rgb(${rgb})" stroke-width="0.5" opacity="${op}"/>`);
  }

  // Accent bar position varies by seed
  const barY = 20 + (seed % 60);
  const barW = 80 + (seed % 120);
  const barX = 40 + (seed % 280);

  // Year and category
  const year = node.year || '';
  const catLabel = primaryCat.toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="mono"/>
      <feBlend in="SourceGraphic" in2="mono" mode="multiply"/>
    </filter>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgb(6,6,10)"/>
      <stop offset="50%" stop-color="rgb(10,10,16)"/>
      <stop offset="100%" stop-color="rgb(8,8,14)"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <g filter="url(#grain)" opacity="0.7">
    <rect width="400" height="300" fill="transparent"/>
  </g>
  ${scanLines.join('\n  ')}
  ${dots.join('\n  ')}
  <rect x="${barX}" y="${barY}" width="${barW}" height="1.5" fill="rgb(${rgb})" opacity="0.2"/>
  <rect x="0" y="0" width="2.5" height="300" fill="rgb(${rgb})" opacity="0.5"/>
  ${textEls}
  <text x="388" y="20" text-anchor="end" font-family="'Courier New',monospace" font-weight="400" font-size="9" fill="rgb(${rgb})" opacity="0.3" letter-spacing="0.12em">${year}</text>
  <text x="388" y="288" text-anchor="end" font-family="'Courier New',monospace" font-weight="400" font-size="9" fill="rgb(${rgb})" opacity="0.25" letter-spacing="0.15em">${catLabel}</text>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Simple hash for deterministic randomness
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Seeded pseudo-random [0, 1)
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
