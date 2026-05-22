export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, (_m: string, r: string, g: string, b: string) => {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1] || "0", 16),
		g: parseInt(result[2] || "0", 16),
		b: parseInt(result[3] || "0", 16)
	} : null;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h = 0, s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Adapts a base hex color to look good on both dark and light themes,
 * using the "Typify" pill style (translucent background, solid readable text).
 */
export function getAdaptivePillStyles(hex: string, isDarkMode: boolean): { bg: string, text: string } {
	const rgb = hexToRgb(hex);
	if (!rgb) return { bg: hex, text: "var(--text-normal)" };

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

	// Typify style: translucent background
	const bg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;

	// Text color adaptation:
	// In dark mode, if the color is too dark, we lighten it.
	// In light mode, if the color is too bright, we darken it.
	let textLightness = hsl.l;
	if (isDarkMode) {
		textLightness = Math.max(hsl.l, 75); // Ensure it's bright enough to read on dark bg
	}

	const text = `hsl(${hsl.h}, ${hsl.s}%, ${textLightness}%)`;

	return { bg, text };
}

