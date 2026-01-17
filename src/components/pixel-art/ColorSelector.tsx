import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Color } from "@/types/pixel-art";

interface ColorSelectorProps {
  currentColor: Color;
  onColorChange: (color: Color) => void;
  quickColors: Color[];
  onQuickColorChange: (index: number, color: Color) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  currentColor,
  onColorChange,
  quickColors,
  onQuickColorChange,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempColor, setTempColor] = useState<string>("");

  const handleQuickColorClick = (color: Color, index: number) => {
    onColorChange(color);
  };

  const handleQuickColorRightClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setEditingIndex(index);
    setTempColor(quickColors[index]);
  };

  const handleColorSave = (index: number) => {
    if (tempColor && /^#[0-9A-Fa-f]{6}$/.test(tempColor)) {
      onQuickColorChange(index, tempColor);
    }
    setEditingIndex(null);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Current Color Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 border-2 border-border"
            style={{ backgroundColor: currentColor }}
            aria-label="Current Color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-64 pixel-card border-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="color-picker" className="font-retro text-xs">
                Select Color
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="color-picker"
                  type="color"
                  value={currentColor}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="h-10 w-16 cursor-pointer"
                />
                <Input
                  type="text"
                  value={currentColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                      onColorChange(value);
                    }
                  }}
                  className="flex-1 font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {/* Quick Color Slots */}
      {quickColors.map((color, index) => (
        <Popover
          key={index}
          open={editingIndex === index}
          onOpenChange={(open) => {
            if (!open) setEditingIndex(null);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 w-10 p-0 border-2 border-border cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => handleQuickColorClick(color, index)}
              onContextMenu={(e) => handleQuickColorRightClick(e, index)}
              aria-label={`Quick Color ${index + 1}`}
              title="Click to use | Right-click to edit"
            />
          </PopoverTrigger>
          <PopoverContent className="w-64 pixel-card border-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor={`quick-color-${index}`} className="font-retro text-xs">
                  Edit Quick Color {index + 1}
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id={`quick-color-${index}`}
                    type="color"
                    value={tempColor || color}
                    onChange={(e) => setTempColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={tempColor || color}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                        setTempColor(value);
                      }
                    }}
                    className="flex-1 font-mono text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleColorSave(index)}
                  className="flex-1 pixel-button"
                  size="sm"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setEditingIndex(null)}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};
