// Type definitions for pixel art application

export type Color = string; // hex format: "#RRGGBB" or "transparent"

export type Pixel = Color;

export type CanvasGrid = Pixel[][]; // [y][x] = color

export type Tool =
  | "pencil"
  | "eraser"
  | "fill"
  | "eyedropper"
  | "line"
  | "circle"
  | "square"
  | "text"
  | "stamp"
  | "select";

export type FillMode = "contiguous" | "global";

export type BrushMode = "normal" | "rainbow" | "random" | "dither";

export type DitherPattern = "bayer2x2" | "bayer4x4" | "bayer8x8";

export type ShapeStyle = "stroke" | "fill";

export type SymmetryMode = "none" | "horizontal" | "vertical" | "both";

export type PencilSize = 1 | 2 | 3 | 4 | 5;

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion";

export interface Point {
  x: number;
  y: number;
}

export interface TextObject {
  id: string;
  x: number;
  y: number;
  text: string;
  fontFamily: string;
  fontSize: number;
  color: Color;
  width?: number;
  height?: number;
  previewUrl?: string; // Cache for performance
}



export interface AppState {
  canvas: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  canvasSize: number;
  fillMode: FillMode;
  zoom: number;
  pan: Point;
}

export interface Clipboard {
  pixels: CanvasGrid;
  width: number;
  height: number;
}

export interface Layer {
  id: string;
  name: string;
  pixels: CanvasGrid;
  opacity: number; // 0-100
  visible: boolean;
  locked: boolean;
  blendMode: BlendMode;
  alphaLock: boolean;
}

export interface Palette {
  id: string;
  name: string;
  colors: Color[];
}

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}
