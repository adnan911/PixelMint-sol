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

### 2.1 Goals\n- Provide an intuitive pixel-by-pixel drawing experience optimized for smartphone screens (320px-480px)\n- Enable one-handed operation for core drawing functions\n- Deliver responsive performance for customizable canvas sizes on mobile devices
- Support essential drawing tools with thumb-friendly controls
- Implement simplified layer system (maximum 5 layers) for mobile memory constraints
- Provide streamlined color palette with quick-access swatches
- Enable artwork export in high-resolution PNG format (minimum 100KB file size)
- Support transparent and custom background colors for exported images
- Provide export preview with download confirmation before saving
- Ensure all UI elements are accessible within thumb reach zones
- Minimize drawer height to maximize canvas visibility
- Support portrait orientation as primary mode
- Allow users to move selected pixels or drawn elements\n- Optimize pixel resolution to ensure professional-quality output
- Provide intuitive zoom controls with dropdown options
- Create an engaging welcoming front page with animations
- Allow users to select canvas size before starting
- Offer multiple pencil brush sizes (2px, 3px, 4px, 5px) with visual indicators
- Provide 3 quick-access color slots for frequently used colors with customization capability
\n### 2.2 Non-Goals
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
- Device: iPhone 13 (390×844px)\n- Needs: One-handed operation, quick tool access, simple interface, high-quality exports with transparent backgrounds, variable brush sizes for different detail levels, preview before download, quick access to frequently used colors
- Pain points: Limited screen space, need to hold phone with one hand, low-resolution outputs, accidental downloads, difficulty accessing frequently used colors
\n**Persona 2: Mobile Game Developer**
- Age: 30, sketches game sprites during breaks
- Device: Samsung Galaxy S21 (360×800px)
- Needs: Fast sprite creation, easy export, basic editing tools, professional-quality assets with transparent backgrounds, larger brush sizes for quick fills, preview confirmation before saving, quick color switching
- Pain points: Complex UIs difficult to use on small screens, insufficient image resolution, no preview before export, repetitive color selection

**Persona 3: Mobile Hobbyist**
- Age: 22, creates icons while waiting\n- Device: iPhone SE (375×667px)
- Needs: Immediate access, no learning curve, shareable high-quality results with custom backgrounds, flexible brush sizes for creative expression, visual confirmation before download, saved favorite colors
- Pain points: Wants quick creativity without setup friction, needs images suitable for social media, uncertain about export result, losing preferred color choices

### 2.4 User Journeys

**Journey 1: First-Time User Experience**
1. User opens app on smartphone
2. Sees welcoming front page with animated pixel art logo
3. Views brief animated introduction to app features
4. Taps Start Creating button
5. Presented with canvas size selection screen
6. Chooses from preset options or enters custom size
7. Confirms selection and enters drawing interface
8. Total time: 30-60 seconds

**Journey 2: Quick Icon Creation on Phone**
1. User opens app on smartphone during commute
2. Selects desired canvas size from selection screen
3. Sees canvas optimized for portrait mode
4. Taps pencil tool from bottom drawer
5. Selects 3px brush size for medium detail work
6. Draws with thumb on lower canvas area
7. Uses zoom button dropdown to adjust view (Zoom In/Zoom Out/Fit)
8. Taps one of 3 quick-access color slots to apply saved color
9. Long presses color slot to customize and save new color
10. Continues drawing with one hand using saved colors
11. Selects transparent background for export
12. Taps Export button\n13. Views export preview popup with rendered PNG
14. Reviews preview and taps Download button
15. Receives high-resolution PNG (minimum 100KB) with transparent background
16. Total time: 3-5 minutes

**Journey 3: Simple Sprite with Layers and Movement**
1. User opens app on phone
2. Selects canvas size from welcome screen
3. Creates background layer\n4. Adds character layer\n5. Uses 5px brush for quick base fills
6. Switches to 2px brush for fine details
7. Customizes 3 quick-access color slots with project-specific palette
8. Uses move tool to reposition drawn elements
9. Adjusts zoom level via dropdown for detailed work
10. Toggles layer visibility to check composition
11. Adjusts layer opacity\n12. Chooses custom background color for export
13. Taps Export button
14. Reviews export preview with custom background
15. Confirms by tapping Download button
16. Exports final high-resolution sprite
17. Total time: 10-15 minutes
\n### 2.5 Functional Requirements

#### Welcome Page
- **FR-1**: Display welcoming front page on app launch
- **FR-2**: Show animated pixel art logo with smooth entrance animation
- **FR-3**: Display app name PIXEL MINT with fade-in animation
- **FR-4**: Show brief feature highlights with sequential animations
- **FR-5**: Provide Start Creating button (120×56px) with hover/tap animation
- **FR-6**: Include subtle background animations (floating pixels or grid effects)
- **FR-7**: Animation duration: 2-3 seconds total
- **FR-8**: Allow users to skip animation by tapping anywhere

