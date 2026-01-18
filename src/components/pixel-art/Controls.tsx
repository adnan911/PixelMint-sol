import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Trash2, Grid3x3 } from "lucide-react";
import type { CanvasGrid } from "@/types/pixel-art";
import { exportCanvasToPNG } from "@/utils/canvas-utils";

interface ControlsProps {
  canvasGrid: CanvasGrid;
  canvasSize: number;
  showGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onToggleGrid: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  canvasGrid,
  canvasSize,
  showGrid,
  onClear,
  onToggleGrid,
}) => {
  const handleExport = () => {
    exportCanvasToPNG(canvasGrid, canvasSize);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Grid Toggle */}
      <Button
        variant={showGrid ? "default" : "outline"}
        className="w-full justify-start h-12"
        onClick={onToggleGrid}
      >
        <Grid3x3 className="h-5 w-5 mr-2" />
        {showGrid ? "Hide Grid" : "Show Grid"}
      </Button>

      {/* Export */}
      <Button
        variant="secondary"
        className="w-full justify-start h-12"
        onClick={handleExport}
      >
        <Download className="h-5 w-5 mr-2" />
        Export Art
      </Button>

      {/* Clear Canvas */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full justify-start h-12">
            <Trash2 className="h-5 w-5 mr-2" />
            Clear Canvas
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Canvas?</AlertDialogTitle>
            <AlertDialogDescription>
              This will erase all your artwork. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClear}>Clear</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Info */}
      <div className="text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-lg">
        <p className="font-medium">Canvas: {canvasSize}×{canvasSize}</p>
        <p className="text-xs mt-2 leading-relaxed">
          <strong>Shortcuts:</strong> P (pencil), E (eraser), F (fill), I (eyedropper), G (grid)
        </p>
      </div>
    </div>
  );
};
