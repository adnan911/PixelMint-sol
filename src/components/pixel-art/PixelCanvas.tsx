import React, { useState, useRef, useEffect } from "react";
import { usePixelCanvas } from "@/hooks/use-pixel-canvas";
import type { CanvasGrid, Tool, Color, Point, FillMode, BrushMode, DitherPattern, PencilSize, SymmetryMode, TextObject } from "@/types/pixel-art";
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
  zoom: number;
  pan: Point;
  brushMode?: BrushMode;
  ditherPattern?: DitherPattern;
  pencilSize?: PencilSize;
  currentFont?: string;
  onFontChange?: (fontId: string) => void;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  shapeStyle?: "stroke" | "fill";
  symmetryMode?: SymmetryMode;
  onPixelChange: (newGrid: CanvasGrid, isIntermediate?: boolean) => void;
  onColorPick: (color: Color) => void;
  onPanChange: (pan: Point) => void;
  currentStamp?: { width: number; height: number; data: CanvasGrid } | null;
  onCanvasInteract?: () => void;
  textObjects?: TextObject[];
  activeTextId?: string | null;
  onTextObjectCreate?: (textObject: TextObject) => void;
  onTextObjectUpdate?: (id: string, updates: Partial<TextObject>) => void;
  onTextObjectDelete?: (id: string) => void;
  onTextObjectSelect?: (id: string | null) => void;
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
  zoom,
  pan,
  brushMode = "normal",
  ditherPattern = "bayer4x4",
  pencilSize = 1,
  currentFont = "jersey-10",
  onFontChange,
  fontSize = 16,
  onFontSizeChange,
  shapeStyle,
  symmetryMode,
  onPixelChange,
  onColorPick,
  currentStamp,
  onCanvasInteract,
  textObjects = [],
  activeTextId = null,
  onTextObjectCreate,
  onTextObjectUpdate,
  onTextObjectDelete,
  onTextObjectSelect,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState(16);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);
  const [previewGrid, setPreviewGrid] = useState<CanvasGrid | null>(null);
  const rainbowHueShiftRef = useRef(0);

  // Get actual grid dimensions
  const gridHeight = canvasGrid.length;
  const gridWidth = gridHeight > 0 ? canvasGrid[0].length : 0;

  // Text Tool State
  const [activeText, setActiveText] = useState<{
    x: number;
    y: number;
    text: string;
    phase: 'input' | 'placement';
    previewUrl?: string;
    width?: number;
    height?: number;
    id?: string; // If editing existing object
  } | null>(null);

  // Selection Tool State
  const [activeSelection, setActiveSelection] = useState<{
    start: Point;
    end: Point;
  } | null>(null);

  // Keyboard Shortcuts for Selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeSelection) return;

      // Delete / Backspace
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        const newGrid = canvasGrid.map(row => [...row]);
        const startX = Math.min(activeSelection.start.x, activeSelection.end.x);
        const endX = Math.max(activeSelection.start.x, activeSelection.end.x);
        const startY = Math.min(activeSelection.start.y, activeSelection.end.y);
        const endY = Math.max(activeSelection.start.y, activeSelection.end.y);

        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
              newGrid[y][x] = "transparent";
            }
          }
        }
        onPixelChange(newGrid);
        setActiveSelection(null);
      }

      // Ctrl+C / Cmd+C (Copy)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        // TODO: Implement Copy logic (maybe notify parent or store in clipboard)
        console.log("Copy selection not fully implemented yet");
        // For now, let's just flash the selection to indicate copy?
      }

      // Escape to cancel selection
      if (e.key === "Escape") {
        setActiveSelection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSelection, canvasGrid, gridHeight, gridWidth, onPixelChange]);

  // Clear selection when tool changes
  useEffect(() => {
    if (currentTool !== "select") {
      setActiveSelection(null);
    }
  }, [currentTool]);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = usePixelCanvas({
    canvasGrid: previewGrid || canvasGrid,
    gridSize: canvasGrid.length > 0 ? canvasGrid[0].length : 0,
    pixelSize: pixelSize * zoom,
    showGrid,
  });

  // Local state for font size input to allow typing
  const [localFontSize, setLocalFontSize] = useState(fontSize.toString());

  // Sync local state when prop changes
  useEffect(() => {
    setLocalFontSize(fontSize.toString());
  }, [fontSize]);

  // Sync local state when prop changes
  useEffect(() => {
    setLocalFontSize(fontSize.toString());
  }, [fontSize]);

  // Helper function to commit text to canvas
  const commitText = async () => {
    if (!activeText || !activeText.text) {
      setActiveText(null);
      return;
    }

    // If we have the handler, create or update a text object
    if (onTextObjectCreate) {
      const fontInfo = PIXEL_FONTS.find(f => f.id === currentFont) || PIXEL_FONTS[0];
      // const fontName = fontInfo.family.replace(/"/g, "").split(",")[0].trim(); // Unused
      
      if (activeText.id && onTextObjectUpdate) {
        onTextObjectUpdate(activeText.id, {
          x: activeText.x,
          y: activeText.y,
          text: activeText.text,
          fontSize: fontSize,
          color: currentColor,
          fontFamily: fontInfo.family,
        });
      } else {
        onTextObjectCreate({
          id: crypto.randomUUID(),
          x: activeText.x,
          y: activeText.y,
          text: activeText.text,
          fontFamily: fontInfo.family,
          fontSize: fontSize,
          color: currentColor,
        });
      }
      setActiveText(null);
      return;
    }

    const fontInfo = PIXEL_FONTS.find(f => f.id === currentFont) || PIXEL_FONTS[0];
    // Use the passed fontSize prop instead of internal state
    // const fontSize = activeText.fontSize; 

    // Extract font name without quotes for loading
    const fontName = fontInfo.family.replace(/"/g, "").split(",")[0].trim();

    // Wait for font to load before rasterizing
    try {
      await document.fonts.load(`${fontSize}px "${fontName}"`);
    } catch (e) {
      console.warn("Font loading failed, using fallback");
    }

    // Rasterize text (Legacy fallback)
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
          const gridX = Math.round(activeText.x) + px;
          const gridY = Math.round(activeText.y) + py;

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



  // If tool changes from text, commit any active text
  useEffect(() => {
    if (currentTool !== "text" && activeText) {
      commitText();
    }
  }, [currentTool]);

  useEffect(() => {
    if (currentTool !== "select" && activeSelection) {
      setActiveSelection(null);
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

  // Overlay Rendering for Stamp
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear overlay
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Debug: Always draw a small indicator to confirm overlay renders
    if (currentTool === 'stamp') {
      ctx.fillStyle = 'red';
      ctx.globalAlpha = 1.0;
      ctx.fillRect(0, 0, 10, 10); // Tiny red square in top-left corner
    }

    if (currentTool === 'stamp' && currentStamp && hoverPoint) {
        console.log('[STAMP OVERLAY] Drawing preview at', hoverPoint.x, hoverPoint.y, 'stamp:', currentStamp.width, 'x', currentStamp.height);
        // Draw Stamp Preview
        const ps = pixelSize * zoom;
        const startX = (hoverPoint.x - Math.floor(currentStamp.width / 2)) * ps;
        const startY = (hoverPoint.y - Math.floor(currentStamp.height / 2)) * ps;

        // Draw a subtle border reference
        ctx.strokeStyle = "rgba(255,0,0,0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, currentStamp.width * ps, currentStamp.height * ps);

        currentStamp.data.forEach((row, y) => {
            row.forEach((color, x) => {
                if (color !== 'transparent') {
                    ctx.fillStyle = color;
                    ctx.globalAlpha = 0.7; // Ghost effect
                    ctx.fillRect(startX + x * ps, startY + y * ps, ps, ps);
                }
            });
        });
        
        ctx.globalAlpha = 1.0; // Reset alpha
    }
  }, [hoverPoint, currentTool, currentStamp, pixelSize, zoom]);

  const handleStart = (clientX: number, clientY: number) => {
    onCanvasInteract?.();

    if (activeText && currentTool === "text") {
      commitText();
      return;
    }

    // Clear selection if clicking outside or starting new selection
    if (currentTool !== "select" && activeSelection) {
      setActiveSelection(null);
    }


    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    if (currentTool === "stamp" && currentStamp) {
       // Start drag-to-place for stamp
       // Preview handled by overlay
       setStartPoint(coords);
       setIsDrawing(true);
       return;
    }

    if (currentTool === "text") {
      setActiveText({
        x: coords.x,
        y: coords.y,
        text: "Text",
        phase: 'input'
      });
      return;
    }

    if (currentTool === "select") {
      setActiveSelection({
        start: coords,
        end: coords
      });
      setIsDrawing(true);
      setStartPoint(coords);
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
        handleDraw(coords, false);
        break;
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    const coords = getPixelCoords(clientX, clientY);
    setHoverPoint(coords);

    // Only proceed into the switch if we are actively drawing (mouse down).
    // Stamp hover preview is handled by the overlay useEffect (not the switch), so we just return here.
    if (!isDrawing) return;
    if (!startPoint) return;

    if (!coords) {
      setPreviewGrid(null);
      return;
    }

    switch (currentTool) {
      case "pencil":
      case "eraser":
        handleDraw(coords, true);
        break;
      case "line":
        if (startPoint) setPreviewGrid(drawLine(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor));
        break;
      case "circle":
        if (startPoint) {
            const radius = Math.floor(Math.sqrt(Math.pow(coords.x - startPoint.x, 2) + Math.pow(coords.y - startPoint.y, 2)));
            setPreviewGrid(drawCircle(canvasGrid, startPoint.x, startPoint.y, radius, currentColor, shapeStyle === "fill"));
        }
        break;
      case "square":
        if (startPoint) {
            setPreviewGrid(drawRectangle(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor, shapeStyle === "fill"));
        }
        break;
      case "select":
        if (activeSelection) {
          setActiveSelection({
            ...activeSelection,
            end: coords
          });
        }
        break;
      // Stamp preview handled by overlay effect now
    }
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    
    // Commit Stamp if active
    if (currentTool === "stamp" && currentStamp && hoverPoint) {
       const newGrid = canvasGrid.map(row => [...row]);
       for (let y = 0; y < currentStamp.height; y++) {
        for (let x = 0; x < currentStamp.width; x++) {
          const color = currentStamp.data[y][x];
          if (color !== "transparent") {
            const gridX = hoverPoint.x + x - Math.floor(currentStamp.width / 2);
            const gridY = hoverPoint.y + y - Math.floor(currentStamp.height / 2);
            if (gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
              newGrid[gridY][gridX] = color;
            }
          }
        }
      }
      onPixelChange(newGrid);
    }

    if (previewGrid) {
      onPixelChange(previewGrid);
      setPreviewGrid(null);
    }
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleDraw = (coords: Point, isDrawingMove = false) => {
    const newGrid = canvasGrid.map((row) => [...row]);
    const halfSize = Math.floor(pencilSize / 2);
    const isEraser = currentTool === "eraser";

    for (let dy = -halfSize; dy <= halfSize; dy++) {
      for (let dx = -halfSize; dx <= halfSize; dx++) {
        const targetX = coords.x + dx;
        const targetY = coords.y + dy;
        
        const plot = (x: number, y: number) => {
          if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
            if (isEraser) {
              newGrid[y][x] = "transparent";
            } else {
               // Pass true for rainbow mode to increment hue per pixel
               // Note: This might increment rainbow hue multiple times for symmetry, which is fine
               newGrid[y][x] = getBrushColor(x, y, currentColor, brushMode === "rainbow");
            }
          }
        };

        // Standard draw
        plot(targetX, targetY);

        // Symmetry draw
        if (symmetryMode === "horizontal" || symmetryMode === "both") {
          const mirrorX = gridWidth - 1 - targetX;
          plot(mirrorX, targetY);
        }

        if (symmetryMode === "vertical" || symmetryMode === "both") {
          const mirrorY = gridHeight - 1 - targetY;
          plot(targetX, mirrorY);
        }

        if (symmetryMode === "both") {
          const mirrorX = gridWidth - 1 - targetX;
          const mirrorY = gridHeight - 1 - targetY;
          plot(mirrorX, mirrorY);
        }
      }
    }

    onPixelChange(newGrid, isDrawingMove);
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
  const canvasWidthPx = gridWidth * actualPixelSize;
  const canvasHeightPx = gridHeight * actualPixelSize;
  const currentFontInfo = PIXEL_FONTS.find(f => f.id === currentFont) || PIXEL_FONTS[0];

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative select-none overflow-hidden">
      <div 
        className="relative"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: 'transform 0.05s ease-out'
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidthPx}
          height={canvasHeightPx}
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
            width: canvasWidthPx,
            height: canvasHeightPx
          }}
        />
        <canvas
          ref={overlayCanvasRef}
          width={canvasWidthPx}
          height={canvasHeightPx}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ 
            imageRendering: "pixelated", 
            width: canvasWidthPx, 
            height: canvasHeightPx,
            zIndex: 50, // Ensure it's on top
            pointerEvents: "none" 
          }}
        />

        {/* Horizontal Ruler (Top - Inside Canvas) */}
        {showRuler && (
          <div
            className="absolute flex pointer-events-none bg-background/80 border-b border-border"
            style={{
              top: 0,
              left: 0,
              height: 16,
              width: canvasWidthPx,
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
              height: canvasHeightPx,
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

        {/* Persistent Text Objects */}
        {textObjects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute select-none cursor-move ${activeTextId === obj.id ? "ring-2 ring-primary ring-offset-1" : "" }`}
            style={{
              left: obj.x * actualPixelSize,
              top: obj.y * actualPixelSize,
              fontFamily: obj.fontFamily,
              fontSize: `${obj.fontSize * actualPixelSize}px`,
              color: obj.color,
              lineHeight: 1,
              whiteSpace: "pre",
              zIndex: 10,
              pointerEvents: currentTool === "text" || currentTool === "select" ? "auto" : "none",
              display: activeText?.id === obj.id ? "none" : "block", // Hide if being edited
            }}
            onDoubleClick={(e) => {
              if (currentTool === "text" || currentTool === "select") {
                e.stopPropagation();
                setActiveText({
                  x: obj.x,
                  y: obj.y,
                  text: obj.text,
                  phase: 'input',
                  id: obj.id,
                  width: obj.width,
                  height: obj.height
                });
                onTextObjectSelect?.(obj.id);
                
                // Sync global state to match the object being edited
                onFontSizeChange?.(obj.fontSize);
                onColorPick?.(obj.color);
                const font = PIXEL_FONTS.find(f => f.family === obj.fontFamily);
                if (font) onFontChange?.(font.id);
              }
            }}
            onMouseDown={(e) => {
              if (currentTool === "text" || currentTool === "select") {
                e.stopPropagation();
                onTextObjectSelect?.(obj.id);
                
                // Initiate drag
                const startX = e.clientX;
                const startY = e.clientY;
                const startGridX = obj.x;
                const startGridY = obj.y;

                const onDrag = (moveEvent: MouseEvent) => {
                  const dx = moveEvent.clientX - startX;
                  const dy = moveEvent.clientY - startY;
                  const gridDx = Math.round(dx / actualPixelSize);
                  const gridDy = Math.round(dy / actualPixelSize);

                  onTextObjectUpdate?.(obj.id, {
                    x: startGridX + gridDx,
                    y: startGridY + gridDy,
                  });
                };

                const onUp = () => {
                  window.removeEventListener("mousemove", onDrag);
                  window.removeEventListener("mouseup", onUp);
                };

                window.addEventListener("mousemove", onDrag);
                window.addEventListener("mouseup", onUp);
              }
            }}
          >
            {obj.text}
            {/* Resize Handles (only when selected) */}
            {activeTextId === obj.id && (
               <>
                 {/* Delete Button */}
                 <div 
                   className="absolute -top-3 -right-3 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer shadow-sm hover:scale-110 transition-transform z-50"
                   onMouseDown={(e) => {
                     e.stopPropagation();
                     onTextObjectDelete?.(obj.id);
                   }}
                   title="Delete"
                 >
                   ×
                 </div>

                 {/* Resize Handle (Bottom Right) */}
                 <div
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary border border-white cursor-se-resize z-50"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      const startY = e.clientY;
                      const startSize = obj.fontSize;
                      
                      const onResize = (moveEvent: MouseEvent) => {
                         const dy = moveEvent.clientY - startY;
                         // Adjust sensitivity based on zoom level
                         const sizeChange = Math.round(dy / actualPixelSize); 
                         const newSize = Math.max(8, startSize + sizeChange);
                         
                         if (newSize !== obj.fontSize) {
                            onTextObjectUpdate?.(obj.id, { fontSize: newSize });
                            // Also update the global font size state to match
                            if (onFontSizeChange) onFontSizeChange(newSize);
                         }
                      };

                      const onUp = () => {
                        window.removeEventListener("mousemove", onResize);
                        window.removeEventListener("mouseup", onUp);
                      };

                      window.addEventListener("mousemove", onResize);
                      window.addEventListener("mouseup", onUp);
                    }}
                 />
               </>
            )}
          </div>
        ))}

        {/* Interactive Text Overlay (Creation Phase) */}
        {activeText && (
          <div
            className="absolute"
            style={{
              left: activeText.x * actualPixelSize,
              top: activeText.y * actualPixelSize,
            }}
          >
            {/* Controls Bar */}
            <div
              className="flex bg-card border-2 border-border rounded shadow-lg items-center p-1 mb-2 gap-2 absolute -top-12 left-0 z-50 whitespace-nowrap cursor-move"
              onMouseDown={(e) => {
                e.stopPropagation();
                // Prevent interaction with inputs from triggering drag if clicked directly
                if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'BUTTON') {
                  return;
                }

                const startX = e.clientX;
                const startY = e.clientY;
                const startGridX = activeText.x;
                const startGridY = activeText.y;

                const onDrag = (moveEvent: MouseEvent) => {
                  const dx = moveEvent.clientX - startX;
                  const dy = moveEvent.clientY - startY;
                  // Use floating point for smooth drag
                  const gridDx = dx / actualPixelSize;
                  const gridDy = dy / actualPixelSize;

                  setActiveText(prev => prev ? ({
                    ...prev,
                    x: startGridX + gridDx,
                    y: startGridY + gridDy
                  }) : null);
                };

                const onUp = () => {
                  window.removeEventListener("mousemove", onDrag);
                  window.removeEventListener("mouseup", onUp);
                };

                window.addEventListener("mousemove", onDrag);
                window.addEventListener("mouseup", onUp);
              }}
            >
              {activeText.phase === 'input' ? (
                /* INPUT PHASE CONTROLS */
                <>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground font-bold">SIZE:</span>
                    <input
                      type="number"
                      min="8"
                      max="128"
                      value={localFontSize}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalFontSize(val);
                        const newSize = parseInt(val);
                        if (!isNaN(newSize) && newSize >= 8 && onFontSizeChange) {
                          onFontSizeChange(newSize);
                        }
                      }}
                      onBlur={() => {
                        const numVal = parseInt(localFontSize);
                        if (isNaN(numVal) || numVal < 8) {
                          setLocalFontSize(fontSize.toString());
                        }
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="w-14 h-7 text-sm border-2 rounded bg-background text-foreground px-2 font-bold text-center cursor-text"
                    />
                  </div>

                  <div className="w-px h-5 bg-border"></div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Generate preview and switch to placement phase
                      const fontInfo = PIXEL_FONTS.find(f => f.id === currentFont) || PIXEL_FONTS[0];
                      const fontName = fontInfo.family.replace(/"/g, "").split(",")[0].trim();

                      const tempCanvas = document.createElement("canvas");
                      const ctx = tempCanvas.getContext("2d");
                      if (!ctx) return;

                      const fontString = `${fontSize}px "${fontName}", sans-serif`;
                      ctx.font = fontString;
                      ctx.textBaseline = "top";

                      // Calculate exact bounds
                      const metrics = ctx.measureText(activeText.text);
                      const textWidth = Math.ceil(metrics.width) + 2;
                      const textHeight = Math.ceil(fontSize * 1.3);

                      tempCanvas.width = textWidth;
                      tempCanvas.height = textHeight;

                      // Render text color
                      ctx.font = fontString;
                      ctx.textBaseline = "top";
                      ctx.fillStyle = currentColor;
                      ctx.fillText(activeText.text, 0, 0);

                      setActiveText({
                        ...activeText,
                        phase: 'placement',
                        previewUrl: tempCanvas.toDataURL(),
                        width: textWidth,
                        height: textHeight
                      });
                    }}
                    className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold hover:bg-primary/90 flex items-center gap-1 cursor-pointer"
                    title="Preview & Place"
                  >
                    Generate ✓
                  </button>
                </>
              ) : (
                /* PLACEMENT PHASE CONTROLS */
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveText({ ...activeText, phase: 'input', previewUrl: undefined });
                    }}
                    className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs font-bold hover:bg-secondary/80 flex items-center gap-1 cursor-pointer"
                    title="Edit Text"
                  >
                    ← Edit
                  </button>

                  <div className="w-px h-5 bg-border"></div>

                  <button
                    onClick={(e) => { e.stopPropagation(); commitText(); }}
                    className="bg-green-500 text-white rounded px-2 py-1 text-xs font-bold hover:bg-green-600 flex items-center gap-1 cursor-pointer"
                    title="Commit to Canvas"
                  >
                    {activeText.id ? "Update ✓" : "Place ✓"}
                  </button>
                </>
              )}
            </div>

            {/* Content Area */}
            {activeText.phase === 'input' ? (
              <input
                autoFocus
                value={activeText.text}
                onChange={(e) => setActiveText({ ...activeText, text: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // Trigger preview generation logic button click 
                    // (Simpler to just let user click button for now or duplicate logic if needed)
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                style={{
                  fontFamily: currentFontInfo.family,
                  fontSize: `${fontSize * actualPixelSize}px`,
                  lineHeight: 1,
                  color: currentColor,
                  background: "rgba(255,255,255,0.9)",
                  border: "2px dashed #333",
                  outline: "none",
                  minWidth: "1ch",
                  width: `${Math.max(1, activeText.text.length + 3)}ch`,
                  padding: "0.1em 0.2em",
                }}
              />
            ) : (
              /* Rasterized Preview Image */
              activeText.previewUrl && (
                <img
                  src={activeText.previewUrl}
                  alt="Text Preview"
                  style={{
                    width: (activeText.width || 0) * actualPixelSize,
                    height: (activeText.height || 0) * actualPixelSize,
                    imageRendering: "pixelated",
                    border: "1px dashed rgba(0,0,0,0.5)",
                    pointerEvents: "none"
                  }}
                />
              )
            )}
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

        {/* Selection Overlay */}
        {activeSelection && (
          <div
            className="absolute pointer-events-none border-2 border-dashed border-primary animate-pulse"
            style={{
              left: Math.min(activeSelection.start.x, activeSelection.end.x) * actualPixelSize,
              top: Math.min(activeSelection.start.y, activeSelection.end.y) * actualPixelSize,
              width: (Math.abs(activeSelection.end.x - activeSelection.start.x) + 1) * actualPixelSize,
              height: (Math.abs(activeSelection.end.y - activeSelection.start.y) + 1) * actualPixelSize,
              zIndex: 50,
            }}
          />
        )}
      </div>

    </div>
  );
};
