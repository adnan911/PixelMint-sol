import React, { useMemo } from "react";
import { PREMADE_STAMPS, Stamp } from "@/data/stamps";
import { CanvasGrid } from "@/types/pixel-art";

interface StampSelectorProps {
    onSelectStamp: (stamp: Stamp) => void;
    selectedStampId?: string;
}

export const StampSelector: React.FC<StampSelectorProps> = ({
    onSelectStamp,
    selectedStampId,
}) => {
    const categories = useMemo(() => {
        const cats: Record<string, Stamp[]> = {};
        PREMADE_STAMPS.forEach((stamp) => {
            if (!cats[stamp.category]) {
                cats[stamp.category] = [];
            }
            cats[stamp.category].push(stamp);
        });
        return cats;
    }, []);

    return (
        <div className="bg-popover border-l border-border w-64 flex flex-col h-full overflow-hidden shadow-xl animate-in slide-in-from-right duration-200">
            <div className="p-3 border-b border-border bg-muted/30">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <span className="text-lg">✨</span> Stamp Collection
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
                {Object.entries(categories).map(([category, stamps]) => (
                    <div key={category}>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                            {category}
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                            {stamps.map((stamp) => (
                                <button
                                    key={stamp.id}
                                    onClick={() => onSelectStamp(stamp)}
                                    className={`
                    group relative aspect-square p-1 rounded-md border-2 transition-all hover:scale-105
                    ${selectedStampId === stamp.id
                                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                                            : "border-border bg-card hover:border-sidebar-primary"}
                  `}
                                    title={stamp.name}
                                >
                                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                        <StampPreview grid={stamp.data} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StampPreview: React.FC<{ grid: CanvasGrid }> = ({ grid }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const height = grid.length;
    const width = height > 0 ? grid[0].length : 0;

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (width === 0 || height === 0) return;

        // Disable smoothing for pixel art look
        ctx.imageSmoothingEnabled = false;

        // Calculate scale to fit
        const scale = Math.min(
            canvas.width / width,
            canvas.height / height
        );
        
        // Center the stamp
        const drawWidth = width * scale;
        const drawHeight = height * scale;
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        grid.forEach((row, y) => {
            row.forEach((color, x) => {
                if (color !== "transparent") {
                    ctx.fillStyle = color;
                    // Use slightly smaller size to avoid bleeding if needed, or floor
                    const px = Math.floor(offsetX + x * scale);
                    const py = Math.floor(offsetY + y * scale);
                    const pw = Math.ceil(scale);
                    const ph = Math.ceil(scale);
                    ctx.fillRect(px, py, pw, ph);
                }
            });
        });
    }, [grid, width, height]);

    return (
        <canvas 
            ref={canvasRef} 
            width={64} 
            height={64} 
            className="w-full h-full object-contain"
            style={{ imageRendering: "pixelated" }}
        />
    );
};
