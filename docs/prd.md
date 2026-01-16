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
- Deliver responsive performance for canvases up to 128×128 pixels on mobile
- Support essential drawing tools (pencil, eraser, fill, eyedropper, line, circle, square) with touch-friendly controls
- Implement selection tools (marquee, lasso) with move, cut, copy, and paste operations
- Support transformations (rotate, flip vertical, flip horizontal)\n- Provide navigation tools (pan, zoom, preview window)\n- Implement undo/redo functionality for error correction
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
- Needs: Quick sprite creation on phone, precise touch control, easy export, shape tools for efficient drawing
- Pain points: Desktop tools unavailable on mobile, needs browser accessibility
\n**Persona 2: Jordan - Digital Art Student**
- Age: 19, learning digital art fundamentals on tablet
- Needs: Simple mobile interface, experimentation-friendly, forgiving tools, selection and transformation features
- Pain points: Intimidated by complex mobile interfaces\n
**Persona 3: Sam - Mobile Hobbyist Creator**
- Age: 35, creates icons and avatars during breaks
- Needs: Quick mobile access, no installation, shareable results, efficient editing tools
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
2. Changes canvas size to 64×64
3. Uses line tool to create character outline
4. Uses square tool for body structure
5. Switches to fill tool for large color areas
6. Uses marquee selection to move character position
7. Applies flip horizontal transformation
8. Uses eyedropper to sample existing colors
9. Utilizes undo/redo multiple times during refinement
10. Exports final sprite as PNG
11. Total time: 20-30 minutes

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
- **FR-13**: Fill tool - flood-fill connected pixels of same color with two modes:
  - Contiguous mode: fill only connected pixels of the same color
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

#### Navigation Tools
- **FR-27**: Zoom tool - zoom in/out centered on tap/cursor position
- **FR-28**: Zoom levels: 100%, 200%, 400%, 800%
- **FR-29**: Pan tool (Hand) - drag to move viewport when zoomed in
- **FR-30**: Navigation preview window - minimap showing full canvas with current viewport rectangle
- **FR-31**: Preview window allows click-to-jump navigation\n
#### Color Management
- **FR-32**: Display current primary color indicator in drawer
- **FR-33**: Provide color picker accessible from drawer (hex input + visual selector)
- **FR-34**: Show color palette with quick-access color swatches in drawer
- **FR-35**: Allow users to add colors to palette\n- **FR-36**: Support transparency as a color option

#### History & State\n- **FR-37**: Implement undo functionality (minimum 20 steps) with drawer button
- **FR-38**: Implement redo functionality with drawer button
- **FR-39**: Display undo/redo availability in drawer UI
- **FR-40**: Preserve drawing state during session (browser storage)
\n#### Export & Import
- **FR-41**: Export artwork as PNG file (actual pixel dimensions) via drawer button
- **FR-42**: Export with transparent background support\n- **FR-43**: Generate filename with timestamp (e.g., pixelart_20260116_0519.png)
- **FR-44**: Clear canvas function with confirmation dialog accessible from drawer

#### Mobile-Specific Requirements
- **FR-45**: All UI controls must be contained in a collapsible drawer interface
- **FR-46**: Drawer must be toggleable to maximize canvas space
- **FR-47**: Touch gestures: single tap to draw, long press for eyedropper\n- **FR-48**: Prevent page zoom/scroll during drawing interactions
- **FR-49**: Support both portrait and landscape orientations
- **FR-50**: Drawer buttons must be resized for optimal mobile touch (44×44px minimum)

### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Canvas rendering must complete within 100ms for 128×128 grid on mobile devices
- **NFR-2**: Touch interactions must respond within 16ms (60fps)\n- **NFR-3**: Undo/redo operations must execute within 50ms
- **NFR-4**: Application initial load time under 3 seconds on 4G connection
- **NFR-5**: Shape drawing algorithms must use integer arithmetic to avoid anti-aliasing\n\n#### Accessibility
- **NFR-6**: Touch targets minimum 44×44px for all interactive elements
- **NFR-7**: Support for keyboard shortcuts (Ctrl+X, Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+Y)
- **NFR-8**: ARIA labels for all interactive elements
- **NFR-9**: Minimum color contrast ratio of 4.5:1 for UI elements
- **NFR-10**: Support for screen readers on mobile devices

