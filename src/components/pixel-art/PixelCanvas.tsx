import React, { useState, useRef, useEffect } from "react";
import { usePixelCanvas } from "@/hooks/use-pixel-canvas";
import type { CanvasGrid, Tool, Color } from "@/types/pixel-art";
import { floodFill } from "@/utils/canvas-utils";

interface PixelCanvasProps {
  canvasGrid: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  onPixelChange: (newGrid: CanvasGrid) => void;
  onColorPick: (color: Color) => void;
}

const GRID_SIZE = 32;

export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  canvasGrid,
  currentTool,
  currentColor,
  showGrid,
  onPixelChange,
  onColorPick,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState(16);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasRef = usePixelCanvas({
    canvasGrid,
    gridSize: GRID_SIZE,
    pixelSize,
    showGrid,
  });

  // Calculate optimal pixel size based on container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate max pixel size that fits in container with padding
        const maxWidth = Math.floor((containerWidth - 32) / GRID_SIZE);
        const maxHeight = Math.floor((containerHeight - 32) / GRID_SIZE);
        const newPixelSize = Math.min(maxWidth, maxHeight, 16);
        
        setPixelSize(Math.max(newPixelSize, 8)); // Minimum 8px per pixel
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getPixelCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / pixelSize);
    const y = Math.floor((clientY - rect.top) / pixelSize);

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      return { x, y };
    }
    return null;
  };

  const handleStart = (clientX: number, clientY: number) => {
    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    const { x, y } = coords;

    // Handle fill tool separately (single click)
    if (currentTool === "fill") {
      const newGrid = floodFill(canvasGrid, x, y, currentColor);
      onPixelChange(newGrid);
      return;
    }

    // Handle eyedropper tool
    if (currentTool === "eyedropper") {
      const pickedColor = canvasGrid[y][x];
      if (pickedColor !== "transparent") {
        onColorPick(pickedColor);
      }
      return;
    }

    // Start drawing for pencil/eraser
    setIsDrawing(true);
    handleDraw(clientX, clientY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    handleDraw(clientX, clientY);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const handleDraw = (clientX: number, clientY: number) => {
    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    const { x, y } = coords;
    const newGrid = canvasGrid.map((row) => [...row]);

    switch (currentTool) {
      case "pencil":
        newGrid[y][x] = currentColor;
        onPixelChange(newGrid);
        break;
      case "eraser":
        newGrid[y][x] = "transparent";
        onPixelChange(newGrid);
        break;
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
      handleStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleEnd();
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * pixelSize}
        height={GRID_SIZE * pixelSize}
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
    </div>
  );
};
