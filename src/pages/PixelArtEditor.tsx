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
import { Palette, Settings, Undo2, Redo2, Layers } from "lucide-react";
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

  // Initialize with one default layer and default palettes (memoized to prevent recreation)
  // Using defensive initialization to avoid conflicts with browser extensions
  const initialState: EditorState = useMemo(() => {
    try {
      const state: EditorState = {
        layers: [createLayer("Background", CANVAS_SIZE)],
        activeLayerId: "",
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
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

  const { layers, activeLayerId, palettes, activePaletteId } = editorState;
  const activeLayer = getLayerById(layers, activeLayerId);
  const activePalette = palettes.find((p) => p.id === activePaletteId) || palettes[0];

  // Get merged canvas for display
  const canvasGrid = mergeLayers(layers, CANVAS_SIZE);

  const handlePixelChange = (newGrid: CanvasGrid) => {
    if (!activeLayer || activeLayer.locked) return;

    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId ? { ...layer, pixels: newGrid } : layer
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
              Pixel Art Pro
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
            
            <Sheet open={layersOpen} onOpenChange={setLayersOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Layers className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
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
                    Transform, export, and manage your canvas
                  </SheetDescription>
                </SheetHeader>
                <Tabs defaultValue="controls" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="controls">Controls</TabsTrigger>
                    <TabsTrigger value="transform">Transform</TabsTrigger>
                  </TabsList>
                  <TabsContent value="controls" className="mt-4">
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
                  </TabsContent>
                  <TabsContent value="transform" className="mt-4">
                    <TransformControls
                      fillMode={fillMode}
                      onFillModeChange={setFillMode}
                      onRotate={handleRotate}
                      onFlipHorizontal={handleFlipHorizontal}
                      onFlipVertical={handleFlipVertical}
                    />
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2 @container">
        <div className="w-full h-full flex items-center justify-center">
          <EnhancedPixelCanvas
            canvasGrid={activeLayer?.pixels || canvasGrid}
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

      {/* Bottom Toolbar */}
      <div className="flex-shrink-0 border-t border-border bg-card">
        <div className="px-4 py-3 space-y-2">
          {/* Color Selector and Selection Tools */}
          <div className="flex items-center gap-2">
            {/* Color Selector - Compact */}
            <div
              className="w-10 h-10 border-2 border-border rounded flex-shrink-0 shadow-sm cursor-pointer"
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
            />
            
            <Sheet open={colorsOpen} onOpenChange={setColorsOpen}>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
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

            {/* Selection Tools - Inline */}
            <div className="flex-1 flex justify-center">
              <SelectionToolbar currentTool={currentTool} onToolChange={setCurrentTool} />
            </div>
          </div>

          {/* Drawing Tools */}
          <div className="flex justify-center">
            <DrawingToolbar currentTool={currentTool} onToolChange={setCurrentTool} />
          </div>

          {/* Current Tool Display */}
          <div className="text-center text-xs text-muted-foreground">
            <span className="font-medium text-foreground capitalize">{currentTool}</span>
            {brushMode !== "normal" && ` | ${brushMode.charAt(0).toUpperCase() + brushMode.slice(1)} Mode`}
            {activeLayer && ` | ${activeLayer.name}`}
            {activeLayer?.locked && " (Locked)"}
            {activeLayer?.alphaLock && " (Alpha Lock)"}
            {selection.active && " | Selection Active"}
          </div>
        </div>
      </div>
    </div>
  );
}
