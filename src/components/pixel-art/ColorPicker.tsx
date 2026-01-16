import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Color } from "@/types/pixel-art";
import {
  hexToRgb,
  rgbToHex,
  hexToHsv,
  hsvToHex,
  isValidHex,
} from "@/utils/color-utils";

interface ColorPickerProps {
  currentColor: Color;
  onColorChange: (color: Color) => void;
}

const DEFAULT_PALETTE: Color[] = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00",
  "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FF8800", "#8800FF", "#00FF88", "#FF0088",
  "#888888", "#FF8888", "#88FF88", "transparent",
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
}) => {
  const [hexInput, setHexInput] = useState(currentColor);
  const [rgb, setRgb] = useState(hexToRgb(currentColor));
  const [hsv, setHsv] = useState(hexToHsv(currentColor));

  useEffect(() => {
    if (currentColor !== "transparent") {
      setHexInput(currentColor);
      setRgb(hexToRgb(currentColor));
      setHsv(hexToHsv(currentColor));
    }
  }, [currentColor]);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (isValidHex(value)) {
      onColorChange(value);
    }
  };

  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [component]: value };
    setRgb(newRgb);
    const hex = rgbToHex(newRgb);
    onColorChange(hex);
  };

  const handleHsvChange = (component: "h" | "s" | "v", value: number) => {
    const newHsv = { ...hsv, [component]: value };
    setHsv(newHsv);
    const hex = hsvToHex(newHsv);
    onColorChange(hex);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Current Color Display */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Current Color</Label>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 border-2 border-border rounded flex-shrink-0 shadow-sm"
            style={{
              backgroundColor:
                currentColor === "transparent" ? "#fff" : currentColor,
              backgroundImage:
                currentColor === "transparent"
                  ? "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))"
                  : "none",
              backgroundSize: "10px 10px",
              backgroundPosition: "0 0, 5px 5px",
            }}
          />
          <div className="flex-1 space-y-2">
            <Input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              className="text-sm font-mono"
              placeholder="#RRGGBB"
            />
            <input
              type="color"
              value={currentColor === "transparent" ? "#FFFFFF" : currentColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-full h-10 cursor-pointer rounded border-2 border-border"
            />
          </div>
        </div>
      </div>

      {/* Color Sliders */}
      <Tabs defaultValue="rgb" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rgb">RGB</TabsTrigger>
          <TabsTrigger value="hsv">HSV</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rgb" className="space-y-3 mt-4">
          {/* Red */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Label>Red</Label>
              <span className="font-mono">{rgb.r}</span>
            </div>
            <Slider
              value={[rgb.r]}
              onValueChange={([value]) => handleRgbChange("r", value)}
              min={0}
              max={255}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Green */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Label>Green</Label>
              <span className="font-mono">{rgb.g}</span>
            </div>
            <Slider
              value={[rgb.g]}
              onValueChange={([value]) => handleRgbChange("g", value)}
              min={0}
              max={255}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Blue */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Label>Blue</Label>
              <span className="font-mono">{rgb.b}</span>
            </div>
            <Slider
              value={[rgb.b]}
              onValueChange={([value]) => handleRgbChange("b", value)}
              min={0}
              max={255}
              step={1}
              className="w-full"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="hsv" className="space-y-3 mt-4">
          {/* Hue */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Label>Hue</Label>
              <span className="font-mono">{hsv.h}°</span>
            </div>
            <Slider
              value={[hsv.h]}
              onValueChange={([value]) => handleHsvChange("h", value)}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Saturation */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Label>Saturation</Label>
              <span className="font-mono">{hsv.s}%</span>
            </div>
            <Slider
              value={[hsv.s]}
              onValueChange={([value]) => handleHsvChange("s", value)}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Value */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <Label>Value</Label>
              <span className="font-mono">{hsv.v}%</span>
            </div>
            <Slider
              value={[hsv.v]}
              onValueChange={([value]) => handleHsvChange("v", value)}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Palette */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Quick Palette</Label>
        <div className="grid grid-cols-8 gap-1.5">
          {DEFAULT_PALETTE.map((color, index) => (
            <button
              key={`${color}-${index}`}
              type="button"
              onClick={() => onColorChange(color)}
              className={`w-full aspect-square border-2 rounded transition-all hover:scale-105 ${
                currentColor === color
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
              style={{
                backgroundColor: color === "transparent" ? "#fff" : color,
                backgroundImage:
                  color === "transparent"
                    ? "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))"
                    : "none",
                backgroundSize: "6px 6px",
                backgroundPosition: "0 0, 3px 3px",
              }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
