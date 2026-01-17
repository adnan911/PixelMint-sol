import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Pencil, 
  Eraser, 
  PaintBucket, 
  Pipette,
  Minus,
  Circle,
  Square,
  Shapes,
  ChevronDown,
  Paintbrush,
} from "lucide-react";
import type { Tool, BrushMode, PencilSize } from "@/types/pixel-art";

interface DrawingToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  brushMode?: BrushMode;
  onBrushModeChange?: (mode: BrushMode) => void;
  pencilSize?: PencilSize;
  onPencilSizeChange?: (size: PencilSize) => void;
}

const drawingTools: Array<{
  id: Tool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}> = [
  {
    id: "eraser",
    icon: <Eraser className="h-5 w-5" />,
    label: "Eraser",
    shortcut: "E",
  },
  {
    id: "fill",
    icon: <PaintBucket className="h-5 w-5" />,
    label: "Fill",
    shortcut: "F",
  },
  {
    id: "eyedropper",
    icon: <Pipette className="h-5 w-5" />,
    label: "Eyedropper",
    shortcut: "I",
  },
];

const shapeTools: Array<{
  id: Tool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}> = [
  {
    id: "pencil",
    icon: <Pencil className="h-4 w-4" />,
    label: "Pencil",
    shortcut: "P",
  },
  {
    id: "line",
    icon: <Minus className="h-4 w-4" />,
    label: "Line",
    shortcut: "L",
  },
  {
    id: "circle",
    icon: <Circle className="h-4 w-4" />,
    label: "Circle",
    shortcut: "C",
  },
  {
    id: "square",
    icon: <Square className="h-4 w-4" />,
    label: "Rectangle",
    shortcut: "R",
  },
];

const brushModes: Array<{
  id: BrushMode;
  label: string;
  description: string;
}> = [
  {
    id: "normal",
    label: "Normal",
    description: "Standard brush",
  },
  {
    id: "rainbow",
    label: "Rainbow",
    description: "Cycle through colors",
  },
  {
    id: "random",
    label: "Random",
    description: "Random colors",
  },
  {
    id: "dither",
    label: "Dither",
    description: "Dithering pattern",
  },
];

const pencilSizes: Array<{
  size: PencilSize;
  label: string;
}> = [
  { size: 1, label: "1px" },
  { size: 2, label: "2px" },
  { size: 3, label: "3px" },
  { size: 4, label: "4px" },
  { size: 5, label: "5px" },
];

export const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  currentTool,
  onToolChange,
  brushMode = "normal",
  onBrushModeChange,
  pencilSize = 1,
  onPencilSizeChange,
}) => {
  // Get current shape tool info
  const currentShapeTool = shapeTools.find((tool) => tool.id === currentTool);
  const isShapeTool = !!currentShapeTool;
  
  // Get current brush mode info
  const currentBrushMode = brushModes.find((mode) => mode.id === brushMode);

  return (
    <TooltipProvider>
      <div className="flex gap-1.5 justify-center items-center border-[2px] border-solid border-[rgb(20,20,82)]">
        {drawingTools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentTool === tool.id ? "default" : "outline"}
                size="icon"
                onClick={() => onToolChange(tool.id)}
                className="h-11 w-11"
                aria-label={tool.label}
              >
                {tool.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>
                {tool.label} ({tool.shortcut})
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {/* Shapes Dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={isShapeTool ? "default" : "outline"}
                  size="icon"
                  className="h-11 w-11 relative"
                  aria-label="Shapes"
                >
                  {currentShapeTool ? currentShapeTool.icon : <Shapes className="h-5 w-5" />}
                  <ChevronDown className="h-3 w-3 absolute bottom-1 right-1" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Shapes {currentShapeTool && `(${currentShapeTool.label})`}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="center">
            {shapeTools.map((tool) => (
              <DropdownMenuItem
                key={tool.id}
                onClick={() => onToolChange(tool.id)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {tool.icon}
                <span>{tool.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{tool.shortcut}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Brush Mode Dropdown */}
        {onBrushModeChange && (
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={brushMode !== "normal" || pencilSize !== 1 ? "default" : "outline"}
                    size="icon"
                    className="h-11 w-11 relative"
                    aria-label="Brush Mode"
                  >
                    <Paintbrush className="h-5 w-5" />
                    <ChevronDown className="h-3 w-3 absolute bottom-1 right-1" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Brush Mode ({currentBrushMode?.label}) | Size: {pencilSize}px</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="center" className="w-48">
              {/* Brush Modes */}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                BRUSH MODE
              </div>
              {brushModes.map((mode) => (
                <DropdownMenuItem
                  key={mode.id}
                  onClick={() => onBrushModeChange(mode.id)}
                  className="flex flex-col items-start gap-0 cursor-pointer mb-[0px]"
                >
                  <span className="font-medium">{mode.label}</span>

                </DropdownMenuItem>
              ))}
              
              {/* Separator */}
              <div className="h-px bg-border my-1" />
              
              {/* Pencil Sizes */}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                PENCIL SIZE
              </div>
              {onPencilSizeChange && pencilSizes.map((item) => (
                <DropdownMenuItem
                  key={item.size}
                  onClick={() => onPencilSizeChange(item.size)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {/* Mini icon representing size */}
                  <div className="flex items-center justify-center w-5 h-5">
                    <div 
                      className="bg-foreground"
                      style={{
                        width: `${item.size * 3}px`,
                        height: `${item.size * 3}px`,
                      }}
                    />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {pencilSize === item.size && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </TooltipProvider>
  );
};
