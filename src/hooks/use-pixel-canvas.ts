import { useRef, useEffect } from "react";
import type { CanvasGrid } from "@/types/pixel-art";

interface UsePixelCanvasProps {
  canvasGrid: CanvasGrid;
  gridSize: number;
  pixelSize: number;
  showGrid: boolean;
}

/**
 * Custom hook for rendering pixel canvas
 * Handles canvas drawing and grid line rendering
 */
export const usePixelCanvas = ({
  canvasGrid,
  gridSize,
  pixelSize,
  showGrid,
}: UsePixelCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check if canvasGrid is valid
    if (!canvasGrid || !Array.isArray(canvasGrid) || canvasGrid.length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pixels
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Safety check for row existence
        if (!canvasGrid[y] || !canvasGrid[y][x]) continue;
        
        const color = canvasGrid[y][x];
        if (color !== "transparent") {
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // Draw grid lines if enabled
    if (showGrid) {
      ctx.strokeStyle = "hsl(var(--border))";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      for (let i = 0; i <= gridSize; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * pixelSize + 0.5, 0);
        ctx.lineTo(i * pixelSize + 0.5, gridSize * pixelSize);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * pixelSize + 0.5);
        ctx.lineTo(gridSize * pixelSize, i * pixelSize + 0.5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }
  }, [canvasGrid, gridSize, pixelSize, showGrid]);

  return canvasRef;
};
