import React from "react";
import { Eye, EyeOff, Lock, Unlock, MoreVertical, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import type { Layer, BlendMode } from "@/types/pixel-art";

interface LayerItemProps {
  layer: Layer;
  isActive: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onToggleAlphaLock: () => void;
  onOpacityChange: (opacity: number) => void;
  onBlendModeChange: (mode: BlendMode) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
}

const blendModes: BlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
];

export const LayerItem: React.FC<LayerItemProps> = ({
  layer,
  isActive,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onToggleAlphaLock,
  onOpacityChange,
  onBlendModeChange,
  onDuplicate,
  onDelete,
  onRename,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(layer.name);

  const handleNameSubmit = () => {
    if (editName.trim()) {
      onRename(editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`border rounded-lg p-3 space-y-2 ${
        isActive ? "border-primary bg-primary/5" : "border-border"
      }`}
      onClick={onSelect}
    >
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
        >
          {layer.visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
        >
          {layer.locked ? (
            <Lock className="h-4 w-4" />
          ) : (
            <Unlock className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>

        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNameSubmit();
              if (e.key === "Escape") {
                setEditName(layer.name);
                setIsEditing(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 px-2 py-1 text-sm border rounded"
            autoFocus
          />
        ) : (
          <span
            className="flex-1 text-sm font-medium truncate cursor-text"
            onDoubleClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            {layer.name}
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Opacity Slider */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Opacity</span>
          <span>{layer.opacity}%</span>
        </div>
        <Slider
          value={[layer.opacity]}
          onValueChange={([value]) => onOpacityChange(value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Blend Mode + Alpha Lock in one row */}
      <div className="flex items-center gap-2">
        <select
          value={layer.blendMode}
          onChange={(e) => onBlendModeChange(e.target.value as BlendMode)}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 px-2 py-1 text-xs border rounded bg-background"
        >
          {blendModes.map((mode) => (
            <option key={mode} value={mode}>
              {mode.charAt(0).toUpperCase() + mode.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1 flex-shrink-0">
          <input
            type="checkbox"
            id={`alpha-lock-${layer.id}`}
            checked={layer.alphaLock}
            onChange={onToggleAlphaLock}
            onClick={(e) => e.stopPropagation()}
            className="h-3.5 w-3.5"
          />
          <label
            htmlFor={`alpha-lock-${layer.id}`}
            className="text-xs text-muted-foreground cursor-pointer whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            α Lock
          </label>
        </div>
      </div>
    </div>
  );
};
