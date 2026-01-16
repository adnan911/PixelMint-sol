# Pixel Art Drawing Web Application - Requirements Document

## 1. Core Problem & Value Proposition

**Problem**: Digital artists, hobbyists, game developers, and creative learners need an accessible, mobile-friendly tool to create pixel art without installing desktop software or dealing with complex interfaces.

**Value Proposition**: A lightweight, intuitive web application optimized for mobile devices that enables users to create, edit, and export pixel art directly in their browser. The tool democratizes pixel art creation by removing technical barriers while providing essential features for both beginners and experienced pixel artists on any device.

**Target Users**:\n- Indie game developers creating sprites and assets on-the-go
- Digital artists exploring retro aesthetics from mobile devices
- Students learning digital art fundamentals
- Hobbyists creating avatars, icons, and social media content from smartphones
\n---

## 2. Product Requirements Document (PRD)

### 2.1 Goals\n- Provide an intuitive pixel-by-pixel drawing experience optimized for mobile browsers
- Enable users to create, edit, and export pixel art in standard formats on mobile devices
- Deliver responsive performance for canvases up to 128×128 pixels on mobile\n- Support essential drawing tools (pencil, eraser, fill, eyedropper, line, circle, square) with touch-friendly controls
- Implement selection tools (marquee, lasso) with move, cut, copy, and paste operations
- Support transformations (rotate, flip vertical, flip horizontal)\n- Provide navigation tools (pan, zoom, preview window)
- Implement undo/redo functionality for error correction
- Allow advanced color palette management with create, save, import/export capabilities
- Support dynamic brush modes (Rainbow Mode, Random Mode) for creative workflows
- Provide dithering tools for texturing effects
- Enable artwork export in PNG format\n- Ensure all UI elements fit within a fixed mobile viewport without scrolling
- Support comprehensive layer system with opacity, blend modes, and layer management

### 2.2 Non-Goals
- Animation or frame-by-frame editing (post-MVP)
- Real-time collaboration features (post-MVP)
- User accounts or cloud storage (post-MVP)
- Native mobile app versions (web-first approach)
- Social features or community gallery (post-MVP)

### 2.3 User Personas

**Persona 1: Alex - Mobile Indie Game Developer**
- Age: 28, creates 2D game assets on commute
- Needs: Quick sprite creation on phone, precise touch control, easy export, shape tools for efficient drawing, layer management for complex sprites, palette management for consistent color schemes
- Pain points: Desktop tools unavailable on mobile, needs browser accessibility\n\n**Persona 2: Jordan - Digital Art Student**
- Age: 19, learning digital art fundamentals on tablet
- Needs: Simple mobile interface, experimentation-friendly, forgiving tools, selection and transformation features, layer system for non-destructive editing, color exploration tools
- Pain points: Intimidated by complex mobile interfaces\n
**Persona 3: Sam - Mobile Hobbyist Creator**
- Age: 35, creates icons and avatars during breaks
- Needs: Quick mobile access, no installation, shareable results, efficient editing tools, layer organization for complex designs, reusable color palettes
- Pain points: Wants immediate creativity on phone without setup friction

### 2.4 User Journeys

**Journey 1: First-Time Mobile User Creating an Icon**
1. User opens application on smartphone
2. Sees fixed viewport with canvas and touch-optimized controls
3. Taps pencil tool and color from palette
4. Draws pixels by tapping on canvas grid
5. Uses circle tool to create perfect circular shapes
6. Uses eraser to correct mistakes
7. Taps Export PNG button to download artwork
8. Total time: 5-10 minutes

**Journey 2: Experienced Mobile User Creating a Sprite**
1. User opens application on tablet (returning visitor)
2. Changes canvas size to 64×64\n3. Uses line tool to create character outline
4. Uses square tool for body structure
5. Switches to fill tool for large color areas
6. Uses marquee selection to move character position
7. Applies flip horizontal transformation
8. Uses eyedropper to sample existing colors
9. Utilizes undo/redo multiple times during refinement
10. Exports final sprite as PNG
11. Total time: 20-30 minutes

**Journey 3: Advanced Mobile User Creating Multi-Layer Artwork**
1. User opens application on tablet
2. Creates new layer for background
3. Draws background elements with fill tool
4. Creates new layer for character
5. Sets character layer to Multiply blend mode
6. Adjusts character layer opacity to 80%
7. Locks background layer to prevent accidental edits
8. Creates additional layer for highlights
9. Uses alpha lock on highlights layer
10. Reorders layers via drag-and-drop
11. Exports final artwork as PNG with merged layers
12. Total time: 30-45 minutes

**Journey 4: Artist Managing Custom Color Palettes**
1. User opens application on tablet
2. Opens Palette Manager from drawer
3. Creates new custom palette named Game Assets
4. Adds colors via color picker with RGB sliders
5. Inputs specific hex codes for brand colors
6. Drag-and-drops colors to organize palette
7. Exports palette as JSON file for backup
8. Switches to Rainbow Mode brush for gradient effects
9. Uses dithering brush for texture details
10. Saves artwork and palette for future use
11. Total time: 15-20 minutes\n
### 2.5 Functional Requirements

#### Canvas Management
- **FR-1**: Display pixel grid with configurable dimensions (16×16, 32×32, 64×64, 128×128)
- **FR-2**: Show grid lines for pixel boundaries (toggleable)
- **FR-3**: Support canvas zoom levels optimized for mobile (100%, 200%, 400%, 800%)\n- **FR-4**: Display current canvas dimensions in compact mobile UI
- **FR-5**: Allow canvas size changes (with user confirmation if artwork exists)
- **FR-6**: Canvas must fit within fixed mobile viewport without requiring scroll
- **FR-7**: Provide navigation preview window showing full canvas with current viewport indicator

