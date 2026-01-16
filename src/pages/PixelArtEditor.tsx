import React, { useState, useEffect, useMemo } from "react";
import { EnhancedPixelCanvas } from "@/components/pixel-art/PixelCanvas";
import { DrawingToolbar } from "@/components/pixel-art/DrawingToolbar";
import { SelectionToolbar } from "@/components/pixel-art/SelectionToolbar";
import { ColorPicker } from "@/components/pixel-art/ColorPicker";
import { Controls } from "@/components/pixel-art/Controls";
import { TransformControls } from "@/components/pixel-art/TransformControls";
import { LayerPanel } from "@/components/pixel-art/LayerPanel";
import { PaletteManager } from "@/components/pixel-art/PaletteManager";
import { BrushModeSelector } from "@/components/pixel-art/BrushModeSelector";
import { CanvasSizeSettings } from "@/components/pixel-art/CanvasSizeSettings";
import { useHistory } from "@/hooks/use-history";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { 
  createEmptyCanvas,
  rotateClockwise,
  flipHorizontal,
  flipVertical,
  extractSelection,
  pastePixels,
  clearSelection,
} from "@/utils/canvas-utils";
import {
  createLayer,
  duplicateLayer,
  deleteLayer,
  updateLayer,
  reorderLayers,
  getLayerById,
  mergeLayers,
  applyAlphaLock,
} from "@/utils/layer-utils";
import { DEFAULT_PALETTES, createPalette, getDefaultPalettes } from "@/utils/palette-utils";
import type { 
  Tool, 
  Color, 
  CanvasGrid, 
  Selection, 
  FillMode, 
  Clipboard, 
  Layer,
  Palette as PaletteType,
  BrushMode,
  DitherPattern,
} from "@/types/pixel-art";
import { Palette, Settings, Undo2, Redo2, Layers, Download, Maximize2, FlipHorizontal2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CANVAS_SIZE = 32;

interface EditorState {
  layers: Layer[];
  activeLayerId: string;
  palettes: PaletteType[];
  activePaletteId: string;
  canvasWidth: number;
  canvasHeight: number;
}

export default function PixelArtEditor() {
  const [currentTool, setCurrentTool] = useState<Tool>("pencil");
  const [currentColor, setCurrentColor] = useState<Color>("#000000");
  const [showGrid, setShowGrid] = useState(true);
  const [fillMode, setFillMode] = useState<FillMode>("contiguous");
  const [brushMode, setBrushMode] = useState<BrushMode>("normal");
  const [ditherPattern, setDitherPattern] = useState<DitherPattern>("bayer4x4");
  const [selection, setSelection] = useState<Selection>({ active: false, points: [] });
  const [zoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [clipboard, setClipboard] = useState<Clipboard | null>(null);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [palettesOpen, setPalettesOpen] = useState(false);
  const [canvasSizeOpen, setCanvasSizeOpen] = useState(false);
  const [transformOpen, setTransformOpen] = useState(false);

  // Initialize with one default layer and default palettes (memoized to prevent recreation)
  // Using defensive initialization to avoid conflicts with browser extensions
  const initialState: EditorState = useMemo(() => {
    try {
      const state: EditorState = {
        layers: [createLayer("Background", CANVAS_SIZE)],
        activeLayerId: "",
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
        canvasWidth: CANVAS_SIZE,
        canvasHeight: CANVAS_SIZE,
      };
      state.activeLayerId = state.layers[0].id;
      return state;
    } catch (error) {
      console.error("Error initializing editor state:", error);
      // Fallback to minimal state
      const fallbackLayer = createLayer("Background", CANVAS_SIZE);
      return {
        layers: [fallbackLayer],
        activeLayerId: fallbackLayer.id,
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
        canvasWidth: CANVAS_SIZE,
        canvasHeight: CANVAS_SIZE,
      };
    }
  }, []);

  const {
    state: editorState,
    setState: setEditorState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  } = useHistory<EditorState>(initialState, 20);

  const { layers, activeLayerId, palettes, activePaletteId, canvasWidth, canvasHeight } = editorState;
  const activeLayer = getLayerById(layers, activeLayerId);
  const activePalette = palettes.find((p) => p.id === activePaletteId) || palettes[0];

  // Get merged canvas for display
  const canvasGrid = mergeLayers(layers, Math.max(canvasWidth, canvasHeight));

  const handlePixelChange = (newGrid: CanvasGrid) => {
    if (!activeLayer || activeLayer.locked) return;

    // Calculate the difference between new grid and merged canvas
    // to determine which pixels were actually changed on the active layer
    const updatedLayerPixels: CanvasGrid = activeLayer.pixels.map((row, y) =>
      row.map((pixel, x) => {
        // If the merged canvas pixel changed, update the active layer
        if (newGrid[y][x] !== canvasGrid[y][x]) {
          return newGrid[y][x];
        }
        return pixel;
      })
    );

    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId ? { ...layer, pixels: updatedLayerPixels } : layer
      ),
    });
  };

  const handleColorPick = (color: Color) => {
    setCurrentColor(color);
    setCurrentTool("pencil");
  };

  const handleClear = () => {
    if (!activeLayer) return;
    
    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId
          ? { ...layer, pixels: createEmptyCanvas(CANVAS_SIZE) }
          : layer
      ),
    });
    setControlsOpen(false);
  };

  const handleToggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  const handleRotate = () => {
    if (!activeLayer || activeLayer.locked) return;
    
    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId
          ? { ...layer, pixels: rotateClockwise(layer.pixels) }
          : layer
      ),
    });
  };

  const handleFlipHorizontal = () => {
    if (!activeLayer || activeLayer.locked) return;
    
    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId
          ? { ...layer, pixels: flipHorizontal(layer.pixels) }
          : layer
      ),
    });
  };

  const handleFlipVertical = () => {
    if (!activeLayer || activeLayer.locked) return;
    
    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId
          ? { ...layer, pixels: flipVertical(layer.pixels) }
          : layer
      ),
    });
  };

  const handleCopy = () => {
    if (selection.active && selection.bounds && activeLayer) {
      const { x, y, width, height } = selection.bounds;
      const pixels = extractSelection(activeLayer.pixels, x, y, width, height);
      setClipboard({ pixels, width, height });
    }
  };

  const handleCut = () => {
    if (selection.active && selection.bounds && activeLayer && !activeLayer.locked) {
      const { x, y, width, height } = selection.bounds;
      const pixels = extractSelection(activeLayer.pixels, x, y, width, height);
      setClipboard({ pixels, width, height });
      const newGrid = clearSelection(activeLayer.pixels, x, y, width, height);
      
      setEditorState({
        ...editorState,
        layers: layers.map((layer) =>
          layer.id === activeLayerId ? { ...layer, pixels: newGrid } : layer
        ),
      });
      setSelection({ active: false, points: [] });
    }
  };

  const handlePaste = () => {
    if (clipboard && activeLayer && !activeLayer.locked) {
      const x = selection.bounds?.x || Math.floor((CANVAS_SIZE - clipboard.width) / 2);
      const y = selection.bounds?.y || Math.floor((CANVAS_SIZE - clipboard.height) / 2);
      const newGrid = pastePixels(activeLayer.pixels, clipboard.pixels, x, y);
      
      setEditorState({
        ...editorState,
        layers: layers.map((layer) =>
          layer.id === activeLayerId ? { ...layer, pixels: newGrid } : layer
        ),
      });
    }
  };

  // Layer management handlers
  const handleLayerCreate = () => {
    const newLayer = createLayer(`Layer ${layers.length + 1}`, CANVAS_SIZE);
    setEditorState({
      ...editorState,
      layers: [newLayer, ...layers],
      activeLayerId: newLayer.id,
    });
  };

  const handleLayerDuplicate = (layerId: string) => {
    const layer = getLayerById(layers, layerId);
    if (!layer) return;
    
    const duplicated = duplicateLayer(layer);
    const layerIndex = layers.findIndex((l) => l.id === layerId);
    const newLayers = [...layers];
    newLayers.splice(layerIndex, 0, duplicated);
    
    setEditorState({
      ...editorState,
      layers: newLayers,
      activeLayerId: duplicated.id,
    });
  };

  const handleLayerDelete = (layerId: string) => {
    if (layers.length === 1) return; // Keep at least one layer
    
    const newLayers = deleteLayer(layers, layerId);
    const newActiveId = activeLayerId === layerId ? newLayers[0].id : activeLayerId;
    
    setEditorState({
      ...editorState,
      layers: newLayers,
      activeLayerId: newActiveId,
    });
  };

  const handleLayerUpdate = (layerId: string, updates: Partial<Layer>) => {
    setEditorState({
      ...editorState,
      layers: updateLayer(layers, layerId, updates),
    });
  };

  const handleLayerReorder = (fromIndex: number, toIndex: number) => {
    setEditorState({
      ...editorState,
      layers: reorderLayers(layers, fromIndex, toIndex),
    });
  };

  const handleLayerSelect = (layerId: string) => {
    setEditorState({
      ...editorState,
      activeLayerId: layerId,
    });
  };

  // Palette management handlers
  const handlePaletteChange = (paletteId: string) => {
    setEditorState({
      ...editorState,
      activePaletteId: paletteId,
    });
  };

  const handlePaletteCreate = (palette: PaletteType) => {
    setEditorState({
      ...editorState,
      palettes: [...palettes, palette],
      activePaletteId: palette.id,
    });
  };

  const handlePaletteUpdate = (palette: PaletteType) => {
    setEditorState({
      ...editorState,
      palettes: palettes.map((p) => (p.id === palette.id ? palette : p)),
    });
  };

  const handlePaletteDelete = (paletteId: string) => {
    if (palettes.length === 1) return; // Keep at least one palette
    
    const newPalettes = palettes.filter((p) => p.id !== paletteId);
    const newActiveId = activePaletteId === paletteId ? newPalettes[0].id : activePaletteId;
    
    setEditorState({
      ...editorState,
      palettes: newPalettes,
      activePaletteId: newActiveId,
    });
  };

  const handleCanvasSizeChange = (newWidth: number, newHeight: number) => {
    // Resize all layers
    const resizedLayers = layers.map((layer) => {
      const newPixels: CanvasGrid = [];
      for (let y = 0; y < newHeight; y++) {
        newPixels[y] = [];
        for (let x = 0; x < newWidth; x++) {
          // Copy existing pixels or fill with transparent
          if (y < layer.pixels.length && x < layer.pixels[y].length) {
            newPixels[y][x] = layer.pixels[y][x];
          } else {
            newPixels[y][x] = "transparent";
          }
        }
      }
      return { ...layer, pixels: newPixels };
    });

    setEditorState({
      ...editorState,
      layers: resizedLayers,
      canvasWidth: newWidth,
      canvasHeight: newHeight,
    });
  };

  useKeyboardShortcuts({
    onToolChange: setCurrentTool,
    onUndo: undo,
    onRedo: redo,
    onToggleGrid: handleToggleGrid,
    onCopy: handleCopy,
    onCut: handleCut,
    onPaste: handlePaste,
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

  // Export canvas as PNG with high quality
  const handleExport = () => {
    // Merge all visible layers
    const mergedCanvas = mergeLayers(layers, Math.max(canvasWidth, canvasHeight));
    
    // Scale factor for high quality export (8x to ensure >200KB)
    const EXPORT_SCALE = 8;
    const exportWidth = canvasWidth * EXPORT_SCALE;
    const exportHeight = canvasHeight * EXPORT_SCALE;
    
    // Create a temporary canvas for export
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const ctx = exportCanvas.getContext("2d", { alpha: true });
    
    if (!ctx) return;
    
    // Disable image smoothing for crisp pixel art
    ctx.imageSmoothingEnabled = false;
    
    // Draw merged pixels with scaling
    for (let y = 0; y < canvasHeight; y++) {
      for (let x = 0; x < canvasWidth; x++) {
        if (mergedCanvas[y] && mergedCanvas[y][x]) {
          const color = mergedCanvas[y][x];
          if (color !== "transparent") {
            ctx.fillStyle = color;
            ctx.fillRect(x * EXPORT_SCALE, y * EXPORT_SCALE, EXPORT_SCALE, EXPORT_SCALE);
          }
        }
      }
    }
    
    // Download with high quality (1.0 = maximum quality)
    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
      link.download = `pixelart_${timestamp}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png", 1.0);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
      {/* Header with Title */}
      <header className="flex-shrink-0 border-b border-border bg-card px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-foreground">
              Pixel Art Pro
            </h1>
          </div>
          
          {/* Canvas Size & Export */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCanvasSizeOpen(true)}
              className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
            >
              <Maximize2 className="h-4 w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">{canvasWidth}×{canvasHeight}</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleExport}
              className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
            >
              <Download className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Export</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Top Toolbar - Main Controls */}
      <div className="flex-shrink-0 border-b border-border bg-card">
        <div className="px-2 sm:px-4 py-2 sm:py-3">
          {/* Mobile: Stacked Layout, Desktop: Single Row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            {/* Row 1 (Mobile) / Left (Desktop): Color + Drawing Tools */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              {/* Color Selector */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-border rounded-lg flex-shrink-0 shadow-sm cursor-pointer active:scale-95 sm:hover:scale-105 transition-transform"
                onClick={() => setColorsOpen(true)}
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
                title="Click to change color"
              />
              
              <Sheet open={colorsOpen} onOpenChange={setColorsOpen}>
                <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Color & Brush Settings</SheetTitle>
                    <SheetDescription>
                      Customize colors, palettes, and brush modes
                    </SheetDescription>
                  </SheetHeader>
                  <Tabs defaultValue="color" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="color">Color</TabsTrigger>
                      <TabsTrigger value="palette">Palette</TabsTrigger>
                      <TabsTrigger value="brush">Brush</TabsTrigger>
                    </TabsList>
                    <TabsContent value="color" className="mt-4">
                      <ColorPicker
                        currentColor={currentColor}
                        onColorChange={setCurrentColor}
                      />
                    </TabsContent>
                    <TabsContent value="palette" className="mt-4">
                      <PaletteManager
                        palettes={palettes}
                        activePaletteId={activePaletteId}
                        onPaletteChange={handlePaletteChange}
                        onPaletteCreate={handlePaletteCreate}
                        onPaletteUpdate={handlePaletteUpdate}
                        onPaletteDelete={handlePaletteDelete}
                        onColorSelect={(color) => {
                          setCurrentColor(color);
                          setColorsOpen(false);
                        }}
                      />
                    </TabsContent>
                    <TabsContent value="brush" className="mt-4">
                      <BrushModeSelector
                        brushMode={brushMode}
                        ditherPattern={ditherPattern}
                        onBrushModeChange={setBrushMode}
                        onDitherPatternChange={setDitherPattern}
                      />
                    </TabsContent>
                  </Tabs>
                </SheetContent>
              </Sheet>

              {/* Drawing Tools - Scrollable on mobile */}
              <div className="flex-1 overflow-x-auto sm:overflow-visible">
                <DrawingToolbar currentTool={currentTool} onToolChange={setCurrentTool} />
              </div>
            </div>

            {/* Row 2 (Mobile) / Center+Right (Desktop): Selection Tools + Actions */}
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {/* Selection Tools */}
              <div className="flex-1 sm:flex-initial">
                <SelectionToolbar currentTool={currentTool} onToolChange={setCurrentTool} />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={undo}
                  disabled={!canUndo}
                  className="h-11 w-11 sm:h-10 sm:w-10"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={redo}
                  disabled={!canRedo}
                  className="h-11 w-11 sm:h-10 sm:w-10"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 className="h-5 w-5" />
                </Button>
                
                <Sheet open={layersOpen} onOpenChange={setLayersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 sm:h-10 sm:w-10" title="Layers">
                      <Layers className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[320px] p-0">
                    <LayerPanel
                      layers={layers}
                      activeLayerId={activeLayerId}
                      onLayerSelect={handleLayerSelect}
                      onLayerCreate={handleLayerCreate}
                      onLayerDuplicate={handleLayerDuplicate}
                      onLayerDelete={handleLayerDelete}
                      onLayerUpdate={handleLayerUpdate}
                      onLayerReorder={handleLayerReorder}
                    />
                  </SheetContent>
                </Sheet>

                <Sheet open={transformOpen} onOpenChange={setTransformOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 sm:h-10 sm:w-10" title="Transform">
                      <FlipHorizontal2 className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[300px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Transform</SheetTitle>
                      <SheetDescription>
                        Rotate, flip, and transform your canvas
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <TransformControls
                        fillMode={fillMode}
                        onFillModeChange={setFillMode}
                        onRotate={handleRotate}
                        onFlipHorizontal={handleFlipHorizontal}
                        onFlipVertical={handleFlipVertical}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Sheet open={controlsOpen} onOpenChange={setControlsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 sm:h-10 sm:w-10" title="More Options">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[300px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Controls</SheetTitle>
                      <SheetDescription>
                        Export and manage your canvas
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
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 @container">
        <div className="w-full h-full flex items-center justify-center">
          <EnhancedPixelCanvas
            canvasGrid={canvasGrid}
            currentTool={currentTool}
            currentColor={currentColor}
            showGrid={showGrid}
            fillMode={fillMode}
            selection={selection}
            zoom={zoom}
            pan={pan}
            onPixelChange={handlePixelChange}
            onColorPick={handleColorPick}
            onSelectionChange={setSelection}
            onPanChange={setPan}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex-shrink-0 border-t border-border bg-card px-2 sm:px-4 py-2">
        <div className="text-center text-xs sm:text-sm text-muted-foreground">
          <span className="font-medium text-foreground capitalize">{currentTool}</span>
          {brushMode !== "normal" && ` | ${brushMode.charAt(0).toUpperCase() + brushMode.slice(1)}`}
          {activeLayer && <span className="hidden sm:inline"> | {activeLayer.name}</span>}
          {activeLayer?.locked && <span className="hidden sm:inline"> (Locked)</span>}
          {activeLayer?.alphaLock && <span className="hidden sm:inline"> (Alpha Lock)</span>}
          {selection.active && " | Selection"}
        </div>
      </div>

      {/* Canvas Size Settings Dialog */}
      <CanvasSizeSettings
        currentWidth={canvasWidth}
        currentHeight={canvasHeight}
        onSizeChange={handleCanvasSizeChange}
        open={canvasSizeOpen}
        onOpenChange={setCanvasSizeOpen}
      />
    </div>
  );
}
