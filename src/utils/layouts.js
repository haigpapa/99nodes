// Layout 0: Fibonacci spiral
export function spiralLayout(nodes, width, height) {
    const cx = width / 2, cy = height / 2;
    // Previously: width * 1.4, height * 1.1. Increased for more space.
    const rx = width * 2.0, ry = height * 1.5;
    const golden = Math.PI * (3 - Math.sqrt(5));

    return nodes.map((node, i) => {
        // Add more random jitter to angle to break rigidity
        const angle = i * golden + (Math.random() - 0.5) * 0.8;

        // Push nodes further out
        const r = Math.sqrt((i + 1) / nodes.length) * (node.tier === 1 ? 0.4 + 0.5 * Math.random() : 0.6 + 0.6 * Math.random());

        return {
            ...node,
            x: cx + Math.cos(angle) * r * rx + (Math.random() - 0.5) * 150,
            y: cy + Math.sin(angle) * r * ry + (Math.random() - 0.5) * 120
        };
    });
}

// Layout 1: Diagonal river
export function diagonalLayout(nodes, width, height) {
    const sorted = [...nodes].sort((a, b) => a.tier - b.tier);
    // Increased spread
    const W = width * 3.0, H = height * 2.5;
    const ox = -(width * 0.5), oy = -(height * 0.4);

    return sorted.map((node, i) => {
        const t = i / (sorted.length - 1);
        const angle = 0.75 * Math.PI;
        // More drift/scatter
        const scatter = (Math.random() - 0.5) * (node.tier === 1 ? 300 : 500);
        return {
            ...node,
            x: ox + t * W + Math.cos(angle) * scatter + (Math.random() - 0.5) * 100,
            y: oy + t * H + Math.sin(angle) * scatter + (Math.random() - 0.5) * 100
        };
    });
}

// Layout 2: Gravity clusters
export function clusterLayout(nodes, width, height) {
    const centers = [
        { x: 0.1 * width, y: 0.2 * height },
        { x: 0.9 * width, y: 0.1 * height },
        { x: 0.5 * width, y: 0.5 * height }, // Centered cluster
        { x: 1.2 * width, y: 0.6 * height },
        { x: -0.2 * width, y: 0.8 * height },
        { x: 0.8 * width, y: 1.1 * height },
    ];
    return nodes.map((node, i) => {
        const centerIdx = node.tier === 1 ? i % 3 : Math.floor(Math.random() * centers.length);
        const c = centers[centerIdx];
        // Significantly increased spread
        const spread = node.tier === 1 ? 180 : 350;
        return {
            ...node,
            x: c.x + (Math.random() - 0.5) * spread * 2.5,
            y: c.y + (Math.random() - 0.5) * spread * 2.0
        };
    });
}

export const LAYOUTS = [spiralLayout, diagonalLayout, clusterLayout];
