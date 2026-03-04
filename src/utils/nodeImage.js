// utils/nodeImage.js
// Resolves node images — real images as-is, fallback to typographic SVG.

import { CATEGORY_RGB_STRING } from './colors';

/**
 * Returns the resolved image src for a node.
 * If the node has a real image (not picsum), returns it as-is.
 * Otherwise generates a typographic SVG with the node's title.
 */
export function getNodeImage(node) {
  if (node.image && !node.image.includes('picsum.photos')) {
    return node.image;
  }

  const primaryCat = node.categories?.[0] || 'systems';
  const rgb = CATEGORY_RGB_STRING[primaryCat] || CATEGORY_RGB_STRING.systems;
  const title = (node.title || 'UNTITLED').toUpperCase();
  
  // Split title into lines for better layout (max ~14 chars per line)
  const words = title.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if (current && (current + ' ' + word).length > 14) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) lines.push(current);

  // Calculate font size based on longest line
  const maxLen = Math.max(...lines.map(l => l.length));
  const fontSize = maxLen <= 6 ? 64 : maxLen <= 10 ? 48 : maxLen <= 14 ? 36 : 28;
  const lineHeight = fontSize * 1.15;
  const totalHeight = lines.length * lineHeight;
  const startY = 150 - totalHeight / 2 + fontSize * 0.35;

  // Build text elements
  const textEls = lines.map((line, i) => {
    const y = startY + i * lineHeight;
    const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<text x="200" y="${y}" text-anchor="middle" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-weight="800" font-size="${fontSize}" fill="rgb(${rgb})" opacity="0.9" letter-spacing="0.05em">${escaped}</text>`;
  }).join('\n  ');

  // Category label at bottom
  const catLabel = primaryCat.toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgb(8,8,12)" stop-opacity="1"/>
      <stop offset="100%" stop-color="rgb(${rgb})" stop-opacity="0.06"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <rect x="0" y="0" width="3" height="300" fill="rgb(${rgb})" opacity="0.4"/>
  ${textEls}
  <text x="388" y="288" text-anchor="end" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-weight="500" font-size="10" fill="rgb(${rgb})" opacity="0.4" letter-spacing="0.15em">${catLabel}</text>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
