import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useGesture } from "@use-gesture/react";
import { EnhancedPixelCanvas } from "@/components/pixel-art/PixelCanvas";
import { MiniMap } from "@/components/pixel-art/MiniMap";
import { DrawingToolbar } from "@/components/pixel-art/DrawingToolbar";
import { ColorPicker } from "@/components/pixel-art/ColorPicker";
import { WalletBar } from "@/components/WalletBar";


import { LayerPanel } from "@/components/pixel-art/LayerPanel";
import { PaletteManager } from "@/components/pixel-art/PaletteManager";
import { CanvasSizeSettings } from "@/components/pixel-art/CanvasSizeSettings";
import { StampSelector } from "@/components/pixel-art/StampSelector";
import { PREMADE_STAMPS, Stamp } from "@/data/stamps";
import { useHistory } from "@/hooks/use-history";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import {
  createEmptyCanvas,
  rotateClockwise,
  flipHorizontal,
  flipVertical,
  pastePixels,
} from "@/utils/canvas-utils";
import {
  createLayer,
  duplicateLayer,
  deleteLayer,
  updateLayer,
  reorderLayers,
  getLayerById,
  mergeLayers,
} from "@/utils/layer-utils";
import { getDefaultPalettes } from "@/utils/palette-utils";
import type {
  Tool,
  Color,
  CanvasGrid,
  FillMode,
  Clipboard,
  Layer,
  Palette as PaletteType,
  BrushMode,
  DitherPattern,
  PencilSize,
  TextObject,
} from "@/types/pixel-art";
import { Settings, Undo2, Redo2, Layers, Download, FlipHorizontal2, RotateCw, FlipVertical2, Grid3x3, Trash2, ZoomIn, ZoomOut, Maximize, X, Plus, Ruler, Map, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// Removed unused CANVAS_SIZE constant

interface EditorState {
  layers: Layer[];
  activeLayerId: string;
  palettes: PaletteType[];
  activePaletteId: string;
  canvasWidth: number;
  canvasHeight: number;
  textObjects: TextObject[];
  activeTextId: string | null;
}

export default function PixelArtEditor() {
  const [searchParams] = useSearchParams();
  const sizeParam = searchParams.get("size");
  const parsedSize = parseInt(sizeParam || "32", 10);
  const initialSize = !isNaN(parsedSize) && parsedSize > 0 && parsedSize <= 256 ? parsedSize : 32;

  const [currentTool, setCurrentTool] = useState<Tool>("pencil");
  const [currentColor, setCurrentColor] = useState<Color>("#000000");
  const [showGrid, setShowGrid] = useState(true);
  const [showRuler, setShowRuler] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [fillMode] = useState<FillMode>("contiguous");
  const [brushMode, setBrushMode] = useState<BrushMode>("normal");
  const [ditherPattern] = useState<DitherPattern>("bayer4x4");
  const [pencilSize, setPencilSize] = useState<PencilSize>(1);
  const [currentFont, setCurrentFont] = useState("jersey-10");
  const [fontSize, setFontSize] = useState(16);
  const [shapeStyle, setShapeStyle] = useState<"stroke" | "fill">("stroke");
  const [symmetryMode, setSymmetryMode] = useState<"none" | "horizontal" | "vertical" | "both">("none");
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("theme") || "retro";
  });
  const [activeStamp, setActiveStamp] = useState<Stamp>(PREMADE_STAMPS[0]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useGesture({
    // onDrag removed to lock canvas. Panning is now only via MiniMap or Wheel.
    // onDrag: ({ offset: [dx, dy], event }) => { ... },
    onPinch: ({ offset: [d] }) => {
      // d is the zoom factor
      setZoom(d);
    },
    onWheel: ({ event, offset: [,], ctrlKey }) => {
      if (ctrlKey) {
        // Zoom
        // useGesture handles pinch as wheel with ctrl on trackpads usually, 
        // but we might need manual handling if generic wheel
        const newZoom = Math.max(0.01, Math.min(zoom - event.deltaY * 0.01, 100));
        setZoom(newZoom);
      } else {
        // Pan
        setPan(p => ({ x: p.x - event.deltaX, y: p.y - event.deltaY }));
      }
    }
  }, {
    target: containerRef,
    drag: { from: () => [pan.x, pan.y], filterTaps: true, modifierKey: undefined },
    pinch: { scaleBounds: { min: 0.01, max: 100 }, from: () => [zoom, 0] },
    wheel: { eventOptions: { passive: false } } // Prevent default browser zoom
  });
  const [clipboard] = useState<Clipboard | null>(null);
  const [colorsOpen, setColorsOpen] = useState(false);

  const [layersOpen, setLayersOpen] = useState(false);
  const [canvasSizeOpen, setCanvasSizeOpen] = useState(false);
  const [exportPreviewOpen, setExportPreviewOpen] = useState(false);
  const [exportPreviewUrl, setExportPreviewUrl] = useState<string | null>(null);
  const [isStampSelectorOpen, setIsStampSelectorOpen] = useState(false);

  // Footer quick colors - independent from palette system
  // 4 slots, null means empty
  const [footerColors, setFooterColors] = useState<(Color | null)[]>(() => {
    const saved = localStorage.getItem('pixelart-footer-colors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old data if needed (ensure length 4)
        if (Array.isArray(parsed)) {
          // If old colors exist (strings), keep first 4 if available
          return parsed.length === 4 ? parsed : [null, null, null, null];
        }
      } catch (e) {
        // ignore error
      }
    }
    return [null, null, null, null];
  });
  const [editingFooterColorIndex, setEditingFooterColorIndex] = useState<number | null>(null);



  // Initialize with one default layer and default palettes (memoized to prevent recreation)
  // Using defensive initialization to avoid conflicts with browser extensions
  const initialState: EditorState = useMemo(() => {
    try {
      const state: EditorState = {
        layers: [createLayer("Background", initialSize, initialSize)],
        activeLayerId: "",
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
        canvasWidth: initialSize,
        canvasHeight: initialSize,
        textObjects: [],
        activeTextId: null,
      };
      state.activeLayerId = state.layers[0].id;
      return state;
    } catch (error) {
      console.error("Error initializing editor state:", error);
      // Fallback to minimal state
      const fallbackLayer = createLayer("Background", initialSize, initialSize);
      return {
        layers: [fallbackLayer],
        activeLayerId: fallbackLayer.id,
        palettes: getDefaultPalettes(),
        activePaletteId: "default",
        canvasWidth: initialSize,
        canvasHeight: initialSize,
        textObjects: [],
        activeTextId: null,
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
  } = useHistory<EditorState>(initialState, 20);

  const { layers, activeLayerId, palettes, activePaletteId, canvasWidth, canvasHeight, textObjects, activeTextId } = editorState;
  const activeLayer = getLayerById(layers, activeLayerId);

  // Get merged canvas for display
  const canvasGrid = mergeLayers(layers, canvasWidth, canvasHeight);

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
  };

  const handleToolChange = (newTool: Tool) => {
    // If clicking stamp tool again, toggle selector
    if (newTool === "stamp" && currentTool === "stamp") {
      setIsStampSelectorOpen(prev => !prev);
    } else if (newTool === "stamp") {
      // If switching TO stamp tool, open selector
      setIsStampSelectorOpen(true);
    } else {
      // If switching AWAY from stamp tool, close selector
      setIsStampSelectorOpen(false);
    }

    setCurrentTool(newTool);
  };


  // Footer color handlers - independent from palette system
  const handleFooterColorClick = (color: Color) => {
    setCurrentColor(color);
  };



  const handleFooterColorChange = (index: number, color: Color) => {
    const newColors = [...footerColors];
    newColors[index] = color;
    setFooterColors(newColors);
    localStorage.setItem('pixelart-footer-colors', JSON.stringify(newColors));
    setEditingFooterColorIndex(null);
  };

  const handleFooterColorEditCancel = () => {
    setEditingFooterColorIndex(null);
  };

  const handleClear = () => {
    if (!activeLayer) return;

    setEditorState({
      ...editorState,
      layers: layers.map((layer) =>
        layer.id === activeLayerId
          ? { ...layer, pixels: createEmptyCanvas(canvasWidth, canvasHeight) }
          : layer
      ),
      textObjects: [],
      activeTextId: null,
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
    // Clipboard not implemented for full layer yet, or logic specific to selection removed
  };

  const handleCut = () => {
    // Cut not implemented without selection
  };

  const handlePaste = () => {
    if (clipboard && activeLayer && !activeLayer.locked) {
      const x = Math.floor((canvasWidth - clipboard.width) / 2);
      const y = Math.floor((canvasHeight - clipboard.height) / 2);
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
    const newLayer = createLayer(`Layer ${layers.length + 1}`, canvasWidth, canvasHeight);
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

  // Text Object Handlers
  const handleTextObjectCreate = (textObject: TextObject) => {
    setEditorState({
      ...editorState,
      textObjects: [...textObjects, textObject],
      activeTextId: textObject.id,
    });
    // Switch to select tool or keep text tool but select the new object
    // setCurrentTool("select"); 
  };

  const handleTextObjectUpdate = (id: string, updates: Partial<TextObject>) => {
    setEditorState({
      ...editorState,
      textObjects: textObjects.map(obj => obj.id === id ? { ...obj, ...updates } : obj),
    });
  };

  const handleTextObjectDelete = (id: string) => {
    setEditorState({
      ...editorState,
      textObjects: textObjects.filter(obj => obj.id !== id),
      activeTextId: activeTextId === id ? null : activeTextId,
    });
  };

  const handleTextObjectSelect = (id: string | null) => {
    setEditorState({
      ...editorState,
      activeTextId: id,
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
    onToolChange: handleToolChange, // Use the new handler
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

  // Apply theme from localStorage on mount (default to 'retro' = Based theme)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "retro";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 100)); // Max 100x zoom
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.01)); // Min 0.01x zoom
  };

  const handleZoomFit = () => {
    setZoom(1); // Reset to 1x (fit to screen)
  };

  // Export canvas as PNG with preview dialog
  const handleExport = () => {
    // Merge all visible layers
    const mergedCanvas = mergeLayers(layers, canvasWidth, canvasHeight);

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

    // Draw Text Objects
    if (textObjects && textObjects.length > 0) {
      ctx.textBaseline = "top";
      textObjects.forEach((obj) => {
        // Font size needs to be scaled
        // obj.fontFamily is like '"Jersey 10", sans-serif'
        ctx.font = `${obj.fontSize * EXPORT_SCALE}px ${obj.fontFamily}`;
        ctx.fillStyle = obj.color;
        ctx.fillText(obj.text, obj.x * EXPORT_SCALE, obj.y * EXPORT_SCALE);
      });
    }

    // Generate preview URL and show dialog
    const dataUrl = exportCanvas.toDataURL("image/png", 1.0);
    setExportPreviewUrl(dataUrl);
    setExportPreviewOpen(true);
  };

  // Confirm and download the export
  const handleConfirmExport = () => {
    if (!exportPreviewUrl) return;

    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
    link.download = `pixelart_${timestamp}.png`;
    link.href = exportPreviewUrl;
    link.click();

    // Close dialog and cleanup
    setExportPreviewOpen(false);
    setTimeout(() => setExportPreviewUrl(null), 300); // Delay cleanup for smooth animation
  };

  // Cancel export
  const handleCancelExport = () => {
    setExportPreviewOpen(false);
    setTimeout(() => setExportPreviewUrl(null), 300); // Delay cleanup for smooth animation
  };

  const handleMint = () => {
    // Placeholder for minting logic
    console.log("Minting pixel art...");
    // You could add a toast here later
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };


  // Helper for theme logo
  const getThemeLogo = () => {
    switch (currentTheme) {
      case "candy":
        return "/images/logo/pixel-mint-logo-candy.png";
      case "coffee":
        return "/images/logo/pixel-mint-logo-coffee.png";
      default:
        return "/images/logo/pixel-mint-logo.png";
    }
  };

// ...

                    <DropdownMenuItem onClick={() => handleThemeChange('default')} className="cursor-pointer font-retro text-base py-3">
                      <span className={currentTheme === 'default' ? 'text-primary font-bold' : ''}>Coffee</span>
                    </DropdownMenuItem>

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden pixel-grid mt-[0px] ml-[5px] mr-[5px] bg-inherit bg-cover bg-center bg-no-repeat bg-[url(https://miaoda-edit-image.s3cdn.medo.dev/8ydy3wce8yrl/IMG-8z4wrlhevlds.jpg)]">
      {/* Header with Title */}
      <header className="flex-shrink-0 border-b-4 border-border bg-card px-2 sm:px-4 py-2 pixel-card shadow-pixel mt-[50px] ml-[10px] mr-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/welcome" className="block hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <img
                  src={getThemeLogo()}
                  alt="Pixel Mint Logo"
                  className="w-full h-full object-contain pixel-crisp"
                />
              </div>
            </Link>
            <h1 className="text-sm sm:text-base font-pixel pixel-heading text-primary">{"PIXEL MINT"}</h1>
          </div>
          
          <div className="flex items-center">
            <WalletBar />
          </div>
        </div>
      </header>
      {/* Top Toolbar - Main Controls */}
      <div className="flex-shrink-0 border-b-4 border-border bg-card pixel-inset mt-[0px] ml-[5px] mr-[5px]">
        <div className="px-2 sm:px-4 py-2 sm:py-3 ml-[5px] mt-[0px] border-solid mr-[15px] border-[rgb(20,20,82)] border-[0px] border-[rgb(20,20,82)]">
          {/* Mobile: Stacked Layout, Desktop: Single Row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            {/* Row 1 (Mobile) / Left (Desktop): Drawing Tools */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
              {/* Drawing Tools - Scrollable on mobile */}
              <div className="flex-1 overflow-x-auto sm:overflow-visible">
                <DrawingToolbar
                  currentTool={currentTool}
                  onToolChange={handleToolChange} // Use the new handler
                  brushMode={brushMode}
                  onBrushModeChange={setBrushMode}
                  pencilSize={pencilSize}
                  onPencilSizeChange={setPencilSize}
                  currentFont={currentFont}
                  onFontChange={setCurrentFont}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  shapeStyle={shapeStyle}
                  onShapeStyleChange={setShapeStyle}
                  symmetryMode={symmetryMode}
                  onSymmetryModeChange={setSymmetryMode}
                />
              </div>
            </div>

            {/* Row 2 (Mobile) / Center+Right (Desktop): Canvas Size, Zoom + Actions */}
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {/* Export Button - Rectangular and Prominent (moved to Row 2) */}
              <Button
                variant="default"
                onClick={handleExport}
                className="h-11 sm:h-10 px-6 sm:px-4 pixel-button font-retro flex-shrink-0 gap-2 bg-orange-500 hover:bg-orange-600"
                title="Export Art"
              >
                <Download className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">EXPORT ART</span>
              </Button>

              {/* Canvas Size & Zoom Buttons */}
              <div className="flex items-center gap-1">


                {/* Zoom Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 sm:h-10 sm:w-10 pixel-button font-retro"
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
                      disabled={zoom >= 100}
                      className="font-retro text-base cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                    >
                      <ZoomIn className="mr-2 h-4 w-4" />
                      Zoom In
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleZoomOut}
                      disabled={zoom <= 0.01}
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

                {/* Action Buttons */}




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
                    <DropdownMenuItem 
                      onClick={() => setCanvasSizeOpen(true)} 
                      className="cursor-pointer font-retro text-base py-1.5 bg-[#8867eb03] bg-none"
                    >
                      <Maximize className="mr-2 h-5 w-5" />
                      <span>Canvas Size</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleToggleGrid} className="cursor-pointer font-retro text-base py-1.5 bg-[#8867eb03] bg-none">
                      <Grid3x3 className="mr-2 h-5 w-5" />
                      <span>{showGrid ? "Hide Grid" : "Show Grid"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowRuler(!showRuler)} className="cursor-pointer font-retro text-base py-1.5 bg-[#8867eb03] bg-none">
                      <Ruler className="mr-2 h-5 w-5" />
                      <span>{showRuler ? "Hide Ruler" : "Show Ruler"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowMiniMap(!showMiniMap)} className="cursor-pointer font-retro text-base py-1.5 bg-[#8867eb03] bg-none">
                      <Map className="mr-2 h-5 w-5" />
                      <span>{showMiniMap ? "Hide MiniMap" : "Show MiniMap"}</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-border h-[2px]" />
                    <DropdownMenuLabel className="font-pixel text-xs text-primary">THEME</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleThemeChange('retro')} className="cursor-pointer font-retro text-base py-1.5">
                      <span className={currentTheme === 'retro' ? 'text-primary font-bold' : ''}>Based</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThemeChange('candy')} className="cursor-pointer font-retro text-base py-1.5">
                      <span className={currentTheme === 'candy' ? 'text-primary font-bold' : ''}>Candy</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThemeChange('coffee')} className="cursor-pointer font-retro text-base py-1.5">
                      <span className={currentTheme === 'coffee' ? 'text-primary font-bold' : ''}>Coffee</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="cursor-pointer font-retro text-base py-1.5">
                      <span className={currentTheme === 'dark' ? 'text-primary font-bold' : ''}>Dark Coffee</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border h-[2px]" />
                    <DropdownMenuItem
                      onClick={handleClear}
                      className="cursor-pointer font-retro text-base py-1.5 text-destructive focus:text-destructive bg-[#ffffff] bg-none"
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
      {/* Canvas Area with Floating Color Selector */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 @container border-4 border-border relative touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Stamp Selector Panel */}
        {currentTool === "stamp" && isStampSelectorOpen && (
          <div className="absolute left-2 top-2 bottom-2 z-20">
            <StampSelector
              onSelectStamp={setActiveStamp}
              selectedStampId={activeStamp?.id}
            />
          </div>
        )}

        {/* Middle: Canvas */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-muted/20"
             style={{
               height: "calc(100vh - 140px)", // Adjust based on header/footer
               display: "flex",
               alignItems: "center",
               justifyContent: "center"
             }}
        >
          <div
            className="relative shadow-2xl overflow-hidden bg-card"
            style={{
               width: containerDimensions.width > 0 ? containerDimensions.width : '100%',
               height: containerDimensions.height > 0 ? containerDimensions.height : '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
            }}
          >
            <EnhancedPixelCanvas
              canvasGrid={canvasGrid}
              currentTool={currentTool}
              currentColor={currentColor}
              showGrid={showGrid}
              showRuler={showRuler}
              fillMode={fillMode}
              zoom={zoom}
              pan={pan}
              brushMode={brushMode}
              ditherPattern={ditherPattern}
              pencilSize={pencilSize}
              currentFont={currentFont}
              onFontChange={setCurrentFont}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              shapeStyle={shapeStyle}
              symmetryMode={symmetryMode}
              currentStamp={isStampSelectorOpen ? activeStamp : null}
              onPixelChange={handlePixelChange}
              onColorPick={handleColorPick}
              onPanChange={setPan}
              textObjects={textObjects}
              activeTextId={activeTextId}
              onTextObjectCreate={handleTextObjectCreate}
              onTextObjectUpdate={handleTextObjectUpdate}
              onTextObjectDelete={handleTextObjectDelete}
              onTextObjectSelect={handleTextObjectSelect}
              onCanvasInteract={() => setIsStampSelectorOpen(false)}
            />
          </div>
        </div>


        {/* Navigation MiniMap */}
        {showMiniMap && (
          <div className="absolute bottom-4 right-4 z-40 block opacity-90 hover:opacity-100 transition-opacity">
            <MiniMap
              grid={canvasGrid}
              zoom={zoom}
              pan={pan}
              containerDimensions={containerDimensions}
              onPanChange={(newPan) => setPan(newPan)}
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
          </div>
        )}

        {/* Color & Palette Settings Sheet - Opens from Bottom */}
        <Sheet open={colorsOpen} onOpenChange={setColorsOpen}>
          <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Color & Palette Settings</SheetTitle>
              <SheetDescription>
                Customize colors and palettes
              </SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="color" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="palette">Palette</TabsTrigger>
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
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>
      {/* Bottom Status Bar with Custom Colors */}
      <div className="flex-shrink-0 border-t border-border bg-card px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between gap-4 mr-[50px]">

          <div className="flex items-center gap-4">
            {/* "Change Color" Button (moved to left) */}
            <div className="flex-shrink-0">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 border-4 border-border flex-shrink-0 shadow-pixel cursor-pointer active:scale-95 sm:hover:scale-105 transition-transform pixel-button pixel-crisp mr-[1px]"
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
                title="Change color"
              />
            </div>

            {/* 4 Custom Color Options */}
            <div className="flex items-center gap-1 sm:gap-2">
              {footerColors.map((color, index) => (
                <div
                  key={index}
                  className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center"
                >
                  {color ? (
                    <div
                      className="w-full h-full border-4 border-border shadow-pixel cursor-pointer active:scale-95 transition-transform pixel-button"
                      style={{ backgroundColor: color }}
                      onClick={() => handleFooterColorClick(color)}
                      title="Select color"
                    >
                      {currentColor === color && (
                        <div className="absolute inset-0 border-2 border-primary pointer-events-none" />
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingFooterColorIndex(index)}
                      className="w-full h-full border-4 border-dashed border-muted-foreground/50 hover:border-primary hover:text-primary bg-transparent"
                      title="Set color"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Undo/Redo Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
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
      {/* Export Preview Dialog */}
      <Dialog open={exportPreviewOpen} onOpenChange={setExportPreviewOpen}>
        <DialogContent className="max-w-3xl pixel-card border-4 border-border">
          <DialogHeader>
            <DialogTitle className="font-pixel text-primary text-xl">
              Export Preview
            </DialogTitle>
            <DialogDescription className="font-retro text-muted-foreground">
              Preview your pixel art before downloading
            </DialogDescription>
          </DialogHeader>

          {/* Preview Image */}
          <div className="flex items-center justify-center p-4 bg-muted/20 border-2 border-border rounded-md min-h-[300px] max-h-[500px] overflow-auto">
            {exportPreviewUrl && (
              <img
                src={exportPreviewUrl}
                alt="Export Preview"
                className="max-w-full max-h-full object-contain"
                style={{
                  imageRendering: "pixelated",
                }}
              />
            )}
          </div>

          {/* Footer with Download and Cancel buttons */}
          <DialogFooter className="flex flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={handleCancelExport}
              className="flex-1 sm:flex-none pixel-button font-retro"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleMint}
              className="flex-1 sm:flex-none pixel-button font-retro bg-purple-500 hover:bg-purple-600 text-white border-purple-700"
            >
              <Diamond className="mr-2 h-4 w-4" />
              MINT IT
            </Button>
            <Button
              variant="default"
              onClick={handleConfirmExport}
              className="flex-1 sm:flex-none pixel-button font-retro"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Footer Color Edit Dialog */}
      <Dialog open={editingFooterColorIndex !== null} onOpenChange={(open) => !open && handleFooterColorEditCancel()}>
        <DialogContent className="max-w-sm pixel-card border-4 border-border">
          <DialogHeader>
            <DialogTitle className="font-pixel text-primary text-lg">
              Edit Footer Color {editingFooterColorIndex !== null ? editingFooterColorIndex + 1 : ''}
            </DialogTitle>
            <DialogDescription className="font-retro text-muted-foreground">
              Choose a new color for this quick access slot
            </DialogDescription>
          </DialogHeader>

          {/* Color Picker */}
          <div className="py-4">
            {editingFooterColorIndex !== null && (
              <ColorPicker
                currentColor={footerColors[editingFooterColorIndex] || "#FFFFFF"}
                onColorChange={(color) => handleFooterColorChange(editingFooterColorIndex, color)}
              />
            )}
          </div>

          {/* Footer with Cancel button */}
          <DialogFooter className="flex flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={handleFooterColorEditCancel}
              className="flex-1 sm:flex-none pixel-button font-retro"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
