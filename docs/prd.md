# Pixel Art Drawing Mobile Web Application - Requirements Document

## 1. Core Problem & Value Proposition

**Problem**: Digital artists, hobbyists, game developers, and creative learners need an accessible, mobile-optimized tool to create pixel art without installing desktop software or dealing with complex interfaces.

**Value Proposition**: A lightweight, intuitive mobile-first web application that enables users to create, edit, and export high-resolution pixel art directly in their smartphone browser. The tool democratizes pixel art creation by removing technical barriers while providing essential features optimized specifically for mobile touch interactions, with enhanced pixel resolution to ensure exported images meet professional quality standards (minimum 100KB file size).

**Target Users**:
- Mobile indie game developers creating high-quality sprites on-the-go
- Digital artists exploring retro aesthetics from smartphones
- Students learning digital art fundamentals on mobile devices
- Hobbyists creating avatars, icons, and social media content during commutes
\n---

## 2. Product Requirements Document (PRD)

### 2.1 Goals\n- Provide an intuitive pixel-by-pixel drawing experience optimized for smartphone screens (320px-480px)\n- Enable one-handed operation for core drawing functions
- Deliver responsive performance for customizable canvas sizes on mobile devices
- Support essential drawing tools with thumb-friendly controls
- Implement simplified layer system (maximum 5 layers) for mobile memory constraints
- Provide streamlined color palette with quick-access swatches
- Enable artwork export in high-resolution PNG format (minimum 100KB file size)
- Support transparent and custom background colors for exported images
- Ensure all UI elements are accessible within thumb reach zones
- Minimize drawer height to maximize canvas visibility
- Support portrait orientation as primary mode
- Allow users to move selected pixels or drawn elements
- Optimize pixel resolution to ensure professional-quality output
- Provide intuitive zoom controls with dropdown options

### 2.2 Non-Goals
- Desktop optimization (mobile-first approach)
- Landscape mode as primary orientation
- Complex multi-layer compositions (>5 layers)
- Advanced color management features
- Animation or frame-by-frame editing
- Real-time collaboration features
- User accounts or cloud storage
- Native mobile app versions
- Marquee selection tool
- Lasso selection tool
- Hand/pan tool as separate tool
\n### 2.3 User Personas

**Persona 1: Mobile Commuter Artist**
- Age: 25, creates pixel art during subway rides
- Device: iPhone 13 (390×844px)\n- Needs: One-handed operation, quick tool access, simple interface, high-quality exports with transparent backgrounds
- Pain points: Limited screen space, need to hold phone with one hand, low-resolution outputs

**Persona 2: Mobile Game Developer**
- Age: 30, sketches game sprites during breaks
- Device: Samsung Galaxy S21 (360×800px)
- Needs: Fast sprite creation, easy export, basic editing tools, professional-quality assets with transparent backgrounds
- Pain points: Complex UIs difficult to use on small screens, insufficient image resolution

**Persona 3: Mobile Hobbyist**
- Age: 22, creates icons while waiting\n- Device: iPhone SE (375×667px)
- Needs: Immediate access, no learning curve, shareable high-quality results with custom backgrounds
- Pain points: Wants quick creativity without setup friction, needs images suitable for social media

### 2.4 User Journeys

**Journey 1: Quick Icon Creation on Phone**
1. User opens app on smartphone during commute
2. Selects desired canvas size from customizable options
3. Sees canvas optimized for portrait mode\n4. Taps pencil tool from bottom drawer
5. Draws with thumb on lower canvas area
6. Uses zoom button dropdown to adjust view (Zoom In/Zoom Out/Fit)
7. Swipes up drawer to access color swatches
8. Continues drawing with one hand\n9. Selects transparent background for export
10. Taps Export button
11. Receives high-resolution PNG (minimum 100KB) with transparent background
12. Total time: 3-5 minutes

**Journey 2: Simple Sprite with Layers and Movement**
1. User opens app on phone
2. Creates background layer
3. Adds character layer\n4. Uses move tool to reposition drawn elements
5. Adjusts zoom level via dropdown for detailed work
6. Toggles layer visibility to check composition
7. Adjusts layer opacity\n8. Chooses custom background color for export
9. Exports final high-resolution sprite
10. Total time: 10-15 minutes

### 2.5 Functional Requirements