#### Browser Support
- **NFR-11**: Support mobile Chrome 90+, mobile Firefox 88+, mobile Safari 14+\n- **NFR-12**: Responsive design for mobile (320px-768px) and tablet (768px-1024px)
- **NFR-13**: Graceful degradation for unsupported browsers with clear messaging

#### Usability
- **NFR-14**: Zero-configuration startup (no account required)
- **NFR-15**: Intuitive tool icons following industry conventions
- **NFR-16**: Visual feedback for all touch actions (tap states, active tools)
- **NFR-17**: Fixed viewport layout - no scrolling required for any functionality
- **NFR-18**: Drawer interface for all controls to maximize canvas space

### 2.7 Success Metrics
- **Engagement**: Average mobile session duration > 10 minutes
- **Completion**: 60%+ of mobile users who draw export at least one image
- **Performance**: 95th percentile touch interaction latency < 50ms
- **Retention**: 30%+ of mobile users return within 7 days
- **Technical**: Zero critical bugs in production, 99.5% uptime
- **Mobile Usability**: 85%+ of users complete drawing without UI frustration
- **Feature Adoption**: 40%+ of users utilize shape tools or selection features

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

**Selection & Manipulation**:
- Marquee selection tool
- Lasso selection tool
- Move, Cut (Ctrl+X), Copy (Ctrl+C), Paste (Ctrl+V) operations
- Rotate (90° increments)
- Flip Vertical
- Flip Horizontal
\n**Navigation**:
- Pan tool (Hand)\n- Zoom (100%, 200%, 400%)
- Navigation preview window
\n**Color System**:
- Color picker with hex input in drawer
- 8 predefined color swatches (black, white, red, blue, green, yellow, gray, transparent)
- Current color indicator in drawer
\n**History**:
- Undo (20 steps) via drawer button and Ctrl+Z
- Redo (20 steps) via drawer button and Ctrl+Y
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
- Custom color palette editing → Predefined palette sufficient for validation
- Layers → Significantly increases complexity\n- Import image functionality → Export-only reduces scope
- User accounts/cloud save → Local-only for MVP
- Animation frames → Separate feature set
- Advanced selection operations (feathering, anti-aliasing) → Basic selection sufficient
- Desktop keyboard shortcuts beyond cut/copy/paste/undo/redo → Mobile-first approach

### 3.3 MVP Success Criteria
- Mobile users can create recognizable pixel art within 5 minutes
- Users successfully utilize shape tools to create geometric designs
- Selection and transformation tools work intuitively on mobile
- Export produces valid PNG files on mobile browsers
- No critical bugs in core mobile drawing flow
- Drawer interface is intuitive and doesn't require scrolling
- 15+ mobile test users successfully complete drawing → export flow\n- 60%+ of test users utilize at least one shape or selection tool

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
- **Local State**: React useState for UI interactions (tool selection, color, drawer state)
- **Canvas State**: Custom hook managing 2D pixel array\n- **Selection State**: Active selection coordinates and clipboard data
- **History State**: Immutable history stack (array of canvas snapshots)
- **Persistence**: localStorage for session recovery
- **Drawer State**: Toggle state for collapsible control panel