#### Canvas Size Selection
- **FR-9**: Display canvas size selection screen after welcome page
- **FR-10**: Show preset options: 16×16, 32×32, 64×64, 128×128 as large touch-friendly cards
- **FR-11**: Provide custom size input fields (width and height)
- **FR-12**: Display visual preview of selected canvas size
- **FR-13**: Include Confirm button (120×56px) to proceed to drawing interface
- **FR-14**: Allow users to return to welcome page via back button
- **FR-15**: Validate custom size input (minimum 8×8, maximum 256×256)

#### Canvas Management
- **FR-16**: Display pixel grid with user-selected dimensions
- **FR-17**: Canvas positioned in upper 50% of screen for thumb reach
- **FR-18**: Support zoom levels: 100%, 200%, 400%
- **FR-19**: Grid lines toggleable via drawer button
- **FR-20**: Allow users to change canvas size during editing (with confirmation to prevent data loss)
- **FR-21**: Each logical pixel rendered at higher resolution (minimum 8×8 physical pixels per logical pixel) to ensure export quality

#### Drawing Tools
- **FR-22**: Pencil tool - primary drawing tool with multiple brush sizes\n- **FR-22a**: Pencil brush size options: 1px (default), 2px, 3px, 4px, 5px
- **FR-22b**: Display mini icon indicators for each brush size showing visual representation of brush diameter
- **FR-22c**: Brush size selector accessible via drawer interface with 56×56px buttons
- **FR-22d**: Active brush size highlighted with visual indicator
- **FR-22e**: Brush size icons show filled circles representing actual pixel coverage (1px = small dot, 5px = large circle)
- **FR-23**: Eraser tool - remove pixels\n- **FR-24**: Fill tool - flood fill with contiguous mode only
- **FR-25**: Eyedropper tool - long press gesture (800ms)\n- **FR-26**: Line tool - draw straight lines
- **FR-27**: Move tool - select and move drawn pixels or elements
- **FR-28**: Tool selection via bottom drawer with 56×56px buttons
- **FR-29**: Active tool highlighted with visual indicator
\n#### Move Tool Functionality
- **FR-30**: Move tool allows users to select any drawn line or pixel group
- **FR-31**: Selected area highlighted with visual indicator
- **FR-32**: Drag gesture to move selected pixels to new position
- **FR-33**: Tap outside selection to deselect
- **FR-34**: Move operation supports undo/redo\n\n#### Simplified Layer System
- **FR-35**: Maximum 5 layers (mobile memory constraint)
- **FR-36**: Create new layer button (56×56px)\n- **FR-37**: Delete layer with confirmation
- **FR-38**: Layer visibility toggle\n- **FR-39**: Layer opacity slider (0-100%)
- **FR-40**: Active layer indicator
- **FR-41**: Layer thumbnails (40×40px)\n- **FR-42**: Simplified blend modes: Normal, Multiply, Overlay only
\n#### Streamlined Color System
- **FR-43**: 8 quick-access color swatches (56×56px each) - locked position in drawer
- **FR-44**: Current color indicator (56×56px)
- **FR-45**: Basic color picker with hex input
- **FR-46**: Recently used colors (4 slots)
- **FR-47**: Transparency option\n\n#### Quick-Access Color Slots (3 Customizable Slots)
- **FR-48**: Display 3 quick-access color slots positioned prominently in drawer interface (56×56px each)
- **FR-49**: Each quick-access color slot operates independently
- **FR-50**: Tap quick-access color slot to apply saved color to current tool
- **FR-51**: Long press quick-access color slot (800ms) to open color customization dialog
- **FR-52**: Color customization dialog includes color picker and Save button
- **FR-53**: Save button stores selected color to tapped slot
- **FR-54**: Quick-access color slots persist across sessions via localStorage
- **FR-55**: Quick-access color slots independent from 8 color swatches
- **FR-56**: Quick-access color slots independent from recently used colors
- **FR-57**: Quick-access color slots independent from color picker settings
- **FR-58**: Default quick-access colors: red, blue, green\n- **FR-59**: Visual indicator shows active quick-access color slot when selected
- **FR-60**: Quick-access color slots positioned in first row of drawer for easy thumb reach

