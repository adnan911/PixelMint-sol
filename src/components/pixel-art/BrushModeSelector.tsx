import React from "react";
import { Paintbrush, Rainbow, Shuffle, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { BrushMode, DitherPattern } from "@/types/pixel-art";

interface BrushModeSelectorProps {
  brushMode: BrushMode;
  ditherPattern: DitherPattern;
  onBrushModeChange: (mode: BrushMode) => void;
  onDitherPatternChange: (pattern: DitherPattern) => void;
}

const brushModes: { value: BrushMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "normal",
    label: "Normal",
    icon: <Paintbrush className="h-4 w-4" />,
    description: "Standard drawing",
  },
  {
    value: "rainbow",
    label: "Rainbow",
    icon: <Rainbow className="h-4 w-4" />,
    description: "Cycles hue per stroke",
  },
  {
    value: "random",
    label: "Random",
    icon: <Shuffle className="h-4 w-4" />,
    description: "Random palette color",
  },
  {
    value: "dither",
    label: "Dither",
    icon: <Grid3x3 className="h-4 w-4" />,
    description: "Bayer matrix pattern",
  },
];

export const BrushModeSelector: React.FC<BrushModeSelectorProps> = ({
  brushMode,
  ditherPattern,
  onBrushModeChange,
  onDitherPatternChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Brush Mode Buttons */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Pixel Mode</Label>
        <div className="grid grid-cols-2 gap-2">
          {brushModes.map((mode) => (
            <Button
              key={mode.value}
              variant={brushMode === mode.value ? "default" : "outline"}
              onClick={() => onBrushModeChange(mode.value)}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              {mode.icon}
              <span className="text-xs">{mode.label}</span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {brushModes.find((m) => m.value === brushMode)?.description}
        </p>
      </div>

      {/* Dither Pattern Selector */}
      {brushMode === "dither" && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Dither Pattern</Label>
          <Select value={ditherPattern} onValueChange={(value) => onDitherPatternChange(value as DitherPattern)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bayer2x2">Bayer 2×2 (Fine)</SelectItem>
              <SelectItem value="bayer4x4">Bayer 4×4 (Medium)</SelectItem>
              <SelectItem value="bayer8x8">Bayer 8×8 (Coarse)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
