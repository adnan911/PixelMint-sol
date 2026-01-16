import React, { useState } from "react";
import { Plus, Download, Upload, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Palette, Color } from "@/types/pixel-art";
import {
  createPalette,
  downloadPalette,
  importPaletteJSON,
  importPaletteGPL,
  reorderPaletteColors,
  addColorToPalette,
  removeColorFromPalette,
  DEFAULT_PALETTES,
} from "@/utils/palette-utils";

interface PaletteManagerProps {
  palettes: Palette[];
  activePaletteId: string;
  onPaletteChange: (paletteId: string) => void;
  onPaletteCreate: (palette: Palette) => void;
  onPaletteUpdate: (palette: Palette) => void;
  onPaletteDelete: (paletteId: string) => void;
  onColorSelect: (color: Color) => void;
}

export const PaletteManager: React.FC<PaletteManagerProps> = ({
  palettes,
  activePaletteId,
  onPaletteChange,
  onPaletteCreate,
  onPaletteUpdate,
  onPaletteDelete,
  onColorSelect,
}) => {
  const [newPaletteName, setNewPaletteName] = useState("");
  const [newColor, setNewColor] = useState("#000000");
  const [draggedColorIndex, setDraggedColorIndex] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const activePalette = palettes.find((p) => p.id === activePaletteId) || palettes[0];

  const handleCreatePalette = () => {
    if (newPaletteName.trim()) {
      const palette = createPalette(newPaletteName.trim());
      onPaletteCreate(palette);
      setNewPaletteName("");
      setCreateDialogOpen(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      let palette: Palette | null = null;

      if (file.name.endsWith(".json")) {
        palette = importPaletteJSON(content);
      } else if (file.name.endsWith(".gpl")) {
        palette = importPaletteGPL(content);
      }

      if (palette) {
        onPaletteCreate(palette);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleAddColor = () => {
    if (activePalette) {
      const updated = addColorToPalette(activePalette, newColor);
      onPaletteUpdate(updated);
    }
  };

  const handleRemoveColor = (index: number) => {
    if (activePalette) {
      const updated = removeColorFromPalette(activePalette, index);
      onPaletteUpdate(updated);
    }
  };

  const handleColorDragStart = (index: number) => {
    setDraggedColorIndex(index);
  };

  const handleColorDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedColorIndex === null || draggedColorIndex === index || !activePalette) return;

    const updated = reorderPaletteColors(activePalette, draggedColorIndex, index);
    onPaletteUpdate(updated);
    setDraggedColorIndex(index);
  };

  const handleColorDragEnd = () => {
    setDraggedColorIndex(null);
  };

  const handleLoadDefaultPalette = (defaultPalette: Palette) => {
    const newPalette = createPalette(defaultPalette.name, [...defaultPalette.colors]);
    onPaletteCreate(newPalette);
  };

  return (
    <div className="space-y-4">
      {/* Palette Selector */}
      <div className="flex items-center gap-2">
        <Select value={activePaletteId} onValueChange={onPaletteChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select palette" />
          </SelectTrigger>
          <SelectContent>
            {palettes.map((palette) => (
              <SelectItem key={palette.id} value={palette.id}>
                {palette.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Palette</DialogTitle>
              <DialogDescription>
                Create a custom color palette or load a default one
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Palette Name</label>
                <div className="flex gap-2">
                  <Input
                    value={newPaletteName}
                    onChange={(e) => setNewPaletteName(e.target.value)}
                    placeholder="My Palette"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreatePalette();
                    }}
                  />
                  <Button onClick={handleCreatePalette}>Create</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Load Default Palette</label>
                <div className="grid grid-cols-1 gap-2">
                  {DEFAULT_PALETTES.map((palette) => (
                    <Button
                      key={palette.id}
                      variant="outline"
                      onClick={() => {
                        handleLoadDefaultPalette(palette);
                        setCreateDialogOpen(false);
                      }}
                      className="justify-start"
                    >
                      {palette.name} ({palette.colors.length} colors)
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Palette Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => activePalette && downloadPalette(activePalette, "json")}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-1" />
          JSON
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => activePalette && downloadPalette(activePalette, "gpl")}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-1" />
          GPL
        </Button>
        <label className="flex-1">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <span>
              <Upload className="h-4 w-4 mr-1" />
              Import
            </span>
          </Button>
          <input
            type="file"
            accept=".json,.gpl"
            onChange={handleImport}
            className="hidden"
          />
        </label>
        {activePalette && !DEFAULT_PALETTES.find((p) => p.id === activePalette.id) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPaletteDelete(activePaletteId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Color Grid */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Colors</label>
        <div className="grid grid-cols-8 gap-1.5">
          {activePalette?.colors.map((color, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleColorDragStart(index)}
              onDragOver={(e) => handleColorDragOver(e, index)}
              onDragEnd={handleColorDragEnd}
              className={`relative group cursor-move ${
                draggedColorIndex === index ? "opacity-50" : ""
              }`}
            >
              <div
                className="w-full aspect-square border-2 border-border rounded cursor-pointer hover:border-primary transition-colors"
                style={{
                  backgroundColor: color === "transparent" ? "#fff" : color,
                  backgroundImage:
                    color === "transparent"
                      ? "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))"
                      : "none",
                  backgroundSize: "8px 8px",
                  backgroundPosition: "0 0, 4px 4px",
                }}
                onClick={() => onColorSelect(color)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveColor(index);
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
              >
                ×
              </button>
              <GripVertical className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Add Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Add Color</label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-16 h-10 p-1"
          />
          <Input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
          <Button onClick={handleAddColor}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
