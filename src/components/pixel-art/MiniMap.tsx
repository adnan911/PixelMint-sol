import React, { useRef, useEffect } from "react";
import type { CanvasGrid, Point } from "@/types/pixel-art";

interface MiniMapProps {
    grid: CanvasGrid;
    zoom: number;
    pan: Point;
    containerDimensions: { width: number; height: number };
    onPanChange: (newPan: Point) => void;
    className?: string;
}

export const MiniMap: React.FC<MiniMapProps> = ({
    grid,
    zoom,
    pan,
    containerDimensions,
    onPanChange,
    className,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const gridHeight = grid.length;
    const gridWidth = gridHeight > 0 ? grid[0].length : 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Calculate MiniMap Pixel Size
        const scaleX = canvas.width / gridWidth;
        const scaleY = canvas.height / gridHeight;
        const miniMapPixelSize = Math.min(scaleX, scaleY);

        const renderWidth = gridWidth * miniMapPixelSize;
        const renderHeight = gridHeight * miniMapPixelSize;
        const offsetX = (canvas.width - renderWidth) / 2;
        const offsetY = (canvas.height - renderHeight) / 2;

        // Background
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw pixels
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const color = grid[y][x];
                if (color !== "transparent") {
                    ctx.fillStyle = color;
                    // Add 0.5 overlap to prevent gaps
                    ctx.fillRect(
                        offsetX + x * miniMapPixelSize,
                        offsetY + y * miniMapPixelSize,
                        miniMapPixelSize + 0.5,
                        miniMapPixelSize + 0.5
                    );
                }
            }
        }

        // 2. Draw Viewport Indicator
        if (containerDimensions.width > 0 && zoom > 0) {
            const viewW = containerDimensions.width;
            const viewH = containerDimensions.height;

            const maxWidth = Math.floor((containerDimensions.width - 32) / gridWidth);
            const maxHeight = Math.floor((containerDimensions.height - 32) / gridHeight);
            const basePixelSize = Math.max(Math.min(maxWidth, maxHeight, 16), 8); // Same logic as PixelCanvas

            const realPixelSize = basePixelSize * zoom;

            // Viewport Rectangle on MiniMap:
            const vpW_mm = (viewW / realPixelSize) * miniMapPixelSize;
            const vpH_mm = (viewH / realPixelSize) * miniMapPixelSize;

            // Center Offset Logic:
            const offX_mm = (-pan.x / realPixelSize) * miniMapPixelSize;
            const offY_mm = (-pan.y / realPixelSize) * miniMapPixelSize;

            // MiniMap Center Point:
            const mmCenterX = offsetX + (gridWidth * miniMapPixelSize) / 2;
            const mmCenterY = offsetY + (gridHeight * miniMapPixelSize) / 2;

            // Viewport Center on MiniMap Canvas:
            const vpCenterX = mmCenterX + offX_mm;
            const vpCenterY = mmCenterY + offY_mm;

            // Draw Rect
            ctx.strokeStyle = "#ef4444"; // Red
            ctx.lineWidth = 2;
            ctx.strokeRect(
                vpCenterX - vpW_mm / 2,
                vpCenterY - vpH_mm / 2,
                vpW_mm,
                vpH_mm
            );
        }

    }, [grid, gridWidth, gridHeight, zoom, pan, containerDimensions]);

    const handleInteraction = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const scaleX = canvas.width / gridWidth;
        const scaleY = canvas.height / gridHeight;
        const miniMapPixelSize = Math.min(scaleX, scaleY);

        // We want to center the viewport on the clicked point (x,y).

        const renderWidth = gridWidth * miniMapPixelSize;
        const renderHeight = gridHeight * miniMapPixelSize;
        const offsetX = (canvas.width - renderWidth) / 2;
        const offsetY = (canvas.height - renderHeight) / 2;

        const mmCenterX = offsetX + renderWidth / 2;
        const mmCenterY = offsetY + renderHeight / 2;

        // Offset of Click from MiniMap Center
        const clickOffX = x - mmCenterX;
        const clickOffY = y - mmCenterY;

        // We want Viewport Center to be here.
        // Viewport Center (rel Grid Center in MM pixels) = clickOff.
        // Pan = -(clickOff / mmP) * realP

        const maxWidth = Math.floor((containerDimensions.width - 32) / gridWidth);
        const maxHeight = Math.floor((containerDimensions.height - 32) / gridHeight);
        const basePixelSize = Math.max(Math.min(maxWidth, maxHeight, 16), 8);
        const realPixelSize = basePixelSize * zoom;

        const newPanX = -(clickOffX / miniMapPixelSize) * realPixelSize;
        const newPanY = -(clickOffY / miniMapPixelSize) * realPixelSize;

        onPanChange({ x: newPanX, y: newPanY });
    };

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        handleInteraction(e.clientX, e.clientY);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) {
            handleInteraction(e.clientX, e.clientY);
        }
    };

    const onMouseUp = () => {
        isDragging.current = false;
    };

    // Touch event handlers for mobile support
    const onTouchStart = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.touches.length === 1) {
            isDragging.current = true;
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging.current && e.touches.length === 1) {
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        isDragging.current = false;
    };

    return (
        <div
            className={`border-2 border-primary bg-card pixel-card shadow-xl relative overflow-hidden ${className}`}
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            style={{ touchAction: "none" }}
        >
            <canvas
                ref={canvasRef}
                width={128}
                height={128}
                className="block w-full h-full cursor-crosshair"
                style={{ imageRendering: "pixelated" }}
            />
        </div>
    );
};