### 4.3 Rendering Approach
- **Grid Representation**: 2D array pixels[y][x] = colorHex
- **Canvas Rendering**: Redraw entire canvas on state change (acceptable for 32×32)\n- **Optimization**: RequestAnimationFrame for smooth touch interactions
- **Grid Lines**: Separate canvas layer or CSS grid overlay
- **Mobile Viewport**: Fixed positioning with CSS containment to prevent scrolling
- **Shape Algorithms**: Integer-based algorithms (Bresenham's for lines, Midpoint for circles) to avoid anti-aliasing
\n### 4.4 Data Models
\n```typescript
type Color = string; // hex format: #RRGGBB or transparent

type Pixel = Color;\n
type CanvasGrid = Pixel[][]; // [y][x] = color

type Tool = 'pencil' | 'eraser' | 'line' | 'circle' | 'square' | 'fill' | 'eyedropper' | 'hand' | 'marquee' | 'lasso';

type FillMode = 'contiguous' | 'global';
\ntype TransformType = 'rotate90' | 'rotate180' | 'rotate270' | 'flipVertical' | 'flipHorizontal';

interface AppState {
  canvas: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  fillMode: FillMode;
  history: CanvasGrid[];
  historyIndex: number;
  canvasSize: number; // 32 for MVP\n  drawerOpen: boolean;
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
}
\ninterface Rectangle {
  x: number;
  y: number;
  width: number;\n  height: number;
}\n\ninterface TouchPoint {
  x: number;\n  y: number;
  timestamp: number;
}\n```

### 4.5 Backend Needs
- **MVP**: None (fully client-side application)
- **Post-MVP**: Optional backend for user accounts, gallery, cloud storage
\n---

## 5. Mobile UI Layout Specification

### 5.1 Fixed Viewport Structure
\n**Layout Components**:
1. **Canvas Area** (top section, 65% viewport height)
   - Centered pixel grid canvas
   - Touch-optimized for drawing
   - No scroll, fixed position
   - Navigation preview window (bottom-right corner, 80×80px)

2. **Drawer Toggle Button** (bottom-right corner)\n   - Floating action button (56×56px)
   - Opens/closes control drawer
   - Always visible\n\n3. **Control Drawer** (bottom sheet, slides up)
   - Collapsible panel containing all tools and controls
   - Maximum height: 35% viewport
   - Scrollable if content exceeds height
\n### 5.2 Drawer Contents Layout

**Drawer organized in sections**:
\n1. **Tool Selection Row** (top of drawer)
   - Primary tools: Pencil, Eraser, Line, Circle, Square, Fill, Eyedropper, Hand
   - Each button: 44×44px minimum\n   - Horizontal scrollable layout
   - Active tool highlighted

2. **Selection & Transform Row** (second section)
   - Selection tools: Marquee, Lasso\n   - Transform buttons: Rotate, Flip Vertical, Flip Horizontal
   - Each button: 44×44px minimum
\n3. **Fill Mode Toggle** (when Fill tool active)
   - Toggle between Contiguous and Global modes
   - Visual indicator of active mode

4. **Color Control Row** (middle section)
   - Current color indicator (44×44px)
   - Color palette (8 swatches, 36×36px each)
   - Color picker button (44×44px)

5. **Action Buttons Row** (bottom section)
   - Undo button (44×44px)
   - Redo button (44×44px)
   - Export PNG button (88×44px, wider)\n   - Clear canvas button (44×44px)

### 5.3 Responsive Breakpoints

- **Portrait Mobile** (320px-480px width)
  - Canvas: 280px × 280px
  - Drawer: Full width, 35vh height
  - Tool buttons: Horizontal scroll
\n- **Landscape Mobile** (480px-768px width)
  - Canvas: 400px × 400px
  - Drawer: Full width, 30vh height
  - Tool buttons: Single row

- **Tablet** (768px-1024px width)
  - Canvas: 512px × 512px
  - Drawer: Full width, 25vh height
  - All controls in organized rows

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
```

### 6.4 Transformation Algorithms

```typescript
// utils/transformations.ts
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
---

## 7. Mobile-Specific Considerations

### 7.1 Touch Interaction Patterns
- **Single Tap**: Draw with current tool or select\n- **Long Press** (500ms): Activate eyedropper tool temporarily
- **Drag**: Continuous drawing or selection
- **Two-Finger Pinch**: Zoom in/out (when zoom tool active)
- **Two-Finger Pan**: Move viewport (when zoomed in)

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
\n.selection-border {
  stroke-dasharray: 4 4;
  animation: marching-ants 0.5s linear infinite;
}
```

---

## 8. Assumptions & Constraints

### Assumptions
1. **Target Users**: Mobile browser users with modern smartphones (2018+ devices)
2. **Use Case**: Short to medium sessions (5-30 minutes) creating small pixel art on mobile
3. **Technical Literacy**: Users comfortable with basic mobile web applications and familiar with cut/copy/paste operations
4. **Browser Environment**: JavaScript enabled, HTML5 Canvas support, touch events, clipboard API
5. **Network**: Application can be fully client-side (no backend required for MVP)

### Technical Constraints
1. **Canvas Size**: Limited to 128×128 maximum (mobile performance considerations)
2. **History Depth**: 20 undo steps (mobile memory constraints)
3. **File Format**: PNG export only (no proprietary formats)
4. **Browser APIs**: Relies on Canvas API, localStorage, Blob API, Touch Events, Clipboard API
5. **No Server**: All processing happens client-side
6. **Fixed Viewport**: All UI must fit within viewport without scrolling
7. **Integer Algorithms**: Shape tools must use integer-based algorithms to avoid anti-aliasing artifacts

### Mobile-Specific Constraints
1. **Touch Target Size**: Minimum 44×44px for all interactive elements
2. **Drawer Height**: Maximum 35vh to preserve canvas visibility
3. **Performance**: Must maintain 60fps on mid-range mobile devices
4. **Battery**: Optimize rendering to minimize battery drain
5. **Clipboard Access**: Requires user permission for clipboard operations

---
\n## 9. Implementation Roadmap

### Phase 1: Mobile Core Canvas & Basic Tools (Week 1-2)
- Set up React + TypeScript + Vite project with mobile viewport configuration
- Implement touch-optimized canvas grid rendering
- Add pencil and eraser tools with touch interaction
- Basic color picker in drawer
- Drawer toggle functionality
- Undo/redo with keyboard shortcuts

### Phase 2: Shape Tools (Week 3)\n- Implement Bresenham's line algorithm\n- Implement Midpoint Circle algorithm
- Add square/rectangle tool\n- Tool selection UI in drawer
- Resize drawer buttons for optimal touch
\n### Phase 3: Fill & Navigation (Week 4)
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
\n### Phase 6: Polish & Testing (Week 7)
- UI refinements for mobile
- Touch interaction improvements
- Cross-browser mobile testing (iOS Safari, Chrome, Firefox)
- Performance optimization for mobile devices
- User testing with 15+ mobile participants

### Phase 7: MVP Launch (Week 8)
- Bug fixes from mobile testing
- Documentation\n- Mobile deployment setup
- Launch preparation

---
\n## 10. Next Steps

1. **Validate Enhanced MVP Scope**: Review with stakeholders to confirm expanded mobile-first feature set
2. **Set Up Mobile Development Environment**: Initialize React + TypeScript project with mobile viewport\n3. **Create Mobile Design Mockups**: Low-fidelity wireframes for drawer UI layout with new tools
4. **Begin Phase 1 Implementation**: Start with mobile-optimized canvas rendering and basic tools
5. **Establish Mobile Testing Strategy**: Set up device testing, define touch interaction test cases for shape and selection tools
6. **Plan Mobile User Testing**: Recruit 15-20 mobile beta testers for MVP validation
7. **Algorithm Validation**: Test integer-based algorithms on various mobile devices to ensure no anti-aliasing\n\n---

**Document Version**: 3.0  
**Last Updated**: 2026-01-16  
**Status**: Ready for Enhanced Mobile Development  
**Key Changes**: Added shape primitives (Line, Circle, Square), selection tools (Marquee, Lasso), transformation operations (Rotate, Flip), navigation tools (Pan, Zoom, Preview), enhanced fill modes (Contiguous, Global), clipboard operations (Cut, Copy, Paste), and integer-based algorithms to prevent anti-aliasing