import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CanvasSizeSettingsProps {
  currentWidth: number;
  currentHeight: number;
  onSizeChange: (width: number, height: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESETS = [
  { label: "16×16", width: 16, height: 16 },
  { label: "32×32", width: 32, height: 32 },
  { label: "64×64", width: 64, height: 64 },
  { label: "128×128", width: 128, height: 128 },
];

export const CanvasSizeSettings: React.FC<CanvasSizeSettingsProps> = ({
  currentWidth,
  currentHeight,
  onSizeChange,
  open,
  onOpenChange,
}) => {
  const [width, setWidth] = useState(currentWidth);
  const [height, setHeight] = useState(currentHeight);

  const handleApply = () => {
    const w = Math.max(8, Math.min(256, width));
    const h = Math.max(8, Math.min(256, height));
    onSizeChange(w, h);
    onOpenChange(false);
  };

  const handlePreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] pixel-card border-4 font-retro">
        <DialogHeader>
          <DialogTitle className="font-pixel text-primary text-sm">CANVAS SIZE</DialogTitle>
          <DialogDescription className="font-retro text-base">
            Set custom canvas dimensions (8-256 pixels)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Presets */}
          <div className="space-y-2">
            <Label className="font-retro text-base">Presets</Label>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreset(preset.width, preset.height)}
                  className="text-xs pixel-button font-retro"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width" className="font-retro text-base">Width</Label>
              <Input
                id="width"
                type="number"
                min={8}
                max={256}
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value) || 32)}
                className="pixel-inset font-retro text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height" className="font-retro text-base">Height</Label>
              <Input
                id="height"
                type="number"
                min={8}
                max={256}
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value) || 32)}
                className="pixel-inset font-retro text-base"
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-retro">
            Current: {currentWidth}×{currentHeight}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="pixel-button font-retro">
            Cancel
          </Button>
          <Button onClick={handleApply} className="pixel-button font-retro">Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
