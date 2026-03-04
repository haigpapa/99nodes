// src/utils/search.js
// Semantic search for the 99 Nodes constellation.
// Fuzzy matching so typos ("mashru", "leila", "maqam") still find results.

import { NODE_TAGS, SUGGESTED_TAGS } from '../data/nodes.js';

function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

function fuzzyContains(haystack, needle, maxDist = 1) {
    if (!needle || needle.length < 2) return false;
    const h = haystack.toLowerCase();
    const n = needle.toLowerCase();
    if (h.includes(n)) return true;
    if (n.length <= 6) {
        for (let i = 0; i <= h.length - n.length; i++) {
            if (levenshtein(h.slice(i, i + n.length), n) <= maxDist) return true;
        }
    }
    return h.split(/\s+/).some(word =>
        word.length >= n.length - 1 && levenshtein(word, n) <= maxDist
    );
}

function scoreNode(node, query) {
    if (!query || query.trim().length < 2) return 0;
    const q = query.toLowerCase().trim();
    const tags = NODE_TAGS[node.id] || [];
    let score = 0;

    if (tags.some(t => t.toLowerCase() === q)) score += 100;
    if (tags.some(t => fuzzyContains(t, q, q.length > 5 ? 2 : 1))) score += 60;

    const title = node.title.toLowerCase();
    if (title === q) score += 90;
    if (title.includes(q)) score += 50;
    if (fuzzyContains(title, q, 1)) score += 30;
    if (fuzzyContains(node.subtitle || '', q, 1)) score += 20;
    if (fuzzyContains(node.description || '', q, 1)) score += 15;
    if (node.categories.some(c => fuzzyContains(c, q, 0))) score += 25;
    if (node.year === q) score += 40;
    if (score > 0 && node.tier === 1) score += 10;

    return score;
}

export function searchNodes(nodes, query) {
    if (!query || query.trim().length < 2) return [];
    return nodes
        .map(node => ({ id: node.id, score: scoreNode(node, query) }))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.id);
}

export function getSuggestions(query) {
    if (!query || query.trim().length === 0) return SUGGESTED_TAGS.slice(0, 10);
    const q = query.toLowerCase().trim();
    return SUGGESTED_TAGS
        .filter(tag => tag.toLowerCase().includes(q) || fuzzyContains(tag, q, 1))
        .slice(0, 8);
}

export function getMatchingNodeIds(nodes, query) {
    return new Set(searchNodes(nodes, query));
}
