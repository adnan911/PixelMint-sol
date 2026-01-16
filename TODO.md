# Task: Build Advanced Pixel Art Drawing Web Application with Layer System and Color Management

## Plan
- [x] Step 1: Create type definitions and data models (Completed)
  - [x] Define Color, Pixel, Tool, AppState types
  - [x] Create Point interface
  - [x] Add advanced tool types (line, circle, square, marquee, lasso, hand, move)
  - [x] Add Selection, FillMode, Clipboard types
  - [x] Add Layer and BlendMode types
- [x] Step 2: Implement utility functions (Completed)
  - [x] Flood fill algorithm for fill tool (contiguous mode)
  - [x] Global fill algorithm (replace all instances)
  - [x] Bresenham's line algorithm
  - [x] Midpoint circle algorithm
  - [x] Rectangle drawing algorithm
  - [x] PNG export functionality
  - [x] Canvas initialization helper
  - [x] Transformation functions (rotate, flip horizontal, flip vertical)
  - [x] Selection utilities (extract, paste, clear)
  - [x] Point-in-polygon detection for lasso
  - [x] Blend mode algorithms (12 modes)
  - [x] Layer management utilities (create, duplicate, delete, reorder, merge)
- [x] Step 3: Create custom hooks (Completed)
  - [x] useHistory hook for undo/redo
  - [x] usePixelCanvas hook for canvas rendering
  - [x] useKeyboardShortcuts hook with extended shortcuts
- [x] Step 4: Build core components (Completed)
  - [x] EnhancedPixelCanvas component with all tools
  - [x] DrawingToolbar component (pencil, eraser, fill, eyedropper, line, circle, square)
  - [x] SelectionToolbar component (marquee, lasso, move, hand)
  - [x] ColorPicker component with palette
  - [x] Controls component
  - [x] TransformControls component (fill mode, rotate, flip)
  - [x] LayerPanel component with drag-and-drop reordering
  - [x] LayerItem component with all layer properties
- [x] Step 5: Create main application page (Completed)
  - [x] Integrate all components
  - [x] Implement state management with layers
  - [x] Add keyboard shortcuts
  - [x] Add clipboard operations (copy, cut, paste)
  - [x] Add transformation operations
  - [x] Add layer management (create, delete, duplicate, reorder)
- [x] Step 6: Update routing and polish (Completed)
  - [x] Update routes.tsx to show pixel art editor
  - [x] Add responsive design
  - [x] Test all features
- [x] Step 7: Mobile optimization (Completed)
  - [x] Fixed viewport layout (no scrolling)
  - [x] Drawer-based controls using Sheet component
  - [x] Touch event support for canvas
  - [x] Responsive canvas sizing
  - [x] Optimized button sizes for touch (48px minimum)
- [x] Step 8: Advanced features implementation (Completed)
  - [x] Shape primitives with integer-based algorithms
  - [x] Enhanced bucket fill with contiguous/global modes
  - [x] Selection tools (marquee and lasso)
  - [x] Clipboard operations (Ctrl+C, Ctrl+X, Ctrl+V)
  - [x] Transformations (rotate 90°, flip horizontal, flip vertical)
  - [x] Pan tool (hand) for navigation
  - [x] Selection overlay visualization
- [x] Step 9: Layer system implementation (Completed)
  - [x] Layer creation, deletion, duplication
  - [x] Layer reordering via drag-and-drop
  - [x] Opacity control (0-100%)
  - [x] Visibility toggle
  - [x] Layer locking
  - [x] Alpha lock
  - [x] Blend modes (12 modes)
  - [x] Layer merging for display
- [x] Step 10: Color and palette management (Completed)
  - [x] Enhanced color picker with RGB/HSV sliders
  - [x] Hex code input with validation
  - [x] Palette manager with create/save/delete
  - [x] Import/export palettes (JSON and GPL formats)
  - [x] Drag-and-drop color sorting in palettes
  - [x] Default palettes (Default, Grayscale, PICO-8)
  - [x] Add/remove colors from palettes
  - [x] Color conversion utilities (RGB/HSV/Hex)
- [x] Step 11: Dynamic brush modes (Completed)
  - [x] Normal mode (standard drawing)
  - [x] Rainbow mode (cycles hue per stroke)
  - [x] Random mode (random palette color per pixel)
  - [x] Dither mode (Bayer matrix patterns)
  - [x] Dither pattern selector (2x2, 4x4, 8x8)
  - [x] Brush mode selector component
- [x] Step 12: Run lint and fix any issues (Completed)

## Features Implemented

### Core Drawing Tools
- **Pencil**: Draw single pixels (P)
- **Eraser**: Remove pixel color (E)
- **Fill**: Flood fill with contiguous/global modes (F)
- **Eyedropper**: Sample colors from canvas (I)

### Shape Primitives
- **Line Tool**: Bresenham's line algorithm for pixel-perfect lines (L)
- **Circle Tool**: Midpoint circle algorithm for perfect circles (C)
- **Square Tool**: Rectangle drawing with outline mode (R)

### Selection Tools
- **Marquee**: Rectangular selection (M)
- **Lasso**: Freeform selection with polygon detection (L)
- **Move**: Move selected pixels (V)
- **Hand**: Pan canvas for navigation (H)

### Clipboard Operations
- **Copy**: Ctrl+C - Copy selection to clipboard
- **Cut**: Ctrl+X - Cut selection to clipboard
- **Paste**: Ctrl+V - Paste clipboard content

