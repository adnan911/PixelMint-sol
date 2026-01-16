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
  const [lassoPoints, setLassoPoints] = useState<Point[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const canvasRef = usePixelCanvas({
    canvasGrid: previewGrid || canvasGrid,
    gridSize: GRID_SIZE,
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
        
        const maxWidth = Math.floor((containerWidth - 32) / GRID_SIZE);
        const maxHeight = Math.floor((containerHeight - 32) / GRID_SIZE);
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

    // Draw lasso path
    if (lassoPoints.length > 0) {
      const ps = pixelSize * zoom;
      ctx.strokeStyle = "rgba(0, 123, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lassoPoints[0].x * ps, lassoPoints[0].y * ps);
      for (let i = 1; i < lassoPoints.length; i++) {
        ctx.lineTo(lassoPoints[i].x * ps, lassoPoints[i].y * ps);
      }
      ctx.stroke();
    }
  }, [selection, lassoPoints, pixelSize, zoom]);

  const getPixelCoords = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const ps = pixelSize * zoom;
    const x = Math.floor((clientX - rect.left) / ps);
    const y = Math.floor((clientY - rect.top) / ps);

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
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

      case "marquee":
        onSelectionChange({ active: false, points: [] });
        break;

      case "lasso":
        setLassoPoints([coords]);
        onSelectionChange({ active: false, points: [] });
        break;

      case "hand":
        // Pan will be handled in move
        break;
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing || !startPoint) return;

    const coords = getPixelCoords(clientX, clientY);
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
        const radius = Math.round(
          Math.sqrt(Math.pow(coords.x - startPoint.x, 2) + Math.pow(coords.y - startPoint.y, 2))
        );
        setPreviewGrid(drawCircle(canvasGrid, startPoint.x, startPoint.y, radius, currentColor, false));
        break;

      case "square":
        setPreviewGrid(drawRectangle(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor, false));
        break;

      case "lasso":
        setLassoPoints((prev) => [...prev, coords]);
        break;

      case "hand":
        const dx = coords.x - startPoint.x;
        const dy = coords.y - startPoint.y;
        onPanChange({ x: pan.x + dx, y: pan.y + dy });
        setStartPoint(coords);
        break;
    }
  };

  const handleEnd = () => {
    if (!isDrawing || !startPoint) {
      setIsDrawing(false);
      return;
    }

    // Finalize shape tools
    if (previewGrid) {
      onPixelChange(previewGrid);
      setPreviewGrid(null);
    }

    // Finalize marquee selection
    if (currentTool === "marquee" && startPoint) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const ps = pixelSize * zoom;
        const endX = Math.floor((lastClientX - rect.left) / ps);
        const endY = Math.floor((lastClientY - rect.top) / ps);

        const minX = Math.max(0, Math.min(startPoint.x, endX));
        const maxX = Math.min(GRID_SIZE - 1, Math.max(startPoint.x, endX));
        const minY = Math.max(0, Math.min(startPoint.y, endY));
        const maxY = Math.min(GRID_SIZE - 1, Math.max(startPoint.y, endY));

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
    }

    // Finalize lasso selection
    if (currentTool === "lasso" && lassoPoints.length > 2) {
      // Find bounding box
      let minX = GRID_SIZE;
      let maxX = 0;
      let minY = GRID_SIZE;
      let maxY = 0;

      for (const point of lassoPoints) {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      }

      onSelectionChange({
        active: true,
        points: lassoPoints,
        bounds: {
          x: minX,
          y: minY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
        },
      });

      setLassoPoints([]);
    }

    setIsDrawing(false);
    setStartPoint(null);
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
  const canvasSize = GRID_SIZE * actualPixelSize;

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