#### Navigation
- **FR-61**: Pan canvas - two-finger drag gesture
- **FR-62**: Zoom - pinch gesture
- **FR-63**: Zoom button with dropdown menu (56×56px)
- **FR-64**: Dropdown options: Zoom In, Zoom Out, Fit
- **FR-65**: Zoom button positioned in first row of drawer interface
- **FR-66**: Zoom In increases zoom level by one step (100% → 200% → 400%)
- **FR-67**: Zoom Out decreases zoom level by one step (400% → 200% → 100%)
- **FR-68**: Fit option adjusts canvas to optimal viewing size within viewport
- **FR-69**: Reset view button\n\n#### History\n- **FR-70**: Undo button (56×56px) - 10 steps maximum
- **FR-71**: Redo button (56×56px) - 10 steps maximum
- **FR-72**: Undo/redo via swipe gestures (optional)
\n#### Export with Preview
- **FR-73**: Export PNG button (120×56px) triggers export preview popup
- **FR-74**: Export preview popup displays rendered PNG image at actual export resolution
- **FR-75**: Preview popup shows image with selected background (transparent or custom color)
- **FR-76**: Preview popup footer contains Download button (120×56px) and Cancel button (120×56px)
- **FR-77**: Download button initiates PNG file download to device
- **FR-78**: Cancel button closes preview popup without downloading
- **FR-79**: Preview popup overlay dims background canvas area
- **FR-80**: Preview popup centered on screen with responsive sizing
- **FR-81**: Export resolution multiplier: minimum 8× physical pixels per logical pixel
- **FR-82**: Ensure exported PNG file size meets minimum 100KB threshold
- **FR-83**: Background color selector for export (transparent or custom color)
- **FR-84**: Default export background: transparent
- **FR-85**: Background color preview in export settings
- **FR-86**: Clear canvas button with confirmation
- **FR-87**: Auto-save to browser storage\n\n#### Mobile-Optimized UI
- **FR-88**: Bottom drawer interface (maximum 30vh height)
- **FR-89**: Drawer toggle button (56×56px floating action button)
- **FR-90**: All buttons minimum 56×56px for thumb-friendly interaction
- **FR-91**: Drawer slides up from bottom with smooth animation
- **FR-92**: Canvas occupies 60-70% of viewport height
- **FR-93**: Portrait orientation as primary mode
- **FR-94**: Prevent accidental page zoom during drawing
- **FR-95**: Haptic feedback for tool selection (if supported)
- **FR-96**: Quick-access color slots positioned in first row of drawer for optimal thumb reach
- **FR-97**: Color & palette settings icon locked in drawer position
\n### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Welcome page animation loads within 500ms
- **NFR-2**: Canvas rendering within 80ms for selected grid sizes on mobile
- **NFR-3**: Touch response within 16ms (60fps)
- **NFR-4**: App load time under 2 seconds on 4G\n- **NFR-5**: Memory usage under 80MB on mobile devices (increased for high-resolution rendering)
- **NFR-6**: Battery-efficient rendering (minimize redraws)
- **NFR-7**: Export processing time under 3 seconds for high-resolution output
- **NFR-8**: Zoom dropdown menu opens within 100ms
- **NFR-9**: Background color selection response within 50ms
- **NFR-10**: Canvas size selection screen loads within 300ms
- **NFR-11**: Brush size selection response within 50ms
- **NFR-12**: Export preview popup renders within 500ms
- **NFR-13**: Preview popup animation smooth at 60fps
- **NFR-14**: Quick-access color slot tap response within 50ms
- **NFR-15**: Quick-access color customization dialog opens within 200ms
- **NFR-16**: Quick-access color save operation completes within 100ms
\n#### Mobile Usability
- **NFR-17**: All interactive elements minimum 56×56px\n- **NFR-18**: Thumb reach zone optimization for portrait mode
- **NFR-19**: One-handed operation for core functions
- **NFR-20**: Drawer height never exceeds 30vh
- **NFR-21**: Canvas always visible when drawer is open
- **NFR-22**: Welcome page animations smooth at 60fps
- **NFR-23**: Brush size icons clearly distinguishable at 56×56px button size
- **NFR-24**: Export preview popup accessible and dismissible with single tap
- **NFR-25**: Quick-access color slots clearly distinguishable at 56×56px size
- **NFR-26**: Quick-access color customization dialog accessible with single long press
\n#### Browser Support
- **NFR-27**: iOS Safari 14+, Chrome Mobile 90+, Firefox Mobile 88+
- **NFR-28**: Responsive design for 320px-480px width (portrait)\n- **NFR-29**: Touch event support required\n- **NFR-30**: CSS animation support required
- **NFR-31**: localStorage support required for quick-access color persistence

#### Accessibility
- **NFR-32**: High contrast mode support
- **NFR-33**: Screen reader compatibility
- **NFR-34**: Minimum 4.5:1 color contrast for UI elements
- **NFR-35**: Option to disable animations for accessibility
\n#### Export Quality
- **NFR-36**: Minimum export resolution: 8× physical pixels per logical pixel
- **NFR-37**: Exported PNG file size minimum: 100KB
- **NFR-38**: Support for lossless PNG compression
- **NFR-39**: Support for transparent background export
- **NFR-40**: Support for custom background color export
- **NFR-41**: Preview image accurately represents final export\n\n### 2.7 Success Metrics
- **Engagement**: Average mobile session duration > 8 minutes
- **Completion**: 70%+ of users export at least one image
- **Performance**: 95th percentile touch latency < 30ms
- **Usability**: 90%+ of users complete drawing without frustration
- **One-Handed Use**: 60%+ of users successfully create art one-handed
- **Layer Adoption**: 40%+ of users utilize multiple layers
- **Move Tool Usage**: 30%+ of users utilize move tool for repositioning
- **Zoom Control Usage**: 50%+ of users utilize zoom dropdown for view adjustment
- **Export Quality**: 95%+ of exported images meet 100KB minimum file size\n- **Background Customization**: 40%+ of users customize export background color
- **Welcome Page Engagement**: 80%+ of users watch full welcome animation
- **Canvas Selection**: 90%+ of users successfully select canvas size on first attempt
- **Brush Size Usage**: 50%+ of users utilize multiple brush sizes during creation
- **Export Preview Usage**: 85%+ of users review export preview before downloading
- **Export Confirmation**: 90%+ of users successfully download after preview
- **Quick-Access Color Slot Usage**: 70%+ of users utilize quick-access color slots during creation
- **Quick-Access Color Customization**: 50%+ of users customize at least one quick-access color slot
- **Quick-Access Color Persistence**: 75%+ of returning users benefit from saved quick-access colors
\n---

