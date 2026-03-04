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

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgb(8,8,12)" stop-opacity="1"/>
      <stop offset="100%" stop-color="rgb(${rgb})" stop-opacity="0.08"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(${rgb})" stroke-width="0.3" stroke-opacity="0.18"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <rect width="400" height="300" fill="url(#grid)"/>
  <rect x="0" y="0" width="3" height="300" fill="rgb(${rgb})" opacity="0.35"/>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