#### Canvas Management
- **FR-1**: Display pixel grid with customizable dimensions (user can input custom width and height)
- **FR-2**: Provide preset canvas size options: 16×16, 32×32, 64×64, 128×128
- **FR-3**: Canvas positioned in upper 50% of screen for thumb reach
- **FR-4**: Support zoom levels: 100%, 200%, 400%
- **FR-5**: Canvas size selector in drawer with large touch targets
- **FR-6**: Grid lines toggleable via drawer button
- **FR-7**: Allow users to change canvas size during editing (with confirmation to prevent data loss)
- **FR-8**: Each logical pixel rendered at higher resolution (minimum 8×8 physical pixels per logical pixel) to ensure export quality

#### Drawing Tools
- **FR-9**: Pencil tool - primary drawing tool\n- **FR-10**: Eraser tool - remove pixels
- **FR-11**: Fill tool - flood fill with contiguous mode only
- **FR-12**: Eyedropper tool - long press gesture (800ms)\n- **FR-13**: Line tool - draw straight lines
- **FR-14**: Move tool - select and move drawn pixels or elements
- **FR-15**: Tool selection via bottom drawer with 56×56px buttons
- **FR-16**: Active tool highlighted with visual indicator
\n#### Move Tool Functionality
- **FR-17**: Move tool allows users to select any drawn line or pixel group
- **FR-18**: Selected area highlighted with visual indicator
- **FR-19**: Drag gesture to move selected pixels to new position
- **FR-20**: Tap outside selection to deselect
- **FR-21**: Move operation supports undo/redo\n\n#### Simplified Layer System
- **FR-22**: Maximum 5 layers (mobile memory constraint)
- **FR-23**: Create new layer button (56×56px)\n- **FR-24**: Delete layer with confirmation\n- **FR-25**: Layer visibility toggle
- **FR-26**: Layer opacity slider (0-100%)
- **FR-27**: Active layer indicator
- **FR-28**: Layer thumbnails (40×40px)
- **FR-29**: Simplified blend modes: Normal, Multiply, Overlay only
\n#### Streamlined Color System
- **FR-30**: 8 quick-access color swatches (56×56px each)
- **FR-31**: Current color indicator (56×56px)
- **FR-32**: Basic color picker with hex input
- **FR-33**: Recently used colors (4 slots)
- **FR-34**: Transparency option
\n#### Navigation
- **FR-35**: Pan canvas - two-finger drag gesture
- **FR-36**: Zoom - pinch gesture
- **FR-37**: Zoom button with dropdown menu (56×56px)
- **FR-38**: Dropdown options: Zoom In, Zoom Out, Fit
- **FR-39**: Zoom button positioned in first row of drawer interface
- **FR-40**: Zoom In increases zoom level by one step (100% → 200% → 400%)
- **FR-41**: Zoom Out decreases zoom level by one step (400% → 200% → 100%)
- **FR-42**: Fit option adjusts canvas to optimal viewing size within viewport
- **FR-43**: Reset view button\n
#### History\n- **FR-44**: Undo button (56×56px) - 10 steps maximum
- **FR-45**: Redo button (56×56px) - 10 steps maximum
- **FR-46**: Undo/redo via swipe gestures (optional)
\n#### Export\n- **FR-47**: Export high-resolution PNG button (120×56px)
- **FR-48**: Export resolution multiplier: minimum 8× physical pixels per logical pixel
- **FR-49**: Ensure exported PNG file size meets minimum 100KB threshold
- **FR-50**: Background color selector for export (transparent or custom color)
- **FR-51**: Default export background: transparent\n- **FR-52**: Background color preview in export settings
- **FR-53**: Clear canvas button with confirmation
- **FR-54**: Auto-save to browser storage

#### Mobile-Optimized UI
- **FR-55**: Bottom drawer interface (maximum 30vh height)
- **FR-56**: Drawer toggle button (56×56px floating action button)
- **FR-57**: All buttons minimum 56×56px for thumb-friendly interaction
- **FR-58**: Drawer slides up from bottom with smooth animation
- **FR-59**: Canvas occupies 60-70% of viewport height
- **FR-60**: Portrait orientation as primary mode
- **FR-61**: Prevent accidental page zoom during drawing
- **FR-62**: Haptic feedback for tool selection (if supported)

### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Canvas rendering within 80ms for customizable grid sizes on mobile
- **NFR-2**: Touch response within 16ms (60fps)\n- **NFR-3**: App load time under 2 seconds on 4G\n- **NFR-4**: Memory usage under 80MB on mobile devices (increased for high-resolution rendering)
- **NFR-5**: Battery-efficient rendering (minimize redraws)\n- **NFR-6**: Export processing time under 3 seconds for high-resolution output
- **NFR-7**: Zoom dropdown menu opens within 100ms
- **NFR-8**: Background color selection response within 50ms

