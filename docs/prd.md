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
- Deliver responsive performance for canvases up to 128×128 pixels on mobile\n- Support essential drawing tools (pencil, eraser, fill, eyedropper) with touch-friendly controls
- Implement undo/redo functionality for error correction
- Allow color palette customization and management
- Enable artwork export in PNG format
- Ensure all UI elements fit within a fixed mobile viewport without scrolling

### 2.2 Non-Goals
- Animation or frame-by-frame editing (post-MVP)
- Real-time collaboration features (post-MVP)
- User accounts or cloud storage (post-MVP)
- Advanced layer blending modes (post-MVP)
- Native mobile app versions (web-first approach)
- Social features or community gallery (post-MVP)

### 2.3 User Personas

**Persona 1: Alex - Mobile Indie Game Developer**
- Age: 28, creates 2D game assets on commute
- Needs: Quick sprite creation on phone, precise touch control, easy export
- Pain points: Desktop tools unavailable on mobile, needs browser accessibility
\n**Persona 2: Jordan - Digital Art Student**
- Age: 19, learning digital art fundamentals on tablet
- Needs: Simple mobile interface, experimentation-friendly, forgiving tools
- Pain points: Intimidated by complex mobile interfaces\n
**Persona 3: Sam - Mobile Hobbyist Creator**
- Age: 35, creates icons and avatars during breaks
- Needs: Quick mobile access, no installation, shareable results
- Pain points: Wants immediate creativity on phone without setup friction

### 2.4 User Journeys

**Journey 1: First-Time Mobile User Creating an Icon**
1. User opens application on smartphone
2. Sees fixed viewport with canvas and touch-optimized controls
3. Taps pencil tool and color from palette
4. Draws pixels by tapping on canvas grid
5. Uses eraser to correct mistakes
6. Taps Export PNG button to download artwork
7. Total time: 5-10 minutes

**Journey 2: Experienced Mobile User Creating a Sprite**
1. User opens application on tablet (returning visitor)
2. Changes canvas size to 64×64\n3. Uses pencil to outline character shape with touch
4. Switches to fill tool for large color areas
5. Uses eyedropper to sample existing colors
6. Utilizes undo/redo multiple times during refinement
7. Exports final sprite as PNG
8. Total time: 20-30 minutes

### 2.5 Functional Requirements

#### Canvas Management
- **FR-1**: Display pixel grid with configurable dimensions (16×16, 32×32, 64×64, 128×128)
- **FR-2**: Show grid lines for pixel boundaries (toggleable)
- **FR-3**: Support canvas zoom levels optimized for mobile (100%, 200%, 400%)
- **FR-4**: Display current canvas dimensions in compact mobile UI
- **FR-5**: Allow canvas size changes (with user confirmation if artwork exists)
- **FR-6**: Canvas must fit within fixed mobile viewport without requiring scroll

#### Drawing Tools\n- **FR-7**: Pencil tool - draw single pixels on tap
- **FR-8**: Eraser tool - remove pixel color (set to transparent)
- **FR-9**: Fill tool - flood-fill connected pixels of same color
- **FR-10**: Eyedropper tool - sample color from existing pixel
- **FR-11**: Tool selection via touch-optimized drawer interface with large tap targets (minimum 44×44px)
- **FR-12**: Active tool indicator visible in drawer
\n#### Color Management
- **FR-13**: Display current primary color indicator in drawer
- **FR-14**: Provide color picker accessible from drawer (hex input + visual selector)
- **FR-15**: Show color palette with quick-access color swatches in drawer
- **FR-16**: Allow users to add colors to palette\n- **FR-17**: Support transparency as a color option

#### History & State
- **FR-18**: Implement undo functionality (minimum 20 steps) with drawer button
- **FR-19**: Implement redo functionality with drawer button
- **FR-20**: Display undo/redo availability in drawer UI
- **FR-21**: Preserve drawing state during session (browser storage)
\n#### Export & Import
- **FR-22**: Export artwork as PNG file (actual pixel dimensions) via drawer button
- **FR-23**: Export with transparent background support\n- **FR-24**: Generate filename with timestamp (e.g., pixelart_20260115_1704.png)
- **FR-25**: Clear canvas function with confirmation dialog accessible from drawer

