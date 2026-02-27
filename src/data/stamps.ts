import { CanvasGrid } from "@/types/pixel-art";

export interface Stamp {
    id: string;
    name: string;
    category: string;
    width: number;
    height: number;
    data: CanvasGrid;
}

const createGrid = (width: number, height: number, pixels: { x: number; y: number; color: string }[]): CanvasGrid => {
    const grid: CanvasGrid = Array(height).fill(null).map(() => Array(width).fill("transparent"));
    pixels.forEach(({ x, y, color }) => {
        if (y >= 0 && y < height && x >= 0 && x < width) {
            grid[y][x] = color;
        }
    });
    return grid;
};

export const PREMADE_STAMPS: Stamp[] = [
    // --- UI & Interface ---
    {
        id: "ui_btn_idle",
        name: "Pixel Button",
        category: "UI & Interface",
        width: 10,
        height: 5,
        data: createGrid(10, 5, [
            { x: 0, y: 0, color: "#9CA3AF" }, { x: 1, y: 0, color: "#9CA3AF" }, { x: 2, y: 0, color: "#9CA3AF" }, { x: 3, y: 0, color: "#9CA3AF" }, { x: 4, y: 0, color: "#9CA3AF" }, { x: 5, y: 0, color: "#9CA3AF" }, { x: 6, y: 0, color: "#9CA3AF" }, { x: 7, y: 0, color: "#9CA3AF" }, { x: 8, y: 0, color: "#9CA3AF" }, { x: 9, y: 0, color: "#9CA3AF" },
            { x: 0, y: 1, color: "#9CA3AF" }, { x: 1, y: 1, color: "#F3F4F6" }, { x: 2, y: 1, color: "#F3F4F6" }, { x: 3, y: 1, color: "#F3F4F6" }, { x: 4, y: 1, color: "#F3F4F6" }, { x: 5, y: 1, color: "#F3F4F6" }, { x: 6, y: 1, color: "#F3F4F6" }, { x: 7, y: 1, color: "#F3F4F6" }, { x: 8, y: 1, color: "#F3F4F6" }, { x: 9, y: 1, color: "#6B7280" },
            { x: 0, y: 2, color: "#9CA3AF" }, { x: 1, y: 2, color: "#F3F4F6" }, { x: 2, y: 2, color: "#D1D5DB" }, { x: 3, y: 2, color: "#D1D5DB" }, { x: 4, y: 2, color: "#D1D5DB" }, { x: 5, y: 2, color: "#D1D5DB" }, { x: 6, y: 2, color: "#D1D5DB" }, { x: 7, y: 2, color: "#F3F4F6" }, { x: 8, y: 2, color: "#F3F4F6" }, { x: 9, y: 2, color: "#6B7280" },
            { x: 0, y: 3, color: "#9CA3AF" }, { x: 1, y: 3, color: "#F3F4F6" }, { x: 2, y: 3, color: "#F3F4F6" }, { x: 3, y: 3, color: "#F3F4F6" }, { x: 4, y: 3, color: "#F3F4F6" }, { x: 5, y: 3, color: "#F3F4F6" }, { x: 6, y: 3, color: "#F3F4F6" }, { x: 7, y: 3, color: "#F3F4F6" }, { x: 8, y: 3, color: "#F3F4F6" }, { x: 9, y: 3, color: "#6B7280" },
            { x: 0, y: 4, color: "#4B5563" }, { x: 1, y: 4, color: "#4B5563" }, { x: 2, y: 4, color: "#4B5563" }, { x: 3, y: 4, color: "#4B5563" }, { x: 4, y: 4, color: "#4B5563" }, { x: 5, y: 4, color: "#4B5563" }, { x: 6, y: 4, color: "#4B5563" }, { x: 7, y: 4, color: "#4B5563" }, { x: 8, y: 4, color: "#4B5563" }, { x: 9, y: 4, color: "#4B5563" },
        ])
    },
    {
        id: "ui_btn_pressed",
        name: "Button (Pres)",
        category: "UI & Interface",
        width: 10,
        height: 5,
        data: createGrid(10, 5, [
            { x: 0, y: 0, color: "#4B5563" }, { x: 1, y: 0, color: "#4B5563" }, { x: 2, y: 0, color: "#4B5563" }, { x: 3, y: 0, color: "#4B5563" }, { x: 4, y: 0, color: "#4B5563" }, { x: 5, y: 0, color: "#4B5563" }, { x: 6, y: 0, color: "#4B5563" }, { x: 7, y: 0, color: "#4B5563" }, { x: 8, y: 0, color: "#4B5563" }, { x: 9, y: 0, color: "#4B5563" },
            { x: 0, y: 1, color: "#4B5563" }, { x: 1, y: 1, color: "#9CA3AF" }, { x: 2, y: 1, color: "#9CA3AF" }, { x: 3, y: 1, color: "#9CA3AF" }, { x: 4, y: 1, color: "#9CA3AF" }, { x: 5, y: 1, color: "#9CA3AF" }, { x: 6, y: 1, color: "#9CA3AF" }, { x: 7, y: 1, color: "#9CA3AF" }, { x: 8, y: 1, color: "#9CA3AF" }, { x: 9, y: 1, color: "#4B5563" },
            { x: 0, y: 2, color: "#4B5563" }, { x: 1, y: 2, color: "#9CA3AF" }, { x: 2, y: 2, color: "#D1D5DB" }, { x: 3, y: 2, color: "#D1D5DB" }, { x: 4, y: 2, color: "#D1D5DB" }, { x: 5, y: 2, color: "#D1D5DB" }, { x: 6, y: 2, color: "#D1D5DB" }, { x: 7, y: 2, color: "#9CA3AF" }, { x: 8, y: 2, color: "#9CA3AF" }, { x: 9, y: 2, color: "#4B5563" },
            { x: 0, y: 3, color: "#4B5563" }, { x: 1, y: 3, color: "#9CA3AF" }, { x: 2, y: 3, color: "#D1D5DB" }, { x: 3, y: 3, color: "#D1D5DB" }, { x: 4, y: 3, color: "#D1D5DB" }, { x: 5, y: 3, color: "#D1D5DB" }, { x: 6, y: 3, color: "#D1D5DB" }, { x: 7, y: 3, color: "#9CA3AF" }, { x: 8, y: 3, color: "#9CA3AF" }, { x: 9, y: 3, color: "#4B5563" },
            { x: 0, y: 4, color: "#4B5563" }, { x: 1, y: 4, color: "#4B5563" }, { x: 2, y: 4, color: "#4B5563" }, { x: 3, y: 4, color: "#4B5563" }, { x: 4, y: 4, color: "#4B5563" }, { x: 5, y: 4, color: "#4B5563" }, { x: 6, y: 4, color: "#4B5563" }, { x: 7, y: 4, color: "#4B5563" }, { x: 8, y: 4, color: "#4B5563" }, { x: 9, y: 4, color: "#4B5563" },
        ])
    },
    {
        id: "ui_checkbox_unchecked",
        name: "Checkbox (Off)",
        category: "UI & Interface",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 0, y: 0, color: "#374151" }, { x: 1, y: 0, color: "#374151" }, { x: 2, y: 0, color: "#374151" }, { x: 3, y: 0, color: "#374151" }, { x: 4, y: 0, color: "#374151" }, { x: 5, y: 0, color: "#374151" }, { x: 6, y: 0, color: "#374151" },
            { x: 0, y: 1, color: "#374151" }, { x: 1, y: 1, color: "#D1D5DB" }, { x: 2, y: 1, color: "#D1D5DB" }, { x: 3, y: 1, color: "#D1D5DB" }, { x: 4, y: 1, color: "#D1D5DB" }, { x: 5, y: 1, color: "#D1D5DB" }, { x: 6, y: 1, color: "#374151" },
            { x: 0, y: 2, color: "#374151" }, { x: 1, y: 2, color: "#D1D5DB" }, { x: 2, y: 2, color: "#F9FAFB" }, { x: 3, y: 2, color: "#F9FAFB" }, { x: 4, y: 2, color: "#F9FAFB" }, { x: 5, y: 2, color: "#D1D5DB" }, { x: 6, y: 2, color: "#374151" },
            { x: 0, y: 3, color: "#374151" }, { x: 1, y: 3, color: "#D1D5DB" }, { x: 2, y: 3, color: "#F9FAFB" }, { x: 3, y: 3, color: "#F9FAFB" }, { x: 4, y: 3, color: "#F9FAFB" }, { x: 5, y: 3, color: "#D1D5DB" }, { x: 6, y: 3, color: "#374151" },
            { x: 0, y: 4, color: "#374151" }, { x: 1, y: 4, color: "#D1D5DB" }, { x: 2, y: 4, color: "#F9FAFB" }, { x: 3, y: 4, color: "#F9FAFB" }, { x: 4, y: 4, color: "#F9FAFB" }, { x: 5, y: 4, color: "#D1D5DB" }, { x: 6, y: 4, color: "#374151" },
            { x: 0, y: 5, color: "#374151" }, { x: 1, y: 5, color: "#D1D5DB" }, { x: 2, y: 5, color: "#D1D5DB" }, { x: 3, y: 5, color: "#D1D5DB" }, { x: 4, y: 5, color: "#D1D5DB" }, { x: 5, y: 5, color: "#D1D5DB" }, { x: 6, y: 5, color: "#374151" },
            { x: 0, y: 6, color: "#374151" }, { x: 1, y: 6, color: "#374151" }, { x: 2, y: 6, color: "#374151" }, { x: 3, y: 6, color: "#374151" }, { x: 4, y: 6, color: "#374151" }, { x: 5, y: 6, color: "#374151" }, { x: 6, y: 6, color: "#374151" },
        ])
    },
    {
        id: "ui_checkbox_checked",
        name: "Checkbox (On)",
        category: "UI & Interface",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 0, y: 0, color: "#374151" }, { x: 1, y: 0, color: "#374151" }, { x: 2, y: 0, color: "#374151" }, { x: 3, y: 0, color: "#374151" }, { x: 4, y: 0, color: "#374151" }, { x: 5, y: 0, color: "#374151" }, { x: 6, y: 0, color: "#374151" },
            { x: 0, y: 1, color: "#374151" }, { x: 1, y: 1, color: "#F9FAFB" }, { x: 2, y: 1, color: "#F9FAFB" }, { x: 3, y: 1, color: "#F9FAFB" }, { x: 4, y: 1, color: "#F9FAFB" }, { x: 5, y: 1, color: "#F9FAFB" }, { x: 6, y: 1, color: "#374151" },
            { x: 0, y: 2, color: "#374151" }, { x: 1, y: 2, color: "#F9FAFB" }, { x: 2, y: 2, color: "#F9FAFB" }, { x: 3, y: 2, color: "#F9FAFB" }, { x: 4, y: 2, color: "#10B981" }, { x: 5, y: 2, color: "#F9FAFB" }, { x: 6, y: 2, color: "#374151" },
            { x: 0, y: 3, color: "#374151" }, { x: 1, y: 3, color: "#F9FAFB" }, { x: 2, y: 3, color: "#F9FAFB" }, { x: 3, y: 3, color: "#10B981" }, { x: 4, y: 3, color: "#10B981" }, { x: 5, y: 3, color: "#F9FAFB" }, { x: 6, y: 3, color: "#374151" },
            { x: 0, y: 4, color: "#374151" }, { x: 1, y: 4, color: "#10B981" }, { x: 2, y: 4, color: "#10B981" }, { x: 3, y: 4, color: "#10B981" }, { x: 4, y: 4, color: "#F9FAFB" }, { x: 5, y: 4, color: "#F9FAFB" }, { x: 6, y: 4, color: "#374151" },
            { x: 0, y: 5, color: "#374151" }, { x: 1, y: 5, color: "#F9FAFB" }, { x: 2, y: 5, color: "#10B981" }, { x: 3, y: 5, color: "#F9FAFB" }, { x: 4, y: 5, color: "#F9FAFB" }, { x: 5, y: 5, color: "#F9FAFB" }, { x: 6, y: 5, color: "#374151" },
            { x: 0, y: 6, color: "#374151" }, { x: 1, y: 6, color: "#374151" }, { x: 2, y: 6, color: "#374151" }, { x: 3, y: 6, color: "#374151" }, { x: 4, y: 6, color: "#374151" }, { x: 5, y: 6, color: "#374151" }, { x: 6, y: 6, color: "#374151" },
        ])
    },
    {
        id: "ui_radio_off",
        name: "Radio (Off)",
        category: "UI & Interface",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 2, y: 0, color: "#374151" }, { x: 3, y: 0, color: "#374151" }, { x: 4, y: 0, color: "#374151" },
            { x: 1, y: 1, color: "#374151" }, { x: 2, y: 1, color: "#D1D5DB" }, { x: 3, y: 1, color: "#D1D5DB" }, { x: 4, y: 1, color: "#D1D5DB" }, { x: 5, y: 1, color: "#374151" },
            { x: 0, y: 2, color: "#374151" }, { x: 1, y: 2, color: "#D1D5DB" }, { x: 2, y: 2, color: "#F9FAFB" }, { x: 3, y: 2, color: "#F9FAFB" }, { x: 4, y: 2, color: "#F9FAFB" }, { x: 5, y: 2, color: "#D1D5DB" }, { x: 6, y: 2, color: "#374151" },
            { x: 0, y: 3, color: "#374151" }, { x: 1, y: 3, color: "#D1D5DB" }, { x: 2, y: 3, color: "#F9FAFB" }, { x: 3, y: 3, color: "#F9FAFB" }, { x: 4, y: 3, color: "#F9FAFB" }, { x: 5, y: 3, color: "#D1D5DB" }, { x: 6, y: 3, color: "#374151" },
            { x: 0, y: 4, color: "#374151" }, { x: 1, y: 4, color: "#D1D5DB" }, { x: 2, y: 4, color: "#F9FAFB" }, { x: 3, y: 4, color: "#F9FAFB" }, { x: 4, y: 4, color: "#F9FAFB" }, { x: 5, y: 4, color: "#D1D5DB" }, { x: 6, y: 4, color: "#374151" },
            { x: 1, y: 5, color: "#374151" }, { x: 2, y: 5, color: "#D1D5DB" }, { x: 3, y: 5, color: "#D1D5DB" }, { x: 4, y: 5, color: "#D1D5DB" }, { x: 5, y: 5, color: "#374151" },
            { x: 2, y: 6, color: "#374151" }, { x: 3, y: 6, color: "#374151" }, { x: 4, y: 6, color: "#374151" },
        ])
    },
    {
        id: "ui_toggle_off",
        name: "Toggle (Off)",
        category: "UI & Interface",
        width: 10,
        height: 6,
        data: createGrid(10, 6, [
            { x: 2, y: 0, color: "#9CA3AF" }, { x: 3, y: 0, color: "#9CA3AF" }, { x: 4, y: 0, color: "#9CA3AF" }, { x: 5, y: 0, color: "#9CA3AF" }, { x: 6, y: 0, color: "#9CA3AF" }, { x: 7, y: 0, color: "#9CA3AF" },
            { x: 1, y: 1, color: "#9CA3AF" }, { x: 2, y: 1, color: "#E5E7EB" }, { x: 3, y: 1, color: "#E5E7EB" }, { x: 4, y: 1, color: "#E5E7EB" }, { x: 5, y: 1, color: "#E5E7EB" }, { x: 6, y: 1, color: "#E5E7EB" }, { x: 7, y: 1, color: "#E5E7EB" }, { x: 8, y: 1, color: "#9CA3AF" },
            { x: 0, y: 2, color: "#9CA3AF" }, { x: 1, y: 2, color: "#E5E7EB" }, { x: 2, y: 2, color: "#F9FAFB" }, { x: 3, y: 2, color: "#F9FAFB" }, { x: 4, y: 2, color: "#9CA3AF" }, { x: 5, y: 2, color: "#E5E7EB" }, { x: 6, y: 2, color: "#E5E7EB" }, { x: 7, y: 2, color: "#E5E7EB" }, { x: 8, y: 2, color: "#E5E7EB" }, { x: 9, y: 2, color: "#9CA3AF" },
            { x: 0, y: 3, color: "#9CA3AF" }, { x: 1, y: 3, color: "#E5E7EB" }, { x: 2, y: 3, color: "#F9FAFB" }, { x: 3, y: 3, color: "#F9FAFB" }, { x: 4, y: 3, color: "#9CA3AF" }, { x: 5, y: 3, color: "#E5E7EB" }, { x: 6, y: 3, color: "#E5E7EB" }, { x: 7, y: 3, color: "#E5E7EB" }, { x: 8, y: 3, color: "#E5E7EB" }, { x: 9, y: 3, color: "#9CA3AF" },
            { x: 1, y: 4, color: "#9CA3AF" }, { x: 2, y: 4, color: "#E5E7EB" }, { x: 3, y: 4, color: "#E5E7EB" }, { x: 4, y: 4, color: "#E5E7EB" }, { x: 5, y: 4, color: "#E5E7EB" }, { x: 6, y: 4, color: "#E5E7EB" }, { x: 7, y: 4, color: "#E5E7EB" }, { x: 8, y: 4, color: "#9CA3AF" },
            { x: 2, y: 5, color: "#9CA3AF" }, { x: 3, y: 5, color: "#9CA3AF" }, { x: 4, y: 5, color: "#9CA3AF" }, { x: 5, y: 5, color: "#9CA3AF" }, { x: 6, y: 5, color: "#9CA3AF" }, { x: 7, y: 5, color: "#9CA3AF" },
        ])
    },
    {
        id: "ui_toggle_on",
        name: "Toggle (On)",
        category: "UI & Interface",
        width: 10,
        height: 6,
        data: createGrid(10, 6, [
            { x: 2, y: 0, color: "#10B981" }, { x: 3, y: 0, color: "#10B981" }, { x: 4, y: 0, color: "#10B981" }, { x: 5, y: 0, color: "#10B981" }, { x: 6, y: 0, color: "#10B981" }, { x: 7, y: 0, color: "#10B981" },
            { x: 1, y: 1, color: "#10B981" }, { x: 2, y: 1, color: "#D1FAE5" }, { x: 3, y: 1, color: "#D1FAE5" }, { x: 4, y: 1, color: "#D1FAE5" }, { x: 5, y: 1, color: "#D1FAE5" }, { x: 6, y: 1, color: "#D1FAE5" }, { x: 7, y: 1, color: "#D1FAE5" }, { x: 8, y: 1, color: "#10B981" },
            { x: 0, y: 2, color: "#10B981" }, { x: 1, y: 2, color: "#D1FAE5" }, { x: 2, y: 2, color: "#D1FAE5" }, { x: 3, y: 2, color: "#D1FAE5" }, { x: 4, y: 2, color: "#D1FAE5" }, { x: 5, y: 2, color: "#10B981" }, { x: 6, y: 2, color: "#F9FAFB" }, { x: 7, y: 2, color: "#F9FAFB" }, { x: 8, y: 2, color: "#10B981" }, { x: 9, y: 2, color: "#10B981" },
            { x: 0, y: 3, color: "#10B981" }, { x: 1, y: 3, color: "#D1FAE5" }, { x: 2, y: 3, color: "#D1FAE5" }, { x: 3, y: 3, color: "#D1FAE5" }, { x: 4, y: 3, color: "#D1FAE5" }, { x: 5, y: 3, color: "#10B981" }, { x: 6, y: 3, color: "#F9FAFB" }, { x: 7, y: 3, color: "#F9FAFB" }, { x: 8, y: 3, color: "#10B981" }, { x: 9, y: 3, color: "#10B981" },
            { x: 1, y: 4, color: "#10B981" }, { x: 2, y: 4, color: "#D1FAE5" }, { x: 3, y: 4, color: "#D1FAE5" }, { x: 4, y: 4, color: "#D1FAE5" }, { x: 5, y: 4, color: "#D1FAE5" }, { x: 6, y: 4, color: "#D1FAE5" }, { x: 7, y: 4, color: "#D1FAE5" }, { x: 8, y: 4, color: "#10B981" },
            { x: 2, y: 5, color: "#10B981" }, { x: 3, y: 5, color: "#10B981" }, { x: 4, y: 5, color: "#10B981" }, { x: 5, y: 5, color: "#10B981" }, { x: 6, y: 5, color: "#10B981" }, { x: 7, y: 5, color: "#10B981" },
        ])
    },
    {
        id: "ui_slider",
        name: "Slider Bar",
        category: "UI & Interface",
        width: 12,
        height: 5,
        data: createGrid(12, 5, [
            { x: 0, y: 2, color: "#9CA3AF" }, { x: 1, y: 2, color: "#9CA3AF" }, { x: 2, y: 2, color: "#9CA3AF" }, { x: 3, y: 2, color: "#9CA3AF" }, { x: 4, y: 2, color: "#9CA3AF" }, { x: 5, y: 2, color: "#9CA3AF" }, { x: 6, y: 2, color: "#9CA3AF" }, { x: 7, y: 2, color: "#9CA3AF" }, { x: 8, y: 2, color: "#9CA3AF" }, { x: 9, y: 2, color: "#9CA3AF" }, { x: 10, y: 2, color: "#9CA3AF" }, { x: 11, y: 2, color: "#9CA3AF" },
            { x: 6, y: 0, color: "#3B82F6" }, { x: 7, y: 0, color: "#3B82F6" }, { x: 8, y: 0, color: "#3B82F6" },
            { x: 6, y: 1, color: "#3B82F6" }, { x: 7, y: 1, color: "#BFDBFE" }, { x: 8, y: 1, color: "#3B82F6" },
            { x: 6, y: 2, color: "#3B82F6" }, { x: 7, y: 2, color: "#BFDBFE" }, { x: 8, y: 2, color: "#3B82F6" },
            { x: 6, y: 3, color: "#3B82F6" }, { x: 7, y: 3, color: "#BFDBFE" }, { x: 8, y: 3, color: "#3B82F6" },
            { x: 6, y: 4, color: "#3B82F6" }, { x: 7, y: 4, color: "#3B82F6" }, { x: 8, y: 4, color: "#3B82F6" },
        ])
    },
    {
        id: "ui_progress_empty",
        name: "Progress (0%)",
        category: "UI & Interface",
        width: 12,
        height: 4,
        data: createGrid(12, 4, [
            { x: 0, y: 0, color: "#4B5563" }, { x: 1, y: 0, color: "#4B5563" }, { x: 2, y: 0, color: "#4B5563" }, { x: 3, y: 0, color: "#4B5563" }, { x: 4, y: 0, color: "#4B5563" }, { x: 5, y: 0, color: "#4B5563" }, { x: 6, y: 0, color: "#4B5563" }, { x: 7, y: 0, color: "#4B5563" }, { x: 8, y: 0, color: "#4B5563" }, { x: 9, y: 0, color: "#4B5563" }, { x: 10, y: 0, color: "#4B5563" }, { x: 11, y: 0, color: "#4B5563" },
            { x: 0, y: 1, color: "#4B5563" }, { x: 1, y: 1, color: "#1F2937" }, { x: 2, y: 1, color: "#1F2937" }, { x: 3, y: 1, color: "#1F2937" }, { x: 4, y: 1, color: "#1F2937" }, { x: 5, y: 1, color: "#1F2937" }, { x: 6, y: 1, color: "#1F2937" }, { x: 7, y: 1, color: "#1F2937" }, { x: 8, y: 1, color: "#1F2937" }, { x: 9, y: 1, color: "#1F2937" }, { x: 10, y: 1, color: "#1F2937" }, { x: 11, y: 1, color: "#4B5563" },
            { x: 0, y: 2, color: "#4B5563" }, { x: 1, y: 2, color: "#1F2937" }, { x: 2, y: 2, color: "#1F2937" }, { x: 3, y: 2, color: "#1F2937" }, { x: 4, y: 2, color: "#1F2937" }, { x: 5, y: 2, color: "#1F2937" }, { x: 6, y: 2, color: "#1F2937" }, { x: 7, y: 2, color: "#1F2937" }, { x: 8, y: 2, color: "#1F2937" }, { x: 9, y: 2, color: "#1F2937" }, { x: 10, y: 2, color: "#1F2937" }, { x: 11, y: 2, color: "#4B5563" },
            { x: 0, y: 3, color: "#4B5563" }, { x: 1, y: 3, color: "#4B5563" }, { x: 2, y: 3, color: "#4B5563" }, { x: 3, y: 3, color: "#4B5563" }, { x: 4, y: 3, color: "#4B5563" }, { x: 5, y: 3, color: "#4B5563" }, { x: 6, y: 3, color: "#4B5563" }, { x: 7, y: 3, color: "#4B5563" }, { x: 8, y: 3, color: "#4B5563" }, { x: 9, y: 3, color: "#4B5563" }, { x: 10, y: 3, color: "#4B5563" }, { x: 11, y: 3, color: "#4B5563" },
        ])
    },
    {
        id: "ui_progress_full",
        name: "Progress (100%)",
        category: "UI & Interface",
        width: 12,
        height: 4,
        data: createGrid(12, 4, [
            { x: 0, y: 0, color: "#4B5563" }, { x: 1, y: 0, color: "#4B5563" }, { x: 2, y: 0, color: "#4B5563" }, { x: 3, y: 0, color: "#4B5563" }, { x: 4, y: 0, color: "#4B5563" }, { x: 5, y: 0, color: "#4B5563" }, { x: 6, y: 0, color: "#4B5563" }, { x: 7, y: 0, color: "#4B5563" }, { x: 8, y: 0, color: "#4B5563" }, { x: 9, y: 0, color: "#4B5563" }, { x: 10, y: 0, color: "#4B5563" }, { x: 11, y: 0, color: "#4B5563" },
            { x: 0, y: 1, color: "#4B5563" }, { x: 1, y: 1, color: "#10B981" }, { x: 2, y: 1, color: "#10B981" }, { x: 3, y: 1, color: "#10B981" }, { x: 4, y: 1, color: "#10B981" }, { x: 5, y: 1, color: "#10B981" }, { x: 6, y: 1, color: "#10B981" }, { x: 7, y: 1, color: "#10B981" }, { x: 8, y: 1, color: "#10B981" }, { x: 9, y: 1, color: "#10B981" }, { x: 10, y: 1, color: "#10B981" }, { x: 11, y: 1, color: "#4B5563" },
            { x: 0, y: 2, color: "#4B5563" }, { x: 1, y: 2, color: "#10B981" }, { x: 2, y: 2, color: "#10B981" }, { x: 3, y: 2, color: "#10B981" }, { x: 4, y: 2, color: "#10B981" }, { x: 5, y: 2, color: "#10B981" }, { x: 6, y: 2, color: "#10B981" }, { x: 7, y: 2, color: "#10B981" }, { x: 8, y: 2, color: "#10B981" }, { x: 9, y: 2, color: "#10B981" }, { x: 10, y: 2, color: "#10B981" }, { x: 11, y: 2, color: "#4B5563" },
            { x: 0, y: 3, color: "#4B5563" }, { x: 1, y: 3, color: "#4B5563" }, { x: 2, y: 3, color: "#4B5563" }, { x: 3, y: 3, color: "#4B5563" }, { x: 4, y: 3, color: "#4B5563" }, { x: 5, y: 3, color: "#4B5563" }, { x: 6, y: 3, color: "#4B5563" }, { x: 7, y: 3, color: "#4B5563" }, { x: 8, y: 3, color: "#4B5563" }, { x: 9, y: 3, color: "#4B5563" }, { x: 10, y: 3, color: "#4B5563" }, { x: 11, y: 3, color: "#4B5563" },
        ])
    },
    {
        id: "ui_input",
        name: "Input Field",
        category: "UI & Interface",
        width: 12,
        height: 5,
        data: createGrid(12, 5, [
            { x: 0, y: 0, color: "#9CA3AF" }, { x: 1, y: 0, color: "#9CA3AF" }, { x: 2, y: 0, color: "#9CA3AF" }, { x: 3, y: 0, color: "#9CA3AF" }, { x: 4, y: 0, color: "#9CA3AF" }, { x: 5, y: 0, color: "#9CA3AF" }, { x: 6, y: 0, color: "#9CA3AF" }, { x: 7, y: 0, color: "#9CA3AF" }, { x: 8, y: 0, color: "#9CA3AF" }, { x: 9, y: 0, color: "#9CA3AF" }, { x: 10, y: 0, color: "#9CA3AF" }, { x: 11, y: 0, color: "#9CA3AF" },
            { x: 0, y: 1, color: "#9CA3AF" }, { x: 1, y: 1, color: "#FFFFFF" }, { x: 2, y: 1, color: "#FFFFFF" }, { x: 3, y: 1, color: "#FFFFFF" }, { x: 4, y: 1, color: "#FFFFFF" }, { x: 5, y: 1, color: "#FFFFFF" }, { x: 6, y: 1, color: "#FFFFFF" }, { x: 7, y: 1, color: "#FFFFFF" }, { x: 8, y: 1, color: "#FFFFFF" }, { x: 9, y: 1, color: "#FFFFFF" }, { x: 10, y: 1, color: "#FFFFFF" }, { x: 11, y: 1, color: "#9CA3AF" },
            { x: 0, y: 2, color: "#9CA3AF" }, { x: 1, y: 2, color: "#FFFFFF" }, { x: 2, y: 2, color: "#000000" }, { x: 3, y: 2, color: "#FFFFFF" }, { x: 4, y: 2, color: "#FFFFFF" }, { x: 5, y: 2, color: "#FFFFFF" }, { x: 6, y: 2, color: "#FFFFFF" }, { x: 7, y: 2, color: "#FFFFFF" }, { x: 8, y: 2, color: "#FFFFFF" }, { x: 9, y: 2, color: "#FFFFFF" }, { x: 10, y: 2, color: "#FFFFFF" }, { x: 11, y: 2, color: "#9CA3AF" },
            { x: 0, y: 3, color: "#9CA3AF" }, { x: 1, y: 3, color: "#FFFFFF" }, { x: 2, y: 3, color: "#000000" }, { x: 3, y: 3, color: "#FFFFFF" }, { x: 4, y: 3, color: "#FFFFFF" }, { x: 5, y: 3, color: "#FFFFFF" }, { x: 6, y: 3, color: "#FFFFFF" }, { x: 7, y: 3, color: "#FFFFFF" }, { x: 8, y: 3, color: "#FFFFFF" }, { x: 9, y: 3, color: "#FFFFFF" }, { x: 10, y: 3, color: "#FFFFFF" }, { x: 11, y: 3, color: "#9CA3AF" },
            { x: 0, y: 4, color: "#9CA3AF" }, { x: 1, y: 4, color: "#9CA3AF" }, { x: 2, y: 4, color: "#9CA3AF" }, { x: 3, y: 4, color: "#9CA3AF" }, { x: 4, y: 4, color: "#9CA3AF" }, { x: 5, y: 4, color: "#9CA3AF" }, { x: 6, y: 4, color: "#9CA3AF" }, { x: 7, y: 4, color: "#9CA3AF" }, { x: 8, y: 4, color: "#9CA3AF" }, { x: 9, y: 4, color: "#9CA3AF" }, { x: 10, y: 4, color: "#9CA3AF" }, { x: 11, y: 4, color: "#9CA3AF" },
        ])
    },
    {
        id: "ui_scroll",
        name: "Scrollbar",
        category: "UI & Interface",
        width: 5,
        height: 10,
        data: createGrid(5, 10, [
            { x: 0, y: 0, color: "#E5E7EB" }, { x: 1, y: 0, color: "#E5E7EB" }, { x: 2, y: 0, color: "#E5E7EB" }, { x: 3, y: 0, color: "#E5E7EB" }, { x: 4, y: 0, color: "#E5E7EB" },
            { x: 0, y: 1, color: "#E5E7EB" }, { x: 1, y: 1, color: "#9CA3AF" }, { x: 2, y: 1, color: "#9CA3AF" }, { x: 3, y: 1, color: "#9CA3AF" }, { x: 4, y: 1, color: "#E5E7EB" },
            { x: 0, y: 2, color: "#E5E7EB" }, { x: 1, y: 2, color: "#9CA3AF" }, { x: 2, y: 2, color: "#9CA3AF" }, { x: 3, y: 2, color: "#9CA3AF" }, { x: 4, y: 2, color: "#E5E7EB" },
            { x: 0, y: 3, color: "#E5E7EB" }, { x: 1, y: 3, color: "#9CA3AF" }, { x: 2, y: 3, color: "#9CA3AF" }, { x: 3, y: 3, color: "#9CA3AF" }, { x: 4, y: 3, color: "#E5E7EB" },
            { x: 0, y: 4, color: "#E5E7EB" }, { x: 1, y: 4, color: "#9CA3AF" }, { x: 2, y: 4, color: "#9CA3AF" }, { x: 3, y: 4, color: "#9CA3AF" }, { x: 4, y: 4, color: "#E5E7EB" },
            { x: 0, y: 5, color: "#E5E7EB" }, { x: 1, y: 5, color: "#E5E7EB" }, { x: 2, y: 5, color: "#E5E7EB" }, { x: 3, y: 5, color: "#E5E7EB" }, { x: 4, y: 5, color: "#E5E7EB" },
            { x: 0, y: 6, color: "#E5E7EB" }, { x: 1, y: 6, color: "#E5E7EB" }, { x: 2, y: 6, color: "#E5E7EB" }, { x: 3, y: 6, color: "#E5E7EB" }, { x: 4, y: 6, color: "#E5E7EB" },
            { x: 0, y: 7, color: "#E5E7EB" }, { x: 1, y: 7, color: "#E5E7EB" }, { x: 2, y: 7, color: "#E5E7EB" }, { x: 3, y: 7, color: "#E5E7EB" }, { x: 4, y: 7, color: "#E5E7EB" },
            { x: 0, y: 8, color: "#E5E7EB" }, { x: 1, y: 8, color: "#E5E7EB" }, { x: 2, y: 8, color: "#E5E7EB" }, { x: 3, y: 8, color: "#E5E7EB" }, { x: 4, y: 8, color: "#E5E7EB" },
            { x: 0, y: 9, color: "#E5E7EB" }, { x: 1, y: 9, color: "#E5E7EB" }, { x: 2, y: 9, color: "#E5E7EB" }, { x: 3, y: 9, color: "#E5E7EB" }, { x: 4, y: 9, color: "#E5E7EB" },
        ])
    },


    // --- Game HUD ---
    {
        id: "hud_heart",
        name: "Heart",
        category: "Game HUD",
        width: 7,
        height: 6,
        data: createGrid(7, 6, [
            { x: 1, y: 0, color: "#EF4444" }, { x: 2, y: 0, color: "#EF4444" }, { x: 4, y: 0, color: "#EF4444" }, { x: 5, y: 0, color: "#EF4444" },
            { x: 0, y: 1, color: "#EF4444" }, { x: 1, y: 1, color: "#EF4444" }, { x: 2, y: 1, color: "#EF4444" }, { x: 3, y: 1, color: "#EF4444" }, { x: 4, y: 1, color: "#EF4444" }, { x: 5, y: 1, color: "#EF4444" }, { x: 6, y: 1, color: "#EF4444" },
            { x: 0, y: 2, color: "#EF4444" }, { x: 1, y: 2, color: "#EF4444" }, { x: 2, y: 2, color: "#FCA5A5" }, { x: 3, y: 2, color: "#EF4444" }, { x: 4, y: 2, color: "#EF4444" }, { x: 5, y: 2, color: "#EF4444" }, { x: 6, y: 2, color: "#EF4444" },
            { x: 1, y: 3, color: "#EF4444" }, { x: 2, y: 3, color: "#EF4444" }, { x: 3, y: 3, color: "#EF4444" }, { x: 4, y: 3, color: "#EF4444" }, { x: 5, y: 3, color: "#EF4444" },
            { x: 2, y: 4, color: "#EF4444" }, { x: 3, y: 4, color: "#EF4444" }, { x: 4, y: 4, color: "#EF4444" },
            { x: 3, y: 5, color: "#EF4444" },
        ])
    },
    {
        id: "hud_coin",
        name: "Coin",
        category: "Game HUD",
        width: 6,
        height: 6,
        data: createGrid(6, 6, [
            { x: 2, y: 0, color: "#D97706" }, { x: 3, y: 0, color: "#D97706" },
            { x: 1, y: 1, color: "#D97706" }, { x: 4, y: 1, color: "#D97706" },
            { x: 0, y: 2, color: "#D97706" }, { x: 2, y: 2, color: "#FCD34D" }, { x: 5, y: 2, color: "#D97706" },
            { x: 0, y: 3, color: "#D97706" }, { x: 2, y: 3, color: "#FCD34D" }, { x: 5, y: 3, color: "#D97706" },
            { x: 1, y: 4, color: "#D97706" }, { x: 4, y: 4, color: "#D97706" },
            { x: 2, y: 5, color: "#D97706" }, { x: 3, y: 5, color: "#D97706" },
        ])
    },
    {
        id: "hud_star",
        name: "Star",
        category: "Game HUD",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 3, y: 0, color: "#EAB308" },
            { x: 2, y: 1, color: "#EAB308" }, { x: 3, y: 1, color: "#EAB308" }, { x: 4, y: 1, color: "#EAB308" },
            { x: 0, y: 2, color: "#EAB308" }, { x: 1, y: 2, color: "#EAB308" }, { x: 2, y: 2, color: "#EAB308" }, { x: 3, y: 2, color: "#EAB308" }, { x: 4, y: 2, color: "#EAB308" }, { x: 5, y: 2, color: "#EAB308" }, { x: 6, y: 2, color: "#EAB308" },
            { x: 1, y: 3, color: "#EAB308" }, { x: 2, y: 3, color: "#EAB308" }, { x: 3, y: 3, color: "#EAB308" }, { x: 4, y: 3, color: "#EAB308" }, { x: 5, y: 3, color: "#EAB308" },
            { x: 1, y: 4, color: "#EAB308" }, { x: 2, y: 4, color: "#EAB308" }, { x: 4, y: 4, color: "#EAB308" }, { x: 5, y: 4, color: "#EAB308" },
            { x: 0, y: 5, color: "#EAB308" }, { x: 1, y: 5, color: "#EAB308" }, { x: 5, y: 5, color: "#EAB308" }, { x: 6, y: 5, color: "#EAB308" },
        ])
    },
    {
        id: "hud_xp",
        name: "XP Bar Seg",
        category: "Game HUD",
        width: 8,
        height: 4,
        data: createGrid(8, 4, [
            { x: 0, y: 0, color: "#1F2937" }, { x: 1, y: 0, color: "#1F2937" }, { x: 2, y: 0, color: "#1F2937" }, { x: 3, y: 0, color: "#1F2937" }, { x: 4, y: 0, color: "#1F2937" }, { x: 5, y: 0, color: "#1F2937" }, { x: 6, y: 0, color: "#1F2937" }, { x: 7, y: 0, color: "#1F2937" },
            { x: 0, y: 1, color: "#1F2937" }, { x: 1, y: 1, color: "#3B82F6" }, { x: 2, y: 1, color: "#3B82F6" }, { x: 3, y: 1, color: "#3B82F6" }, { x: 4, y: 1, color: "#3B82F6" }, { x: 5, y: 1, color: "#3B82F6" }, { x: 6, y: 1, color: "#3B82F6" }, { x: 7, y: 1, color: "#1F2937" },
            { x: 0, y: 2, color: "#1F2937" }, { x: 1, y: 2, color: "#3B82F6" }, { x: 2, y: 2, color: "#60A5FA" }, { x: 3, y: 2, color: "#60A5FA" }, { x: 4, y: 2, color: "#60A5FA" }, { x: 5, y: 2, color: "#60A5FA" }, { x: 6, y: 2, color: "#3B82F6" }, { x: 7, y: 2, color: "#1F2937" },
            { x: 0, y: 3, color: "#1F2937" }, { x: 1, y: 3, color: "#1F2937" }, { x: 2, y: 3, color: "#1F2937" }, { x: 3, y: 3, color: "#1F2937" }, { x: 4, y: 3, color: "#1F2937" }, { x: 5, y: 3, color: "#1F2937" }, { x: 6, y: 3, color: "#1F2937" }, { x: 7, y: 3, color: "#1F2937" },
        ])
    },
    {
        id: "hud_timer",
        name: "Timer",
        category: "Game HUD",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 2, y: 0, color: "#374151" }, { x: 3, y: 0, color: "#374151" }, { x: 4, y: 0, color: "#374151" },
            { x: 1, y: 1, color: "#374151" }, { x: 2, y: 1, color: "#F9FAFB" }, { x: 3, y: 1, color: "#F9FAFB" }, { x: 4, y: 1, color: "#F9FAFB" }, { x: 5, y: 1, color: "#374151" },
            { x: 0, y: 2, color: "#374151" }, { x: 1, y: 2, color: "#F9FAFB" }, { x: 2, y: 2, color: "#F9FAFB" }, { x: 3, y: 2, color: "#374151" }, { x: 5, y: 2, color: "#F9FAFB" }, { x: 6, y: 2, color: "#374151" },
            { x: 0, y: 3, color: "#374151" }, { x: 1, y: 3, color: "#F9FAFB" }, { x: 2, y: 3, color: "#F9FAFB" }, { x: 3, y: 3, color: "#374151" }, { x: 5, y: 3, color: "#F9FAFB" }, { x: 6, y: 3, color: "#374151" },
            { x: 0, y: 4, color: "#374151" }, { x: 1, y: 4, color: "#F9FAFB" }, { x: 2, y: 4, color: "#F9FAFB" }, { x: 3, y: 4, color: "#F9FAFB" }, { x: 5, y: 4, color: "#F9FAFB" }, { x: 6, y: 4, color: "#374151" },
            { x: 1, y: 5, color: "#374151" }, { x: 5, y: 5, color: "#374151" },
            { x: 2, y: 6, color: "#374151" }, { x: 3, y: 6, color: "#374151" }, { x: 4, y: 6, color: "#374151" },
        ])
    },
    {
        id: "hud_pause",
        name: "Pause",
        category: "Game HUD",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 1, y: 0, color: "#F3F4F6" }, { x: 2, y: 0, color: "#F3F4F6" }, { x: 4, y: 0, color: "#F3F4F6" }, { x: 5, y: 0, color: "#F3F4F6" },
            { x: 1, y: 1, color: "#F3F4F6" }, { x: 2, y: 1, color: "#F3F4F6" }, { x: 4, y: 1, color: "#F3F4F6" }, { x: 5, y: 1, color: "#F3F4F6" },
            { x: 1, y: 2, color: "#F3F4F6" }, { x: 2, y: 2, color: "#F3F4F6" }, { x: 4, y: 2, color: "#F3F4F6" }, { x: 5, y: 2, color: "#F3F4F6" },
            { x: 1, y: 3, color: "#F3F4F6" }, { x: 2, y: 3, color: "#F3F4F6" }, { x: 4, y: 3, color: "#F3F4F6" }, { x: 5, y: 3, color: "#F3F4F6" },
            { x: 1, y: 4, color: "#F3F4F6" }, { x: 2, y: 4, color: "#F3F4F6" }, { x: 4, y: 4, color: "#F3F4F6" }, { x: 5, y: 4, color: "#F3F4F6" },
            { x: 1, y: 5, color: "#F3F4F6" }, { x: 2, y: 5, color: "#F3F4F6" }, { x: 4, y: 5, color: "#F3F4F6" }, { x: 5, y: 5, color: "#F3F4F6" },
            { x: 1, y: 6, color: "#F3F4F6" }, { x: 2, y: 6, color: "#F3F4F6" }, { x: 4, y: 6, color: "#F3F4F6" }, { x: 5, y: 6, color: "#F3F4F6" },
        ])
    },
    {
        id: "hud_play",
        name: "Play",
        category: "Game HUD",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 1, y: 0, color: "#22C55E" },
            { x: 1, y: 1, color: "#22C55E" }, { x: 2, y: 1, color: "#22C55E" },
            { x: 1, y: 2, color: "#22C55E" }, { x: 2, y: 2, color: "#22C55E" }, { x: 3, y: 2, color: "#22C55E" },
            { x: 1, y: 3, color: "#22C55E" }, { x: 2, y: 3, color: "#22C55E" }, { x: 3, y: 3, color: "#22C55E" }, { x: 4, y: 3, color: "#22C55E" },
            { x: 1, y: 4, color: "#22C55E" }, { x: 2, y: 4, color: "#22C55E" }, { x: 3, y: 4, color: "#22C55E" },
            { x: 1, y: 5, color: "#22C55E" }, { x: 2, y: 5, color: "#22C55E" },
            { x: 1, y: 6, color: "#22C55E" },
        ])
    },
    {
        id: "hud_slot",
        name: "Inv. Slot",
        category: "Game HUD",
        width: 8,
        height: 8,
        data: createGrid(8, 8, [
            { x: 0, y: 0, color: "#9CA3AF" }, { x: 1, y: 0, color: "#9CA3AF" }, { x: 2, y: 0, color: "#9CA3AF" }, { x: 3, y: 0, color: "#9CA3AF" }, { x: 4, y: 0, color: "#9CA3AF" }, { x: 5, y: 0, color: "#9CA3AF" }, { x: 6, y: 0, color: "#9CA3AF" }, { x: 7, y: 0, color: "#9CA3AF" },
            { x: 0, y: 1, color: "#9CA3AF" }, { x: 1, y: 1, color: "#374151" }, { x: 2, y: 1, color: "#374151" }, { x: 3, y: 1, color: "#374151" }, { x: 4, y: 1, color: "#374151" }, { x: 5, y: 1, color: "#374151" }, { x: 6, y: 1, color: "#374151" }, { x: 7, y: 1, color: "#9CA3AF" },
            { x: 0, y: 2, color: "#9CA3AF" }, { x: 1, y: 2, color: "#374151" }, { x: 2, y: 2, color: "#1F2937" }, { x: 3, y: 2, color: "#1F2937" }, { x: 4, y: 2, color: "#1F2937" }, { x: 5, y: 2, color: "#1F2937" }, { x: 6, y: 2, color: "#374151" }, { x: 7, y: 2, color: "#9CA3AF" },
            { x: 0, y: 3, color: "#9CA3AF" }, { x: 1, y: 3, color: "#374151" }, { x: 2, y: 3, color: "#1F2937" }, { x: 3, y: 3, color: "#1F2937" }, { x: 4, y: 3, color: "#1F2937" }, { x: 5, y: 3, color: "#1F2937" }, { x: 6, y: 3, color: "#374151" }, { x: 7, y: 3, color: "#9CA3AF" },
            { x: 0, y: 4, color: "#9CA3AF" }, { x: 1, y: 4, color: "#374151" }, { x: 2, y: 4, color: "#1F2937" }, { x: 3, y: 4, color: "#1F2937" }, { x: 4, y: 4, color: "#1F2937" }, { x: 5, y: 4, color: "#1F2937" }, { x: 6, y: 4, color: "#374151" }, { x: 7, y: 4, color: "#9CA3AF" },
            { x: 0, y: 5, color: "#9CA3AF" }, { x: 1, y: 5, color: "#374151" }, { x: 2, y: 5, color: "#1F2937" }, { x: 3, y: 5, color: "#1F2937" }, { x: 4, y: 5, color: "#1F2937" }, { x: 5, y: 5, color: "#1F2937" }, { x: 6, y: 5, color: "#374151" }, { x: 7, y: 5, color: "#9CA3AF" },
            { x: 0, y: 6, color: "#9CA3AF" }, { x: 1, y: 6, color: "#374151" }, { x: 2, y: 6, color: "#374151" }, { x: 3, y: 6, color: "#374151" }, { x: 4, y: 6, color: "#374151" }, { x: 5, y: 6, color: "#374151" }, { x: 6, y: 6, color: "#374151" }, { x: 7, y: 6, color: "#9CA3AF" },
            { x: 0, y: 7, color: "#9CA3AF" }, { x: 1, y: 7, color: "#9CA3AF" }, { x: 2, y: 7, color: "#9CA3AF" }, { x: 3, y: 7, color: "#9CA3AF" }, { x: 4, y: 7, color: "#9CA3AF" }, { x: 5, y: 7, color: "#9CA3AF" }, { x: 6, y: 7, color: "#9CA3AF" }, { x: 7, y: 7, color: "#9CA3AF" },
        ])
    },
    // --- Environment ---
    {
        id: "env_ground",
        name: "Ground Tile",
        category: "Environment",
        width: 8,
        height: 8,
        data: createGrid(8, 8, [
            { x: 0, y: 0, color: "#10B981" }, { x: 1, y: 0, color: "#10B981" }, { x: 2, y: 0, color: "#10B981" }, { x: 3, y: 0, color: "#10B981" }, { x: 4, y: 0, color: "#10B981" }, { x: 5, y: 0, color: "#10B981" }, { x: 6, y: 0, color: "#10B981" }, { x: 7, y: 0, color: "#10B981" },
            { x: 0, y: 1, color: "#10B981" }, { x: 1, y: 1, color: "#059669" }, { x: 2, y: 1, color: "#10B981" }, { x: 3, y: 1, color: "#059669" }, { x: 4, y: 1, color: "#10B981" }, { x: 5, y: 1, color: "#059669" }, { x: 6, y: 1, color: "#10B981" }, { x: 7, y: 1, color: "#059669" },
            { x: 0, y: 2, color: "#78350F" }, { x: 1, y: 2, color: "#78350F" }, { x: 2, y: 2, color: "#78350F" }, { x: 3, y: 2, color: "#78350F" }, { x: 4, y: 2, color: "#78350F" }, { x: 5, y: 2, color: "#78350F" }, { x: 6, y: 2, color: "#78350F" }, { x: 7, y: 2, color: "#78350F" },
            { x: 0, y: 3, color: "#92400E" }, { x: 1, y: 3, color: "#78350F" }, { x: 2, y: 3, color: "#78350F" }, { x: 3, y: 3, color: "#92400E" }, { x: 4, y: 3, color: "#92400E" }, { x: 5, y: 3, color: "#78350F" }, { x: 6, y: 3, color: "#78350F" }, { x: 7, y: 3, color: "#92400E" },
            { x: 0, y: 4, color: "#78350F" }, { x: 1, y: 4, color: "#92400E" }, { x: 2, y: 4, color: "#92400E" }, { x: 3, y: 4, color: "#78350F" }, { x: 4, y: 4, color: "#78350F" }, { x: 5, y: 4, color: "#92400E" }, { x: 6, y: 4, color: "#92400E" }, { x: 7, y: 4, color: "#78350F" },
            { x: 0, y: 5, color: "#78350F" }, { x: 1, y: 5, color: "#78350F" }, { x: 2, y: 5, color: "#92400E" }, { x: 3, y: 5, color: "#92400E" }, { x: 4, y: 5, color: "#92400E" }, { x: 5, y: 5, color: "#92400E" }, { x: 6, y: 5, color: "#78350F" }, { x: 7, y: 5, color: "#78350F" },
            { x: 0, y: 6, color: "#5D2606" }, { x: 1, y: 6, color: "#78350F" }, { x: 2, y: 6, color: "#78350F" }, { x: 3, y: 6, color: "#78350F" }, { x: 4, y: 6, color: "#78350F" }, { x: 5, y: 6, color: "#78350F" }, { x: 6, y: 6, color: "#78350F" }, { x: 7, y: 6, color: "#5D2606" },
            { x: 0, y: 7, color: "#451A03" }, { x: 1, y: 7, color: "#5D2606" }, { x: 2, y: 7, color: "#5D2606" }, { x: 3, y: 7, color: "#5D2606" }, { x: 4, y: 7, color: "#5D2606" }, { x: 5, y: 7, color: "#5D2606" }, { x: 6, y: 7, color: "#5D2606" }, { x: 7, y: 7, color: "#451A03" },
        ])
    },
    {
        id: "env_water",
        name: "Water Tile",
        category: "Environment",
        width: 8,
        height: 8,
        data: createGrid(8, 8, [
            { x: 0, y: 0, color: "#3B82F6" }, { x: 1, y: 0, color: "#3B82F6" }, { x: 2, y: 0, color: "#3B82F6" }, { x: 3, y: 0, color: "#3B82F6" }, { x: 4, y: 0, color: "#3B82F6" }, { x: 5, y: 0, color: "#3B82F6" }, { x: 6, y: 0, color: "#3B82F6" }, { x: 7, y: 0, color: "#3B82F6" },
            { x: 0, y: 1, color: "#3B82F6" }, { x: 1, y: 1, color: "#60A5FA" }, { x: 2, y: 1, color: "#60A5FA" }, { x: 3, y: 1, color: "#3B82F6" }, { x: 4, y: 1, color: "#3B82F6" }, { x: 5, y: 1, color: "#60A5FA" }, { x: 6, y: 1, color: "#60A5FA" }, { x: 7, y: 1, color: "#3B82F6" },
            { x: 0, y: 2, color: "#3B82F6" }, { x: 1, y: 2, color: "#3B82F6" }, { x: 2, y: 2, color: "#3B82F6" }, { x: 3, y: 2, color: "#60A5FA" }, { x: 4, y: 2, color: "#60A5FA" }, { x: 5, y: 2, color: "#3B82F6" }, { x: 6, y: 2, color: "#3B82F6" }, { x: 7, y: 2, color: "#3B82F6" },
            { x: 0, y: 3, color: "#2563EB" }, { x: 1, y: 3, color: "#3B82F6" }, { x: 2, y: 3, color: "#3B82F6" }, { x: 3, y: 3, color: "#3B82F6" }, { x: 4, y: 3, color: "#3B82F6" }, { x: 5, y: 3, color: "#3B82F6" }, { x: 6, y: 3, color: "#3B82F6" }, { x: 7, y: 3, color: "#2563EB" },
            { x: 0, y: 4, color: "#2563EB" }, { x: 1, y: 4, color: "#2563EB" }, { x: 2, y: 4, color: "#2563EB" }, { x: 3, y: 4, color: "#2563EB" }, { x: 4, y: 4, color: "#2563EB" }, { x: 5, y: 4, color: "#2563EB" }, { x: 6, y: 4, color: "#2563EB" }, { x: 7, y: 4, color: "#2563EB" },
            { x: 0, y: 5, color: "#2563EB" }, { x: 1, y: 5, color: "#3B82F6" }, { x: 2, y: 5, color: "#3B82F6" }, { x: 3, y: 5, color: "#2563EB" }, { x: 4, y: 5, color: "#2563EB" }, { x: 5, y: 5, color: "#3B82F6" }, { x: 6, y: 5, color: "#3B82F6" }, { x: 7, y: 5, color: "#2563EB" },
            { x: 0, y: 6, color: "#1D4ED8" }, { x: 1, y: 6, color: "#1D4ED8" }, { x: 2, y: 6, color: "#1D4ED8" }, { x: 3, y: 6, color: "#1D4ED8" }, { x: 4, y: 6, color: "#1D4ED8" }, { x: 5, y: 6, color: "#1D4ED8" }, { x: 6, y: 6, color: "#1D4ED8" }, { x: 7, y: 6, color: "#1D4ED8" },
            { x: 0, y: 7, color: "#1E3A8A" }, { x: 1, y: 7, color: "#1D4ED8" }, { x: 2, y: 7, color: "#1D4ED8" }, { x: 3, y: 7, color: "#1D4ED8" }, { x: 4, y: 7, color: "#1D4ED8" }, { x: 5, y: 7, color: "#1D4ED8" }, { x: 6, y: 7, color: "#1D4ED8" }, { x: 7, y: 7, color: "#1E3A8A" },
        ])
    },
    {
        id: "env_wall",
        name: "Brick Wall",
        category: "Environment",
        width: 8,
        height: 8,
        data: createGrid(8, 8, [
            { x: 0, y: 0, color: "#9CA3AF" }, { x: 1, y: 0, color: "#9CA3AF" }, { x: 2, y: 0, color: "#9CA3AF" }, { x: 3, y: 0, color: "#4B5563" }, { x: 4, y: 0, color: "#9CA3AF" }, { x: 5, y: 0, color: "#9CA3AF" }, { x: 6, y: 0, color: "#9CA3AF" }, { x: 7, y: 0, color: "#4B5563" },
            { x: 0, y: 1, color: "#9CA3AF" }, { x: 1, y: 1, color: "#D1D5DB" }, { x: 2, y: 1, color: "#9CA3AF" }, { x: 3, y: 1, color: "#4B5563" }, { x: 4, y: 1, color: "#9CA3AF" }, { x: 5, y: 1, color: "#D1D5DB" }, { x: 6, y: 1, color: "#9CA3AF" }, { x: 7, y: 1, color: "#4B5563" },
            { x: 0, y: 2, color: "#9CA3AF" }, { x: 1, y: 2, color: "#9CA3AF" }, { x: 2, y: 2, color: "#9CA3AF" }, { x: 3, y: 2, color: "#4B5563" }, { x: 4, y: 2, color: "#9CA3AF" }, { x: 5, y: 2, color: "#9CA3AF" }, { x: 6, y: 2, color: "#9CA3AF" }, { x: 7, y: 2, color: "#4B5563" },
            { x: 0, y: 3, color: "#4B5563" }, { x: 1, y: 3, color: "#4B5563" }, { x: 2, y: 3, color: "#4B5563" }, { x: 3, y: 3, color: "#4B5563" }, { x: 4, y: 3, color: "#4B5563" }, { x: 5, y: 3, color: "#4B5563" }, { x: 6, y: 3, color: "#4B5563" }, { x: 7, y: 3, color: "#4B5563" },
            { x: 0, y: 4, color: "#4B5563" }, { x: 1, y: 4, color: "#9CA3AF" }, { x: 2, y: 4, color: "#9CA3AF" }, { x: 3, y: 4, color: "#9CA3AF" }, { x: 4, y: 4, color: "#4B5563" }, { x: 5, y: 4, color: "#9CA3AF" }, { x: 6, y: 4, color: "#9CA3AF" }, { x: 7, y: 4, color: "#9CA3AF" },
            { x: 0, y: 5, color: "#4B5563" }, { x: 1, y: 5, color: "#9CA3AF" }, { x: 2, y: 5, color: "#D1D5DB" }, { x: 3, y: 5, color: "#9CA3AF" }, { x: 4, y: 5, color: "#4B5563" }, { x: 5, y: 5, color: "#9CA3AF" }, { x: 6, y: 5, color: "#D1D5DB" }, { x: 7, y: 5, color: "#9CA3AF" },
            { x: 0, y: 6, color: "#4B5563" }, { x: 1, y: 6, color: "#9CA3AF" }, { x: 2, y: 6, color: "#9CA3AF" }, { x: 3, y: 6, color: "#9CA3AF" }, { x: 4, y: 6, color: "#4B5563" }, { x: 5, y: 6, color: "#9CA3AF" }, { x: 6, y: 6, color: "#9CA3AF" }, { x: 7, y: 6, color: "#9CA3AF" },
            { x: 0, y: 7, color: "#4B5563" }, { x: 1, y: 7, color: "#4B5563" }, { x: 2, y: 7, color: "#4B5563" }, { x: 3, y: 7, color: "#4B5563" }, { x: 4, y: 7, color: "#4B5563" }, { x: 5, y: 7, color: "#4B5563" }, { x: 6, y: 7, color: "#4B5563" }, { x: 7, y: 7, color: "#4B5563" },
        ])
    },
    {
        id: "env_door",
        name: "Door Frame",
        category: "Environment",
        width: 8,
        height: 8,
        data: createGrid(8, 8, [
            { x: 0, y: 0, color: "#78350F" }, { x: 1, y: 0, color: "#78350F" }, { x: 2, y: 0, color: "#78350F" }, { x: 3, y: 0, color: "#78350F" }, { x: 4, y: 0, color: "#78350F" }, { x: 5, y: 0, color: "#78350F" }, { x: 6, y: 0, color: "#78350F" }, { x: 7, y: 0, color: "#78350F" },
            { x: 0, y: 1, color: "#78350F" }, { x: 1, y: 1, color: "#92400E" }, { x: 2, y: 1, color: "#92400E" }, { x: 3, y: 1, color: "#92400E" }, { x: 4, y: 1, color: "#92400E" }, { x: 5, y: 1, color: "#92400E" }, { x: 6, y: 1, color: "#92400E" }, { x: 7, y: 1, color: "#78350F" },
            { x: 0, y: 2, color: "#78350F" }, { x: 1, y: 2, color: "#92400E" }, { x: 2, y: 2, color: "#451A03" }, { x: 3, y: 2, color: "#5D2606" }, { x: 4, y: 2, color: "#5D2606" }, { x: 5, y: 2, color: "#5D2606" }, { x: 6, y: 2, color: "#92400E" }, { x: 7, y: 2, color: "#78350F" },
            { x: 0, y: 3, color: "#78350F" }, { x: 1, y: 3, color: "#92400E" }, { x: 2, y: 3, color: "#451A03" }, { x: 3, y: 3, color: "#5D2606" }, { x: 4, y: 3, color: "#5D2606" }, { x: 5, y: 3, color: "#5D2606" }, { x: 6, y: 3, color: "#92400E" }, { x: 7, y: 3, color: "#78350F" },
            { x: 0, y: 4, color: "#78350F" }, { x: 1, y: 4, color: "#92400E" }, { x: 2, y: 4, color: "#451A03" }, { x: 3, y: 4, color: "#5D2606" }, { x: 4, y: 4, color: "#FCD34D" }, { x: 5, y: 4, color: "#5D2606" }, { x: 6, y: 4, color: "#92400E" }, { x: 7, y: 4, color: "#78350F" },
            { x: 0, y: 5, color: "#78350F" }, { x: 1, y: 5, color: "#92400E" }, { x: 2, y: 5, color: "#451A03" }, { x: 3, y: 5, color: "#5D2606" }, { x: 4, y: 5, color: "#5D2606" }, { x: 5, y: 5, color: "#5D2606" }, { x: 6, y: 5, color: "#92400E" }, { x: 7, y: 5, color: "#78350F" },
            { x: 0, y: 6, color: "#78350F" }, { x: 1, y: 6, color: "#92400E" }, { x: 2, y: 6, color: "#451A03" }, { x: 3, y: 6, color: "#5D2606" }, { x: 4, y: 6, color: "#5D2606" }, { x: 5, y: 6, color: "#5D2606" }, { x: 6, y: 6, color: "#92400E" }, { x: 7, y: 6, color: "#78350F" },
            { x: 0, y: 7, color: "#78350F" }, { x: 1, y: 7, color: "#92400E" }, { x: 2, y: 7, color: "#451A03" }, { x: 3, y: 7, color: "#5D2606" }, { x: 4, y: 7, color: "#5D2606" }, { x: 5, y: 7, color: "#5D2606" }, { x: 6, y: 7, color: "#92400E" }, { x: 7, y: 7, color: "#78350F" },
        ])
    },

    // --- Characters ---
    {
        id: "char_smile",
        name: "Smile",
        category: "Characters",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 2, y: 0, color: "#FACC15" }, { x: 3, y: 0, color: "#FACC15" }, { x: 4, y: 0, color: "#FACC15" },
            { x: 1, y: 1, color: "#FACC15" }, { x: 5, y: 1, color: "#FACC15" },
            { x: 0, y: 2, color: "#FACC15" }, { x: 2, y: 2, color: "#000000" }, { x: 4, y: 2, color: "#000000" }, { x: 6, y: 2, color: "#FACC15" },
            { x: 0, y: 3, color: "#FACC15" }, { x: 6, y: 3, color: "#FACC15" },
            { x: 0, y: 4, color: "#FACC15" }, { x: 2, y: 4, color: "#000000" }, { x: 4, y: 4, color: "#000000" }, { x: 6, y: 4, color: "#FACC15" },
            { x: 1, y: 5, color: "#FACC15" }, { x: 3, y: 5, color: "#000000" }, { x: 5, y: 5, color: "#FACC15" },
            { x: 2, y: 6, color: "#FACC15" }, { x: 3, y: 6, color: "#FACC15" }, { x: 4, y: 6, color: "#FACC15" },
        ])
    },
    {
        id: "char_ghost",
        name: "Ghost",
        category: "Characters",
        width: 8,
        height: 8,
        data: createGrid(8, 8, [
            { x: 2, y: 0, color: "#F3F4F6" }, { x: 3, y: 0, color: "#F3F4F6" }, { x: 4, y: 0, color: "#F3F4F6" }, { x: 5, y: 0, color: "#F3F4F6" },
            { x: 1, y: 1, color: "#F3F4F6" }, { x: 6, y: 1, color: "#F3F4F6" },
            { x: 0, y: 2, color: "#F3F4F6" }, { x: 2, y: 2, color: "#000000" }, { x: 5, y: 2, color: "#000000" }, { x: 7, y: 2, color: "#F3F4F6" },
            { x: 0, y: 3, color: "#F3F4F6" }, { x: 7, y: 3, color: "#F3F4F6" },
            { x: 0, y: 4, color: "#F3F4F6" }, { x: 7, y: 4, color: "#F3F4F6" },
            { x: 0, y: 5, color: "#F3F4F6" }, { x: 7, y: 5, color: "#F3F4F6" },
            { x: 0, y: 6, color: "#F3F4F6" }, { x: 2, y: 6, color: "#F3F4F6" }, { x: 3, y: 6, color: "#F3F4F6" }, { x: 4, y: 6, color: "#F3F4F6" }, { x: 5, y: 6, color: "#F3F4F6" }, { x: 7, y: 6, color: "#F3F4F6" },
            { x: 0, y: 7, color: "#F3F4F6" }, { x: 2, y: 7, color: "#F3F4F6" }, { x: 5, y: 7, color: "#F3F4F6" }, { x: 7, y: 7, color: "#F3F4F6" },
        ])
    },
    {
        id: "char_eye_open",
        name: "Eye (Open)",
        category: "Characters",
        width: 6,
        height: 5,
        data: createGrid(6, 5, [
            { x: 1, y: 0, color: "#000000" }, { x: 2, y: 0, color: "#000000" }, { x: 3, y: 0, color: "#000000" }, { x: 4, y: 0, color: "#000000" },
            { x: 0, y: 1, color: "#000000" }, { x: 1, y: 1, color: "#FFFFFF" }, { x: 2, y: 1, color: "#FFFFFF" }, { x: 3, y: 1, color: "#FFFFFF" }, { x: 4, y: 1, color: "#FFFFFF" }, { x: 5, y: 1, color: "#000000" },
            { x: 0, y: 2, color: "#000000" }, { x: 1, y: 2, color: "#FFFFFF" }, { x: 2, y: 2, color: "#3B82F6" }, { x: 3, y: 2, color: "#3B82F6" }, { x: 4, y: 2, color: "#FFFFFF" }, { x: 5, y: 2, color: "#000000" },
            { x: 0, y: 3, color: "#000000" }, { x: 1, y: 3, color: "#FFFFFF" }, { x: 2, y: 3, color: "#FFFFFF" }, { x: 3, y: 3, color: "#FFFFFF" }, { x: 4, y: 3, color: "#FFFFFF" }, { x: 5, y: 3, color: "#000000" },
            { x: 1, y: 4, color: "#000000" }, { x: 2, y: 4, color: "#000000" }, { x: 3, y: 4, color: "#000000" }, { x: 4, y: 4, color: "#000000" },
        ])
    },
    {
        id: "fx_spark",
        name: "Hit Spark",
        category: "Effects",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 0, y: 0, color: "#FCD34D" }, { x: 6, y: 0, color: "#FCD34D" },
            { x: 3, y: 1, color: "#FCD34D" },
            { x: 2, y: 2, color: "#FCD34D" }, { x: 4, y: 2, color: "#FCD34D" },
            { x: 1, y: 3, color: "#FCD34D" }, { x: 5, y: 3, color: "#FCD34D" },
            { x: 2, y: 4, color: "#FCD34D" }, { x: 4, y: 4, color: "#FCD34D" },
            { x: 3, y: 5, color: "#FCD34D" },
            { x: 0, y: 6, color: "#FCD34D" }, { x: 6, y: 6, color: "#FCD34D" },
        ])
    },
    {
        id: "fx_smoke",
        name: "Dust Puff",
        category: "Effects",
        width: 7,
        height: 7,
        data: createGrid(7, 7, [
            { x: 2, y: 1, color: "#E5E7EB" }, { x: 3, y: 1, color: "#E5E7EB" }, { x: 4, y: 1, color: "#E5E7EB" },
            { x: 1, y: 2, color: "#E5E7EB" }, { x: 5, y: 2, color: "#E5E7EB" },
            { x: 0, y: 3, color: "#E5E7EB" }, { x: 2, y: 3, color: "#D1D5DB" }, { x: 6, y: 3, color: "#E5E7EB" },
            { x: 1, y: 4, color: "#E5E7EB" }, { x: 5, y: 4, color: "#E5E7EB" },
            { x: 2, y: 5, color: "#E5E7EB" }, { x: 3, y: 5, color: "#E5E7EB" }, { x: 4, y: 5, color: "#E5E7EB" },
        ])
    },

    {
        id: "solana_flat",
        name: "Solana Flat",
        category: "Solana",
        width: 28,
        height: 24,
        data: createGrid(28, 24, [
            { x: 6, y: 2, color: "#00C2FF" }, { x: 7, y: 2, color: "#01C4F9" }, { x: 8, y: 2, color: "#02C6F3" }, { x: 9, y: 2, color: "#03C9EE" }, { x: 10, y: 2, color: "#04CBE8" }, { x: 11, y: 2, color: "#05CEE3" }, { x: 12, y: 2, color: "#06D0DD" }, { x: 13, y: 2, color: "#07D3D7" },
            { x: 14, y: 2, color: "#08D5D2" }, { x: 15, y: 2, color: "#09D8CC" }, { x: 16, y: 2, color: "#0ADAC7" }, { x: 17, y: 2, color: "#0BDDC1" }, { x: 18, y: 2, color: "#0CDFBC" }, { x: 19, y: 2, color: "#0DE2B6" }, { x: 20, y: 2, color: "#0EE4B0" }, { x: 21, y: 2, color: "#0FE7AB" },
            { x: 22, y: 2, color: "#10E9A5" }, { x: 23, y: 2, color: "#11ECA0" }, { x: 24, y: 2, color: "#12EE9A" }, { x: 25, y: 2, color: "#14F195" }, { x: 4, y: 3, color: "#00C2FF" }, { x: 5, y: 3, color: "#01C4F9" }, { x: 6, y: 3, color: "#02C6F3" }, { x: 7, y: 3, color: "#03C9EE" },
            { x: 8, y: 3, color: "#04CBE8" }, { x: 9, y: 3, color: "#05CEE3" }, { x: 10, y: 3, color: "#06D0DD" }, { x: 11, y: 3, color: "#07D3D7" }, { x: 12, y: 3, color: "#08D5D2" }, { x: 13, y: 3, color: "#09D8CC" }, { x: 14, y: 3, color: "#0ADAC7" }, { x: 15, y: 3, color: "#0BDDC1" },
            { x: 16, y: 3, color: "#0CDFBC" }, { x: 17, y: 3, color: "#0DE2B6" }, { x: 18, y: 3, color: "#0EE4B0" }, { x: 19, y: 3, color: "#0FE7AB" }, { x: 20, y: 3, color: "#10E9A5" }, { x: 21, y: 3, color: "#11ECA0" }, { x: 22, y: 3, color: "#12EE9A" }, { x: 23, y: 3, color: "#14F195" },
            { x: 2, y: 4, color: "#00C2FF" }, { x: 3, y: 4, color: "#01C4F9" }, { x: 4, y: 4, color: "#02C6F3" }, { x: 5, y: 4, color: "#03C9EE" }, { x: 6, y: 4, color: "#04CBE8" }, { x: 7, y: 4, color: "#05CEE3" }, { x: 8, y: 4, color: "#06D0DD" }, { x: 9, y: 4, color: "#07D3D7" },
            { x: 10, y: 4, color: "#08D5D2" }, { x: 11, y: 4, color: "#09D8CC" }, { x: 12, y: 4, color: "#0ADAC7" }, { x: 13, y: 4, color: "#0BDDC1" }, { x: 14, y: 4, color: "#0CDFBC" }, { x: 15, y: 4, color: "#0DE2B6" }, { x: 16, y: 4, color: "#0EE4B0" }, { x: 17, y: 4, color: "#0FE7AB" },
            { x: 18, y: 4, color: "#10E9A5" }, { x: 19, y: 4, color: "#11ECA0" }, { x: 20, y: 4, color: "#12EE9A" }, { x: 21, y: 4, color: "#14F195" }, { x: 0, y: 5, color: "#00C2FF" }, { x: 1, y: 5, color: "#01C4F9" }, { x: 2, y: 5, color: "#02C6F3" }, { x: 3, y: 5, color: "#03C9EE" },
            { x: 4, y: 5, color: "#04CBE8" }, { x: 5, y: 5, color: "#05CEE3" }, { x: 6, y: 5, color: "#06D0DD" }, { x: 7, y: 5, color: "#07D3D7" }, { x: 8, y: 5, color: "#08D5D2" }, { x: 9, y: 5, color: "#09D8CC" }, { x: 10, y: 5, color: "#0ADAC7" }, { x: 11, y: 5, color: "#0BDDC1" },
            { x: 12, y: 5, color: "#0CDFBC" }, { x: 13, y: 5, color: "#0DE2B6" }, { x: 14, y: 5, color: "#0EE4B0" }, { x: 15, y: 5, color: "#0FE7AB" }, { x: 16, y: 5, color: "#10E9A5" }, { x: 17, y: 5, color: "#11ECA0" }, { x: 18, y: 5, color: "#12EE9A" }, { x: 19, y: 5, color: "#14F195" },
            { x: 0, y: 10, color: "#9945FF" }, { x: 1, y: 10, color: "#904BFF" }, { x: 2, y: 10, color: "#8852FF" }, { x: 3, y: 10, color: "#8058FF" }, { x: 4, y: 10, color: "#785FFF" }, { x: 5, y: 10, color: "#7065FF" }, { x: 6, y: 10, color: "#686CFF" }, { x: 7, y: 10, color: "#6073FF" },
            { x: 8, y: 10, color: "#5879FF" }, { x: 9, y: 10, color: "#5080FF" }, { x: 10, y: 10, color: "#4886FF" }, { x: 11, y: 10, color: "#408DFF" }, { x: 12, y: 10, color: "#3893FF" }, { x: 13, y: 10, color: "#309AFF" }, { x: 14, y: 10, color: "#28A1FF" }, { x: 15, y: 10, color: "#20A7FF" },
            { x: 16, y: 10, color: "#18AEFF" }, { x: 17, y: 10, color: "#10B4FF" }, { x: 18, y: 10, color: "#08BBFF" }, { x: 19, y: 10, color: "#00C2FF" }, { x: 2, y: 11, color: "#9945FF" }, { x: 3, y: 11, color: "#904BFF" }, { x: 4, y: 11, color: "#8852FF" }, { x: 5, y: 11, color: "#8058FF" },
            { x: 6, y: 11, color: "#785FFF" }, { x: 7, y: 11, color: "#7065FF" }, { x: 8, y: 11, color: "#686CFF" }, { x: 9, y: 11, color: "#6073FF" }, { x: 10, y: 11, color: "#5879FF" }, { x: 11, y: 11, color: "#5080FF" }, { x: 12, y: 11, color: "#4886FF" }, { x: 13, y: 11, color: "#408DFF" },
            { x: 14, y: 11, color: "#3893FF" }, { x: 15, y: 11, color: "#309AFF" }, { x: 16, y: 11, color: "#28A1FF" }, { x: 17, y: 11, color: "#20A7FF" }, { x: 18, y: 11, color: "#18AEFF" }, { x: 19, y: 11, color: "#10B4FF" }, { x: 20, y: 11, color: "#08BBFF" }, { x: 21, y: 11, color: "#00C2FF" },
            { x: 4, y: 12, color: "#9945FF" }, { x: 5, y: 12, color: "#904BFF" }, { x: 6, y: 12, color: "#8852FF" }, { x: 7, y: 12, color: "#8058FF" }, { x: 8, y: 12, color: "#785FFF" }, { x: 9, y: 12, color: "#7065FF" }, { x: 10, y: 12, color: "#686CFF" }, { x: 11, y: 12, color: "#6073FF" },
            { x: 12, y: 12, color: "#5879FF" }, { x: 13, y: 12, color: "#5080FF" }, { x: 14, y: 12, color: "#4886FF" }, { x: 15, y: 12, color: "#408DFF" }, { x: 16, y: 12, color: "#3893FF" }, { x: 17, y: 12, color: "#309AFF" }, { x: 18, y: 12, color: "#28A1FF" }, { x: 19, y: 12, color: "#20A7FF" },
            { x: 20, y: 12, color: "#18AEFF" }, { x: 21, y: 12, color: "#10B4FF" }, { x: 22, y: 12, color: "#08BBFF" }, { x: 23, y: 12, color: "#00C2FF" }, { x: 6, y: 13, color: "#9945FF" }, { x: 7, y: 13, color: "#904BFF" }, { x: 8, y: 13, color: "#8852FF" }, { x: 9, y: 13, color: "#8058FF" },
            { x: 10, y: 13, color: "#785FFF" }, { x: 11, y: 13, color: "#7065FF" }, { x: 12, y: 13, color: "#686CFF" }, { x: 13, y: 13, color: "#6073FF" }, { x: 14, y: 13, color: "#5879FF" }, { x: 15, y: 13, color: "#5080FF" }, { x: 16, y: 13, color: "#4886FF" }, { x: 17, y: 13, color: "#408DFF" },
            { x: 18, y: 13, color: "#3893FF" }, { x: 19, y: 13, color: "#309AFF" }, { x: 20, y: 13, color: "#28A1FF" }, { x: 21, y: 13, color: "#20A7FF" }, { x: 22, y: 13, color: "#18AEFF" }, { x: 23, y: 13, color: "#10B4FF" }, { x: 24, y: 13, color: "#08BBFF" }, { x: 25, y: 13, color: "#00C2FF" },
            { x: 6, y: 18, color: "#9945FF" }, { x: 7, y: 18, color: "#904BFF" }, { x: 8, y: 18, color: "#8852FF" }, { x: 9, y: 18, color: "#8058FF" }, { x: 10, y: 18, color: "#785FFF" }, { x: 11, y: 18, color: "#7065FF" }, { x: 12, y: 18, color: "#686CFF" }, { x: 13, y: 18, color: "#6073FF" },
            { x: 14, y: 18, color: "#5879FF" }, { x: 15, y: 18, color: "#5080FF" }, { x: 16, y: 18, color: "#4886FF" }, { x: 17, y: 18, color: "#408DFF" }, { x: 18, y: 18, color: "#3893FF" }, { x: 19, y: 18, color: "#309AFF" }, { x: 20, y: 18, color: "#28A1FF" }, { x: 21, y: 18, color: "#20A7FF" },
            { x: 22, y: 18, color: "#18AEFF" }, { x: 23, y: 18, color: "#10B4FF" }, { x: 24, y: 18, color: "#08BBFF" }, { x: 25, y: 18, color: "#00C2FF" }, { x: 4, y: 19, color: "#9945FF" }, { x: 5, y: 19, color: "#904BFF" }, { x: 6, y: 19, color: "#8852FF" }, { x: 7, y: 19, color: "#8058FF" },
            { x: 8, y: 19, color: "#785FFF" }, { x: 9, y: 19, color: "#7065FF" }, { x: 10, y: 19, color: "#686CFF" }, { x: 11, y: 19, color: "#6073FF" }, { x: 12, y: 19, color: "#5879FF" }, { x: 13, y: 19, color: "#5080FF" }, { x: 14, y: 19, color: "#4886FF" }, { x: 15, y: 19, color: "#408DFF" },
            { x: 16, y: 19, color: "#3893FF" }, { x: 17, y: 19, color: "#309AFF" }, { x: 18, y: 19, color: "#28A1FF" }, { x: 19, y: 19, color: "#20A7FF" }, { x: 20, y: 19, color: "#18AEFF" }, { x: 21, y: 19, color: "#10B4FF" }, { x: 22, y: 19, color: "#08BBFF" }, { x: 23, y: 19, color: "#00C2FF" },
            { x: 2, y: 20, color: "#9945FF" }, { x: 3, y: 20, color: "#904BFF" }, { x: 4, y: 20, color: "#8852FF" }, { x: 5, y: 20, color: "#8058FF" }, { x: 6, y: 20, color: "#785FFF" }, { x: 7, y: 20, color: "#7065FF" }, { x: 8, y: 20, color: "#686CFF" }, { x: 9, y: 20, color: "#6073FF" },
            { x: 10, y: 20, color: "#5879FF" }, { x: 11, y: 20, color: "#5080FF" }, { x: 12, y: 20, color: "#4886FF" }, { x: 13, y: 20, color: "#408DFF" }, { x: 14, y: 20, color: "#3893FF" }, { x: 15, y: 20, color: "#309AFF" }, { x: 16, y: 20, color: "#28A1FF" }, { x: 17, y: 20, color: "#20A7FF" },
            { x: 18, y: 20, color: "#18AEFF" }, { x: 19, y: 20, color: "#10B4FF" }, { x: 20, y: 20, color: "#08BBFF" }, { x: 21, y: 20, color: "#00C2FF" }, { x: 0, y: 21, color: "#9945FF" }, { x: 1, y: 21, color: "#904BFF" }, { x: 2, y: 21, color: "#8852FF" }, { x: 3, y: 21, color: "#8058FF" },
            { x: 4, y: 21, color: "#785FFF" }, { x: 5, y: 21, color: "#7065FF" }, { x: 6, y: 21, color: "#686CFF" }, { x: 7, y: 21, color: "#6073FF" }, { x: 8, y: 21, color: "#5879FF" }, { x: 9, y: 21, color: "#5080FF" }, { x: 10, y: 21, color: "#4886FF" }, { x: 11, y: 21, color: "#408DFF" },
            { x: 12, y: 21, color: "#3893FF" }, { x: 13, y: 21, color: "#309AFF" }, { x: 14, y: 21, color: "#28A1FF" }, { x: 15, y: 21, color: "#20A7FF" }, { x: 16, y: 21, color: "#18AEFF" }, { x: 17, y: 21, color: "#10B4FF" }, { x: 18, y: 21, color: "#08BBFF" }, { x: 19, y: 21, color: "#00C2FF" }
        ])
    }
    ,

    {
        id: "solana_3d",
        name: "Solana 3D",
        category: "Solana",
        width: 28,
        height: 24,
        data: createGrid(28, 24, [
            { x: 6, y: 2, color: "#009999" }, { x: 7, y: 2, color: "#009999" }, { x: 8, y: 2, color: "#03FFFF" }, { x: 9, y: 2, color: "#04FFFF" }, { x: 10, y: 2, color: "#06FFFF" }, { x: 11, y: 2, color: "#07FFFF" }, { x: 12, y: 2, color: "#09FFFF" }, { x: 13, y: 2, color: "#0AFFFF" },
            { x: 14, y: 2, color: "#0CFFFF" }, { x: 15, y: 2, color: "#0DFFFF" }, { x: 16, y: 2, color: "#0FFFFF" }, { x: 17, y: 2, color: "#10FFFF" }, { x: 18, y: 2, color: "#12FFFF" }, { x: 19, y: 2, color: "#13FFFF" }, { x: 20, y: 2, color: "#15FFFF" }, { x: 21, y: 2, color: "#16FFFF" },
            { x: 22, y: 2, color: "#18FFF7" }, { x: 23, y: 2, color: "#19FFF0" }, { x: 24, y: 2, color: "#10998A" }, { x: 25, y: 2, color: "#129985" }, { x: 4, y: 3, color: "#007499" }, { x: 5, y: 3, color: "#007595" }, { x: 6, y: 3, color: "#02C6F3" }, { x: 7, y: 3, color: "#03C9EE" },
            { x: 8, y: 3, color: "#04CBE8" }, { x: 9, y: 3, color: "#05CEE3" }, { x: 10, y: 3, color: "#06D0DD" }, { x: 11, y: 3, color: "#07D3D7" }, { x: 12, y: 3, color: "#08D5D2" }, { x: 13, y: 3, color: "#09D8CC" }, { x: 14, y: 3, color: "#0ADAC7" }, { x: 15, y: 3, color: "#0BDDC1" },
            { x: 16, y: 3, color: "#0CDFBC" }, { x: 17, y: 3, color: "#0DE2B6" }, { x: 18, y: 3, color: "#0EE4B0" }, { x: 19, y: 3, color: "#0FE7AB" }, { x: 20, y: 3, color: "#10E9A5" }, { x: 21, y: 3, color: "#11ECA0" }, { x: 22, y: 3, color: "#0A8E5C" }, { x: 23, y: 3, color: "#0C9059" },
            { x: 2, y: 4, color: "#007499" }, { x: 3, y: 4, color: "#007595" }, { x: 4, y: 4, color: "#02C6F3" }, { x: 5, y: 4, color: "#03C9EE" }, { x: 6, y: 4, color: "#04CBE8" }, { x: 7, y: 4, color: "#05CEE3" }, { x: 8, y: 4, color: "#06D0DD" }, { x: 9, y: 4, color: "#07D3D7" },
            { x: 10, y: 4, color: "#08D5D2" }, { x: 11, y: 4, color: "#09D8CC" }, { x: 12, y: 4, color: "#0ADAC7" }, { x: 13, y: 4, color: "#0BDDC1" }, { x: 14, y: 4, color: "#0CDFBC" }, { x: 15, y: 4, color: "#0DE2B6" }, { x: 16, y: 4, color: "#0EE4B0" }, { x: 17, y: 4, color: "#0FE7AB" },
            { x: 18, y: 4, color: "#10E9A5" }, { x: 19, y: 4, color: "#11ECA0" }, { x: 20, y: 4, color: "#0A8E5C" }, { x: 21, y: 4, color: "#0C9059" }, { x: 0, y: 5, color: "#00516A" }, { x: 1, y: 5, color: "#005268" }, { x: 2, y: 5, color: "#018AAA" }, { x: 3, y: 5, color: "#028CA6" },
            { x: 4, y: 5, color: "#028EA2" }, { x: 5, y: 5, color: "#03909E" }, { x: 6, y: 5, color: "#04919A" }, { x: 7, y: 5, color: "#049396" }, { x: 8, y: 5, color: "#059593" }, { x: 9, y: 5, color: "#06978E" }, { x: 10, y: 5, color: "#07988B" }, { x: 11, y: 5, color: "#079A87" },
            { x: 12, y: 5, color: "#089C83" }, { x: 13, y: 5, color: "#099E7F" }, { x: 14, y: 5, color: "#099F7B" }, { x: 15, y: 5, color: "#0AA177" }, { x: 16, y: 5, color: "#0BA373" }, { x: 17, y: 5, color: "#0BA570" }, { x: 18, y: 5, color: "#076340" }, { x: 19, y: 5, color: "#08643E" },
            { x: 0, y: 10, color: "#893D99" }, { x: 1, y: 10, color: "#814399" }, { x: 2, y: 10, color: "#CC7BFF" }, { x: 3, y: 10, color: "#C084FF" }, { x: 4, y: 10, color: "#B48EFF" }, { x: 5, y: 10, color: "#A897FF" }, { x: 6, y: 10, color: "#9CA2FF" }, { x: 7, y: 10, color: "#90ACFF" },
            { x: 8, y: 10, color: "#84B5FF" }, { x: 9, y: 10, color: "#78C0FF" }, { x: 10, y: 10, color: "#6CC9FF" }, { x: 11, y: 10, color: "#60D3FF" }, { x: 12, y: 10, color: "#54DCFF" }, { x: 13, y: 10, color: "#48E7FF" }, { x: 14, y: 10, color: "#3CF1FF" }, { x: 15, y: 10, color: "#30FAFF" },
            { x: 16, y: 10, color: "#24FFFF" }, { x: 17, y: 10, color: "#18FFFF" }, { x: 18, y: 10, color: "#079999" }, { x: 19, y: 10, color: "#009999" }, { x: 2, y: 11, color: "#5B2999" }, { x: 3, y: 11, color: "#562D99" }, { x: 4, y: 11, color: "#8852FF" }, { x: 5, y: 11, color: "#8058FF" },
            { x: 6, y: 11, color: "#785FFF" }, { x: 7, y: 11, color: "#7065FF" }, { x: 8, y: 11, color: "#686CFF" }, { x: 9, y: 11, color: "#6073FF" }, { x: 10, y: 11, color: "#5879FF" }, { x: 11, y: 11, color: "#5080FF" }, { x: 12, y: 11, color: "#4886FF" }, { x: 13, y: 11, color: "#408DFF" },
            { x: 14, y: 11, color: "#3893FF" }, { x: 15, y: 11, color: "#309AFF" }, { x: 16, y: 11, color: "#28A1FF" }, { x: 17, y: 11, color: "#20A7FF" }, { x: 18, y: 11, color: "#18AEFF" }, { x: 19, y: 11, color: "#10B4FF" }, { x: 20, y: 11, color: "#047099" }, { x: 21, y: 11, color: "#007499" },
            { x: 4, y: 12, color: "#5B2999" }, { x: 5, y: 12, color: "#562D99" }, { x: 6, y: 12, color: "#8852FF" }, { x: 7, y: 12, color: "#8058FF" }, { x: 8, y: 12, color: "#785FFF" }, { x: 9, y: 12, color: "#7065FF" }, { x: 10, y: 12, color: "#686CFF" }, { x: 11, y: 12, color: "#6073FF" },
            { x: 12, y: 12, color: "#5879FF" }, { x: 13, y: 12, color: "#5080FF" }, { x: 14, y: 12, color: "#4886FF" }, { x: 15, y: 12, color: "#408DFF" }, { x: 16, y: 12, color: "#3893FF" }, { x: 17, y: 12, color: "#309AFF" }, { x: 18, y: 12, color: "#28A1FF" }, { x: 19, y: 12, color: "#20A7FF" },
            { x: 20, y: 12, color: "#18AEFF" }, { x: 21, y: 12, color: "#10B4FF" }, { x: 22, y: 12, color: "#047099" }, { x: 23, y: 12, color: "#007499" }, { x: 6, y: 13, color: "#401C6A" }, { x: 7, y: 13, color: "#3C1F6A" }, { x: 8, y: 13, color: "#5F39B2" }, { x: 9, y: 13, color: "#593DB2" },
            { x: 10, y: 13, color: "#5442B2" }, { x: 11, y: 13, color: "#4E46B2" }, { x: 12, y: 13, color: "#484BB2" }, { x: 13, y: 13, color: "#4350B2" }, { x: 14, y: 13, color: "#3D54B2" }, { x: 15, y: 13, color: "#3859B2" }, { x: 16, y: 13, color: "#325DB2" }, { x: 17, y: 13, color: "#2C62B2" },
            { x: 18, y: 13, color: "#2766B2" }, { x: 19, y: 13, color: "#216BB2" }, { x: 20, y: 13, color: "#1C70B2" }, { x: 21, y: 13, color: "#1674B2" }, { x: 22, y: 13, color: "#1079B2" }, { x: 23, y: 13, color: "#0B7DB2" }, { x: 24, y: 13, color: "#034E6A" }, { x: 25, y: 13, color: "#00516A" },
            { x: 6, y: 18, color: "#893D99" }, { x: 7, y: 18, color: "#814399" }, { x: 8, y: 18, color: "#CC7BFF" }, { x: 9, y: 18, color: "#C084FF" }, { x: 10, y: 18, color: "#B48EFF" }, { x: 11, y: 18, color: "#A897FF" }, { x: 12, y: 18, color: "#9CA2FF" }, { x: 13, y: 18, color: "#90ACFF" },
            { x: 14, y: 18, color: "#84B5FF" }, { x: 15, y: 18, color: "#78C0FF" }, { x: 16, y: 18, color: "#6CC9FF" }, { x: 17, y: 18, color: "#60D3FF" }, { x: 18, y: 18, color: "#54DCFF" }, { x: 19, y: 18, color: "#48E7FF" }, { x: 20, y: 18, color: "#3CF1FF" }, { x: 21, y: 18, color: "#30FAFF" },
            { x: 22, y: 18, color: "#24FFFF" }, { x: 23, y: 18, color: "#18FFFF" }, { x: 24, y: 18, color: "#079999" }, { x: 25, y: 18, color: "#009999" }, { x: 4, y: 19, color: "#5B2999" }, { x: 5, y: 19, color: "#562D99" }, { x: 6, y: 19, color: "#8852FF" }, { x: 7, y: 19, color: "#8058FF" },
            { x: 8, y: 19, color: "#785FFF" }, { x: 9, y: 19, color: "#7065FF" }, { x: 10, y: 19, color: "#686CFF" }, { x: 11, y: 19, color: "#6073FF" }, { x: 12, y: 19, color: "#5879FF" }, { x: 13, y: 19, color: "#5080FF" }, { x: 14, y: 19, color: "#4886FF" }, { x: 15, y: 19, color: "#408DFF" },
            { x: 16, y: 19, color: "#3893FF" }, { x: 17, y: 19, color: "#309AFF" }, { x: 18, y: 19, color: "#28A1FF" }, { x: 19, y: 19, color: "#20A7FF" }, { x: 20, y: 19, color: "#18AEFF" }, { x: 21, y: 19, color: "#10B4FF" }, { x: 22, y: 19, color: "#047099" }, { x: 23, y: 19, color: "#007499" },
            { x: 2, y: 20, color: "#5B2999" }, { x: 3, y: 20, color: "#562D99" }, { x: 4, y: 20, color: "#8852FF" }, { x: 5, y: 20, color: "#8058FF" }, { x: 6, y: 20, color: "#785FFF" }, { x: 7, y: 20, color: "#7065FF" }, { x: 8, y: 20, color: "#686CFF" }, { x: 9, y: 20, color: "#6073FF" },
            { x: 10, y: 20, color: "#5879FF" }, { x: 11, y: 20, color: "#5080FF" }, { x: 12, y: 20, color: "#4886FF" }, { x: 13, y: 20, color: "#408DFF" }, { x: 14, y: 20, color: "#3893FF" }, { x: 15, y: 20, color: "#309AFF" }, { x: 16, y: 20, color: "#28A1FF" }, { x: 17, y: 20, color: "#20A7FF" },
            { x: 18, y: 20, color: "#18AEFF" }, { x: 19, y: 20, color: "#10B4FF" }, { x: 20, y: 20, color: "#047099" }, { x: 21, y: 20, color: "#007499" }, { x: 0, y: 21, color: "#401C6A" }, { x: 1, y: 21, color: "#3C1F6A" }, { x: 2, y: 21, color: "#5F39B2" }, { x: 3, y: 21, color: "#593DB2" },
            { x: 4, y: 21, color: "#5442B2" }, { x: 5, y: 21, color: "#4E46B2" }, { x: 6, y: 21, color: "#484BB2" }, { x: 7, y: 21, color: "#4350B2" }, { x: 8, y: 21, color: "#3D54B2" }, { x: 9, y: 21, color: "#3859B2" }, { x: 10, y: 21, color: "#325DB2" }, { x: 11, y: 21, color: "#2C62B2" },
            { x: 12, y: 21, color: "#2766B2" }, { x: 13, y: 21, color: "#216BB2" }, { x: 14, y: 21, color: "#1C70B2" }, { x: 15, y: 21, color: "#1674B2" }, { x: 16, y: 21, color: "#1079B2" }, { x: 17, y: 21, color: "#0B7DB2" }, { x: 18, y: 21, color: "#034E6A" }, { x: 19, y: 21, color: "#00516A" }
        ])
    }
    ,

];
