import type { DitherPattern } from "@/types/pixel-art";

/**
 * Bayer matrix 2x2
 */
const BAYER_2X2 = [
  [0, 2],
  [3, 1],
];

/**
 * Bayer matrix 4x4
 */
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/**
 * Bayer matrix 8x8
 */
const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/**
 * Get Bayer matrix by pattern
 */
function getBayerMatrix(pattern: DitherPattern): number[][] {
  switch (pattern) {
    case "bayer2x2":
      return BAYER_2X2;
    case "bayer4x4":
      return BAYER_4X4;
    case "bayer8x8":
      return BAYER_8X8;
  }
}

/**
 * Get threshold value from Bayer matrix
 */
export function getBayerThreshold(
  x: number,
  y: number,
  pattern: DitherPattern
): number {
  const matrix = getBayerMatrix(pattern);
  const size = matrix.length;
  const maxValue = size * size;
  
  const threshold = matrix[y % size][x % size];
  return threshold / maxValue;
}

/**
 * Apply dithering to determine if pixel should be drawn
 */
export function shouldDrawDithered(
  x: number,
  y: number,
  pattern: DitherPattern,
  density: number = 0.5
): boolean {
  const threshold = getBayerThreshold(x, y, pattern);
  return threshold < density;
}

/**
 * Get dither pattern size
 */
export function getDitherPatternSize(pattern: DitherPattern): number {
  switch (pattern) {
    case "bayer2x2":
      return 2;
    case "bayer4x4":
      return 4;
    case "bayer8x8":
      return 8;
  }
}