#### Drawing Tools\n- **FR-8**: Pencil tool - draw single pixels on tap
- **FR-9**: Eraser tool - remove pixel color (set to transparent)
- **FR-10**: Line tool - draw straight lines using Bresenham's algorithm (integer-based, no anti-aliasing)
- **FR-11**: Circle tool - draw circles using Midpoint Circle algorithm (integer-based, no anti-aliasing)
- **FR-12**: Square tool - draw rectangles/squares with integer coordinates
- **FR-13**: Fill tool - flood-fill connected pixels of same color with two modes:\n  - Contiguous mode: fill only connected pixels of the same color
  - Global mode: replace all instances of the target color across entire canvas
- **FR-14**: Eyedropper tool - sample color from existing pixel
- **FR-15**: Hand tool - pan canvas view (drag to move viewport)
- **FR-16**: Tool selection via touch-optimized drawer interface with large tap targets (minimum 44×44px)
- **FR-17**: Active tool indicator visible in drawer
\n#### Selection Tools
- **FR-18**: Marquee selection tool - rectangular selection with drag interaction
- **FR-19**: Lasso selection tool - freeform selection by drawing selection boundary
- **FR-20**: Selection operations:\n  - Move: drag selected pixels to new position
  - Cut (Ctrl+X): remove selected pixels and store in clipboard
  - Copy (Ctrl+C): copy selected pixels to clipboard
  - Paste (Ctrl+V): paste clipboard content at cursor position
- **FR-21**: Visual indication of active selection (marching ants border)
- **FR-22**: Deselect function to clear active selection
\n#### Transformation Tools
- **FR-23**: Rotate transformation - rotate selected area or entire canvas by 90° increments (90°, 180°, 270°)
- **FR-24**: Flip Vertical - mirror selected area or entire canvas vertically
- **FR-25**: Flip Horizontal - mirror selected area or entire canvas horizontally
- **FR-26**: Transformations apply to active selection if present, otherwise to entire canvas
\n#### Navigation Tools
- **FR-27**: Zoom tool - zoom in/out centered on tap/cursor position
- **FR-28**: Zoom levels: 100%, 200%, 400%, 800%
- **FR-29**: Pan tool (Hand) - drag to move viewport when zoomed in
- **FR-30**: Navigation preview window - minimap showing full canvas with current viewport rectangle
- **FR-31**: Preview window allows click-to-jump navigation\n
#### Layer System
- **FR-51**: Create new layer with default name (Layer 1, Layer 2, etc.)
- **FR-52**: Delete layer with confirmation dialog (prevent deletion of last remaining layer)
- **FR-53**: Duplicate layer - create exact copy of selected layer
- **FR-54**: Reorder layers via drag-and-drop in layer panel
- **FR-55**: Layer visibility toggle - show/hide individual layers
- **FR-56**: Layer opacity control - adjustable from 0% (fully transparent) to 100% (fully opaque)
- **FR-57**: Layer locking - prevent editing of locked layers
- **FR-58**: Layer blend modes - support standard web compositing modes:\n  - Normal (default)\n  - Multiply
  - Overlay
  - Screen
  - Darken\n  - Lighten
  - Difference
  - Color-Dodge
  - Color-Burn
  - Hard-Light
  - Soft-Light
- **FR-59**: Alpha lock - restrict painting only to existing non-transparent pixels on current layer
- **FR-60**: Active layer indicator - highlight currently selected layer
- **FR-61**: Layer thumbnail preview - display small preview of layer content
- **FR-62**: Layer renaming - allow users to rename layers via tap-to-edit
- **FR-63**: All drawing operations apply only to active layer
- **FR-64**: Layer panel accessible via drawer interface

#### Color Management & Palette System
- **FR-69**: Palette Manager - centralized interface for palette operations accessible from drawer
- **FR-70**: Create new custom palette with user-defined name
- **FR-71**: Save current palette to local storage with auto-save functionality
- **FR-72**: Export palette in two formats:
  - JSON format (custom format with metadata)
  - GPL format (GIMP Palette format for cross-application compatibility)
- **FR-73**: Import palette from JSON or GPL files via file picker
- **FR-74**: Drag-and-drop color reordering within palette
- **FR-75**: Add color to palette via:\n  - Color picker with visual selector
  - Hex code input field
  - RGB sliders (0-255 range)
  - HSV sliders (Hue 0-360°, Saturation 0-100%, Value 0-100%)\n- **FR-76**: Remove color from palette with confirmation\n- **FR-77**: Display current primary color indicator in drawer
- **FR-78**: Quick-access color swatches in drawer (8 default colors + custom palette colors)
- **FR-79**: Support transparency as a color option
- **FR-80**: Eyedropper tool (Color Picker) - sample color from canvas and add to palette
\n#### Dynamic Brush Modes
- **FR-81**: Rainbow Mode brush - automatically cycles through hue spectrum with each stroke
  - Hue increment: configurable (default 10° per pixel)
  - Maintains saturation and value from base color
  - Visual indicator when Rainbow Mode is active
- **FR-82**: Random Mode brush - selects random color from current palette for each pixel
  - Only uses colors from active palette
  - Visual indicator when Random Mode is active
- **FR-83**: Brush mode toggle accessible from drawer
- **FR-84**: Brush modes apply to pencil tool only (not eraser, fill, or shape tools)

#### Dithering Tools
- **FR-85**: Dithering brush - applies dithering patterns for texture effects
- **FR-86**: Dithering patterns using Bayer matrix algorithm:\n  - 2×2 Bayer matrix (basic dithering)
  - 4×4 Bayer matrix (medium detail)
  - 8×8 Bayer matrix (fine detail)
