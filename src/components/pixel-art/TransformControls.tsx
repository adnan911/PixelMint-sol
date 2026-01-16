import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RotateCw, FlipHorizontal2, FlipVertical2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { FillMode } from "@/types/pixel-art";

interface TransformControlsProps {
  fillMode: FillMode;
  onFillModeChange: (mode: FillMode) => void;
  onRotate: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
}

export const TransformControls: React.FC<TransformControlsProps> = ({
  fillMode,
  onFillModeChange,
  onRotate,
  onFlipHorizontal,
  onFlipVertical,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Fill Mode */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Fill Mode</Label>
        <ToggleGroup
          type="single"
          value={fillMode}
          onValueChange={(value) => {
            if (value) onFillModeChange(value as FillMode);
          }}
          className="justify-start"
        >
          <ToggleGroupItem value="contiguous" aria-label="Contiguous fill" className="flex-1">
            Contiguous
          </ToggleGroupItem>
          <ToggleGroupItem value="global" aria-label="Global fill" className="flex-1">
            Global
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Transform Buttons */}
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">Transform</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onRotate}
            className="h-12"
            aria-label="Rotate 90°"
          >
            <RotateCw className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onFlipHorizontal}
            className="h-12"
            aria-label="Flip Horizontal"
          >
            <FlipHorizontal2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onFlipVertical}
            className="h-12"
            aria-label="Flip Vertical"
          >
            <FlipVertical2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
