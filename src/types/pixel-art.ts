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
  | "marquee"
  | "lasso"
  | "hand"
  | "move";

export type FillMode = "contiguous" | "global";

export interface Point {
  x: number;
  y: number;
}

export interface Selection {
  active: boolean;
  points: Point[];
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  pixels?: CanvasGrid;
}

export interface AppState {
  canvas: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  canvasSize: number;
  fillMode: FillMode;
  selection: Selection;
  zoom: number;
  pan: Point;
}

export interface Clipboard {
  pixels: CanvasGrid;
  width: number;
  height: number;
}