- **FR-87**: Dithering color selection - choose two colors for dithering pattern
- **FR-88**: Dithering pattern preview in drawer
- **FR-89**: Dithering intensity control (0-100%)
\n#### History & State\n- **FR-37**: Implement undo functionality (minimum 20 steps) with drawer button
- **FR-38**: Implement redo functionality with drawer button
- **FR-39**: Display undo/redo availability in drawer UI
- **FR-40**: Preserve drawing state during session (browser storage)
- **FR-65**: Undo/redo operations track layer state changes (creation, deletion, reordering, property changes)
- **FR-90**: Undo/redo operations track palette changes (color additions, removals, reordering)\n\n#### Export & Import
- **FR-41**: Export artwork as PNG file (actual pixel dimensions) via drawer button
- **FR-42**: Export with transparent background support\n- **FR-43**: Generate filename with timestamp (e.g., pixelart_20260116_0604.png)
- **FR-44**: Clear canvas function with confirmation dialog accessible from drawer
- **FR-66**: Export merges all visible layers with respect to opacity and blend modes
- **FR-67**: Export preserves transparency from layers
\n#### Mobile-Specific Requirements
- **FR-45**: All UI controls must be contained in a collapsible drawer interface
- **FR-46**: Drawer must be toggleable to maximize canvas space
- **FR-47**: Touch gestures: single tap to draw, long press for eyedropper\n- **FR-48**: Prevent page zoom/scroll during drawing interactions
- **FR-49**: Support both portrait and landscape orientations
- **FR-50**: Drawer buttons must be resized for optimal mobile touch (44×44px minimum)
- **FR-68**: Layer panel must be touch-optimized with drag-and-drop support
- **FR-91**: Palette Manager must be touch-optimized with drag-and-drop color sorting
\n### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Canvas rendering must complete within 100ms for 128×128 grid on mobile devices
- **NFR-2**: Touch interactions must respond within 16ms (60fps)\n- **NFR-3**: Undo/redo operations must execute within 50ms
- **NFR-4**: Application initial load time under 3 seconds on 4G connection
- **NFR-5**: Shape drawing algorithms must use integer arithmetic to avoid anti-aliasing\n- **NFR-15**: Layer compositing must maintain 60fps during drawing operations
- **NFR-16**: Layer reordering via drag-and-drop must provide smooth visual feedback
- **NFR-17**: Palette operations (add, remove, reorder colors) must execute within 50ms
- **NFR-18**: Rainbow Mode and Random Mode brush rendering must maintain 60fps
- **NFR-19**: Dithering pattern application must complete within 100ms for 128×128 canvas
\n#### Accessibility
- **NFR-6**: Touch targets minimum 44×44px for all interactive elements
- **NFR-7**: Support for keyboard shortcuts (Ctrl+X, Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+Y)
- **NFR-8**: ARIA labels for all interactive elements
- **NFR-9**: Minimum color contrast ratio of 4.5:1 for UI elements
- **NFR-10**: Support for screen readers on mobile devices
\n#### Browser Support
- **NFR-11**: Support mobile Chrome 90+, mobile Firefox 88+, mobile Safari 14+\n- **NFR-12**: Responsive design for mobile (320px-768px) and tablet (768px-1024px)
- **NFR-13**: Graceful degradation for unsupported browsers with clear messaging
\n#### Usability
- **NFR-14**: Zero-configuration startup (no account required)
- **NFR-15**: Intuitive tool icons following industry conventions
- **NFR-16**: Visual feedback for all touch actions (tap states, active tools)
- **NFR-17**: Fixed viewport layout - no scrolling required for any functionality
- **NFR-18**: Drawer interface for all controls to maximize canvas space
\n### 2.7 Success Metrics
- **Engagement**: Average mobile session duration > 10 minutes
- **Completion**: 60%+ of mobile users who draw export at least one image
- **Performance**: 95th percentile touch interaction latency < 50ms
- **Retention**: 30%+ of mobile users return within 7 days
- **Technical**: Zero critical bugs in production, 99.5% uptime
- **Mobile Usability**: 85%+ of users complete drawing without UI frustration
- **Feature Adoption**: 40%+ of users utilize shape tools or selection features
- **Layer Usage**: 50%+ of users create multi-layer artwork
- **Blend Mode Usage**: 25%+ of users experiment with blend modes
- **Palette Management**: 35%+ of users create or import custom palettes
- **Dynamic Brush Usage**: 20%+ of users experiment with Rainbow Mode or Random Mode
- **Dithering Usage**: 15%+ of users utilize dithering tools for texture effects

---

## 3. MVP Definition

### 3.1 MVP Included Features