#### Mobile-Specific Requirements
- **FR-26**: All UI controls must be contained in a collapsible drawer interface
- **FR-27**: Drawer must be toggleable to maximize canvas space
- **FR-28**: Touch gestures: single tap to draw, long press for eyedropper\n- **FR-29**: Prevent page zoom/scroll during drawing interactions
- **FR-30**: Support both portrait and landscape orientations
- **FR-31**: Drawer buttons must be resized for optimal mobile touch (44×44px minimum)
\n### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Canvas rendering must complete within 100ms for 128×128 grid on mobile devices
- **NFR-2**: Touch interactions must respond within 16ms (60fps)\n- **NFR-3**: Undo/redo operations must execute within 50ms
- **NFR-4**: Application initial load time under 3 seconds on 4G connection
\n#### Accessibility
- **NFR-5**: Touch targets minimum 44×44px for all interactive elements
- **NFR-6**: Support for undo (drawer button) and redo (drawer button)\n- **NFR-7**: ARIA labels for all interactive elements
- **NFR-8**: Minimum color contrast ratio of 4.5:1 for UI elements
- **NFR-9**: Support for screen readers on mobile devices

#### Browser Support
- **NFR-10**: Support mobile Chrome 90+, mobile Firefox 88+, mobile Safari 14+\n- **NFR-11**: Responsive design for mobile (320px-768px) and tablet (768px-1024px)\n- **NFR-12**: Graceful degradation for unsupported browsers with clear messaging

#### Usability
- **NFR-13**: Zero-configuration startup (no account required)
- **NFR-14**: Intuitive tool icons following industry conventions
- **NFR-15**: Visual feedback for all touch actions (tap states, active tools)
- **NFR-16**: Fixed viewport layout - no scrolling required for any functionality
- **NFR-17**: Drawer interface for all controls to maximize canvas space

### 2.7 Success Metrics
- **Engagement**: Average mobile session duration > 8 minutes
- **Completion**: 55%+ of mobile users who draw export at least one image
- **Performance**: 95th percentile touch interaction latency < 50ms
- **Retention**: 25%+ of mobile users return within 7 days
- **Technical**: Zero critical bugs in production, 99.5% uptime
- **Mobile Usability**: 80%+ of users complete drawing without UI frustration

---

## 3. MVP Definition

### 3.1 MVP Included Features

**Core Drawing**:\n- Fixed 32×32 pixel canvas (single size for MVP)
- Pencil tool (primary drawing tool)
- Eraser tool
- Fill tool (bucket fill)
- Eyedropper tool
- Touch-optimized drawing interactions

**Color System**:
- Color picker with hex input in drawer
- 8 predefined color swatches (black, white, red, blue, green, yellow, gray, transparent)
- Current color indicator in drawer
\n**History**:
- Undo (10 steps) via drawer button
- Redo (10 steps) via drawer button
\n**Export**:
- Export as PNG (32×32 actual pixels) via drawer button
- Clear canvas button in drawer

**UI/UX**:
- Collapsible drawer interface for all controls
- Tool buttons with large touch targets (44×44px minimum)\n- Canvas with visible grid lines
- Fixed viewport layout (no scrolling)
- Portrait and landscape support
\n### 3.2 MVP Excluded Features (Post-MVP)

**Excluded from MVP** (rationale):
- Multiple canvas sizes → Simplifies state management and testing
- Advanced zoom functionality → 32×32 is manageable at default zoom on mobile
- Custom color palette editing → Predefined palette sufficient for validation
- Layers → Significantly increases complexity\n- Import image functionality → Export-only reduces scope
- User accounts/cloud save → Local-only for MVP
- Animation frames → Separate feature set
- Advanced tools (line, rectangle, circle) → Pencil + fill covers basic needs
- Desktop keyboard shortcuts → Mobile-first approach

### 3.3 MVP Success Criteria
- Mobile users can create recognizable pixel art within 5 minutes
- Export produces valid PNG files on mobile browsers
- No critical bugs in core mobile drawing flow
- Drawer interface is intuitive and doesn't require scrolling
- 10+ mobile test users successfully complete drawing → export flow\n\n---

## 4. Technical Architecture