### Transformations
- **Rotate**: 90° clockwise rotation
- **Flip Horizontal**: Mirror horizontally
- **Flip Vertical**: Mirror vertically

### Fill Modes
- **Contiguous**: Fill connected pixels only (default)
- **Global**: Replace all instances of a color

### Layer System
- **Create Layer**: Add new transparent layer
- **Delete Layer**: Remove layer (minimum 1 layer required)
- **Duplicate Layer**: Copy layer with all properties
- **Reorder Layers**: Drag-and-drop to change layer order
- **Opacity**: Adjustable 0-100% per layer
- **Visibility**: Toggle layer visibility (eye icon)
- **Lock**: Prevent editing locked layers (lock icon)
- **Alpha Lock**: Paint only on non-transparent pixels
- **Blend Modes**: 12 compositing modes
  - Normal
  - Multiply
  - Screen
  - Overlay
  - Darken
  - Lighten
  - Color Dodge
  - Color Burn
  - Hard Light
  - Soft Light
  - Difference
  - Exclusion
- **Layer Naming**: Double-click to rename layers
- **Active Layer**: Highlighted with border, shown in status bar

### Color & Palette Management
- **Enhanced Color Picker**:
  - Hex code input with validation
  - RGB sliders (0-255 for R, G, B)
  - HSV sliders (H: 0-360°, S: 0-100%, V: 0-100%)
  - HTML5 color picker integration
  - Real-time color preview
  - Quick palette (16 preset colors)
- **Palette Manager**:
  - Create custom palettes with names
  - Save/load palettes
  - Import palettes (JSON, GPL/GIMP format)
  - Export palettes (JSON, GPL format)
  - Drag-and-drop color reordering
  - Add colors to palette
  - Remove colors from palette
  - Default palettes: Default (16 colors), Grayscale (12 shades), PICO-8 (16 colors)
  - Multiple palette support with switcher
  - Delete custom palettes (keep at least one)
- **Color Utilities**:
  - RGB ↔ Hex conversion
  - RGB ↔ HSV conversion
  - Hue shifting for rainbow mode
  - Color validation

### Dynamic Brush Modes
- **Normal Mode**: Standard pixel-by-pixel drawing
- **Rainbow Mode**: Automatically cycles hue with each stroke for gradient effects
- **Random Mode**: Picks random color from active palette for each pixel
- **Dither Mode**: Applies Bayer matrix dithering patterns for texturing
  - Bayer 2×2 (fine pattern)
  - Bayer 4×4 (medium pattern)
  - Bayer 8×8 (coarse pattern)
- **Brush Mode Selector**: Visual buttons with icons and descriptions
- **Status Display**: Shows active brush mode in bottom toolbar

### Navigation
- **Pan**: Hand tool for canvas navigation
- **Zoom**: Zoom support (1x default, extensible)
- **Grid Toggle**: Show/hide pixel grid (G)

### History
- **Undo**: Ctrl+Z (20 steps, includes layer changes)
- **Redo**: Ctrl+Y / Ctrl+Shift+Z (20 steps)

## Keyboard Shortcuts
- **P**: Pencil tool
- **E**: Eraser tool
- **F**: Fill tool
- **I**: Eyedropper tool
- **L**: Line tool
- **C**: Circle tool
- **R**: Square/Rectangle tool
- **M**: Marquee selection
- **H**: Hand/Pan tool
- **G**: Toggle grid
- **Ctrl+Z**: Undo
- **Ctrl+Y**: Redo
- **Ctrl+C**: Copy selection
- **Ctrl+X**: Cut selection
- **Ctrl+V**: Paste

## Technical Implementation
- Integer-based algorithms (Bresenham, Midpoint) for anti-aliasing-free shapes
- Dual-canvas system (main + overlay) for selection visualization
- Touch and mouse event support
- Responsive canvas sizing
- Mobile-optimized drawer interface
- 20-step undo/redo history with full layer and palette state
- Clipboard system for copy/cut/paste operations
- Real-time shape preview during drawing
- Layer compositing with blend modes and opacity
- Drag-and-drop layer reordering
- Alpha lock for precise pixel editing
- Layer merging for final display
- Color space conversions (RGB, HSV, Hex)
- Palette import/export (JSON, GPL formats)
- Bayer matrix dithering algorithms (2x2, 4x4, 8x8)
- Dynamic brush mode system
- Palette state management with undo/redo support

## Notes
- MVP focuses on 32×32 canvas with comprehensive toolset, layer system, and color management
- No backend/database needed - fully client-side
- Export as PNG with transparent background support (merges all visible layers)
- Custom vibrant color scheme with purple primary and orange secondary
- All lint checks passed successfully (94 files)
- Mobile-optimized with fixed window layout
- Touch-friendly interface with drawer controls
- Canvas automatically resizes to fit viewport
- Prevents body scrolling on mobile devices
- Selection overlay with animated dashed border
- Shape tools show preview before finalizing
- Layer panel accessible via Layers button in header
- Active layer name and status shown in bottom toolbar
- Locked layers prevent all editing operations
- Alpha lock restricts painting to existing pixels only
- Blend modes use proper color compositing algorithms
- Layer opacity applies during final compositing
- Color picker with tabbed interface (Color, Palette, Brush)
- Palettes support drag-and-drop color reordering
- GPL format compatible with GIMP and other tools
- Brush modes shown in status bar
- Rainbow mode uses HSV color space for smooth hue transitions
- Random mode respects active palette colors
- Dither mode uses industry-standard Bayer matrices
- All palette operations integrated with undo/redo system
