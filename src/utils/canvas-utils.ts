import type { CanvasGrid, Color, Point } from "@/types/pixel-art";

/**
 * Create an empty canvas grid filled with transparent pixels
 */
export const createEmptyCanvas = (width: number, height: number = width): CanvasGrid => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "transparent")
  );
};

/**
 * Bresenham's line algorithm for drawing lines
 */
export const drawLine = (
  grid: CanvasGrid,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: Color
): CanvasGrid => {
  const newGrid = grid.map((row) => [...row]);

  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let x = x0;
  let y = y0;

  while (true) {
    if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
      newGrid[y][x] = color;
    }

    if (x === x1 && y === y1) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return newGrid;
};

/**
 * Midpoint circle algorithm for drawing circles
 */
export const drawCircle = (
  grid: CanvasGrid,
  centerX: number,
  centerY: number,
  radius: number,
  color: Color,
  filled = false
): CanvasGrid => {
  const newGrid = grid.map((row) => [...row]);

  const setPixel = (x: number, y: number) => {
    if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
      newGrid[y][x] = color;
    }
  };

  const drawCirclePoints = (cx: number, cy: number, x: number, y: number) => {
    setPixel(cx + x, cy + y);
    setPixel(cx - x, cy + y);
    setPixel(cx + x, cy - y);
    setPixel(cx - x, cy - y);
    setPixel(cx + y, cy + x);
    setPixel(cx - y, cy + x);
    setPixel(cx + y, cy - x);
    setPixel(cx - y, cy - x);
  };

  if (filled) {
    // Fill circle using horizontal lines
    for (let y = -radius; y <= radius; y++) {
      const x = Math.floor(Math.sqrt(radius * radius - y * y));
      for (let i = -x; i <= x; i++) {
        setPixel(centerX + i, centerY + y);
      }
    }
  } else {
    // Draw circle outline using midpoint algorithm
    let x = 0;
    let y = radius;
    let d = 1 - radius;

    drawCirclePoints(centerX, centerY, x, y);

    while (x < y) {
      if (d < 0) {
        d += 2 * x + 3;
      } else {
        d += 2 * (x - y) + 5;
        y--;
      }
      x++;
      drawCirclePoints(centerX, centerY, x, y);
    }
  }

  return newGrid;
};

/**
 * Draw rectangle/square
 */
export const drawRectangle = (
  grid: CanvasGrid,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: Color,
  filled = false
): CanvasGrid => {
  const newGrid = grid.map((row) => [...row]);

  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);

  if (filled) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
          newGrid[y][x] = color;
        }
      }
    }
  } else {
    // Draw outline
    for (let x = minX; x <= maxX; x++) {
      if (x >= 0 && x < grid[0].length) {
        if (minY >= 0 && minY < grid.length) newGrid[minY][x] = color;
        if (maxY >= 0 && maxY < grid.length) newGrid[maxY][x] = color;
      }
    }
    for (let y = minY; y <= maxY; y++) {
      if (y >= 0 && y < grid.length) {
        if (minX >= 0 && minX < grid[0].length) newGrid[y][minX] = color;
        if (maxX >= 0 && maxX < grid[0].length) newGrid[y][maxX] = color;
      }
    }
  }

  return newGrid;
};

/**
 * Flood fill algorithm (contiguous mode)
 */
export const floodFill = (
  grid: CanvasGrid,
  startX: number,
  startY: number,
  newColor: Color
): CanvasGrid => {
  const gridHeight = grid.length;
  const gridWidth = grid[0]?.length || 0;
  const targetColor = grid[startY]?.[startX];

  if (targetColor === newColor) return grid;
  if (targetColor === undefined) return grid;

  const newGrid = grid.map((row) => [...row]);
  const stack: [number, number][] = [[startX, startY]];

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;

    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) continue;
    if (newGrid[y][x] !== targetColor) continue;

    newGrid[y][x] = newColor;

    stack.push([x + 1, y]);
    stack.push([x - 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }

  return newGrid;
};

/**
 * Global fill - replace all instances of a color
 */
export const globalFill = (
  grid: CanvasGrid,
  targetColor: Color,
  newColor: Color
): CanvasGrid => {
  if (targetColor === newColor) return grid;

  return grid.map((row) =>
    row.map((pixel) => (pixel === targetColor ? newColor : pixel))
  );
};

/**
 * Rotate canvas 90 degrees clockwise
 * Note: For non-square canvases, this swaps width and height
 */
export const rotateClockwise = (grid: CanvasGrid): CanvasGrid => {
  const height = grid.length;
  const width = grid[0]?.length || 0;

  // After 90° clockwise rotation: new width = old height, new height = old width
  const newGrid = createEmptyCanvas(height, width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      newGrid[x][height - 1 - y] = grid[y][x];
    }
  }

  return newGrid;
};

/**
 * Flip canvas horizontally
 */
export const flipHorizontal = (grid: CanvasGrid): CanvasGrid => {
  return grid.map((row) => [...row].reverse());
};

/**
 * Flip canvas vertically
 */
export const flipVertical = (grid: CanvasGrid): CanvasGrid => {
  return [...grid].reverse();
};

/**
 * Extract pixels from selection area
 */
export const extractSelection = (
  grid: CanvasGrid,
  x: number,
  y: number,
  width: number,
  height: number
): CanvasGrid => {
  const selection: CanvasGrid = [];

  for (let dy = 0; dy < height; dy++) {
    const row: Color[] = [];
    for (let dx = 0; dx < width; dx++) {
      const px = x + dx;
      const py = y + dy;
      if (px >= 0 && px < grid[0].length && py >= 0 && py < grid.length) {
        row.push(grid[py][px]);
      } else {
        row.push("transparent");
      }
    }
    selection.push(row);
  }

  return selection;
};

/**
 * Paste pixels at position
 */
export const pastePixels = (
  grid: CanvasGrid,
  pixels: CanvasGrid,
  x: number,
  y: number
): CanvasGrid => {
  const newGrid = grid.map((row) => [...row]);

  for (let dy = 0; dy < pixels.length; dy++) {
    for (let dx = 0; dx < pixels[dy].length; dx++) {
      const px = x + dx;
      const py = y + dy;
      if (px >= 0 && px < grid[0].length && py >= 0 && py < grid.length) {
        const color = pixels[dy][dx];
        if (color !== "transparent") {
          newGrid[py][px] = color;
        }
      }
    }
  }

  return newGrid;
};

/**
 * Clear selection area
 */
export const clearSelection = (
  grid: CanvasGrid,
  x: number,
  y: number,
  width: number,
  height: number
): CanvasGrid => {
  const newGrid = grid.map((row) => [...row]);

  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      const px = x + dx;
      const py = y + dy;
      if (px >= 0 && px < grid[0].length && py >= 0 && py < grid.length) {
        newGrid[py][px] = "transparent";
      }
    }
  }

  return newGrid;
};

/**
 * Check if point is inside polygon (for lasso selection)
 */
export const isPointInPolygon = (point: Point, polygon: Point[]): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

/**
 * Export canvas grid to PNG file
 */
export const exportCanvasToPNG = (
  canvasGrid: CanvasGrid,
  width: number,
  height: number
): void => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Failed to get canvas context");
    return;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = canvasGrid[y]?.[x];
      if (color && color !== "transparent") {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  canvas.toBlob((blob) => {
    if (!blob) {
      console.error("Failed to create blob");
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, -5);
    link.download = `pixelart_${timestamp}.png`;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  }, "image/png");
};