#### Mobile Usability
- **NFR-9**: All interactive elements minimum 56×56px
- **NFR-10**: Thumb reach zone optimization for portrait mode
- **NFR-11**: One-handed operation for core functions
- **NFR-12**: Drawer height never exceeds 30vh
- **NFR-13**: Canvas always visible when drawer is open
\n#### Browser Support
- **NFR-14**: iOS Safari 14+, Chrome Mobile 90+, Firefox Mobile 88+
- **NFR-15**: Responsive design for 320px-480px width (portrait)
- **NFR-16**: Touch event support required\n\n#### Accessibility
- **NFR-17**: High contrast mode support
- **NFR-18**: Screen reader compatibility
- **NFR-19**: Minimum 4.5:1 color contrast for UI elements
\n#### Export Quality
- **NFR-20**: Minimum export resolution: 8× physical pixels per logical pixel
- **NFR-21**: Exported PNG file size minimum: 100KB
- **NFR-22**: Support for lossless PNG compression
- **NFR-23**: Support for transparent background export
- **NFR-24**: Support for custom background color export

### 2.7 Success Metrics
- **Engagement**: Average mobile session duration > 8 minutes
- **Completion**: 70%+ of users export at least one image
- **Performance**: 95th percentile touch latency < 30ms
- **Usability**: 90%+ of users complete drawing without frustration
- **One-Handed Use**: 60%+ of users successfully create art one-handed
- **Layer Adoption**: 40%+ of users utilize multiple layers
- **Move Tool Usage**: 30%+ of users utilize move tool for repositioning
- **Zoom Control Usage**: 50%+ of users utilize zoom dropdown for view adjustment
- **Export Quality**: 95%+ of exported images meet 100KB minimum file size
- **Background Customization**: 40%+ of users customize export background color

---

## 3. MVP Definition

### 3.1 MVP Included Features

**Core Drawing**:\n- Customizable canvas size (user input + presets: 16×16, 32×32, 64×64, 128×128)
- High-resolution pixel rendering (8× physical pixels per logical pixel)
- Pencil tool\n- Eraser tool
- Fill tool (contiguous mode only)
- Eyedropper tool (long press)
- Line tool\n- Move tool (select and move pixels)
\n**Simplified Layers**:
- Maximum 5 layers\n- Create/delete layer
- Layer visibility toggle
- Layer opacity (0-100%)
- Blend modes: Normal, Multiply, Overlay\n- Layer thumbnails\n\n**Streamlined Colors**:
- 8 quick-access swatches
- Basic color picker
- 4 recently used colors
- Current color indicator
\n**Navigation**:
- Pan (two-finger drag)
- Zoom (pinch gesture)
- Zoom button with dropdown (Zoom In, Zoom Out, Fit)
- Zoom levels: 100%, 200%, 400%
\n**History**:
- Undo (10 steps)
- Redo (10 steps)
\n**Export**:
- Export high-resolution PNG (minimum 100KB)
- Background color selector (transparent or custom color)
- Default transparent background
- Clear canvas\n- Auto-save to browser storage

**Mobile UI**:
- Bottom drawer interface (max 30vh)
- 56×56px touch targets
- Portrait-optimized layout
- Floating action button for drawer toggle
- Zoom button in first row of drawer

### 3.2 MVP Excluded Features\n
- Marquee selection tool
- Lasso selection tool
- Hand/pan tool as separate tool (pan via two-finger drag)
- Transformation tools (rotate, flip)\n- Advanced blend modes\n- Custom palette management
- Dynamic brush modes
- Dithering tools
- Navigation preview window
- Landscape mode optimization
- More than 5 layers

### 3.3 MVP Success Criteria
- 80%+ of mobile users complete icon creation within 5 minutes
- 90%+ of users successfully operate with one hand
- 70%+ of users export at least one image
- Zero critical bugs in core drawing flow
- 60fps maintained during drawing on mid-range devices
- 30%+ of users successfully use move tool\n- 50%+ of users utilize zoom dropdown controls
- 95%+ of exported images meet 100KB minimum file size requirement
- 40%+ of users customize export background color

---

## 4. Technical Architecture

### 4.1 Frontend Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Canvas**: HTML5 Canvas API with high-resolution rendering
- **Build Tool**: Vite\n- **Mobile Optimization**: Touch events, viewport configuration, CSS containment