## 3. MVP Definition

### 3.1 MVP Included Features

**Welcome Experience**:\n- Animated welcome page with pixel art logo
- Feature highlights with sequential animations
- Start Creating button\n- Skip animation option
\n**Canvas Size Selection**:
- Preset size options (16×16, 32×32, 64×64, 128×128)
- Custom size input with validation
- Visual preview of selected size
- Confirm button to proceed

**Core Drawing**:
- User-selected canvas size with high-resolution rendering (8× physical pixels per logical pixel)
- Pencil tool with 5 brush sizes (1px, 2px, 3px, 4px, 5px)
- Mini icon indicators for each brush size
- Eraser tool\n- Fill tool (contiguous mode only)
- Eyedropper tool (long press)
- Line tool\n- Move tool (select and move pixels)
\n**Simplified Layers**:
- Maximum 5 layers\n- Create/delete layer\n- Layer visibility toggle
- Layer opacity (0-100%)
- Blend modes: Normal, Multiply, Overlay\n- Layer thumbnails\n\n**Streamlined Colors**:
- 8 quick-access swatches (locked position)
- Basic color picker\n- 4 recently used colors
- Current color indicator
\n**Quick-Access Color Slots (3 Customizable Slots)**:
- 3 quick-access color slots in first row of drawer (56×56px each)
- Tap to apply saved color
- Long press to customize color
- Color customization dialog with picker and save button
- Independent from other color systems
- Persistent storage via localStorage
- Default colors: red, blue, green\n
**Navigation**:
- Pan (two-finger drag)
- Zoom (pinch gesture)
- Zoom button with dropdown (Zoom In, Zoom Out, Fit)
- Zoom levels: 100%, 200%, 400%
\n**History**:
- Undo (10 steps)
- Redo (10 steps)
\n**Export with Preview**:
- Export PNG button triggers preview popup
- Preview popup displays rendered PNG with selected background
- Download button in preview footer
- Cancel button in preview footer
- Export high-resolution PNG (minimum 100KB)
- Background color selector (transparent or custom color)
- Default transparent background
- Clear canvas\n- Auto-save to browser storage

**Mobile UI**:
- Bottom drawer interface (max 30vh)\n- 56×56px touch targets
- Portrait-optimized layout
- Floating action button for drawer toggle
- Zoom button in first row of drawer
- Brush size selector with visual icons
- Quick-access color slots in first row of drawer
- Locked color & palette settings icon position

### 3.2 MVP Excluded Features

- Marquee selection tool
- Lasso selection tool
- Hand/pan tool as separate tool (pan via two-finger drag)
- Transformation tools (rotate, flip)\n- Advanced blend modes\n- Custom palette management
- Dynamic brush modes
- Dithering tools
- Navigation preview window
- Landscape mode optimization
- More than 5 layers
- User accounts or project saving
\n### 3.3 MVP Success Criteria
- 80%+ of mobile users complete icon creation within 5 minutes
- 90%+ of users successfully operate with one hand
- 70%+ of users export at least one image
- Zero critical bugs in core drawing flow
- 60fps maintained during drawing on mid-range devices
- 30%+ of users successfully use move tool\n- 50%+ of users utilize zoom dropdown controls
- 95%+ of exported images meet 100KB minimum file size requirement
- 40%+ of users customize export background color
- 80%+ of users engage with welcome page animation
- 90%+ of users successfully select canvas size without confusion
- 50%+ of users experiment with multiple brush sizes
- 85%+ of users review export preview before downloading
- 90%+ of users successfully complete download after preview
- 70%+ of users utilize quick-access color slots during creation
- 50%+ of users customize at least one quick-access color slot
\n---

## 4. Technical Architecture

### 4.1 Frontend Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Canvas**: HTML5 Canvas API with high-resolution rendering
- **Animation**: CSS animations and React transitions
- **Build Tool**: Vite
- **Mobile Optimization**: Touch events, viewport configuration, CSS containment

