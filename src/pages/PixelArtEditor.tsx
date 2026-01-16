import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { EnhancedPixelCanvas } from "@/components/pixel-art/PixelCanvas";
import { DrawingToolbar } from "@/components/pixel-art/DrawingToolbar";
import { ColorPicker } from "@/components/pixel-art/ColorPicker";
import { ColorSelector } from "@/components/pixel-art/ColorSelector";
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
import { Palette, Settings, Undo2, Redo2, Layers, Download, Maximize2, FlipHorizontal2, RotateCw, FlipVertical2, Grid3x3, Trash2, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [searchParams] = useSearchParams();
  const sizeParam = searchParams.get("size");
  const parsedSize = parseInt(sizeParam || "32", 10);
  const initialSize = !isNaN(parsedSize) && parsedSize > 0 && parsedSize <= 256 ? parsedSize : 32;
  
  const [currentTool, setCurrentTool] = useState<Tool>("pencil");
  const [currentColor, setCurrentColor] = useState<Color>("#000000");
  const [showGrid, setShowGrid] = useState(true);
  const [fillMode, setFillMode] = useState<FillMode>("contiguous");
  const [brushMode, setBrushMode] = useState<BrushMode>("normal");
  const [ditherPattern, setDitherPattern] = useState<DitherPattern>("bayer4x4");
  const [selection, setSelection] = useState<Selection>({ active: false, points: [] });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [clipboard, setClipboard] = useState<Clipboard | null>(null);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [palettesOpen, setPalettesOpen] = useState(false);
  const [canvasSizeOpen, setCanvasSizeOpen] = useState(false);
  const [quickColors, setQuickColors] = useState<Color[]>([
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
  ]);

  // Initialize with one default layer and default palettes (memoized to prevent recreation)
  // Using defensive initialization to avoid conflicts with browser extensions
  const initialState: EditorState = useMemo(() => {
    try {
      const state: EditorState = {
        layers: [createLayer("Background", initialSize)],
        activeLayerId: "",
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
        canvasWidth: initialSize,
        canvasHeight: initialSize,
      };
      state.activeLayerId = state.layers[0].id;
      return state;
    } catch (error) {
      console.error("Error initializing editor state:", error);
      // Fallback to minimal state
      const fallbackLayer = createLayer("Background", initialSize);
      return {
        layers: [fallbackLayer],
        activeLayerId: fallbackLayer.id,
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
        canvasWidth: initialSize,
        canvasHeight: initialSize,
      };
    }
  }, [initialSize]);

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

  const handleQuickColorChange = (index: number, color: Color) => {
    const newQuickColors = [...quickColors];
    newQuickColors[index] = color;
    setQuickColors(newQuickColors);
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

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 4)); // Max 4x zoom
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5)); // Min 0.5x zoom
  };

  const handleZoomFit = () => {
    setZoom(1); // Reset to 1x (fit to screen)
  };

  // Export canvas as PNG with high quality and optimized file size
  const handleExport = () => {
    // Merge all visible layers
    const mergedCanvas = mergeLayers(layers, Math.max(canvasWidth, canvasHeight));
    
    // Calculate optimal scale factor to ensure file size >= 100KB
    // Target: ~500,000 pixels for reliable 100KB+ PNG files
    const currentPixels = canvasWidth * canvasHeight;
    const targetPixels = 500000; // Aim for 500K pixels to ensure 100KB+ file size
    const calculatedScale = Math.sqrt(targetPixels / currentPixels);
    
    // Use minimum scale of 16x, maximum of 32x, rounded to nearest integer
    const EXPORT_SCALE = Math.max(16, Math.min(32, Math.round(calculatedScale)));
    
    const exportWidth = canvasWidth * EXPORT_SCALE;
    const exportHeight = canvasHeight * EXPORT_SCALE;
    
    console.log(`Exporting ${canvasWidth}x${canvasHeight} canvas at ${EXPORT_SCALE}x scale (${exportWidth}x${exportHeight})`);
    
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
    <div className="fixed inset-0 flex flex-col overflow-hidden pixel-grid mt-[0px] ml-[5px] mr-[5px] bg-inherit bg-cover bg-center bg-no-repeat bg-[url(https://miaoda-edit-image.s3cdn.medo.dev/8ydy3wce8yrl/IMG-8z4wrlhevlds.jpg)]">
      {/* Header with Title */}
      <header className="flex-shrink-0 border-b-4 border-border bg-card px-2 sm:px-4 py-2 pixel-card shadow-pixel mt-[50px] ml-[10px] mr-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-primary text-primary-foreground pixel-border-primary">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h1 className="text-sm sm:text-base font-pixel pixel-heading text-primary">{"PIXEL ART PRO"}</h1>
          </div>
        </div>
      </header>
      {/* Top Toolbar - Main Controls */}
      <div className="flex-shrink-0 border-b-4 border-border bg-card pixel-inset mt-[0px] ml-[5px] mr-[5px]">
        <div className="px-2 sm:px-4 py-2 sm:py-3 ml-[5px] mr-[10px] mt-[0px]">
          {/* Mobile: Stacked Layout, Desktop: Single Row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            {/* Row 1 (Mobile) / Left (Desktop): Color + Drawing Tools */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              {/* Color Selector */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 border-4 border-border flex-shrink-0 shadow-pixel cursor-pointer active:scale-95 sm:hover:scale-105 transition-transform pixel-button pixel-crisp"
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

              {/* Zoom Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro flex-shrink-0"
                    title="Zoom"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 pixel-card border-4 border-border">
                  <DropdownMenuLabel className="font-pixel text-primary text-xs">
                    ZOOM ({Math.round(zoom * 100)}%)
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border h-1" />
                  <DropdownMenuItem
                    onClick={handleZoomIn}
                    disabled={zoom >= 4}
                    className="font-retro text-base cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                  >
                    <ZoomIn className="mr-2 h-4 w-4" />
                    Zoom In
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    className="font-retro text-base cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                  >
                    <ZoomOut className="mr-2 h-4 w-4" />
                    Zoom Out
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleZoomFit}
                    className="font-retro text-base cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                  >
                    <Maximize className="mr-2 h-4 w-4" />
                    Fit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Row 2 (Mobile) / Center+Right (Desktop): Canvas Size, Export + Actions */}
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {/* Canvas Size & Export Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCanvasSizeOpen(true)}
                  className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro"
                  title="Canvas Size"
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleExport}
                  className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro"
                  title="Export PNG"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={undo}
                  disabled={!canUndo}
                  className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={redo}
                  disabled={!canRedo}
                  className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 className="h-5 w-5" />
                </Button>
                
                <Sheet open={layersOpen} onOpenChange={setLayersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro" title="Layers">
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro" title="Transform">
                      <FlipHorizontal2 className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 pixel-card border-4 font-retro">
                    <DropdownMenuLabel className="font-pixel text-xs text-primary">TRANSFORM</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border h-[2px]" />
                    <DropdownMenuItem onClick={handleRotate} className="cursor-pointer font-retro text-base py-3">
                      <RotateCw className="mr-2 h-5 w-5" />
                      <span>Rotate 90°</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleFlipHorizontal} className="cursor-pointer font-retro text-base py-3">
                      <FlipHorizontal2 className="mr-2 h-5 w-5" />
                      <span>Flip Horizontal</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleFlipVertical} className="cursor-pointer font-retro text-base py-3">
                      <FlipVertical2 className="mr-2 h-5 w-5" />
                      <span>Flip Vertical</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro" title="More Options">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 pixel-card border-4 font-retro">
                    <DropdownMenuLabel className="font-pixel text-xs text-primary">OPTIONS</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border h-[2px]" />
                    <DropdownMenuItem onClick={handleToggleGrid} className="cursor-pointer font-retro text-base py-3 bg-[#8867eb03] bg-none">
                      <Grid3x3 className="mr-2 h-5 w-5" />
                      <span>{showGrid ? "Hide Grid" : "Show Grid"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border h-[2px]" />
                    <DropdownMenuItem 
                      onClick={handleClear} 
                      className="cursor-pointer font-retro text-base py-3 text-destructive focus:text-destructive bg-[#ffffff] bg-none"
                    >
                      <Trash2 className="mr-2 h-5 w-5" />
                      <span>Clear Canvas</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 @container border-4 border-border">
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
      {/* Bottom Status Bar with Color Selector */}
      <div className="flex-shrink-0 border-t border-border bg-card px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Status Info */}
          <div className="flex-1 text-xs sm:text-sm text-muted-foreground">
            <span className="font-medium text-foreground capitalize">{currentTool}</span>
            {brushMode !== "normal" && ` | ${brushMode.charAt(0).toUpperCase() + brushMode.slice(1)}`}
            {activeLayer && <span className="hidden sm:inline"> | {activeLayer.name}</span>}
            {activeLayer?.locked && <span className="hidden sm:inline"> (Locked)</span>}
            {activeLayer?.alphaLock && <span className="hidden sm:inline"> (Alpha Lock)</span>}
            {selection.active && " | Selection"}
          </div>
          
          {/* Color Selector */}
          <div className="flex-shrink-0">
            <ColorSelector
              currentColor={currentColor}
              onColorChange={setCurrentColor}
              quickColors={quickColors}
              onQuickColorChange={handleQuickColorChange}
            />
          </div>
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
