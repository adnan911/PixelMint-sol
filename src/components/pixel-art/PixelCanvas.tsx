import React, { useState, useRef, useEffect } from "react";
import { usePixelCanvas } from "@/hooks/use-pixel-canvas";
import type { CanvasGrid, Tool, Color, Point, Selection, FillMode, BrushMode, DitherPattern, PencilSize } from "@/types/pixel-art";
import {
  floodFill,
  globalFill,
  drawLine,
  drawCircle,
  drawRectangle,
} from "@/utils/canvas-utils";
import { shiftHue, getRandomColor } from "@/utils/color-utils";
import { PIXEL_FONTS } from "./FontSelector";

interface EnhancedPixelCanvasProps {
  canvasGrid: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  showRuler?: boolean;
  fillMode: FillMode;
  selection: Selection;
  zoom: number;
  pan: Point;
  brushMode?: BrushMode;
  ditherPattern?: DitherPattern;
  pencilSize?: PencilSize;
  currentFont?: string;
  onPixelChange: (newGrid: CanvasGrid) => void;
  onColorPick: (color: Color) => void;
  onSelectionChange: (selection: Selection) => void;
  onPanChange: (pan: Point) => void;
  currentStamp?: { width: number; height: number; data: CanvasGrid } | null;
  onCanvasInteract?: () => void;
}


// Bayer dither matrices
const BAYER_2X2 = [
  [0, 2],
  [3, 1],
];

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