### 4.2 State Management
- **Local State**: React useState for UI\n- **Canvas State**: Custom hook for pixel array (max 5 layers) with high-resolution backing store
- **Layer State**: Simplified layer array\n- **Color State**: 8 swatches + 4 recent colors\n- **Quick-Access Color State**: 3 customizable quick-access color slots with localStorage persistence
- **History State**: 10-step undo/redo stack
- **Persistence**: localStorage for auto-save and quick-access colors
- **Move Tool State**: Selected pixels coordinates and movement tracking
- **Zoom State**: Current zoom level and dropdown menu visibility
- **Export State**: Resolution multiplier configuration (minimum 8×), background color settings, and preview popup visibility
- **Welcome State**: Animation progress and skip status
- **Canvas Selection State**: Selected size and validation status
- **Brush State**: Current brush size and size selector visibility
\n### 4.3 Data Models
\n```typescript
type Color = string; // hex format
type Pixel = Color;\ntype CanvasGrid = Pixel[][];
type Tool = 'pencil' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'move';
type BlendMode = 'normal' | 'multiply' | 'overlay';
type ZoomLevel = 1 | 2 | 4; // 100%, 200%, 400%\ntype BrushSize = 1 | 2 | 3 | 4 | 5; // pixel diameter
\ninterface Layer {
  id: string;\n  name: string;
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

interface BrushControl {
  size: BrushSize;
  selectorOpen: boolean;
}

interface QuickAccessColorSlot {
  id: string;
  color: Color;
  slot: number; // 0-2
}\n
interface QuickAccessColorState {
  slots: QuickAccessColorSlot[];\n  activeSlotId: string | null;
  customizationDialogOpen: boolean;
  customizingSlot: number | null;
}
\ninterface ExportConfig {
  resolutionMultiplier: number; // minimum 8\n  targetFileSize: number; // minimum 100KB
  backgroundColor: Color | 'transparent'; // transparent or custom color
}\n\ninterface ExportPreview {
  visible: boolean;
  imageData: string; // base64 PNG data URL
  backgroundColor: Color | 'transparent';
}
\ninterface WelcomeState {
  animationComplete: boolean;
  skipped: boolean;
}\n\ninterface CanvasSizeSelection {
  width: number;
  height: number;
  preset: '16x16' | '32x32' | '64x64' | '128x128' | 'custom';
  isValid: boolean;
}\n\ninterface AppState {
  welcomeState: WelcomeState;
  canvasSizeSelection: CanvasSizeSelection;
  layers: Layer[]; // max 5\n  activeLayerId: string;\n  currentTool: Tool;
  currentColor: Color;\n  quickSwatches: Color[]; // 8 colors (locked position)
  recentColors: Color[]; // 4 colors\n  quickAccessColors: QuickAccessColorState; // 3 customizable slots
  history: AppState[]; // 10 steps
  historyIndex: number;
  canvasSize: {width: number, height: number};
  drawerOpen: boolean;
  zoom: ZoomControl;
  brush: BrushControl;
  selection: Selection;
  exportConfig: ExportConfig;
  exportPreview: ExportPreview;
}\n```

### 4.4 High-Resolution Rendering Strategy

**Logical vs Physical Pixels**:
- **Logical Pixel**: User-facing grid unit (e.g., 32×32 canvas)
- **Physical Pixel**: Actual rendered pixel (e.g., 256×256 for 8× multiplier)
- **Rendering**: Each logical pixel rendered as 8×8 physical pixel block minimum
- **Export**: Full physical resolution exported to ensure 100KB+ file size

**Brush Size Implementation**:
- 1px brush: Draws single logical pixel (8×8 physical pixels)
- 2px brush: Draws 2×2 logical pixel area (16×16 physical pixels)\n- 3px brush: Draws 3×3 logical pixel area (24×24 physical pixels)
- 4px brush: Draws 4×4 logical pixel area (32×32 physical pixels)
- 5px brush: Draws 5×5 logical pixel area (40×40 physical pixels)

**Implementation**:
- Use off-screen canvas at physical resolution
- Scale down for display canvas\n- Export from high-resolution backing store
- Apply background color or transparency during export
- Render brush preview at appropriate scale
- Generate preview image from high-resolution backing store for export popup

### 4.5 Quick-Access Color Slots Persistence

**Storage Strategy**:
- Use localStorage to persist quick-access color slot configurations
- Store as JSON array with slot number and color hex value
- Load saved colors on app initialization
- Update localStorage on each color customization save
\n**Default Configuration**:
- Slot 0: #FF0000 (red)
- Slot 1: #0000FF (blue)
- Slot 2: #00FF00 (green)
\n---

## 5. Mobile UI Layout Specification

### 5.1 Welcome Page Layout

**Screen Structure**:
1. **Animated Logo Area** (40% viewport height)
   - Pixel art logo with entrance animation
   - Fade-in and scale effects
\n2. **App Title** (10% viewport height)
   - PIXEL MINT text with fade-in animation
   - Subtitle with feature tagline

3. **Feature Highlights** (30% viewport height)
   - 3-4 key features with sequential fade-in
   - Icon + text format

4. **Start Button** (20% viewport height)
   - Start Creating button (120×56px)
   - Centered with pulse animation
   - Skip animation hint at bottom

### 5.2 Canvas Size Selection Layout

**Screen Structure**:
1. **Header** (15% viewport height)
   - Choose Your Canvas Size title
   - Back button to welcome page

2. **Preset Options** (50% viewport height)
   - 4 preset cards in 2×2 grid
   - Each card: 140×100px with size label and visual preview
   - Active selection highlighted

3. **Custom Size Input** (20% viewport height)
   - Width and height input fields
   - Validation feedback
   - Visual preview of custom size

4. **Confirm Button** (15% viewport height)
   - Confirm button (120×56px)\n   - Centered and prominent