**Core Drawing**:\n- Fixed 32×32 pixel canvas (single size for MVP)
- Pencil tool (primary drawing tool)
- Eraser tool\n- Line tool (Bresenham's algorithm)
- Circle tool (Midpoint Circle algorithm)
- Square tool
- Fill tool with Contiguous and Global modes
- Eyedropper tool
- Touch-optimized drawing interactions
\n**Selection & Manipulation**:
- Marquee selection tool
- Lasso selection tool
- Move, Cut (Ctrl+X), Copy (Ctrl+C), Paste (Ctrl+V) operations
- Rotate (90° increments)
- Flip Vertical
- Flip Horizontal
\n**Navigation**:
- Pan tool (Hand)\n- Zoom (100%, 200%, 400%)
- Navigation preview window
\n**Layer System**:
- Create new layer
- Delete layer (with confirmation)
- Duplicate layer
- Reorder layers via drag-and-drop
- Layer visibility toggle
- Layer opacity adjustment (0-100%)
- Layer locking
- Blend modes: Normal, Multiply, Overlay, Screen, Darken, Lighten, Difference, Color-Dodge, Color-Burn, Hard-Light, Soft-Light\n- Alpha lock toggle
- Layer thumbnail preview
- Layer renaming\n- Active layer indicator

**Color System & Palette Management**:
- Palette Manager interface in drawer
- Create new custom palette
- Save palette to local storage
- Export palette (JSON and GPL formats)
- Import palette (JSON and GPL formats)
- Drag-and-drop color reordering
- Color picker with:\n  - Visual color selector
  - Hex code input
  - RGB sliders (0-255)
  - HSV sliders (Hue 0-360°, Saturation/Value 0-100%)
- Add color to palette
- Remove color from palette
- 8 predefined color swatches (black, white, red, blue, green, yellow, gray, transparent)
- Current color indicator in drawer
- Eyedropper tool for color sampling

**Dynamic Brush Modes**:
- Rainbow Mode brush (hue cycling per stroke)
- Random Mode brush (random palette color per pixel)
- Brush mode toggle in drawer
- Visual indicators for active brush modes

**Dithering Tools**:
- Dithering brush with Bayer matrix patterns
- Pattern selection: 2×2, 4×4, 8×8 Bayer matrices
- Two-color dithering selection
- Dithering intensity control (0-100%)
- Pattern preview in drawer

**History**:
- Undo (20 steps) via drawer button and Ctrl+Z
- Redo (20 steps) via drawer button and Ctrl+Y
- Layer state tracking in history\n- Palette change tracking in history

**Export**:
- Export as PNG (32×32 actual pixels) via drawer button
- Merged layer export with blend modes and opacity
- Clear canvas button in drawer
\n**UI/UX**:
- Collapsible drawer interface for all controls
- Tool buttons with large touch targets (44×44px minimum)
- Canvas with visible grid lines
- Fixed viewport layout (no scrolling)
- Portrait and landscape support
- Layer panel in drawer with drag-and-drop support
- Palette Manager panel in drawer with drag-and-drop color sorting
\n### 3.2 MVP Excluded Features (Post-MVP)

**Excluded from MVP** (rationale):
- Multiple canvas sizes → Simplifies state management and testing
- User accounts/cloud save → Local-only for MVP
- Animation frames → Separate feature set
- Advanced selection operations (feathering, anti-aliasing) → Basic selection sufficient
- Desktop keyboard shortcuts beyond cut/copy/paste/undo/redo → Mobile-first approach
- Layer groups/folders → Single-level layer hierarchy for MVP
- Layer effects (drop shadow, glow, etc.) → Basic blend modes sufficient
- Gradient dithering → Basic two-color dithering sufficient for MVP
- Custom dithering pattern creation → Predefined Bayer matrices sufficient
\n### 3.3 MVP Success Criteria
- Mobile users can create recognizable pixel art within 5 minutes
- Users successfully utilize shape tools to create geometric designs
- Selection and transformation tools work intuitively on mobile
- Export produces valid PNG files on mobile browsers
- No critical bugs in core mobile drawing flow
- Drawer interface is intuitive and doesn't require scrolling
- 15+ mobile test users successfully complete drawing → export flow\n- 60%+ of test users utilize at least one shape or selection tool
- 50%+ of test users create artwork with multiple layers
- 30%+ of test users experiment with blend modes or opacity adjustments
- 35%+ of test users create or import custom palettes
- 20%+ of test users experiment with Rainbow Mode or Random Mode brushes
- 15%+ of test users utilize dithering tools\n
---

## 4. Technical Architecture

### 4.1 Frontend Stack
- **Framework**: React 18+ (component-based UI, efficient re-rendering)
- **Language**: TypeScript (type safety for canvas operations)
- **Styling**: Tailwind CSS (rapid mobile-first UI development)
- **Canvas Rendering**: HTML5 Canvas API (direct pixel manipulation)
- **Build Tool**: Vite (fast development server, optimized builds)
- **Mobile Optimization**: Touch event handling, viewport meta tags, CSS containment

### 4.2 State Management
- **Local State**: React useState for UI interactions (tool selection, color, drawer state, brush modes)
- **Canvas State**: Custom hook managing 2D pixel array per layer
- **Layer State**: Array of layer objects with properties (opacity, blend mode, visibility, lock, alpha lock)
- **Palette State**: Array of palette objects with color arrays and metadata
- **Selection State**: Active selection coordinates and clipboard data
- **History State**: Immutable history stack (array of complete application state snapshots including all layers and palettes)
- **Persistence**: localStorage for session recovery and palette storage
- **Drawer State**: Toggle state for collapsible control panel

### 4.3 Rendering Approach
- **Grid Representation**: 2D array pixels[y][x] = colorHex per layer
- **Canvas Rendering**: Composite all visible layers with blend modes and opacity, redraw on state change
- **Layer Compositing**: Use Canvas globalCompositeOperation for blend modes
- **Optimization**: RequestAnimationFrame for smooth touch interactions
- **Grid Lines**: Separate canvas layer or CSS grid overlay\n- **Mobile Viewport**: Fixed positioning with CSS containment to prevent scrolling
- **Shape Algorithms**: Integer-based algorithms (Bresenham's for lines, Midpoint for circles) to avoid anti-aliasing
- **Dithering Rendering**: Apply Bayer matrix threshold algorithm during brush stroke

### 4.4 Data Models
\n```typescript
type Color = string; // hex format: #RRGGBB or transparent

type Pixel = Color;\n
type CanvasGrid = Pixel[][]; // [y][x] = color

type Tool = 'pencil' | 'eraser' | 'line' | 'circle' | 'square' | 'fill' | 'eyedropper' | 'hand' | 'marquee' | 'lasso' | 'dithering';

type FillMode = 'contiguous' | 'global';

type TransformType = 'rotate90' | 'rotate180' | 'rotate270' | 'flipVertical' | 'flipHorizontal';

type BlendMode = 'normal' | 'multiply' | 'overlay' | 'screen' | 'darken' | 'lighten' | 'difference' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light';

type BrushMode = 'normal' | 'rainbow' | 'random';

type DitheringPattern = '2x2' | '4x4' | '8x8';

interface Layer {
  id: string;\n  name: string;
  canvas: CanvasGrid;
  visible: boolean;
  opacity: number; // 0-100\n  locked: boolean;
  blendMode: BlendMode;
  alphaLock: boolean;
  thumbnail?: string; // base64 data URL
}\n
interface Palette {
  id: string;
  name: string;
  colors: Color[];
  createdAt: number;
  modifiedAt: number;
}\n
interface AppState {
  layers: Layer[];
  activeLayerId: string;\n  currentTool: Tool;
  currentColor: Color;
  fillMode: FillMode;
  brushMode: BrushMode;
  ditheringPattern: DitheringPattern;
  ditheringColor1: Color;
  ditheringColor2: Color;
  ditheringIntensity: number; // 0-100
  palettes: Palette[];
  activePaletteId: string;
  history: AppState[];
  historyIndex: number;
  canvasSize: number; // 32 for MVP
  drawerOpen: boolean;
  selection: Selection | null;
  clipboard: CanvasGrid | null;
  zoom: number; // 1, 2, 4, 8 (100%, 200%, 400%, 800%)
  viewportOffset: Point;
}\n\ninterface Point {
  x: number;\n  y: number;
}\n\ninterface Selection {
  type: 'marquee' | 'lasso';
  points: Point[]; // for lasso\n  bounds: Rectangle; // for marquee
  pixels: CanvasGrid; // selected pixel data
}\n\ninterface Rectangle {
  x: number;
  y: number;
  width: number;\n  height: number;
}\n\ninterface TouchPoint {
  x: number;\n  y: number;
  timestamp: number;
}\n\ninterface PaletteExportFormat {
  version: string;
  name: string;
  colors: Color[];
  createdAt: number;
}\n```

### 4.5 Backend Needs
- **MVP**: None (fully client-side application)
- **Post-MVP**: Optional backend for user accounts, gallery, cloud storage
\n---

## 5. Mobile UI Layout Specification

### 5.1 Fixed Viewport Structure
\n**Layout Components**:
1. **Canvas Area** (top section, 60% viewport height)
   - Centered pixel grid canvas
   - Touch-optimized for drawing
   - No scroll, fixed position
   - Navigation preview window (bottom-right corner, 80×80px)

2. **Drawer Toggle Button** (bottom-right corner)\n   - Floating action button (56×56px)
   - Opens/closes control drawer
   - Always visible
\n3. **Control Drawer** (bottom sheet, slides up)
   - Collapsible panel containing all tools and controls
   - Maximum height: 40% viewport
   - Scrollable if content exceeds height
\n### 5.2 Drawer Contents Layout

**Drawer organized in sections**:
\n1. **Tool Selection Row** (top of drawer)
   - Primary tools: Pencil, Eraser, Line, Circle, Square, Fill, Eyedropper, Hand, Dithering
   - Each button: 44×44px minimum
   - Horizontal scrollable layout
   - Active tool highlighted

2. **Selection & Transform Row** (second section)
   - Selection tools: Marquee, Lasso\n   - Transform buttons: Rotate, Flip Vertical, Flip Horizontal
   - Each button: 44×44px minimum
\n3. **Brush Mode Toggle** (when Pencil tool active)
   - Toggle between Normal, Rainbow Mode, Random Mode
   - Visual indicator of active mode
   - Rainbow Mode: hue increment slider (5°-30°)
\n4. **Fill Mode Toggle** (when Fill tool active)
   - Toggle between Contiguous and Global modes
   - Visual indicator of active mode
\n5. **Dithering Controls** (when Dithering tool active)
   - Pattern selection: 2×2, 4×4, 8×8 Bayer matrix
   - Color 1 selector (44×44px)
   - Color 2 selector (44×44px)
   - Intensity slider (0-100%)
   - Pattern preview (64×64px)

6. **Layer Panel** (expandable section)
   - Layer list with drag-and-drop reordering
   - Each layer item displays:\n     - Thumbnail preview (32×32px)
     - Layer name (tap to rename)
     - Visibility toggle icon
     - Lock icon\n   - Active layer highlighted
   - Layer controls:\n     - Create new layer button (44×44px)
     - Delete layer button (44×44px)
     - Duplicate layer button (44×44px)
   - Layer properties (for active layer):
     - Opacity slider (0-100%)
     - Blend mode dropdown
     - Alpha lock toggle\n\n7. **Palette Manager Panel** (expandable section)
   - Palette selector dropdown (current palette name)
   - Color grid with drag-and-drop reordering
   - Each color swatch: 36×36px\n   - Palette controls:
     - Create new palette button (44×44px)
     - Import palette button (44×44px)\n     - Export palette button (44×44px)
     - Delete palette button (44×44px)\n   - Add color section:\n     - Color picker button (44×44px)
     - Hex input field
     - RGB sliders (R: 0-255, G: 0-255, B: 0-255)
     - HSV sliders (H: 0-360°, S: 0-100%, V: 0-100%)
     - Add to palette button (44×44px)\n   - Remove color button (visible on color selection)

8. **Color Control Row** (middle section)
   - Current color indicator (44×44px)
   - Quick-access palette swatches (8 default + custom, 36×36px each)
   - Open Palette Manager button (44×44px)
\n9. **Action Buttons Row** (bottom section)
   - Undo button (44×44px)
   - Redo button (44×44px)
   - Export PNG button (88×44px, wider)\n   - Clear canvas button (44×44px)

### 5.3 Responsive Breakpoints

- **Portrait Mobile** (320px-480px width)
  - Canvas: 280px × 280px
  - Drawer: Full width, 40vh height
  - Tool buttons: Horizontal scroll
  - Layer panel: Compact view
  - Palette Manager: Compact view with scrollable color grid

- **Landscape Mobile** (480px-768px width)
  - Canvas: 400px × 400px
  - Drawer: Full width, 35vh height
  - Tool buttons: Single row
  - Layer panel: Expanded view
  - Palette Manager: Expanded view with visible color grid

- **Tablet** (768px-1024px width)
  - Canvas: 512px × 512px
  - Drawer: Full width, 30vh height
  - All controls in organized rows
  - Layer panel: Full-featured view
  - Palette Manager: Full-featured view with all controls visible

---

## 6. Algorithm Specifications

### 6.1 Bresenham's Line Algorithm

```typescript
// utils/bresenham.ts
export function bresenhamLine(x0: number, y0: number, x1: number, y1: number): Point[] {
  const points: Point[] = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;\n\n  let x = x0;
  let y = y0;

  while (true) {
    points.push({ x, y });
\n    if (x === x1 && y === y1) break;

    const e2 = 2 * err;\n    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return points;
}
```

### 6.2 Midpoint Circle Algorithm\n
```typescript
// utils/midpointCircle.ts
export function midpointCircle(centerX: number, centerY: number, radius: number): Point[] {
  const points: Point[] = [];
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;

  while (y <= x) {
    // Add 8 symmetric points\n    points.push({ x: centerX + x, y: centerY + y });
    points.push({ x: centerX + y, y: centerY + x });
    points.push({ x: centerX - y, y: centerY + x });
    points.push({ x: centerX - x, y: centerY + y });
    points.push({ x: centerX - x, y: centerY - y });
    points.push({ x: centerX - y, y: centerY - x });
    points.push({ x: centerX + y, y: centerY - x });
    points.push({ x: centerX + x, y: centerY - y });
\n    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }

  return points;
}\n```

### 6.3 Flood Fill Algorithm

```typescript
// utils/floodFill.ts
export function floodFill(\n  grid: string[][],
  startX: number,
  startY: number,
  newColor: string,
  mode: 'contiguous' | 'global'
): string[][] {
  const targetColor = grid[startY][startX];
  if (targetColor === newColor) return grid;

  const newGrid = grid.map(row => [...row]);
\n  if (mode === 'global') {
    // Replace all instances of target color\n    for (let y = 0; y < newGrid.length; y++) {\n      for (let x = 0; x < newGrid[y].length; x++) {
        if (newGrid[y][x] === targetColor) {\n          newGrid[y][x] = newColor;
        }
      }
    }
  } else {
    // Contiguous flood fill using stack-based approach
    const stack: Point[] = [{ x: startX, y: startY }];
    const visited = new Set<string>();\n
    while (stack.length > 0) {
      const { x, y } = stack.pop()!;
      const key = `${x},${y}`;
\n      if (visited.has(key)) continue;
      if (x < 0 || x >= newGrid[0].length || y < 0 || y >= newGrid.length) continue;
      if (newGrid[y][x] !== targetColor) continue;

      visited.add(key);\n      newGrid[y][x] = newColor;
\n      stack.push({ x: x + 1, y });
      stack.push({ x: x - 1, y });
      stack.push({ x, y: y + 1 });
      stack.push({ x, y: y - 1 });
    }
  }

  return newGrid;
}
```\n
### 6.4 Transformation Algorithms

```typescript\n// utils/transformations.ts
export function rotate90(grid: string[][]): string[][] {
  const size = grid.length;
  const rotated: string[][] = Array(size).fill(null).map(() => Array(size).fill('transparent'));
  \n  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      rotated[x][size - 1 - y] = grid[y][x];
    }
  }
  
  return rotated;
}
\nexport function flipVertical(grid: string[][]): string[][] {
  return grid.slice().reverse();
}

export function flipHorizontal(grid: string[][]): string[][] {
  return grid.map(row => row.slice().reverse());
}
```\n
### 6.5 Layer Compositing Algorithm

```typescript
// utils/layerCompositing.ts
export function compositeLayers(layers: Layer[], canvasSize: number): HTMLCanvasElement {
  const compositeCanvas = document.createElement('canvas');
  compositeCanvas.width = canvasSize;
  compositeCanvas.height = canvasSize;
  const ctx = compositeCanvas.getContext('2d')!;

  // Render layers from bottom to top
  for (const layer of layers) {
    if (!layer.visible) continue;
\n    const layerCanvas = document.createElement('canvas');
    layerCanvas.width = canvasSize;
    layerCanvas.height = canvasSize;
    const layerCtx = layerCanvas.getContext('2d')!;

    // Draw layer pixels
    for (let y = 0; y < canvasSize; y++) {
      for (let x = 0; x < canvasSize; x++) {
        const color = layer.canvas[y][x];
        if (color !== 'transparent') {
          layerCtx.fillStyle = color;
          layerCtx.fillRect(x, y, 1, 1);
        }
      }
    }
\n    // Apply blend mode and opacity
    ctx.globalAlpha = layer.opacity / 100;
    ctx.globalCompositeOperation = getCompositeOperation(layer.blendMode);
    ctx.drawImage(layerCanvas, 0, 0);\n  }

  // Reset composite settings
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
\n  return compositeCanvas;
}

function getCompositeOperation(blendMode: BlendMode): GlobalCompositeOperation {
  const modeMap: Record<BlendMode, GlobalCompositeOperation> = {
    'normal': 'source-over',
    'multiply': 'multiply',
    'overlay': 'overlay',
    'screen': 'screen',\n    'darken': 'darken',
    'lighten': 'lighten',\n    'difference': 'difference',
    'color-dodge': 'color-dodge',
    'color-burn': 'color-burn',\n    'hard-light': 'hard-light',
    'soft-light': 'soft-light'\n  };
  return modeMap[blendMode];
}
```
\n### 6.6 Rainbow Mode Algorithm

```typescript
// utils/rainbowMode.ts
export function getRainbowColor(baseColor: string, strokeIndex: number, hueIncrement: number = 10): string {
  // Convert hex to HSV
  const hsv = hexToHSV(baseColor);
  
  // Increment hue
  hsv.h = (hsv.h + strokeIndex * hueIncrement) % 360;
  
  // Convert back to hex
  return hsvToHex(hsv);
}

function hexToHSV(hex: string): { h: number; s: number; v: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
\n  const max = Math.max(r, g, b);\n  const min = Math.min(r, g, b);\n  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);\n  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return { h, s, v };
}

function hsvToHex(hsv: { h: number; s: number; v: number }): string {
  const c = hsv.v * hsv.s;
  const x = c * (1 - Math.abs(((hsv.h / 60) % 2) - 1));
  const m = hsv.v - c;

  let r = 0, g = 0, b = 0;
  if (hsv.h < 60) { r = c; g = x; b = 0; }
  else if (hsv.h < 120) { r = x; g = c; b = 0; }
  else if (hsv.h < 180) { r = 0; g = c; b = x; }
  else if (hsv.h < 240) { r = 0; g = x; b = c; }
  else if (hsv.h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
\n  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
```

### 6.7 Random Mode Algorithm

```typescript
// utils/randomMode.ts
export function getRandomPaletteColor(palette: Color[]): Color {
  const randomIndex = Math.floor(Math.random() * palette.length);
  return palette[randomIndex];
}
```

### 6.8 Bayer Matrix Dithering Algorithm

```typescript
// utils/bayerDithering.ts
const BAYER_2X2 = [
  [0, 2],
  [3, 1]
];

const BAYER_4X4 = [
  [0, 8, 2, 10],\n  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
];

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21]
];

export function applyBayerDithering(\n  x: number,
  y: number,
  color1: string,
  color2: string,
  pattern: DitheringPattern,
  intensity: number
): string {\n  const matrix = pattern === '2x2' ? BAYER_2X2 : pattern === '4x4' ? BAYER_4X4 : BAYER_8X8;\n  const size = matrix.length;
  const threshold = matrix[y % size][x % size] / (size * size);
  
  // Adjust threshold based on intensity
  const adjustedThreshold = threshold * (intensity / 100);
  
  return adjustedThreshold < 0.5 ? color1 : color2;
}
```

### 6.9 Palette Import/Export Algorithms

```typescript\n// utils/paletteIO.ts
export function exportPaletteJSON(palette: Palette): string {
  const exportData: PaletteExportFormat = {
    version: '1.0',
    name: palette.name,
    colors: palette.colors,
    createdAt: palette.createdAt\n  };
  return JSON.stringify(exportData, null, 2);
}

export function exportPaletteGPL(palette: Palette): string {
  let gpl = `GIMP Palette\\nName: ${palette.name}
Columns: 8
#\\n`;
  
  palette.colors.forEach(color => {
    if (color === 'transparent') {
      gpl += '0   0   0   Transparent
';
    } else {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      gpl += `${r.toString().padStart(3)}  ${g.toString().padStart(3)}  ${b.toString().padStart(3)}  ${color}
`;
    }
  });
  
  return gpl;
}

export function importPaletteJSON(jsonString: string): Palette {\n  const data: PaletteExportFormat = JSON.parse(jsonString);\n  return {
    id: generateId(),
    name: data.name,
    colors: data.colors,
    createdAt: data.createdAt,
    modifiedAt: Date.now()
  };\n}

export function importPaletteGPL(gplString: string): Palette {\n  const lines = gplString.split('\\n');
  const name = lines.find(line => line.startsWith('Name:'))?.split(':')[1].trim() || 'Imported Palette';
  const colors: Color[] = [];
  \n  lines.forEach(line => {
    const match = line.match(/^\\s*(\\d+)\\s+(\\d+)\\s+(\\d+)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      colors.push(hex);
    }
  });
  
  return {
    id: generateId(),
    name,\n    colors,
    createdAt: Date.now(),\n    modifiedAt: Date.now()
  };
}
\nfunction generateId(): string {
  return `palette_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

---

## 7. Mobile-Specific Considerations

### 7.1 Touch Interaction Patterns
- **Single Tap**: Draw with current tool or select\n- **Long Press** (500ms): Activate eyedropper tool temporarily
- **Drag**: Continuous drawing or selection
- **Two-Finger Pinch**: Zoom in/out (when zoom tool active)
- **Two-Finger Pan**: Move viewport (when zoomed in)
- **Layer Drag**: Reorder layers in layer panel
- **Color Drag**: Reorder colors in palette

### 7.2 Viewport Configuration
\n```html
<!-- index.html -->
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />
<meta name=\"mobile-web-app-capable\" content=\"yes\" />
```\n
### 7.3 CSS Optimizations
\n```css
/* Prevent text selection during drawing */
.touch-none {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}\n
/* Smooth drawer transitions */
.drawer-transition {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
\n/* Fixed viewport container */
.app-container {
  position: fixed;
  top: 0;
  left: 0;\n  right: 0;
  bottom: 0;
  overflow: hidden;
}\n\n/* Selection marching ants animation */
@keyframes marching-ants {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 8; }
}

.selection-border {
  stroke-dasharray: 4 4;
  animation: marching-ants 0.5s linear infinite;
}
\n/* Layer drag preview */
.layer-drag-preview {
  opacity: 0.8;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
\n/* Rainbow mode indicator */
@keyframes rainbow-pulse {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}\n
.rainbow-mode-active {
  background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
  background-size: 200% 100%;
  animation: rainbow-pulse 2s linear infinite;
}
\n/* Dithering pattern preview */
.dithering-preview {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}\n```

---

## 8. Assumptions & Constraints

### Assumptions
1. **Target Users**: Mobile browser users with modern smartphones (2018+ devices)
2. **Use Case**: Short to medium sessions (5-30 minutes) creating small pixel art on mobile
3. **Technical Literacy**: Users comfortable with basic mobile web applications and familiar with cut/copy/paste operations
4. **Browser Environment**: JavaScript enabled, HTML5 Canvas support, touch events, clipboard API, File API
5. **Network**: Application can be fully client-side (no backend required for MVP)
6. **Layer Usage**: Users will create artwork with 2-5 layers on average
7. **Palette Usage**: Users will create 2-5 custom palettes on average
8. **File Storage**: Users have sufficient local storage for palette data (estimated 50KB per palette)

### Technical Constraints
1. **Canvas Size**: Limited to 128×128 maximum (mobile performance considerations)
2. **History Depth**: 20 undo steps (mobile memory constraints)
3. **File Format**: PNG export only (no proprietary formats)
4. **Browser APIs**: Relies on Canvas API, localStorage, Blob API, Touch Events, Clipboard API, File API
5. **No Server**: All processing happens client-side
6. **Fixed Viewport**: All UI must fit within viewport without scrolling
7. **Integer Algorithms**: Shape tools must use integer-based algorithms to avoid anti-aliasing artifacts
8. **Layer Limit**: Maximum 10 layers per project (mobile memory constraints)
9. **Blend Mode Support**: Limited to blend modes supported by Canvas globalCompositeOperation
10. **Palette Limit**: Maximum 20 custom palettes (localStorage constraints)
11. **Colors Per Palette**: Maximum 64 colors per palette (UI/UX considerations)
12. **Palette File Size**: Maximum 100KB per imported palette file
\n### Mobile-Specific Constraints
1. **Touch Target Size**: Minimum 44×44px for all interactive elements
2. **Drawer Height**: Maximum 40vh to preserve canvas visibility
3. **Performance**: Must maintain 60fps on mid-range mobile devices
4. **Battery**: Optimize rendering to minimize battery drain
5. **Clipboard Access**: Requires user permission for clipboard operations
6. **Layer Panel**: Must support touch-based drag-and-drop for layer reordering
7. **Palette Panel**: Must support touch-based drag-and-drop for color reordering
8. **File Picker**: Relies on native file picker for palette import

---

## 9. Implementation Roadmap

### Phase 1: Mobile Core Canvas & Basic Tools (Week 1-2)
- Set up React + TypeScript + Vite project with mobile viewport configuration
- Implement touch-optimized canvas grid rendering
- Add pencil and eraser tools with touch interaction
- Basic color picker in drawer
- Drawer toggle functionality
- Undo/redo with keyboard shortcuts

### Phase 2: Shape Tools (Week 3)\n- Implement Bresenham's line algorithm\n- Implement Midpoint Circle algorithm
- Add square/rectangle tool\n- Tool selection UI in drawer
- Resize drawer buttons for optimal touch\n\n### Phase 3: Fill & Navigation (Week 4)
- Flood fill with Contiguous and Global modes
- Eyedropper tool (long press gesture)
- Pan tool (Hand)\n- Zoom functionality
- Navigation preview window

### Phase 4: Selection & Clipboard (Week 5)
- Marquee selection tool
- Lasso selection tool
- Move, Cut, Copy, Paste operations
- Clipboard API integration
- Selection visual feedback

### Phase 5: Transformations (Week 6)
- Rotate (90° increments)
- Flip Vertical\n- Flip Horizontal
- Apply to selection or full canvas
\n### Phase 6: Layer System (Week 7-8)
- Layer data structure and state management
- Create, delete, duplicate layer operations
- Layer panel UI with thumbnails
- Layer visibility toggle
- Layer locking\n- Active layer indicator
- Layer renaming
- Drag-and-drop layer reordering\n- Layer opacity control
- Blend mode implementation
- Alpha lock functionality
- Layer compositing algorithm
- History integration for layer operations

### Phase 7: Color & Palette System (Week 9-10)
- Palette data structure and state management
- Palette Manager UI in drawer
- Create, delete, rename palette operations
- Color picker with hex input
- RGB sliders (0-255)
- HSV sliders (Hue 0-360°, Saturation/Value 0-100%)
- Add/remove color from palette
- Drag-and-drop color reordering
- Export palette (JSON and GPL formats)
- Import palette (JSON and GPL formats)
- Palette persistence in localStorage
- History integration for palette operations

### Phase 8: Dynamic Brush Modes (Week 11)
- Rainbow Mode implementation
- Hue cycling algorithm
- Hue increment slider
- Random Mode implementation
- Random palette color selection
- Brush mode toggle UI
- Visual indicators for active modes
\n### Phase 9: Dithering Tools (Week 12)
- Bayer matrix algorithm implementation (2×2, 4×4, 8×8)
- Dithering brush tool
- Two-color selection UI
- Intensity slider
- Pattern preview rendering
- Dithering controls in drawer
\n### Phase 10: Polish & Testing (Week 13)
- UI refinements for mobile\n- Touch interaction improvements
- Cross-browser mobile testing (iOS Safari, Chrome, Firefox)
- Performance optimization for mobile devices
- Layer system testing
- Palette system testing
- Dynamic brush testing
- Dithering tool testing
- User testing with 15+ mobile participants

### Phase 11: MVP Launch (Week 14)
- Bug fixes from mobile testing
- Documentation\n- Mobile deployment setup
- Launch preparation
\n---

## 10. Next Steps

1. **Validate Enhanced MVP Scope**: Review with stakeholders to confirm expanded mobile-first feature set with layer system, palette management, dynamic brushes, and dithering tools\n2. **Set Up Mobile Development Environment**: Initialize React + TypeScript project with mobile viewport\n3. **Create Mobile Design Mockups**: Low-fidelity wireframes for drawer UI layout with new tools, layer panel, and Palette Manager
4. **Begin Phase 1 Implementation**: Start with mobile-optimized canvas rendering and basic tools
5. **Establish Mobile Testing Strategy**: Set up device testing, define touch interaction test cases for shape, selection, layer, palette, and dithering tools
6. **Plan Mobile User Testing**: Recruit 15-20 mobile beta testers for MVP validation
7. **Algorithm Validation**: Test integer-based algorithms, layer compositing, Rainbow Mode, Random Mode, and Bayer dithering on various mobile devices
8. **Layer System Design**: Create detailed specifications for layer panel UI and interaction patterns
9. **Palette System Design**: Create detailed specifications for Palette Manager UI, import/export workflows, and color manipulation interfaces
10. **Dynamic Brush Design**: Define visual feedback patterns for Rainbow Mode and Random Mode
11. **Dithering Tool Design**: Create pattern preview mockups and intensity control specifications
\n---

**Document Version**: 5.0  
**Last Updated**: 2026-01-16  
**Status**: Ready for Enhanced Mobile Development with Layer System, Advanced Palette Management, Dynamic Brushes, and Dithering Tools  
**Key Changes**: Added comprehensive palette management system with create/save/import/export capabilities (JSON and GPL formats), drag-and-drop color sorting, advanced color selection (Color Picker with Eyedropper, Hex input, RGB/HSV sliders), dynamic brush modes (Rainbow Mode with hue cycling, Random Mode with palette-based randomization), dithering tools with Bayer matrix patterns (2×2, 4×4, 8×8), two-color dithering selection, intensity control, and updated implementation roadmap to include all new features across Phases 7-9