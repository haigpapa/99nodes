// utils/colors.js
// Single source of truth for the category color palette used across the app.

/**
 * Raw RGB values per category — used by ConstellationCanvas for ctx drawing.
 */
export const CATEGORY_RGB = {
    music: { r: 251, g: 191, b: 36 },
    words: { r: 56, g: 189, b: 248 },
    images: { r: 251, g: 113, b: 133 },
    code: { r: 52, g: 211, b: 153 },
    spaces: { r: 167, g: 139, b: 250 },
    systems: { r: 251, g: 146, b: 60 },
};

/**
 * CSS-ready style variants per category — used by FilterBar, ProjectPage, mobile sheets.
 * Each entry has: { color, text, bg, border }
 */
export const CATEGORY_STYLES = Object.fromEntries(
    Object.entries(CATEGORY_RGB).map(([key, { r, g, b }]) => [
        key,
        {
            color: `rgb(${r},${g},${b})`,
            text: `rgb(${r},${g},${b})`,
            bg: `rgba(${r},${g},${b},0.12)`,
            border: `rgba(${r},${g},${b},0.35)`,
        },
    ])
);

/**
 * Ordered list for rendering dots/legends — used by IntroOverlay.
 */
export const CATEGORY_LIST = [
    { key: 'music', label: 'music' },
    { key: 'words', label: 'words' },
    { key: 'images', label: 'images' },
    { key: 'code', label: 'code' },
    { key: 'spaces', label: 'spaces' },
    { key: 'systems', label: 'systems' },
].map(c => ({ ...c, color: CATEGORY_STYLES[c.key].color }));

/**
 * Comma-separated RGB string per category — used by nodeImage.js SVG generation.
 */
export const CATEGORY_RGB_STRING = Object.fromEntries(
    Object.entries(CATEGORY_RGB).map(([key, { r, g, b }]) => [key, `${r},${g},${b}`])
);

/**
 * Helper: get the RGB object for a node's primary category.
 */
export function getNodeCategoryRGB(node) {
    const cat = node?.categories?.[0];
    return CATEGORY_RGB[cat] || { r: 255, g: 255, b: 255 };
}

/**
 * Helper: get the CSS style object for a node's primary category.
 */
export function getNodeCategoryStyle(node) {
    const cat = node?.categories?.[0];
    return CATEGORY_STYLES[cat] || { color: 'rgba(255,255,255,0.5)', text: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)' };
}