### 4.1 Frontend Stack
- **Framework**: React 18+ (component-based UI, efficient re-rendering)
- **Language**: TypeScript (type safety for canvas operations)
- **Styling**: Tailwind CSS (rapid mobile-first UI development)
- **Canvas Rendering**: HTML5 Canvas API (direct pixel manipulation)
- **Build Tool**: Vite (fast development server, optimized builds)
- **Mobile Optimization**: Touch event handling, viewport meta tags, CSS containment

### 4.2 State Management
- **Local State**: React useState for UI interactions (tool selection, color, drawer state)
- **Canvas State**: Custom hook managing 2D pixel array\n- **History State**: Immutable history stack (array of canvas snapshots)
- **Persistence**: localStorage for session recovery
- **Drawer State**: Toggle state for collapsible control panel

### 4.3 Rendering Approach
- **Grid Representation**: 2D array pixels[y][x] = colorHex
- **Canvas Rendering**: Redraw entire canvas on state change (acceptable for 32×32)
- **Optimization**: RequestAnimationFrame for smooth touch interactions
- **Grid Lines**: Separate canvas layer or CSS grid overlay
- **Mobile Viewport**: Fixed positioning with CSS containment to prevent scrolling

### 4.4 Data Models
\n```typescript
type Color = string; // hex format: #RRGGBB or transparent

type Pixel = Color;\n
type CanvasGrid = Pixel[][]; // [y][x] = color

type Tool = pencil | eraser | fill | eyedropper;

interface AppState {
  canvas: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  history: CanvasGrid[];
  historyIndex: number;
  canvasSize: number; // 32 for MVP
  drawerOpen: boolean; // drawer visibility state
}\n\ninterface Point {
  x: number;
  y: number;
}
\ninterface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}
```\n
### 4.5 Backend Needs
- **MVP**: None (fully client-side application)
- **Post-MVP**: Optional backend for user accounts, gallery, cloud storage
\n---

## 5. Mobile UI Layout Specification

### 5.1 Fixed Viewport Structure
\n**Layout Components**:
1. **Canvas Area** (top section, 70% viewport height)
   - Centered pixel grid canvas
   - Touch-optimized for drawing
   - No scroll, fixed position

2. **Drawer Toggle Button** (bottom-right corner)
   - Floating action button (56×56px)
   - Opens/closes control drawer
   - Always visible\n
3. **Control Drawer** (bottom sheet, slides up)
   - Collapsible panel containing all tools and controls
   - Maximum height: 30% viewport
   - Scrollable if content exceeds height (rare)

### 5.2 Drawer Contents Layout

**Drawer organized in sections**:
\n1. **Tool Selection Row** (top of drawer)
   - 4 tool buttons: Pencil, Eraser, Fill, Eyedropper\n   - Each button: 44×44px minimum\n   - Horizontal layout with equal spacing
   - Active tool highlighted

2. **Color Control Row** (middle section)
   - Current color indicator (44×44px)
   - Color palette (8 swatches, 36×36px each)
   - Color picker button (44×44px)
\n3. **Action Buttons Row** (bottom section)
   - Undo button (44×44px)
   - Redo button (44×44px)
   - Export PNG button (88×44px, wider)\n   - Clear canvas button (44×44px)

### 5.3 Responsive Breakpoints

- **Portrait Mobile** (320px-480px width)
  - Canvas: 280px × 280px
  - Drawer: Full width, 30vh height
  - Tool buttons: 2×2 grid if needed

- **Landscape Mobile** (480px-768px width)
  - Canvas: 400px × 400px
  - Drawer: Full width, 25vh height
  - Tool buttons: Single row\n
- **Tablet** (768px-1024px width)
  - Canvas: 512px × 512px
  - Drawer: Full width, 20vh height
  - All controls in single row

---

## 6. Example Code Snippets

### 6.1 Mobile-Optimized Canvas Component