\n### 5.3 Drawing Interface Layout (Portrait)

**Screen Division**:
1. **Canvas Area** (60% viewport height)\n   - Centered pixel grid with user-selected size
   - Touch-optimized for thumb reach
   - Upper screen positioning
   - Display canvas shows scaled-down version of high-resolution backing store

2. **Drawer Toggle FAB** (bottom-right, 56×56px)
   - Always visible\n   - Opens/closes drawer\n\n3. **Bottom Drawer** (slides up, max 30vh)
   - Tool buttons (56×56px each)
   - Brush size selector with mini icons
   - Color swatches (56×56px each) - locked position
   - Quick-access color slots (56×56px each) - first row
   - Layer controls\n   - Action buttons
   - Canvas size selector
   - Export resolution indicator
   - Zoom button with dropdown
   - Background color selector
\n### 5.4 Drawer Layout\n
**Section 1: First Row** (horizontal layout)
- Quick-access color slots (3 slots, 56×56px each) - positioned for easy thumb reach
- Zoom button with dropdown (56×56px)
- Undo (56×56px)\n- Redo (56×56px)
- Export (120×56px) with resolution indicator
- Clear (56×56px)
\n**Section 2: Tools** (horizontal scroll)
- Pencil, Eraser, Fill, Line, Eyedropper, Move
- Each 56×56px\n- Active tool highlighted
\n**Section 2a: Brush Size Selector** (appears when pencil tool active)
- 5 brush size buttons (56×56px each)
- Mini icons showing filled circles: 1px (small dot), 2px (medium dot), 3px (larger circle), 4px (large circle), 5px (largest circle)
- Active brush size highlighted
- Horizontal layout below tool row

**Section 3: Colors** (2 rows) - locked position
- Row 1: 8 quick swatches (56×56px)\n- Row 2: Current color + 4 recent colors\n\n**Section 4: Canvas Settings** (collapsible)
- Canvas size display and change option
- Grid toggle\n- Resolution multiplier display (8× minimum)
\n**Section 5: Export Settings** (collapsible)
- Background color selector
- Transparent background option (default)
- Custom color picker for background
- Background color preview

**Section 6: Layers** (collapsible)
- Layer list (max 5)\n- Thumbnails (40×40px)\n- Visibility toggle
- Opacity slider\n\n### 5.5 Quick-Access Color Slots Layout

**Position**: First row of drawer interface, positioned for optimal thumb reach
**Structure**:
- 3 color slot buttons arranged horizontally
- Each slot: 56×56px with 8px spacing
- Positioned before zoom button in first row
- Always visible when drawer is open

**Interaction States**:
- **Default**: Display saved color with subtle border
- **Active**: Highlighted border indicating current selection
- **Long Press**: Trigger color customization dialog
\n**Color Customization Dialog**:
- Modal overlay centered on screen
- Color picker interface
- Current color preview
- Save button (120×56px)
- Cancel button (120×56px)
- Closes on save or cancel

### 5.6 Export Preview Popup Layout

**Popup Structure**:
1. **Overlay Background** (full screen, semi-transparent)
   - Dims canvas and drawer area
   - Tap outside to close (optional)

2. **Preview Container** (centered, responsive sizing)
   - Maximum width: 90vw\n   - Maximum height: 80vh
   - White background with subtle shadow
   - Rounded corners\n
3. **Preview Image Area** (70% of container height)
   - Rendered PNG image at actual export resolution
   - Scaled to fit container while maintaining aspect ratio
   - Shows selected background (transparent or custom color)
   - Checkerboard pattern visible for transparent areas

4. **Footer Section** (30% of container height)
   - Download button (120×56px, primary color)
   - Cancel button (120×56px, secondary color)\n   - Buttons horizontally centered with spacing
   - Clear visual separation from preview area

### 5.7 Zoom Dropdown Menu\n
**Position**: Appears above zoom button when activated
**Options**:
1. Zoom In (increases zoom level)
2. Zoom Out (decreases zoom level)
3. Fit (adjusts canvas to optimal viewing size)
\n**Interaction**:
- Tap zoom button to open/close dropdown
- Tap option to execute zoom action
- Menu closes automatically after selection

### 5.8 Brush Size Icons

**Visual Design**:
- 1px: Small filled circle (8px diameter at 56×56px button)
- 2px: Medium filled circle (16px diameter at 56×56px button)
- 3px: Larger filled circle (24px diameter at 56×56px button)
- 4px: Large filled circle (32px diameter at 56×56px button)
- 5px: Largest filled circle (40px diameter at 56×56px button)

**Interaction**:
- Tap brush size icon to select
- Active size highlighted with border or background color
- Icons centered within 56×56px buttons
\n### 5.9 Thumb Reach Zones

- **Primary Zone** (bottom 30%): Most-used tools, brush sizes, zoom controls, and quick-access color slots
- **Secondary Zone** (middle 40%): Canvas\n- **Tertiary Zone** (top 30%): Less frequent actions\n
---

## 6. Mobile-Specific Optimizations

