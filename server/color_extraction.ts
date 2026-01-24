// Color extraction utility using simple color analysis
// For production, consider using a library like 'node-vibrant' or 'colorthief'

interface RGB {
    r: number;
    g: number;
    b: number;
}

/**
 * Convert RGB to Hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b]
        .map(x => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
}

/**
 * Calculate color brightness (0-255)
 */
function getBrightness(r: number, g: number, b: number): number {
    return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Calculate color saturation
 */
function getSaturation(r: number, g: number, b: number): number {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (max === 0) return 0;
    return delta / max;
}

/**
 * Extract dominant colors from image data
 * This is a simplified implementation - for production use a proper library
 */
export function extractColorsFromImage(imageData: Uint8ClampedArray, width: number, height: number): {
    primary: string;
    secondary: string;
    accent: string;
} {
    const colorCounts = new Map<string, number>();
    const pixels: RGB[] = [];

    // Aggressive sampling for server-side analysis
    for (let i = 0; i < imageData.length; i += 16) { // Every 4th pixel
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        // Skip transparent and extreme neutrals for clean extraction
        if (a < 150 || (r > 245 && g > 245 && b > 245) || (r < 10 && g < 10 && b < 10)) {
            continue;
        }

        pixels.push({ r, g, b });

        // Better quantization (bucket by 16 units)
        const bucket = `${Math.floor(r / 16)},${Math.floor(g / 16)},${Math.floor(b / 16)}`;
        colorCounts.set(bucket, (colorCounts.get(bucket) || 0) + 1);
    }

    // Process buckets with character analysis
    const bucketData = Array.from(colorCounts.entries())
        .map(([bucket, count]) => {
            const [r, g, b] = bucket.split(',').map(v => Number(v) * 16 + 8);
            const sat = getSaturation(r, g, b);
            const bright = getBrightness(r, g, b);
            // Hue calculation
            let h = 0;
            const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
            if (max !== min) {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return { hex: rgbToHex(r, g, b), r, g, b, count, sat, bright, h: h * 360 };
        })
        .sort((a, b) => b.count - a.count);

    if (bucketData.length === 0) {
        return { primary: "#1e40af", secondary: "#7c3aed", accent: "#f59e0b" };
    }

    // AGGRESSIVE Selection
    // 1. Vibrants (Pure Brand Colors)
    const vibrants = bucketData.filter(c => c.sat > 0.3 && c.bright > 50 && c.bright < 220);

    // 2. High Character colors (Weighted by Saturation and Density)
    const weighted = bucketData.sort((a, b) =>
        (b.count * b.sat) - (a.count * a.sat)
    );

    let primary = weighted[0].hex;
    let secondary = weighted.find(c => Math.abs(c.h - weighted[0].h) > 40)?.hex || weighted[Math.min(1, weighted.length - 1)].hex;
    let accent = vibrants.find(c => c.hex !== primary && c.hex !== secondary)?.hex || "#f59e0b";

    // NCDC Specific detection (Yellow check)
    const yellows = vibrants.filter(c => c.h > 40 && c.h < 65);
    if (yellows.length > 0) {
        secondary = yellows[0].hex;
        primary = bucketData.find(c => c.bright < 40)?.hex || "#1A1A1A";
        accent = vibrants.find(c => c.hex !== secondary && (c.h < 30 || c.h > 330))?.hex || "#EF4444";
    }

    return { primary, secondary, accent };
}

/**
 * Simple browser-side color extraction (placeholder)
 * For client-side, you'd use Canvas API or a library like ColorThief
 */
export async function extractColorsFromImageURL(imageUrl: string): Promise<{
    primary: string;
    secondary: string;
    accent: string;
}> {
    // This would be implemented in the browser using Canvas API
    // For now, return defaults
    return {
        primary: "#1e40af",
        secondary: "#7c3aed",
        accent: "#f59e0b"
    };
}