```typescript
// components/MobilePixelCanvas.tsx
import React, { useState, useRef, useEffect } from 'react';
import { usePixelCanvas } from '../hooks/usePixelCanvas';

interface MobilePixelCanvasProps {
  canvasGrid: string[][];
  currentTool: string;
  currentColor: string;
  onPixelChange: (x: number, y: number, color: string) => void;
  onColorPick: (color: string) => void;
}\n
const GRID_SIZE = 32;
const PIXEL_SIZE = 12; // Optimized for mobile

export const MobilePixelCanvas: React.FC<MobilePixelCanvasProps> = ({
  canvasGrid,\n  currentTool,
  currentColor,
  onPixelChange,
  onColorPick,
}) => {
  const canvasRef = usePixelCanvas({ canvasGrid, gridSize: GRID_SIZE, pixelSize: PIXEL_SIZE });
  const [isDrawing, setIsDrawing] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
\n  // Prevent default touch behaviors
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.target === canvasRef.current) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  const getPixelCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
\n    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / PIXEL_SIZE);
    const y = Math.floor((clientY - rect.top) / PIXEL_SIZE);
\n    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      return { x, y };
    }
    return null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {\n    e.preventDefault();
    const touch = e.touches[0];\n    const coords = getPixelCoords(touch.clientX, touch.clientY);
    if (!coords) return;

    setIsDrawing(true);\n\n    // Long press for eyedropper
    const timer = setTimeout(() => {
      const pickedColor = canvasGrid[coords.y][coords.x];
      if (pickedColor !== 'transparent') {
        onColorPick(pickedColor);
      }
    }, 500);
    setLongPressTimer(timer);
\n    handleDraw(coords.x, coords.y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    // Clear long press timer on move
    if (longPressTimer) {
      clearTimeout(longPressTimer);\n      setLongPressTimer(null);
    }\n
    const touch = e.touches[0];
    const coords = getPixelCoords(touch.clientX, touch.clientY);
    if (coords) {
      handleDraw(coords.x, coords.y);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    if (longPressTimer) {\n      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleDraw = (x: number, y: number) => {
    switch (currentTool) {
      case 'pencil':\n        onPixelChange(x, y, currentColor);
        break;
      case 'eraser':
        onPixelChange(x, y, 'transparent');
        break;\n      case 'eyedropper':
        const pickedColor = canvasGrid[y][x];
        if (pickedColor !== 'transparent') {
          onColorPick(pickedColor);
        }
        break;
    }
  };

  return (
    <div className=\"flex items-center justify-center h-[70vh] bg-gray-50\">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * PIXEL_SIZE}
        height={GRID_SIZE * PIXEL_SIZE}
        onTouchStart={handleTouchStart}\n        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}\n        className=\"border-2 border-gray-800 touch-none\"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};
```

### 6.2 Mobile Control Drawer Component

