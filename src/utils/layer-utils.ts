import type { Layer, CanvasGrid } from "@/types/pixel-art";
import { createEmptyCanvas } from "./canvas-utils";
import { blendColors } from "./blend-modes";

/**
 * Generate unique layer ID
 */
export function generateLayerId(): string {
  return `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new layer
 * Returns a plain object to avoid property descriptor conflicts
 */
export function createLayer(
  name: string,
  canvasSize: number,
  pixels?: CanvasGrid
): Layer {
  const layer: Layer = {
    id: generateLayerId(),
    name: String(name),
    pixels: pixels || createEmptyCanvas(canvasSize),
    opacity: 100,
    visible: true,
    locked: false,
    blendMode: "normal" as const,
    alphaLock: false,
  };
  return layer;
}

/**
 * Duplicate a layer
 * Returns a plain object to avoid property descriptor conflicts
 */
export function duplicateLayer(layer: Layer): Layer {
  const duplicated: Layer = {
    id: generateLayerId(),
    name: String(`${layer.name} Copy`),
    pixels: layer.pixels.map((row) => row.map((c) => String(c))),
    opacity: Number(layer.opacity),
    visible: Boolean(layer.visible),
    locked: Boolean(layer.locked),
    blendMode: String(layer.blendMode) as Layer["blendMode"],
    alphaLock: Boolean(layer.alphaLock),
  };
  return duplicated;
}

/**
 * Merge all visible layers into a single canvas
 */
export function mergeLayers(layers: Layer[], canvasSize: number): CanvasGrid {
  const result = createEmptyCanvas(canvasSize);
  
  // Process layers from bottom to top
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i];
    
    if (!layer.visible) continue;
    
    for (let y = 0; y < canvasSize; y++) {
      for (let x = 0; x < canvasSize; x++) {
        const baseColor = result[y][x];
        const topColor = layer.pixels[y][x];
        
        result[y][x] = blendColors(
          baseColor,
          topColor,
          layer.blendMode,
          layer.opacity
        );
      }
    }
  }
  
  return result;
}

/**
 * Flatten all layers into a single layer
 */
export function flattenLayers(layers: Layer[], canvasSize: number): Layer {
  const mergedPixels = mergeLayers(layers, canvasSize);
  return createLayer("Merged Layer", canvasSize, mergedPixels);
}

/**
 * Check if a pixel is transparent
 */
export function isTransparent(color: string): boolean {
  return color === "transparent";
}

/**
 * Apply alpha lock: only paint on non-transparent pixels
 */
export function applyAlphaLock(
  layer: Layer,
  x: number,
  y: number,
  newColor: string
): boolean {
  if (!layer.alphaLock) {
    return true; // Allow painting
  }
  
  // Only allow painting if the pixel is not transparent
  return !isTransparent(layer.pixels[y][x]);
}

/**
 * Reorder layers (for drag-and-drop)
 */
export function reorderLayers(
  layers: Layer[],
  fromIndex: number,
  toIndex: number
): Layer[] {
  const result = [...layers];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * Update layer property
 */
export function updateLayer(
  layers: Layer[],
  layerId: string,
  updates: Partial<Layer>
): Layer[] {
  return layers.map((layer) =>
    layer.id === layerId ? { ...layer, ...updates } : layer
  );
}

/**
 * Delete layer
 */
export function deleteLayer(layers: Layer[], layerId: string): Layer[] {
  return layers.filter((layer) => layer.id !== layerId);
}

/**
 * Get layer by ID
 */
export function getLayerById(layers: Layer[], layerId: string): Layer | undefined {
  return layers.find((layer) => layer.id === layerId);
}

/**
 * Get layer index
 */
export function getLayerIndex(layers: Layer[], layerId: string): number {
  return layers.findIndex((layer) => layer.id === layerId);
}
