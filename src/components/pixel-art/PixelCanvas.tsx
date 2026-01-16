import React, { useState, useRef, useEffect } from "react";
import { usePixelCanvas } from "@/hooks/use-pixel-canvas";
import type { CanvasGrid, Tool, Color, Point, Selection, FillMode } from "@/types/pixel-art";
import {
  floodFill,
  globalFill,
  drawLine,
  drawCircle,
  drawRectangle,
  isPointInPolygon,
} from "@/utils/canvas-utils";

interface EnhancedPixelCanvasProps {
  canvasGrid: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  fillMode: FillMode;
  selection: Selection;
  zoom: number;
  pan: Point;
  onPixelChange: (newGrid: CanvasGrid) => void;
  onColorPick: (color: Color) => void;
  onSelectionChange: (selection: Selection) => void;
  onPanChange: (pan: Point) => void;
}

const GRID_SIZE = 32;

export const EnhancedPixelCanvas: React.FC<EnhancedPixelCanvasProps> = ({
  canvasGrid,
  currentTool,
  currentColor,
  showGrid,
  fillMode,
  selection,
  zoom,
  pan,
  onPixelChange,
  onColorPick,
  onSelectionChange,
  onPanChange,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState(16);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [previewGrid, setPreviewGrid] = useState<CanvasGrid | null>(null);
  const [moveOffset, setMoveOffset] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  // Get actual grid dimensions from canvasGrid
  const gridHeight = canvasGrid.length;
  const gridWidth = gridHeight > 0 ? canvasGrid[0].length : 0;

  const canvasRef = usePixelCanvas({
    canvasGrid: previewGrid || canvasGrid,
    gridSize: gridWidth, // Use actual grid width
    pixelSize: pixelSize * zoom,
    showGrid,
  });

  // Calculate optimal pixel size based on container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Use actual grid dimensions for calculation
        const maxWidth = Math.floor((containerWidth - 32) / gridWidth);
        const maxHeight = Math.floor((containerHeight - 32) / gridHeight);
        const newPixelSize = Math.min(maxWidth, maxHeight, 16);
        
        setPixelSize(Math.max(newPixelSize, 8));
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Draw selection overlay
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selection.active && selection.bounds) {
      const { x, y, width, height } = selection.bounds;
      const ps = pixelSize * zoom;

      // Draw selection rectangle
      ctx.strokeStyle = "rgba(0, 123, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(x * ps, y * ps, width * ps, height * ps);
      ctx.setLineDash([]);
    }
  }, [selection, pixelSize, zoom]);

  const getPixelCoords = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const ps = pixelSize * zoom;
    const x = Math.floor((clientX - rect.left) / ps);
    const y = Math.floor((clientY - rect.top) / ps);

    // Use actual canvas grid dimensions for boundary check
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
      return { x, y };
    }
    return null;
  };

  const handleStart = (clientX: number, clientY: number) => {
    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    setStartPoint(coords);
    setIsDrawing(true);

    // Handle different tools
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
        if (pickedColor !== "transparent") {
          onColorPick(pickedColor);
        }
        setIsDrawing(false);
        break;

      case "pencil":
      case "eraser":
        handleDraw(coords);
        break;

      case "select":
        onSelectionChange({ active: false, points: [] });
        break;

      case "move":
        // Check if clicking inside selection
        if (selection.active && selection.bounds) {
          const { x, y, width, height } = selection.bounds;
          const maxX = x + width - 1;
          const maxY = y + height - 1;
          if (coords.x >= x && coords.x <= maxX && coords.y >= y && coords.y <= maxY) {
            setMoveOffset({ x: coords.x - x, y: coords.y - y });
          }
        }
        break;
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing || !startPoint) return;

    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    setEndPoint(coords);

    switch (currentTool) {
      case "pencil":
      case "eraser":
        handleDraw(coords);
        break;

      case "line":
        setPreviewGrid(drawLine(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor));
        break;

      case "circle":
        const radius = Math.round(
          Math.sqrt(Math.pow(coords.x - startPoint.x, 2) + Math.pow(coords.y - startPoint.y, 2))
        );
        setPreviewGrid(drawCircle(canvasGrid, startPoint.x, startPoint.y, radius, currentColor, false));
        break;

      case "square":
        setPreviewGrid(drawRectangle(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor, false));
        break;

      case "select":
        // Show preview of selection rectangle
        break;

      case "move":
        // Move the selection
        if (selection.active && moveOffset && selection.bounds) {
          const newMinX = coords.x - moveOffset.x;
          const newMinY = coords.y - moveOffset.y;
          // Update selection position (will be handled in handleEnd)
        }
        break;
    }
  };

  const handleEnd = () => {
    if (!isDrawing || !startPoint) {
      setIsDrawing(false);
      setMoveOffset(null);
      return;
    }

    // Finalize shape tools
    if (previewGrid) {
      onPixelChange(previewGrid);
      setPreviewGrid(null);
    }

    // Finalize select tool
    if (currentTool === "select" && startPoint && endPoint) {
      const minX = Math.max(0, Math.min(startPoint.x, endPoint.x));
      const maxX = Math.min(gridWidth - 1, Math.max(startPoint.x, endPoint.x));
      const minY = Math.max(0, Math.min(startPoint.y, endPoint.y));
      const maxY = Math.min(gridHeight - 1, Math.max(startPoint.y, endPoint.y));

      onSelectionChange({
        active: true,
        points: [],
        bounds: {
          x: minX,
          y: minY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
        },
      });
    }

    // Finalize move tool
    if (currentTool === "move" && moveOffset && endPoint && selection.active && selection.bounds) {
      const newMinX = endPoint.x - moveOffset.x;
      const newMinY = endPoint.y - moveOffset.y;
      
      // Update selection bounds
      onSelectionChange({
        ...selection,
        bounds: {
          x: newMinX,
          y: newMinY,
          width: selection.bounds.width,
          height: selection.bounds.height,
        },
      });
    }

    setIsDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
    setMoveOffset(null);
  };

  const handleDraw = (coords: Point) => {
    const newGrid = canvasGrid.map((row) => [...row]);

    switch (currentTool) {
      case "pencil":
        newGrid[coords.y][coords.x] = currentColor;
        onPixelChange(newGrid);
        break;
      case "eraser":
        newGrid[coords.y][coords.x] = "transparent";
        onPixelChange(newGrid);
        break;
    }
  };

  // Track last client position for marquee
  let lastClientX = 0;
  let lastClientY = 0;

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastClientX = touch.clientX;
      lastClientY = touch.clientY;
      handleStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastClientX = touch.clientX;
      lastClientY = touch.clientY;
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleEnd();
  };

  const actualPixelSize = pixelSize * zoom;
  const canvasSize = Math.max(gridWidth, gridHeight) * actualPixelSize;

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
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
            backgroundImage:
              "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))",
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
      </div>
    </div>
  );
};