### 6.1 Touch Interactions
- **Single Tap**: Draw/select\n- **Long Press** (800ms): Eyedropper or quick-access color customization
- **Two-Finger Drag**: Pan canvas
- **Pinch**: Zoom in/out
- **Swipe Up**: Open drawer
- **Swipe Down**: Close drawer
- **Drag (Move Tool)**: Move selected pixels
- **Tap Zoom Button**: Open/close zoom dropdown
- **Tap Background Color**: Open background color selector
- **Tap Anywhere (Welcome Page)**: Skip animation
- **Tap Brush Size Icon**: Select brush size
- **Tap Export Button**: Open export preview popup
- **Tap Download Button**: Download PNG file
- **Tap Cancel Button**: Close preview popup
- **Tap Quick-Access Color Slot**: Apply saved color to current tool
- **Long Press Quick-Access Color Slot**: Open color customization dialog

### 6.2 Viewport Configuration

```html
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />
<meta name=\"mobile-web-app-capable\" content=\"yes\" />
```\n
### 6.3 Performance Optimizations

- Debounced canvas redraws
- RequestAnimationFrame for smooth interactions and animations
- Lazy loading for layer thumbnails
- Minimal DOM updates
- CSS containment for drawer\n- Optimized rendering for user-selected canvas sizes
- Dual-canvas architecture (display + high-resolution backing store)
- Progressive rendering for export operations
- Efficient dropdown menu rendering
- Optimized background color application during export
- Preload welcome page animations
- GPU-accelerated CSS animations
- Efficient brush size rendering with cached icons
- Lazy rendering of export preview (only when popup opens)
- Cached preview image generation
- Optimized quick-access color slot rendering
- Efficient localStorage operations for quick-access color persistence

---

## 7. Animation Specifications

### 7.1 Welcome Page Animations

**Logo Animation**:
- Duration: 800ms
- Effect: Fade-in + scale from 0.8 to 1.0
- Easing: ease-out
- Delay: 0ms
\n**Title Animation**:
- Duration: 600ms
- Effect: Fade-in + slide up 20px
- Easing: ease-out
- Delay: 400ms

**Feature Highlights Animation**:
- Duration: 400ms per item
- Effect: Fade-in + slide up 15px
- Easing: ease-out
- Delay: Sequential (600ms, 800ms, 1000ms)\n
**Start Button Animation**:
- Duration: 500ms
- Effect: Fade-in + pulse
- Easing: ease-in-out
- Delay: 1200ms
- Continuous pulse: 2s interval

**Background Animation**:
- Duration: Continuous
- Effect: Floating pixel particles or subtle grid movement
- Easing: linear
- Opacity: 0.1-0.3\n
### 7.2 Transition Animations

**Page Transitions**:
- Duration: 300ms
- Effect: Fade + slide\n- Easing: ease-in-out
\n**Drawer Animations**:
- Duration: 250ms
- Effect: Slide up/down
- Easing: ease-out

**Button Interactions**:
- Duration: 150ms
- Effect: Scale 0.95 on tap
- Easing: ease-in-out

**Brush Size Selector**:
- Duration: 200ms
- Effect: Fade-in + slide up
- Easing: ease-out

**Export Preview Popup**:
- Duration: 300ms
- Effect: Fade-in overlay + scale popup from 0.9 to 1.0
- Easing: ease-out

**Preview Popup Close**:
- Duration: 200ms
- Effect: Fade-out overlay + scale popup from 1.0 to 0.9
- Easing: ease-in\n
**Quick-Access Color Slot Selection**:
- Duration: 150ms
- Effect: Scale 1.1 + border highlight
- Easing: ease-out

**Color Customization Dialog**:
- Duration: 250ms
- Effect: Fade-in overlay + scale dialog from 0.9 to 1.0
- Easing: ease-out

---

## 8. Implementation Roadmap

### Phase 1: Welcome Experience (Week 1)
- Welcome page UI design
- Animation implementation (logo, title, features, button)
- Skip animation functionality
- Page transition to canvas selection

### Phase 2: Canvas Size Selection (Week 1-2)
- Canvas size selection screen UI
- Preset size cards with previews
- Custom size input with validation
- Confirm button and navigation

### Phase 3: Mobile Core Drawing (Week 2-3)
- Mobile-optimized canvas rendering with user-selected size
- High-resolution backing store implementation (8× multiplier)
- Bottom drawer interface
- Pencil tool with default 1px brush
- Eraser tool\n- Touch interaction handling

### Phase 4: Brush Size System (Week 3)\n- Implement 5 brush sizes (1px, 2px, 3px, 4px, 5px)\n- Design and implement mini icon indicators
- Brush size selector UI in drawer
- Brush size state management
- Visual feedback for active brush size

### Phase 5: Essential Tools (Week 3-4)
- Fill tool\n- Line tool
- Eyedropper (long press)
- Move tool (select and move pixels)
- Tool selection UI
\n### Phase 6: Simplified Layers (Week 4-5)
- Layer creation/deletion (max 5)\n- Layer visibility\n- Layer opacity
- Basic blend modes
- High-resolution layer compositing