### 4.2 State Management
- **Local State**: React useState for UI\n- **Canvas State**: Custom hook for pixel array (max 5 layers) with high-resolution backing store
- **Layer State**: Simplified layer array\n- **Color State**: 8 swatches + 4 recent colors\n- **History State**: 10-step undo/redo stack
- **Persistence**: localStorage for auto-save
- **Move Tool State**: Selected pixels coordinates and movement tracking
- **Zoom State**: Current zoom level and dropdown menu visibility
- **Export State**: Resolution multiplier configuration (minimum 8×) and background color settings

### 4.3 Data Models
\n```typescript
type Color = string; // hex format
type Pixel = Color;\ntype CanvasGrid = Pixel[][];
type Tool = 'pencil' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'move';
type BlendMode = 'normal' | 'multiply' | 'overlay';
type ZoomLevel = 1 | 2 | 4; // 100%, 200%, 400%
\ninterface Layer {
  id: string;
  name: string;
  canvas: CanvasGrid;
  visible: boolean;
  opacity: number; // 0-100\n  blendMode: BlendMode;
}\n
interface Selection {
  pixels: {x: number, y: number}[];
  active: boolean;
}\n
interface ZoomControl {
  level: ZoomLevel;
  dropdownOpen: boolean;
}
\ninterface ExportConfig {\n  resolutionMultiplier: number; // minimum 8\n  targetFileSize: number; // minimum 100KB
  backgroundColor: Color | 'transparent'; // transparent or custom color
}\n\ninterface AppState {
  layers: Layer[]; // max 5\n  activeLayerId: string;\n  currentTool: Tool;
  currentColor: Color;
  quickSwatches: Color[]; // 8 colors
  recentColors: Color[]; // 4 colors\n  history: AppState[]; // 10 steps
  historyIndex: number;
  canvasSize: {width: number, height: number}; // customizable
  drawerOpen: boolean;
  zoom: ZoomControl;
  selection: Selection;
  exportConfig: ExportConfig;
}
```

### 4.4 High-Resolution Rendering Strategy

**Logical vs Physical Pixels**:
- **Logical Pixel**: User-facing grid unit (e.g., 32×32 canvas)
- **Physical Pixel**: Actual rendered pixel (e.g., 256×256 for 8× multiplier)
- **Rendering**: Each logical pixel rendered as 8×8 physical pixel block minimum
- **Export**: Full physical resolution exported to ensure 100KB+ file size

**Implementation**:
- Use off-screen canvas at physical resolution
- Scale down for display canvas
- Export from high-resolution backing store
- Apply background color or transparency during export

---

## 5. Mobile UI Layout Specification

### 5.1 Portrait Layout Structure
\n**Screen Division**:
1. **Canvas Area** (60% viewport height)
   - Centered pixel grid with customizable size
   - Touch-optimized for thumb reach
   - Upper screen positioning\n   - Display canvas shows scaled-down version of high-resolution backing store

2. **Drawer Toggle FAB** (bottom-right, 56×56px)
   - Always visible\n   - Opens/closes drawer\n\n3. **Bottom Drawer** (slides up, max 30vh)
   - Tool buttons (56×56px each)
   - Color swatches (56×56px each)
   - Layer controls\n   - Action buttons
   - Canvas size selector
   - Export resolution indicator
   - Zoom button with dropdown
   - Background color selector

### 5.2 Drawer Layout

**Section 1: First Row** (horizontal layout)
- Zoom button with dropdown (56×56px)
- Undo (56×56px)\n- Redo (56×56px)
- Export (120×56px) with resolution indicator
- Clear (56×56px)\n\n**Section 2: Tools** (horizontal scroll)
- Pencil, Eraser, Fill, Line, Eyedropper, Move
- Each 56×56px\n- Active tool highlighted
\n**Section 3: Colors** (2 rows)
- Row 1: 8 quick swatches (56×56px)\n- Row 2: Current color + 4 recent colors\n
**Section 4: Canvas Settings** (collapsible)
- Canvas size input (width × height)
- Preset size buttons (16×16, 32×32, 64×64, 128×128)
- Grid toggle
- Resolution multiplier display (8× minimum)

**Section 5: Export Settings** (collapsible)
- Background color selector
- Transparent background option (default)
- Custom color picker for background
- Background color preview

