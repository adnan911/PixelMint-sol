import { CanvasGrid, Layer, Palette } from "../types/pixel-art";

export interface SavedArt {
  id: string;
  title: string;
  // State required to restore editor
  layers: Layer[];
  activeLayerId: string;
  palettes: Palette[];
  activePaletteId: string;
  textObjects: any[]; // Avoid complex type import for now or import it
  
  width: number;
  height: number;
  thumbnail: string; // Base64 image
  createdAt: number;
  updatedAt: number;
  isMinted: boolean;
  mintAddress?: string;
  
  // Legacy support (optional)
  grid?: CanvasGrid; 
}

const STORAGE_KEY = "pixelmint_gallery_v1";

/**
 * Save new or update existing artwork
 */
export const saveArt = (art: SavedArt): void => {
  try {
    const existing = getAllArt();
    const index = existing.findIndex((a) => a.id === art.id);
    
    if (index >= 0) {
      existing[index] = { ...art, updatedAt: Date.now() };
    } else {
      existing.unshift(art); // Add to top
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Failed to save art:", error);
    // Handle quota exceeded error gracefully if needed
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      alert("Storage full! Please delete some artworks to save new ones.");
    }
  }
};

/**
 * Load specific artwork by ID
 */
export const loadArt = (id: string): SavedArt | null => {
  const all = getAllArt();
  return all.find((a) => a.id === id) || null;
};

/**
 * Get all saved artworks
 */
export const getAllArt = (): SavedArt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to load gallery:", error);
    return [];
  }
};

/**
 * Delete artwork by ID
 */
export const deleteArt = (id: string): void => {
  const existing = getAllArt();
  const filtered = existing.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

/**
 * Mark artwork as minted
 */
export const markAsMinted = (id: string, mintAddress?: string): void => {
  const existing = getAllArt();
  const index = existing.findIndex((a) => a.id === id);
  
  if (index >= 0) {
    existing[index].isMinted = true;
    if (mintAddress) existing[index].mintAddress = mintAddress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
};

/**
 * Generate a thumbnail from grid (Helper function)
 * Takes a grid and returns a base64 string
 */
export const generateThumbnail = (grid: CanvasGrid, width: number, height: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    grid.forEach((row, y) => {
        row.forEach((color, x) => {
            if (color !== 'transparent') {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
            }
        });
    });
    return canvas.toDataURL();
};