```typescript
// components/MobileDrawer.tsx
import React from 'react';
import { Pencil, Eraser, PaintBucket, Pipette, Undo, Redo, Download, Trash2 } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;\n  currentTool: string;
  currentColor: string;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: string) => void;
  onColorChange: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;\n  onExport: () => void;
  onClear: () => void;
}
\nconst DEFAULT_PALETTE = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00',
  '#0000FF', '#FFFF00', '#808080', 'transparent'
];
\nexport const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  currentTool,
  currentColor,\n  canUndo,
  canRedo,
  onToolChange,
  onColorChange,
  onUndo,
  onRedo,
  onExport,
  onClear,\n}) => {
  return (
    <div\n      className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ maxHeight: '30vh', overflowY: 'auto' }}
    >
      <div className=\"p-4 space-y-4\">
        {/* Tool Selection Row */}
        <div className=\"flex justify-around items-center\">
          <button
            onClick={() => onToolChange('pencil')}
            className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all ${
              currentTool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-label=\"Pencil tool\"
          >
            <Pencil size={24} />
          </button>\n          <button
            onClick={() => onToolChange('eraser')}
            className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all ${
              currentTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-label=\"Eraser tool\"
          >
            <Eraser size={24} />
          </button>
          <button\n            onClick={() => onToolChange('fill')}
            className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all ${\n              currentTool === 'fill' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-label=\"Fill tool\"
          >
            <PaintBucket size={24} />
          </button>
          <button\n            onClick={() => onToolChange('eyedropper')}
            className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all ${
              currentTool === 'eyedropper' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-label=\"Eyedropper tool\"
          >
            <Pipette size={24} />
          </button>
        </div>

        {/* Color Control Row */}
        <div className=\"space-y-2\">
          <div className=\"flex items-center gap-2\">
            <span className=\"text-sm font-medium\">Color:</span>
            <div\n              className=\"w-11 h-11 border-2 border-gray-800 rounded\"
              style={{
                backgroundColor: currentColor === 'transparent' ? '#fff' : currentColor,
                backgroundImage: currentColor === 'transparent'\n                  ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)'
                  : 'none',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 5px 5px',
              }}
            />
          </div>
          <div className=\"grid grid-cols-8 gap-2\">
            {DEFAULT_PALETTE.map((color) => (
              <button\n                key={color}
                onClick={() => onColorChange(color)}
                className={`w-9 h-9 border-2 rounded transition-all ${
                  currentColor === color ? 'border-blue-500 scale-110' : 'border-gray-400'
                }`}
                style={{
                  backgroundColor: color === 'transparent' ? '#fff' : color,
                  backgroundImage: color === 'transparent'\n                    ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)'
                    : 'none',
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 4px 4px',
                }}
                aria-label={`Select color ${color}`}
              />\n            ))}
          </div>
        </div>
\n        {/* Action Buttons Row */}
        <div className=\"flex justify-around items-center\">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className=\"w-11 h-11 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed\"
            aria-label=\"Undo\"
          >\n            <Undo size={24} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className=\"w-11 h-11 flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed\"\n            aria-label=\"Redo\"
          >
            <Redo size={24} />
          </button>\n          <button
            onClick={onExport}
            className=\"w-22 h-11 px-4 flex items-center justify-center gap-2 rounded-lg bg-green-500 text-white\"
            aria-label=\"Export PNG\"
          >
            <Download size={20} />
            <span className=\"text-sm\">Export</span>\n          </button>
          <button
            onClick={onClear}
            className=\"w-11 h-11 flex items-center justify-center rounded-lg bg-red-500 text-white\"\n            aria-label=\"Clear canvas\"
          >
            <Trash2 size={24} />
          </button>\n        </div>
      </div>
    </div>
  );
};
```

### 6.3 Drawer Toggle Button Component

```typescript
// components/DrawerToggle.tsx
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DrawerToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}
\nexport const DrawerToggle: React.FC<DrawerToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button\n      onClick={onToggle}\n      className=\"fixed bottom-4 right-4 w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg z-50\"
      aria-label={isOpen ? 'Close drawer' : 'Open drawer'}
    >
      {isOpen ? <ChevronDown size={32} /> : <ChevronUp size={32} />}
    </button>
  );
};
```

### 6.4 Main Mobile App Component

```typescript
// App.tsx
import React, { useState } from 'react';
import { MobilePixelCanvas } from './components/MobilePixelCanvas';
import { MobileDrawer } from './components/MobileDrawer';\nimport { DrawerToggle } from './components/DrawerToggle';
import { useHistory } from './hooks/useHistory';
import { floodFill } from './utils/floodFill';
import { exportCanvasToPNG } from './utils/exportCanvas';

const GRID_SIZE = 32;

const createEmptyGrid = (): string[][] => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('transparent'));
};

function App() {
  const { state: canvasGrid, setState: setCanvasGrid, undo, redo, canUndo, canRedo, clearHistory } = useHistory(createEmptyGrid());
  const [currentTool, setCurrentTool] = useState('pencil');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [drawerOpen, setDrawerOpen] = useState(false);
\n  const handlePixelChange = (x: number, y: number, color: string) => {\n    if (currentTool === 'fill') {
      const newGrid = floodFill(canvasGrid, x, y, color);
      setCanvasGrid(newGrid);
    } else {
      const newGrid = canvasGrid.map((row, rowIndex) =>
        row.map((pixel, colIndex) =>
          rowIndex === y && colIndex === x ? color : pixel
        )\n      );
      setCanvasGrid(newGrid);
    }
  };

  const handleColorPick = (color: string) => {
    setCurrentColor(color);
  };
\n  const handleExport = () => {
    exportCanvasToPNG(canvasGrid, GRID_SIZE);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {\n      setCanvasGrid(createEmptyGrid());
      clearHistory();
    }\n  };

  return (
    <div className=\"h-screen w-screen overflow-hidden bg-gray-50\">
      {/* Canvas Area */}
      <MobilePixelCanvas
        canvasGrid={canvasGrid}
        currentTool={currentTool}
        currentColor={currentColor}
        onPixelChange={handlePixelChange}
        onColorPick={handleColorPick}
      />

      {/* Drawer Toggle Button */}
      <DrawerToggle isOpen={drawerOpen} onToggle={() => setDrawerOpen(!drawerOpen)} />

      {/* Control Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        currentTool={currentTool}
        currentColor={currentColor}
        canUndo={canUndo}
        canRedo={canRedo}
        onToolChange={setCurrentTool}
        onColorChange={setCurrentColor}
        onUndo={undo}
        onRedo={redo}
        onExport={handleExport}
        onClear={handleClear}
      />
    </div>
  );
}\n
export default App;
```

