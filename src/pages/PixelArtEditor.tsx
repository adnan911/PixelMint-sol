import React, { useState, useEffect } from "react";
import { PixelCanvas } from "@/components/pixel-art/PixelCanvas";
import { Toolbar } from "@/components/pixel-art/Toolbar";
import { ColorPicker } from "@/components/pixel-art/ColorPicker";
import { Controls } from "@/components/pixel-art/Controls";
import { useHistory } from "@/hooks/use-history";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { createEmptyCanvas } from "@/utils/canvas-utils";
import type { Tool, Color, CanvasGrid } from "@/types/pixel-art";
import { Palette, Settings, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CANVAS_SIZE = 32;

export default function PixelArtEditor() {
  const [currentTool, setCurrentTool] = useState<Tool>("pencil");
  const [currentColor, setCurrentColor] = useState<Color>("#000000");
  const [showGrid, setShowGrid] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);

  const {
    state: canvasGrid,
    setState: setCanvasGrid,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  } = useHistory<CanvasGrid>(createEmptyCanvas(CANVAS_SIZE), 20);

  const handlePixelChange = (newGrid: CanvasGrid) => {
    setCanvasGrid(newGrid);
  };

  const handleColorPick = (color: Color) => {
    setCurrentColor(color);
    setCurrentTool("pencil");
  };

  const handleClear = () => {
    setCanvasGrid(createEmptyCanvas(CANVAS_SIZE));
    clearHistory();
    setControlsOpen(false);
  };

  const handleToggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  useKeyboardShortcuts({
    onToolChange: setCurrentTool,
    onUndo: undo,
    onRedo: redo,
    onToggleGrid: handleToggleGrid,
    canUndo,
    canRedo,
  });

  // Prevent body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold text-foreground">
              Pixel Art
            </h1>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={undo}
              disabled={!canUndo}
              className="h-9 w-9"
              aria-label="Undo"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={redo}
              disabled={!canRedo}
              className="h-9 w-9"
              aria-label="Redo"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
            
            <Sheet open={controlsOpen} onOpenChange={setControlsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Controls</SheetTitle>
                  <SheetDescription>
                    Manage your canvas and export your artwork
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <Controls
                    canvasGrid={canvasGrid}
                    canvasSize={CANVAS_SIZE}
                    showGrid={showGrid}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    onUndo={undo}
                    onRedo={redo}
                    onClear={handleClear}
                    onToggleGrid={handleToggleGrid}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2 @container">
        <div className="w-full h-full flex items-center justify-center">
          <PixelCanvas
            canvasGrid={canvasGrid}
            currentTool={currentTool}
            currentColor={currentColor}
            showGrid={showGrid}
            onPixelChange={handlePixelChange}
            onColorPick={handleColorPick}
          />
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex-shrink-0 border-t border-border bg-card">
        <div className="px-4 py-3 space-y-3">
          {/* Color Selector */}
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-12 border-2 border-border rounded flex-shrink-0 shadow-sm"
              style={{
                backgroundColor:
                  currentColor === "transparent" ? "#fff" : currentColor,
                backgroundImage:
                  currentColor === "transparent"
                    ? "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))"
                    : "none",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 4px 4px",
              }}
            />
            
            <Sheet open={colorsOpen} onOpenChange={setColorsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1 h-12">
                  <Palette className="h-4 w-4 mr-2" />
                  Choose Color
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Color Picker</SheetTitle>
                  <SheetDescription>
                    Select a color for drawing
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <ColorPicker
                    currentColor={currentColor}
                    onColorChange={(color) => {
                      setCurrentColor(color);
                      setColorsOpen(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tools */}
          <div className="flex justify-center">
            <Toolbar currentTool={currentTool} onToolChange={setCurrentTool} />
          </div>
        </div>
      </div>
    </div>
  );
}
