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
    // --- Seeker (Solana) ---
    {
        id: "seeker_white",
        name: "Seeker Logo (W)",
        category: "Seeker",
        width: 12,
        height: 10,
        data: createGrid(12, 10, [
            // Bar 1 (Top)
            { x: 2, y: 1, color: "#FFFFFF" }, { x: 3, y: 1, color: "#FFFFFF" }, { x: 4, y: 1, color: "#FFFFFF" }, { x: 5, y: 1, color: "#FFFFFF" }, { x: 6, y: 1, color: "#FFFFFF" }, { x: 7, y: 1, color: "#FFFFFF" }, { x: 8, y: 1, color: "#FFFFFF" },
            { x: 1, y: 2, color: "#FFFFFF" }, { x: 2, y: 2, color: "#FFFFFF" }, { x: 3, y: 2, color: "#FFFFFF" }, { x: 4, y: 2, color: "#FFFFFF" }, { x: 5, y: 2, color: "#FFFFFF" }, { x: 6, y: 2, color: "#FFFFFF" }, { x: 7, y: 2, color: "#FFFFFF" },
            // Bar 2 (Middle)
            { x: 3, y: 4, color: "#FFFFFF" }, { x: 4, y: 4, color: "#FFFFFF" }, { x: 5, y: 4, color: "#FFFFFF" }, { x: 6, y: 4, color: "#FFFFFF" }, { x: 7, y: 4, color: "#FFFFFF" }, { x: 8, y: 4, color: "#FFFFFF" }, { x: 9, y: 4, color: "#FFFFFF" },
            { x: 2, y: 5, color: "#FFFFFF" }, { x: 3, y: 5, color: "#FFFFFF" }, { x: 4, y: 5, color: "#FFFFFF" }, { x: 5, y: 5, color: "#FFFFFF" }, { x: 6, y: 5, color: "#FFFFFF" }, { x: 7, y: 5, color: "#FFFFFF" }, { x: 8, y: 5, color: "#FFFFFF" },
            // Bar 3 (Bottom)
            { x: 4, y: 7, color: "#FFFFFF" }, { x: 5, y: 7, color: "#FFFFFF" }, { x: 6, y: 7, color: "#FFFFFF" }, { x: 7, y: 7, color: "#FFFFFF" }, { x: 8, y: 7, color: "#FFFFFF" }, { x: 9, y: 7, color: "#FFFFFF" }, { x: 10, y: 7, color: "#FFFFFF" },
            { x: 3, y: 8, color: "#FFFFFF" }, { x: 4, y: 8, color: "#FFFFFF" }, { x: 5, y: 8, color: "#FFFFFF" }, { x: 6, y: 8, color: "#FFFFFF" }, { x: 7, y: 8, color: "#FFFFFF" }, { x: 8, y: 8, color: "#FFFFFF" }, { x: 9, y: 8, color: "#FFFFFF" }
        ])
    },
    {
        id: "seeker_gradient",
        name: "Seeker Logo (G)",
        category: "Seeker",
        width: 12,
        height: 10,
        data: createGrid(12, 10, [
            // Bar 1 (Top - Teal)
            { x: 2, y: 1, color: "#14F195" }, { x: 3, y: 1, color: "#14F195" }, { x: 4, y: 1, color: "#14F195" }, { x: 5, y: 1, color: "#14F195" }, { x: 6, y: 1, color: "#14F195" }, { x: 7, y: 1, color: "#14F195" }, { x: 8, y: 1, color: "#14F195" },
            { x: 1, y: 2, color: "#14F195" }, { x: 2, y: 2, color: "#14F195" }, { x: 3, y: 2, color: "#14F195" }, { x: 4, y: 2, color: "#14F195" }, { x: 5, y: 2, color: "#14F195" }, { x: 6, y: 2, color: "#14F195" }, { x: 7, y: 2, color: "#14F195" },
            // Bar 2 (Middle - Blue)
            { x: 3, y: 4, color: "#00C2FF" }, { x: 4, y: 4, color: "#00C2FF" }, { x: 5, y: 4, color: "#00C2FF" }, { x: 6, y: 4, color: "#00C2FF" }, { x: 7, y: 4, color: "#00C2FF" }, { x: 8, y: 4, color: "#00C2FF" }, { x: 9, y: 4, color: "#00C2FF" },
            { x: 2, y: 5, color: "#00C2FF" }, { x: 3, y: 5, color: "#00C2FF" }, { x: 4, y: 5, color: "#00C2FF" }, { x: 5, y: 5, color: "#00C2FF" }, { x: 6, y: 5, color: "#00C2FF" }, { x: 7, y: 5, color: "#00C2FF" }, { x: 8, y: 5, color: "#00C2FF" },
            // Bar 3 (Bottom - Purple)
            { x: 4, y: 7, color: "#9945FF" }, { x: 5, y: 7, color: "#9945FF" }, { x: 6, y: 7, color: "#9945FF" }, { x: 7, y: 7, color: "#9945FF" }, { x: 8, y: 7, color: "#9945FF" }, { x: 9, y: 7, color: "#9945FF" }, { x: 10, y: 7, color: "#9945FF" },
            { x: 3, y: 8, color: "#9945FF" }, { x: 4, y: 8, color: "#9945FF" }, { x: 5, y: 8, color: "#9945FF" }, { x: 6, y: 8, color: "#9945FF" }, { x: 7, y: 8, color: "#9945FF" }, { x: 8, y: 8, color: "#9945FF" }, { x: 9, y: 8, color: "#9945FF" }
        ])
    },
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
];