### Phase 7: Color System (Week 5)
- 8 quick swatches (locked position)
- Color picker\n- Recent colors\n- Current color indicator
\n### Phase 8: Quick-Access Color Slots (Week 5-6)
- Quick-access color slots UI design and implementation (3 slots, 56×56px)\n- Position slots in first row of drawer for optimal thumb reach
- Tap interaction to apply saved color
- Long press interaction to open customization dialog
- Color customization dialog UI (color picker + save/cancel buttons)
- localStorage integration for color persistence
- Default color configuration (red, blue, green)
- Visual feedback for active quick-access color slot
- Independent state management from other color systems
- Lock color & palette settings icon position in drawer

### Phase 9: Navigation & History (Week 6-7)
- Pan and zoom gestures
- Zoom button with dropdown (Zoom In, Zoom Out, Fit)
- Undo/redo (10 steps)
- Auto-save\n\n### Phase 10: Export with Preview (Week 7-8)
- Export button triggers preview popup
- Preview popup UI design and implementation
- High-resolution PNG rendering for preview
- Download button functionality
- Cancel button functionality
- Background color selector (transparent or custom color)
- Export resolution optimization (minimum 100KB)
- Clear canvas\n\n### Phase 11: Polish & Testing (Week 8-9)
- UI refinements
- Performance optimization
- Animation polish
- Brush size icon polish
- Export preview popup polish
- Quick-access color slot interaction polish
- Mobile device testing
- Export quality validation
- Background color functionality testing
- Zoom control usability testing
- Welcome page animation testing
- Canvas selection flow testing
- Brush size selector usability testing
- Export preview workflow testing
- Quick-access color slot usability testing
- Quick-access color persistence testing
- User testing (15+ participants)
- Bug fixes\n- Launch\n
---

## 9. Next Steps

1. **Design Quick-Access Color Slots UI**: Create mockups for 3 quick-access color slots (56×56px) positioned in first row of drawer
2. **Design Color Customization Dialog**: Create UI mockups for color customization dialog with picker and save/cancel buttons
3. **Validate Quick-Access Color Slot UX**: Confirm slot placement, interaction flow, and independence from other color systems with stakeholders
4. **Lock Color & Palette Settings Icon Position**: Ensure color & palette settings icon remains in fixed position within drawer layout
5. **Design Export Preview Popup Mockups**: Create UI mockups for export preview popup with image display, download button, and cancel button
6. **Validate Export Preview UX**: Confirm preview popup layout, button placement, and interaction flow with stakeholders
7. **Design Brush Size Icons**: Create visual mockups for 5 brush size mini icons showing clear size differentiation
8. **Update Drawer Layout**: Integrate quick-access color slots into first row of drawer design with proper spacing and visual hierarchy
9. **Validate Brush Size UX**: Confirm brush size selector placement and interaction flow with stakeholders
10. **Design Welcome Page Mockups**: Create animated mockups for welcome page with logo, features, and button\n11. **Design Canvas Selection Screen**: Create UI mockups for preset and custom size selection\n12. **Validate Animation Scope**: Confirm animation requirements and performance targets with stakeholders
13. **Create Mobile Mockups**: Design portrait-optimized UI wireframes with zoom dropdown, background color selector, brush size selector, export preview popup, quick-access color slots, and resolution indicators
14. **Set Up Development Environment**: Initialize React + TypeScript project with high-resolution canvas support, animation libraries, and localStorage integration
15. **Begin Phase 1**: Start with welcome page and animation implementation
16. **Establish Testing Strategy**: Define mobile device test matrix, export quality benchmarks, animation performance metrics, brush size usability tests, export preview workflow tests, and quick-access color slot usability tests
17. **Plan User Testing**: Recruit 15-20 mobile beta testers\n\n---

**Document Version**: 15.0  
**Last Updated**: 2026-01-17  
**Status**: Quick-Access Color Slots Feature Updated - MVP Ready for Development  
**Key Changes**: Replaced 6 footer color icons with 3 quick-access color slots positioned in first row of drawer; updated functional requirements (FR-48 to FR-60, FR-96 to FR-97) to reflect new quick-access color slot specifications; modified data models to replace FooterColorIcon and FooterColorState with QuickAccessColorSlot and QuickAccessColorState interfaces; updated drawer layout specification (Section 5.4) to position quick-access color slots in first row before zoom button; removed footer area layout section (previous Section 5.5) and replaced with quick-access color slots layout in drawer; updated touch interactions to reflect quick-access color slot tap and long press gestures; updated animation specifications to include quick-access color slot selection animations; updated non-functional requirements to include quick-access color slot performance metrics (NFR-14 to NFR-16, NFR-25 to NFR-26); updated success metrics to track quick-access color slot usage (70%+), customization (50%+), and persistence (75%+) rates; updated Phase 8 in implementation roadmap to focus on quick-access color slots functionality in drawer; updated next steps to include quick-access color slot design, validation, and drawer layout integration tasks; updated user journeys to demonstrate quick-access color slot workflow in icon creation and sprite creation scenarios; locked color & palette settings icon position in drawer; clarified independence of quick-access color slots from other color systems (8 quick swatches, recently used colors, color picker settings); reduced default quick-access colors from 6 to 3 (red, blue, green)