export const EnhancedPixelCanvas: React.FC<EnhancedPixelCanvasProps> = ({
  canvasGrid,
  currentTool,
  currentColor,
  showGrid,
  showRuler = false,
  fillMode,
  selection,
  zoom,
  brushMode = "normal",
  ditherPattern = "bayer4x4",
  pencilSize = 1,
  currentFont = "jersey-10",
  onPixelChange,
  onColorPick,
  currentStamp,
  onCanvasInteract,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState(16);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);
  const [previewGrid, setPreviewGrid] = useState<CanvasGrid | null>(null);
  const rainbowHueShiftRef = useRef(0);

  // Text Tool State
  const [activeText, setActiveText] = useState<{
    x: number;
    y: number;
    text: string;
    fontSize: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = usePixelCanvas({
    canvasGrid: previewGrid || canvasGrid,
    gridSize: canvasGrid.length > 0 ? canvasGrid[0].length : 0,
    pixelSize: pixelSize * zoom,
    showGrid,
  });

  // Get actual grid dimensions
  const gridHeight = canvasGrid.length;
  const gridWidth = gridHeight > 0 ? canvasGrid[0].length : 0;

  // Helper function to commit text to canvas
  const commitText = async () => {
    if (!activeText || !activeText.text) {
      setActiveText(null);
      return;
    }

    const fontInfo = PIXEL_FONTS.find(f => f.id === currentFont) || PIXEL_FONTS[0];
    const fontSize = activeText.fontSize; // Use exact fontSize from state

    // Extract font name without quotes for loading
    const fontName = fontInfo.family.replace(/"/g, "").split(",")[0].trim();

    // Wait for font to load before rasterizing
    try {
      await document.fonts.load(`${fontSize}px "${fontName}"`);
    } catch (e) {
      console.warn("Font loading failed, using fallback");
    }

    // Rasterize text
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    const fontString = `${fontSize}px "${fontName}", sans-serif`;
    ctx.font = fontString;
    ctx.textBaseline = "top";

    const metrics = ctx.measureText(activeText.text);
    const textWidth = Math.ceil(metrics.width) + 2;
    const textHeight = Math.ceil(fontSize * 1.3);

    tempCanvas.width = textWidth;
    tempCanvas.height = textHeight;

    // Re-apply font after canvas resize (required)
    ctx.font = fontString;
    ctx.textBaseline = "top";
    ctx.fillStyle = currentColor;
    ctx.fillText(activeText.text, 0, 0);

    const newGrid = canvasGrid.map(row => [...row]);
    const imgData = ctx.getImageData(0, 0, textWidth, textHeight);

    for (let py = 0; py < textHeight; py++) {
      for (let px = 0; px < textWidth; px++) {
        const i = (py * textWidth + px) * 4;
        const alpha = imgData.data[i + 3];

        if (alpha > 128) {
          const gridX = activeText.x + px;
          const gridY = activeText.y + py;

          if (gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
            newGrid[gridY][gridX] = currentColor;
          }
        }
      }
    }

    onPixelChange(newGrid);
    setActiveText(null);
  };

  // Helper function to get brush color based on mode
  const getBrushColor = (x: number, y: number, baseColor: Color, isRainbow: boolean = false): Color => {
    if (baseColor === "transparent") return baseColor;

    switch (brushMode) {
      case "rainbow":
        // Increment the hue shift and use the new value
        if (isRainbow) {
          rainbowHueShiftRef.current = (rainbowHueShiftRef.current + 10) % 360;
        }
        return shiftHue(baseColor, rainbowHueShiftRef.current);
      case "random":
        const paletteColors = [
          "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
          "#FF00FF", "#00FFFF", "#FFA500", "#800080"
        ];
        return getRandomColor(paletteColors);
      case "dither":
        const matrix = ditherPattern === "bayer2x2" ? BAYER_2X2 :
          ditherPattern === "bayer8x8" ? BAYER_8X8 : BAYER_4X4;
        const matrixSize = matrix.length;
        const threshold = matrix[y % matrixSize][x % matrixSize];
        const maxThreshold = matrixSize * matrixSize;
        return (threshold / maxThreshold) < 0.5 ? baseColor : "transparent";
      case "normal":
      default:
        return baseColor;
    }
  };

  // Calculate pixel size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const maxWidth = Math.floor((containerWidth - 32) / gridWidth);
        const maxHeight = Math.floor((containerHeight - 32) / gridHeight);
        const newPixelSize = Math.min(maxWidth, maxHeight, 16);
        setPixelSize(Math.max(newPixelSize, 8));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [gridWidth, gridHeight]);

  // Selection Overlay
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (selection.active && selection.bounds) {
      const { x, y, width, height } = selection.bounds;
      const ps = pixelSize * zoom;
      ctx.strokeStyle = "rgba(0, 123, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(x * ps, y * ps, width * ps, height * ps);
      ctx.setLineDash([]);
    }
  }, [selection, pixelSize, zoom]);

  // If tool changes from text, commit any active text
  useEffect(() => {
    if (currentTool !== "text" && activeText) {
      commitText();
    }
  }, [currentTool]);

  const getPixelCoords = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const ps = pixelSize * zoom;
    const x = Math.floor((clientX - rect.left) / ps);
    const y = Math.floor((clientY - rect.top) / ps);
    if (x >= -5 && x < gridWidth + 5 && y >= -5 && y < gridHeight + 5) {
      return { x, y };
    }
    return null;
  };

  const handleStart = (clientX: number, clientY: number) => {
    onCanvasInteract?.();

    if (activeText && currentTool === "text") {
      commitText();
      return;
    }


    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    if (currentTool === "stamp" && currentStamp) {
      // Commit stamp
      const newGrid = canvasGrid.map(row => [...row]);
      for (let y = 0; y < currentStamp.height; y++) {
        for (let x = 0; x < currentStamp.width; x++) {
          const color = currentStamp.data[y][x];
          if (color !== "transparent") {
            const gridX = coords.x + x - Math.floor(currentStamp.width / 2);
            const gridY = coords.y + y - Math.floor(currentStamp.height / 2);
            if (gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
              newGrid[gridY][gridX] = color;
            }
          }
        }
      }
      onPixelChange(newGrid);
      return;
    }

    if (currentTool === "text") {
      setActiveText({
        x: coords.x,
        y: coords.y,
        text: "Text",
        fontSize: 16
      });
      return;
    }

    setStartPoint(coords);
    setIsDrawing(true);

    switch (currentTool) {
      case "fill":
        if (fillMode === "contiguous") {
          const newGrid = floodFill(canvasGrid, coords.x, coords.y, currentColor);
          onPixelChange(newGrid);
        } else {
          const targetColor = canvasGrid[coords.y][coords.x];
          const newGrid = globalFill(canvasGrid, targetColor, currentColor);
          onPixelChange(newGrid);
        }
        setIsDrawing(false);
        break;
      case "eyedropper":
        const pickedColor = canvasGrid[coords.y][coords.x];
        if (pickedColor !== "transparent") onColorPick(pickedColor);
        setIsDrawing(false);
        break;
      case "pencil":
      case "eraser":
        handleDraw(coords);
        break;
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    const coords = getPixelCoords(clientX, clientY);
    setHoverPoint(coords);

    if (!isDrawing || !startPoint) return;
    if (!coords) return;

    switch (currentTool) {
      case "pencil":
      case "eraser":
        handleDraw(coords);
        break;
      case "line":
        setPreviewGrid(drawLine(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor));
        break;
      case "circle":
        const radius = Math.round(Math.sqrt(Math.pow(coords.x - startPoint.x, 2) + Math.pow(coords.y - startPoint.y, 2)));
        setPreviewGrid(drawCircle(canvasGrid, startPoint.x, startPoint.y, radius, currentColor, false));
        break;
      case "square":
        setPreviewGrid(drawRectangle(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor, false));
        break;
    }
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    if (previewGrid) {
      onPixelChange(previewGrid);
      setPreviewGrid(null);
    }
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleDraw = (coords: Point) => {
    const newGrid = canvasGrid.map((row) => [...row]);
    const halfSize = Math.floor(pencilSize / 2);
    const isEraser = currentTool === "eraser";

    for (let dy = -halfSize; dy <= halfSize; dy++) {
      for (let dx = -halfSize; dx <= halfSize; dx++) {
        const targetX = coords.x + dx;
        const targetY = coords.y + dy;
        if (targetX >= 0 && targetX < gridWidth && targetY >= 0 && targetY < gridHeight) {
          if (isEraser) {
            newGrid[targetY][targetX] = "transparent";
          } else {
            // Pass true for rainbow mode to increment hue per pixel
            newGrid[targetY][targetX] = getBrushColor(targetX, targetY, currentColor, brushMode === "rainbow");
          }
        }
      }
    }

    onPixelChange(newGrid);
  };

  // Mouse/Touch Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => handleMove(e.clientX, e.clientY);
  const handleMouseUp = handleEnd;
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 1) return; // Allow gestures pass through
    e.stopPropagation();
    e.preventDefault();
    if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 1) return;
    // e.stopPropagation can't be used with passive events usually, but React events are synthetic.
    // However, we want to prevent the gesture drag.
    e.stopPropagation();
    e.preventDefault();
    if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleEnd();
  };

  const actualPixelSize = pixelSize * zoom;
  const canvasSize = Math.max(gridWidth, gridHeight) * actualPixelSize;
  const currentFontInfo = PIXEL_FONTS.find(f => f.id === currentFont) || PIXEL_FONTS[0];

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative select-none">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="border-2 border-border cursor-crosshair rounded-sm shadow-lg bg-card touch-none"
          style={{
            imageRendering: "pixelated",
            backgroundImage: "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
        <canvas
          ref={overlayCanvasRef}
          width={canvasSize}
          height={canvasSize}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Horizontal Ruler (Top - Inside Canvas) */}
        {showRuler && (
          <div
            className="absolute flex pointer-events-none bg-background/80 border-b border-border"
            style={{
              top: 0,
              left: 0,
              height: 16,
              width: canvasSize,
            }}
          >
            {Array.from({ length: gridWidth }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-[7px] text-foreground/70 font-mono"
                style={{
                  width: actualPixelSize,
                  borderRight: i % 5 === 4 ? "1px solid hsl(var(--border)/0.5)" : "none",
                }}
              >
                {i % 5 === 0 && <span>{i}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Vertical Ruler (Left - Inside Canvas) */}
        {showRuler && (
          <div
            className="absolute flex flex-col pointer-events-none bg-background/80 border-r border-border"
            style={{
              top: 0,
              left: 0,
              width: 16,
              height: canvasSize,
            }}
          >
            {Array.from({ length: gridHeight }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-[7px] text-foreground/70 font-mono"
                style={{
                  height: actualPixelSize,
                  borderBottom: i % 5 === 4 ? "1px solid hsl(var(--border)/0.5)" : "none",
                }}
              >
                {i % 5 === 0 && <span>{i}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Interactive Text Overlay */}
        {activeText && (
          <div
            className="absolute"
            style={{
              left: activeText.x * actualPixelSize,
              top: activeText.y * actualPixelSize,
            }}
          >
            {/* Controls Bar */}
            <div className="flex bg-card border-2 border-border rounded shadow-lg items-center p-1 mb-2 gap-2 absolute -top-12 left-0 z-50 whitespace-nowrap">
              {/* Font Size Input */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-bold">SIZE:</span>
                <input
                  type="number"
                  min="8"
                  max="128"
                  value={Math.round(activeText.fontSize)}
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value);
                    if (!isNaN(newSize) && newSize >= 8) {
                      setActiveText({ ...activeText, fontSize: newSize });
                    }
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="w-14 h-7 text-sm border-2 rounded bg-background text-foreground px-2 font-bold text-center"
                />
              </div>

              <div className="w-px h-5 bg-border"></div>

              {/* Move Handle */}
              <div
                className="cursor-move p-1.5 hover:bg-accent rounded"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startGridX = activeText.x;
                  const startGridY = activeText.y;

                  const onDrag = (moveEvent: MouseEvent) => {
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;
                    const gridDx = Math.round(dx / actualPixelSize);
                    const gridDy = Math.round(dy / actualPixelSize);
                    setActiveText(prev => prev ? ({ ...prev, x: startGridX + gridDx, y: startGridY + gridDy }) : null);
                  };

                  const onUp = () => {
                    window.removeEventListener("mousemove", onDrag);
                    window.removeEventListener("mouseup", onUp);
                  };

                  window.addEventListener("mousemove", onDrag);
                  window.addEventListener("mouseup", onUp);
                }}
                title="Drag to move"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M2 12h20M12 2v20" />
                </svg>
              </div>

              <div className="w-px h-5 bg-border"></div>

              {/* Confirm Button */}
              <button
                onClick={(e) => { e.stopPropagation(); commitText(); }}
                className="bg-green-500 text-white rounded px-2 py-1 text-xs font-bold hover:bg-green-600 flex items-center gap-1"
                title="Confirm Text (Enter)"
              >
                ✓ OK
              </button>
            </div>

            {/* Text Input */}
            <input
              autoFocus
              value={activeText.text}
              onChange={(e) => setActiveText({ ...activeText, text: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  commitText();
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                fontFamily: currentFontInfo.family,
                fontSize: `${activeText.fontSize}px`,
                color: currentColor,
                background: "rgba(255,255,255,0.9)",
                border: "2px dashed #333",
                outline: "none",
                minWidth: "60px",
                padding: "2px 4px",
              }}
            />
          </div>
        )}

        {/* Stamp Preview */}
        {currentTool === "stamp" && currentStamp && hoverPoint && (
          <div
            className="absolute pointer-events-none opacity-50"
            style={{
              left: (hoverPoint.x - Math.floor(currentStamp.width / 2)) * actualPixelSize,
              top: (hoverPoint.y - Math.floor(currentStamp.height / 2)) * actualPixelSize,
              width: currentStamp.width * actualPixelSize,
              height: currentStamp.height * actualPixelSize,
              display: "grid",
              gridTemplateColumns: `repeat(${currentStamp.width}, 1fr)`,
            }}
          >
            {currentStamp.data.flat().map((color, i) => (
              <div
                key={i}
                style={{ backgroundColor: color === "transparent" ? "transparent" : color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
