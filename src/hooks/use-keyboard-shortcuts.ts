import { useEffect } from "react";
import type { Tool } from "@/types/pixel-art";

interface UseKeyboardShortcutsProps {
  onToolChange: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onToggleGrid: () => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

/**
 * Custom hook for handling keyboard shortcuts
 */
export const useKeyboardShortcuts = ({
  onToolChange,
  onUndo,
  onRedo,
  onToggleGrid,
  onCopy,
  onCut,
  onPaste,
  canUndo,
  canRedo,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Clipboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "c":
            e.preventDefault();
            onCopy();
            break;
          case "x":
            e.preventDefault();
            onCut();
            break;
          case "v":
            e.preventDefault();
            onPaste();
            break;
          case "z":
            if (e.shiftKey && canRedo) {
              e.preventDefault();
              onRedo();
            } else if (!e.shiftKey && canUndo) {
              e.preventDefault();
              onUndo();
            }
            break;
          case "y":
            if (canRedo) {
              e.preventDefault();
              onRedo();
            }
            break;
        }
        return;
      }

      // Tool shortcuts
      switch (e.key.toLowerCase()) {
        case "p":
          e.preventDefault();
          onToolChange("pencil");
          break;
        case "e":
          e.preventDefault();
          onToolChange("eraser");
          break;
        case "f":
          e.preventDefault();
          onToolChange("fill");
          break;
        case "i":
          e.preventDefault();
          onToolChange("eyedropper");
          break;
        case "l":
          e.preventDefault();
          onToolChange("line");
          break;
        case "c":
          e.preventDefault();
          onToolChange("circle");
          break;
        case "r":
          e.preventDefault();
          onToolChange("square");
          break;
        case "m":
          e.preventDefault();
          onToolChange("marquee");
          break;
        case "h":
          e.preventDefault();
          onToolChange("hand");
          break;
        case "g":
          e.preventDefault();
          onToggleGrid();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToolChange, onUndo, onRedo, onToggleGrid, onCopy, onCut, onPaste, canUndo, canRedo]);
};