**Section 6: Layers** (collapsible)
- Layer list (max 5)\n- Thumbnails (40×40px)
- Visibility toggle
- Opacity slider\n\n### 5.3 Zoom Dropdown Menu

**Position**: Appears above zoom button when activated
**Options**:
1. Zoom In (increases zoom level)\n2. Zoom Out (decreases zoom level)
3. Fit (adjusts canvas to optimal viewing size)
\n**Interaction**:
- Tap zoom button to open/close dropdown
- Tap option to execute zoom action
- Menu closes automatically after selection

### 5.4 Thumb Reach Zones

- **Primary Zone** (bottom 30%): Most-used tools and zoom controls
- **Secondary Zone** (middle 40%): Canvas\n- **Tertiary Zone** (top 30%): Less frequent actions

---

## 6. Mobile-Specific Optimizations

### 6.1 Touch Interactions
- **Single Tap**: Draw/select\n- **Long Press** (800ms): Eyedropper\n- **Two-Finger Drag**: Pan canvas
- **Pinch**: Zoom in/out
- **Swipe Up**: Open drawer
- **Swipe Down**: Close drawer
- **Drag (Move Tool)**: Move selected pixels
- **Tap Zoom Button**: Open/close zoom dropdown
- **Tap Background Color**: Open background color selector

### 6.2 Viewport Configuration
\n```html
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />
<meta name=\"mobile-web-app-capable\" content=\"yes\" />
```\n
### 6.3 Performance Optimizations

- Debounced canvas redraws
- RequestAnimationFrame for smooth interactions
- Lazy loading for layer thumbnails
- Minimal DOM updates
- CSS containment for drawer\n- Optimized rendering for customizable canvas sizes
- Dual-canvas architecture (display + high-resolution backing store)
- Progressive rendering for export operations
- Efficient dropdown menu rendering
- Optimized background color application during export

---

## 7. Implementation Roadmap

### Phase 1: Mobile Core (Week 1-2)
- Mobile-optimized canvas rendering with customizable size
- High-resolution backing store implementation (8× multiplier)
- Bottom drawer interface\n- Pencil and eraser tools
- Touch interaction handling
- Canvas size selector UI

### Phase 2: Essential Tools (Week 3)\n- Fill tool\n- Line tool
- Eyedropper (long press)
- Move tool (select and move pixels)
- Tool selection UI
\n### Phase 3: Simplified Layers (Week 4)
- Layer creation/deletion (max 5)
- Layer visibility\n- Layer opacity
- Basic blend modes
- High-resolution layer compositing

### Phase 4: Color System (Week 5)
- 8 quick swatches
- Color picker\n- Recent colors
- Current color indicator
\n### Phase 5: Navigation & History (Week 6)
- Pan and zoom gestures
- Zoom button with dropdown (Zoom In, Zoom Out, Fit)
- Undo/redo (10 steps)
- Auto-save\n
### Phase 6: Export & Polish (Week 7)
- High-resolution PNG export (minimum 100KB)
- Background color selector (transparent or custom color)
- Export resolution optimization
- Clear canvas\n- UI refinements
- Performance optimization

### Phase 7: Testing & Launch (Week 8)
- Mobile device testing
- Export quality validation
- Background color functionality testing
- Zoom control usability testing
- User testing (15+ participants)
- Bug fixes\n- Launch\n
---

## 8. Next Steps

1. **Validate High-Resolution Scope**: Confirm export quality requirements with stakeholders
2. **Create Mobile Mockups**: Design portrait-optimized UI wireframes with zoom dropdown, background color selector, and resolution indicators
3. **Set Up Development Environment**: Initialize React + TypeScript project with high-resolution canvas support
4. **Begin Phase 1**: Start with mobile canvas and high-resolution backing store implementation
5. **Establish Testing Strategy**: Define mobile device test matrix and export quality benchmarks
6. **Plan User Testing**: Recruit 15-20 mobile beta testers\n\n---

**Document Version**: 10.0  
**Last Updated**: 2026-01-16  
**Status**: High-Resolution MVP Ready for Development  
**Key Changes**: Added background color selector for export functionality; updated functional requirements (FR-50 to FR-52) to include background color selection with transparent default and custom color options; added background color preview in export settings; modified data models to include backgroundColor field in ExportConfig interface; enhanced drawer layout to include Export Settings section with background color controls; updated non-functional requirements (NFR-8, NFR-23, NFR-24) to support transparent and custom background export; adjusted success metrics to track background customization usage; updated implementation roadmap Phase 6 to include background color selector development