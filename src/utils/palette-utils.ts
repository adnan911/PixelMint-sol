import type { Palette, Color } from "@/types/pixel-art";

/**
 * Generate unique palette ID
 */
export function generatePaletteId(): string {
  return `palette_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new palette
 */
export function createPalette(name: string, colors: Color[] = []): Palette {
  return {
    id: generatePaletteId(),
    name,
    colors,
  };
}

/**
 * Default palettes
 */
export const DEFAULT_PALETTES: Palette[] = [
  {
    id: "default",
    name: "Default",
    colors: [
      "#000000", "#FFFFFF", "#FF0000", "#00FF00",
      "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
      "#808080", "#C0C0C0", "#800000", "#008000",
      "#000080", "#808000", "#800080", "#008080",
    ],
  },
  {
    id: "grayscale",
    name: "Grayscale",
    colors: [
      "#000000", "#1A1A1A", "#333333", "#4D4D4D",
      "#666666", "#808080", "#999999", "#B3B3B3",
      "#CCCCCC", "#E6E6E6", "#F2F2F2", "#FFFFFF",
    ],
  },
  {
    id: "pico8",
    name: "PICO-8",
    colors: [
      "#000000", "#1D2B53", "#7E2553", "#008751",
      "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8",
      "#FF004D", "#FFA300", "#FFEC27", "#00E436",
      "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA",
    ],
  },
];

/**
 * Export palette to JSON
 */
export function exportPaletteJSON(palette: Palette): string {
  return JSON.stringify(palette, null, 2);
}

/**
 * Import palette from JSON
 */
export function importPaletteJSON(json: string): Palette | null {
  try {
    const data = JSON.parse(json);
    if (data.name && Array.isArray(data.colors)) {
      return {
        id: generatePaletteId(),
        name: data.name,
        colors: data.colors,
      };
    }
  } catch (e) {
    console.error("Failed to import palette JSON:", e);
  }
  return null;
}

/**
 * Export palette to GPL (GIMP Palette) format
 */
export function exportPaletteGPL(palette: Palette): string {
  let gpl = `GIMP Palette\nName: ${palette.name}\nColumns: 4\n#\n`;
  
  palette.colors.forEach((color) => {
    if (color === "transparent") {
      gpl += "0   0   0   Transparent\n";
    } else {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      gpl += `${r.toString().padStart(3)} ${g.toString().padStart(3)} ${b.toString().padStart(3)} ${color}\n`;
    }
  });
  
  return gpl;
}

/**
 * Import palette from GPL format
 */
export function importPaletteGPL(gpl: string): Palette | null {
  try {
    const lines = gpl.split("\n");
    let name = "Imported Palette";
    const colors: Color[] = [];
    
    for (const line of lines) {
      if (line.startsWith("Name:")) {
        name = line.substring(5).trim();
      } else if (line.match(/^\d+\s+\d+\s+\d+/)) {
        const parts = line.trim().split(/\s+/);
        const r = parseInt(parts[0]);
        const g = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          colors.push(hex);
        }
      }
    }
    
    if (colors.length > 0) {
      return {
        id: generatePaletteId(),
        name,
        colors,
      };
    }
  } catch (e) {
    console.error("Failed to import GPL palette:", e);
  }
  return null;
}

/**
 * Download palette file
 */
export function downloadPalette(palette: Palette, format: "json" | "gpl") {
  const content = format === "json" 
    ? exportPaletteJSON(palette)
    : exportPaletteGPL(palette);
  
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${palette.name}.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Reorder colors in palette
 */
export function reorderPaletteColors(
  palette: Palette,
  fromIndex: number,
  toIndex: number
): Palette {
  const colors = [...palette.colors];
  const [removed] = colors.splice(fromIndex, 1);
  colors.splice(toIndex, 0, removed);
  
  return {
    ...palette,
    colors,
  };
}

/**
 * Add color to palette
 */
export function addColorToPalette(palette: Palette, color: Color): Palette {
  if (palette.colors.includes(color)) {
    return palette;
  }
  
  return {
    ...palette,
    colors: [...palette.colors, color],
  };
}

/**
 * Remove color from palette
 */
export function removeColorFromPalette(palette: Palette, index: number): Palette {
  return {
    ...palette,
    colors: palette.colors.filter((_, i) => i !== index),
  };
}
