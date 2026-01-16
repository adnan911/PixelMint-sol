import type { Color, RGB, HSV } from "@/types/pixel-art";

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: Color): RGB {
  if (hex === "transparent") {
    return { r: 0, g: 0, b: 0 };
  }
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return { r, g, b };
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(rgb: RGB): Color {
  const r = Math.round(rgb.r).toString(16).padStart(2, "0");
  const g = Math.round(rgb.g).toString(16).padStart(2, "0");
  const b = Math.round(rgb.b).toString(16).padStart(2, "0");
  
  return `#${r}${g}${b}`;
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(rgb: RGB): HSV {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  let s = 0;
  const v = max;
  
  if (delta !== 0) {
    s = delta / max;
    
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / delta + 2) / 6;
    } else {
      h = ((r - g) / delta + 4) / 6;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/**
 * Convert HSV to RGB
 */
export function hsvToRgb(hsv: HSV): RGB {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  let r = 0, g = 0, b = 0;
  
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert hex to HSV
 */
export function hexToHsv(hex: Color): HSV {
  return rgbToHsv(hexToRgb(hex));
}

/**
 * Convert HSV to hex
 */
export function hsvToHex(hsv: HSV): Color {
  return rgbToHex(hsvToRgb(hsv));
}

/**
 * Shift hue by degrees (for rainbow mode)
 */
export function shiftHue(hex: Color, degrees: number): Color {
  if (hex === "transparent") return hex;
  
  const hsv = hexToHsv(hex);
  hsv.h = (hsv.h + degrees) % 360;
  if (hsv.h < 0) hsv.h += 360;
  
  return hsvToHex(hsv);
}

/**
 * Get random color from array
 */
export function getRandomColor(colors: Color[]): Color {
  if (colors.length === 0) return "#000000";
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Validate hex color
 */
export function isValidHex(hex: string): boolean {
  if (hex === "transparent") return true;
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}