---

## 7. Mobile-Specific Considerations

### 7.1 Touch Interaction Patterns\n- **Single Tap**: Draw with current tool
- **Long Press** (500ms): Activate eyedropper tool temporarily
- **Drag**: Continuous drawing\n- **Pinch Zoom**: Disabled to prevent accidental zooming

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
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
```

---

## 8. Assumptions & Constraints

### Assumptions\n1. **Target Users**: Mobile browser users with modern smartphones (2018+ devices)
2. **Use Case**: Short to medium sessions (5-20 minutes) creating small pixel art on mobile
3. **Technical Literacy**: Users comfortable with basic mobile web applications
4. **Browser Environment**: JavaScript enabled, HTML5 Canvas support, touch events
5. **Network**: Application can be fully client-side (no backend required for MVP)

### Technical Constraints
1. **Canvas Size**: Limited to 128×128 maximum (mobile performance considerations)
2. **History Depth**: 10-20 undo steps (mobile memory constraints)
3. **File Format**: PNG export only (no proprietary formats)
4. **Browser APIs**: Relies on Canvas API, localStorage, Blob API, Touch Events
5. **No Server**: All processing happens client-side
6. **Fixed Viewport**: All UI must fit within viewport without scrolling

### Mobile-Specific Constraints
1. **Touch Target Size**: Minimum 44×44px for all interactive elements
2. **Drawer Height**: Maximum 30vh to preserve canvas visibility
3. **Performance**: Must maintain 60fps on mid-range mobile devices
4. **Battery**: Optimize rendering to minimize battery drain
\n---

## 9. Implementation Roadmap

### Phase 1: Mobile Core Canvas (Week 1-2)
- Set up React + TypeScript + Vite project with mobile viewport configuration
- Implement touch-optimized canvas grid rendering
- Add pencil tool with touch interaction
- Basic color picker in drawer
- Drawer toggle functionality

### Phase 2: Essential Mobile Tools (Week 3)\n- Eraser tool\n- Fill tool (flood fill algorithm)
- Eyedropper tool (long press gesture)
- Tool selection UI in drawer
- Resize drawer buttons for optimal touch

### Phase 3: History & Export (Week 4)
- Undo/redo implementation with drawer buttons
- PNG export functionality
- Clear canvas feature
- Touch gesture optimization

### Phase 4: Mobile Polish & Testing (Week 5)
- UI refinements for mobile\n- Touch interaction improvements
- Cross-browser mobile testing (iOS Safari, Chrome, Firefox)
- Performance optimization for mobile devices
- User testing with 10+ mobile participants

### Phase 5: MVP Launch (Week 6)
- Bug fixes from mobile testing
- Documentation\n- Mobile deployment setup
- Launch preparation

---
\n## 10. Next Steps

1. **Validate Mobile MVP Scope**: Review with stakeholders to confirm mobile-first feature set
2. **Set Up Mobile Development Environment**: Initialize React + TypeScript project with mobile viewport
3. **Create Mobile Design Mockups**: Low-fidelity wireframes for drawer UI layout
4. **Begin Phase 1 Implementation**: Start with mobile-optimized canvas rendering
5. **Establish Mobile Testing Strategy**: Set up device testing, define touch interaction test cases
6. **Plan Mobile User Testing**: Recruit 10-15 mobile beta testers for MVP validation
\n---

**Document Version**: 2.0  
**Last Updated**: 2026-01-15  
**Status**: Ready for Mobile Development  
**Key Changes**: Optimized for mobile with drawer interface, touch controls, fixed viewport layout, and resized buttons