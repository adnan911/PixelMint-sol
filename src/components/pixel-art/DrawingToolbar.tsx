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
  Type,
  Stamp,
} from "lucide-react";
import type { Tool, BrushMode, PencilSize } from "@/types/pixel-art";
import { PIXEL_FONTS } from "./FontSelector";

interface DrawingToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  brushMode?: BrushMode;
  onBrushModeChange?: (mode: BrushMode) => void;
  pencilSize?: PencilSize;
  onPencilSizeChange?: (size: PencilSize) => void;
  currentFont?: string;
  onFontChange?: (font: string) => void;
}



const shapeTools: Array<{
  id: Tool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}> = [
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
  currentFont = "jersey-10",
  onFontChange,
}) => {
  // Get current shape tool info
  const currentShapeTool = shapeTools.find((tool) => tool.id === currentTool);
  const isShapeTool = !!currentShapeTool;

  // Get current brush mode info
  const currentBrushMode = brushModes.find((mode) => mode.id === brushMode);

  return (
    <TooltipProvider>
      <div className="flex gap-1.5 justify-center items-center border-[2px] border-solid border-[rgb(20,20,82)]">
        {/* 1. Pencil Tool */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentTool === "pencil" ? "default" : "outline"}
              size="icon"
              onClick={() => onToolChange("pencil")}
              className="h-11 w-11"
              aria-label="Pencil"
            >
              <Pencil className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Pencil (P)</p>
          </TooltipContent>
        </Tooltip>

        {/* 2. Pixel Mode Dropdown */}
        {onBrushModeChange && (
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={brushMode !== "normal" || pencilSize !== 1 ? "default" : "outline"}
                    size="icon"
                    className="h-11 w-11 relative"
                    aria-label="Pixel Mode"
                  >
                    <Paintbrush className="h-5 w-5" />
                    <ChevronDown className="h-3 w-3 absolute bottom-1 right-1" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Pixel Mode ({currentBrushMode?.label}) | Size: {pencilSize}px</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="center" className="w-48">
              {/* Brush Modes */}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                PIXEL MODE
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
                PIXEL SIZE
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

        {/* 3. Eraser Tool */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentTool === "eraser" ? "default" : "outline"}
              size="icon"
              onClick={() => onToolChange("eraser")}
              className="h-11 w-11"
              aria-label="Eraser"
            >
              <Eraser className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Eraser (E)</p>
          </TooltipContent>
        </Tooltip>

        {/* 4. Shapes Dropdown */}
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

        {/* 5. Fill Tool */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentTool === "fill" ? "default" : "outline"}
              size="icon"
              onClick={() => onToolChange("fill")}
              className="h-11 w-11"
              aria-label="Fill"
            >
              <PaintBucket className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Fill (F)</p>
          </TooltipContent>
        </Tooltip>

        {/* 6. Eyedropper Tool */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentTool === "eyedropper" ? "default" : "outline"}
              size="icon"
              onClick={() => onToolChange("eyedropper")}
              className="h-11 w-11"
              aria-label="Eyedropper"
            >
              <Pipette className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Eyedropper (I)</p>
          </TooltipContent>
        </Tooltip>

        {/* 7. Text Tool with Font Selector */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={currentTool === "text" ? "default" : "outline"}
                  size="icon"
                  className="h-11 w-11 relative"
                  aria-label="Text Tool"
                >
                  <Type className="h-5 w-5" />
                  <ChevronDown className="h-3 w-3 absolute bottom-1 right-1" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Text Tool (T) {currentFont ? `- ${PIXEL_FONTS.find(f => f.id === currentFont)?.name}` : ""}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="center" className="w-48 pixel-card border-4 border-border font-retro">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground font-pixel">
              SELECT FONT
            </div>
            {onFontChange && PIXEL_FONTS.map((font) => (
              <DropdownMenuItem
                key={font.id}
                onClick={() => {
                  onToolChange("text");
                  onFontChange(font.id);
                }}
                className="flex items-center gap-2 cursor-pointer py-2"
                style={{ fontFamily: font.family }}
              >
                <span>{font.name}</span>
                {currentFont === font.id && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 8. Stamp Tool */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentTool === "stamp" ? "default" : "outline"}
              size="icon"
              onClick={() => onToolChange("stamp")}
              className="h-11 w-11"
              aria-label="Stamp Tool"
            >
              <Stamp className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Stamp Tool (S)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
