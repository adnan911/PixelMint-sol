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
- Allow users to select canvas size before starting\n- Offer multiple pencil brush sizes (2px, 3px, 4px, 5px) with visual indicators
- Provide customizable footer color icons for quick access and personalization
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
- Device: iPhone 13 (390×844px)\n- Needs: One-handed operation, quick tool access, simple interface, high-quality exports with transparent backgrounds, variable brush sizes for different detail levels, preview before download, customizable color shortcuts
- Pain points: Limited screen space, need to hold phone with one hand, low-resolution outputs, accidental downloads, difficulty accessing frequently used colors

**Persona 2: Mobile Game Developer**
- Age: 30, sketches game sprites during breaks
- Device: Samsung Galaxy S21 (360×800px)
- Needs: Fast sprite creation, easy export, basic editing tools, professional-quality assets with transparent backgrounds, larger brush sizes for quick fills, preview confirmation before saving, personalized color palette
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
8. Swipes up drawer to access footer color icons
9. Taps and customizes footer color icon to save frequently used color
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
7. Customizes footer color icons with project-specific palette
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
- **FR-3**: Display app name Pixel Art Pro with fade-in animation
- **FR-4**: Show brief feature highlights with sequential animations
- **FR-5**: Provide Start Creating button (120×56px) with hover/tap animation
- **FR-6**: Include subtle background animations (floating pixels or grid effects)
- **FR-7**: Animation duration: 2-3 seconds total
- **FR-8**: Allow users to skip animation by tapping anywhere
\n#### Canvas Size Selection
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
- **FR-36**: Create new layer button (56×56px)\n- **FR-37**: Delete layer with confirmation\n- **FR-38**: Layer visibility toggle
- **FR-39**: Layer opacity slider (0-100%)
- **FR-40**: Active layer indicator
- **FR-41**: Layer thumbnails (40×40px)\n- **FR-42**: Simplified blend modes: Normal, Multiply, Overlay only
\n#### Streamlined Color System
- **FR-43**: 8 quick-access color swatches (56×56px each)
- **FR-44**: Current color indicator (56×56px)
- **FR-45**: Basic color picker with hex input
- **FR-46**: Recently used colors (4 slots)
- **FR-47**: Transparency option\n\n#### Footer Color Icons (Customizable Quick Access)
- **FR-48**: Display 6 customizable color icons in footer area (48×48px each)
- **FR-49**: Each footer color icon operates independently
- **FR-50**: Tap footer color icon to apply saved color to current tool
- **FR-51**: Long press footer color icon (800ms) to open color customization dialog
- **FR-52**: Color customization dialog includes color picker and Save button
- **FR-53**: Save button stores selected color to tapped footer icon slot
- **FR-54**: Footer color icons persist across sessions via localStorage
- **FR-55**: Footer color icons independent from 8 quick-access swatches
- **FR-56**: Footer color icons independent from recently used colors
- **FR-57**: Footer color icons independent from color picker settings
- **FR-58**: Default footer colors: 6 commonly used colors (black, white, red, blue, green, yellow)\n- **FR-59**: Visual indicator shows active footer color icon when selected
\n#### Navigation
- **FR-60**: Pan canvas - two-finger drag gesture
- **FR-61**: Zoom - pinch gesture
- **FR-62**: Zoom button with dropdown menu (56×56px)
- **FR-63**: Dropdown options: Zoom In, Zoom Out, Fit
- **FR-64**: Zoom button positioned in first row of drawer interface
- **FR-65**: Zoom In increases zoom level by one step (100% → 200% → 400%)
- **FR-66**: Zoom Out decreases zoom level by one step (400% → 200% → 100%)
- **FR-67**: Fit option adjusts canvas to optimal viewing size within viewport
- **FR-68**: Reset view button\n\n#### History\n- **FR-69**: Undo button (56×56px) - 10 steps maximum
- **FR-70**: Redo button (56×56px) - 10 steps maximum
- **FR-71**: Undo/redo via swipe gestures (optional)
\n#### Export with Preview
- **FR-72**: Export PNG button (120×56px) triggers export preview popup
- **FR-73**: Export preview popup displays rendered PNG image at actual export resolution
- **FR-74**: Preview popup shows image with selected background (transparent or custom color)
- **FR-75**: Preview popup footer contains Download button (120×56px) and Cancel button (120×56px)
- **FR-76**: Download button initiates PNG file download to device
- **FR-77**: Cancel button closes preview popup without downloading
- **FR-78**: Preview popup overlay dims background canvas area
- **FR-79**: Preview popup centered on screen with responsive sizing
- **FR-80**: Export resolution multiplier: minimum 8× physical pixels per logical pixel
- **FR-81**: Ensure exported PNG file size meets minimum 100KB threshold
- **FR-82**: Background color selector for export (transparent or custom color)
- **FR-83**: Default export background: transparent\n- **FR-84**: Background color preview in export settings
- **FR-85**: Clear canvas button with confirmation
- **FR-86**: Auto-save to browser storage
\n#### Mobile-Optimized UI
- **FR-87**: Bottom drawer interface (maximum 30vh height)
- **FR-88**: Drawer toggle button (56×56px floating action button)
- **FR-89**: All buttons minimum 56×56px for thumb-friendly interaction
- **FR-90**: Drawer slides up from bottom with smooth animation
- **FR-91**: Canvas occupies 60-70% of viewport height
- **FR-92**: Portrait orientation as primary mode
- **FR-93**: Prevent accidental page zoom during drawing
- **FR-94**: Haptic feedback for tool selection (if supported)
- **FR-95**: Footer area displays 6 customizable color icons (48×48px each) below drawer
- **FR-96**: Footer color icons always visible and accessible
\n### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Welcome page animation loads within 500ms
- **NFR-2**: Canvas rendering within 80ms for selected grid sizes on mobile
- **NFR-3**: Touch response within 16ms (60fps)\n- **NFR-4**: App load time under 2 seconds on 4G\n- **NFR-5**: Memory usage under 80MB on mobile devices (increased for high-resolution rendering)
- **NFR-6**: Battery-efficient rendering (minimize redraws)\n- **NFR-7**: Export processing time under 3 seconds for high-resolution output
- **NFR-8**: Zoom dropdown menu opens within 100ms
- **NFR-9**: Background color selection response within 50ms
- **NFR-10**: Canvas size selection screen loads within 300ms
- **NFR-11**: Brush size selection response within 50ms
- **NFR-12**: Export preview popup renders within 500ms
- **NFR-13**: Preview popup animation smooth at 60fps
- **NFR-14**: Footer color icon tap response within 50ms
- **NFR-15**: Footer color customization dialog opens within 200ms
- **NFR-16**: Footer color save operation completes within 100ms
\n#### Mobile Usability
- **NFR-17**: All interactive elements minimum 56×56px (footer icons 48×48px)
- **NFR-18**: Thumb reach zone optimization for portrait mode
- **NFR-19**: One-handed operation for core functions
- **NFR-20**: Drawer height never exceeds 30vh
- **NFR-21**: Canvas always visible when drawer is open
- **NFR-22**: Welcome page animations smooth at 60fps
- **NFR-23**: Brush size icons clearly distinguishable at 56×56px button size
- **NFR-24**: Export preview popup accessible and dismissible with single tap
- **NFR-25**: Footer color icons clearly distinguishable at 48×48px size
- **NFR-26**: Footer color customization dialog accessible with single long press
\n#### Browser Support
- **NFR-27**: iOS Safari 14+, Chrome Mobile 90+, Firefox Mobile 88+
- **NFR-28**: Responsive design for 320px-480px width (portrait)\n- **NFR-29**: Touch event support required\n- **NFR-30**: CSS animation support required
- **NFR-31**: localStorage support required for footer color persistence
\n#### Accessibility
- **NFR-32**: High contrast mode support\n- **NFR-33**: Screen reader compatibility
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
- **Layer Adoption**: 40%+ of users utilize multiple layers\n- **Move Tool Usage**: 30%+ of users utilize move tool for repositioning
- **Zoom Control Usage**: 50%+ of users utilize zoom dropdown for view adjustment
- **Export Quality**: 95%+ of exported images meet 100KB minimum file size
- **Background Customization**: 40%+ of users customize export background color
- **Welcome Page Engagement**: 80%+ of users watch full welcome animation
- **Canvas Selection**: 90%+ of users successfully select canvas size on first attempt
- **Brush Size Usage**: 50%+ of users utilize multiple brush sizes during creation
- **Export Preview Usage**: 85%+ of users review export preview before downloading
- **Export Confirmation**: 90%+ of users successfully download after preview\n- **Footer Color Icon Usage**: 60%+ of users utilize footer color icons during creation
- **Footer Color Customization**: 40%+ of users customize at least one footer color icon
- **Footer Color Persistence**: 70%+ of returning users benefit from saved footer colors
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
- 8 quick-access swatches
- Basic color picker\n- 4 recently used colors
- Current color indicator
\n**Footer Color Icons (Customizable Quick Access)**:
- 6 customizable color icons in footer area (48×48px each)
- Tap to apply saved color
- Long press to customize color
- Color customization dialog with picker and save button
- Independent from other color systems
- Persistent storage via localStorage
- Default colors: black, white, red, blue, green, yellow

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
- Footer area with 6 customizable color icons (48×48px)\n\n### 3.2 MVP Excluded Features

- Marquee selection tool
- Lasso selection tool
- Hand/pan tool as separate tool (pan via two-finger drag)
- Transformation tools (rotate, flip)\n- Advanced blend modes\n- Custom palette management
- Dynamic brush modes\n- Dithering tools
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
- 60%+ of users utilize footer color icons during creation
- 40%+ of users customize at least one footer color icon
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
- **Layer State**: Simplified layer array\n- **Color State**: 8 swatches + 4 recent colors\n- **Footer Color State**: 6 customizable footer color icons with localStorage persistence
- **History State**: 10-step undo/redo stack
- **Persistence**: localStorage for auto-save and footer colors
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

interface FooterColorIcon {\n  id: string;
  color: Color;
  slot: number; // 0-5
}
\ninterface FooterColorState {
  icons: FooterColorIcon[];
  activeIconId: string | null;
  customizationDialogOpen: boolean;
  customizingSlot: number | null;
}\n\ninterface ExportConfig {
  resolutionMultiplier: number; // minimum 8\n  targetFileSize: number; // minimum 100KB
  backgroundColor: Color | 'transparent'; // transparent or custom color
}\n\ninterface ExportPreview {
  visible: boolean;
  imageData: string; // base64 PNG data URL
  backgroundColor: Color | 'transparent';
}\n\ninterface WelcomeState {
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
  layers: Layer[]; // max 5
  activeLayerId: string;\n  currentTool: Tool;
  currentColor: Color;\n  quickSwatches: Color[]; // 8 colors
  recentColors: Color[]; // 4 colors\n  footerColors: FooterColorState; // 6 customizable icons
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

### 4.5 Footer Color Icons Persistence

**Storage Strategy**:
- Use localStorage to persist footer color icon configurations
- Store as JSON array with slot number and color hex value
- Load saved colors on app initialization
- Update localStorage on each color customization save
\n**Default Configuration**:
- Slot 0: #000000 (black)
- Slot 1: #FFFFFF (white)
- Slot 2: #FF0000 (red)
- Slot 3: #0000FF (blue)\n- Slot 4: #00FF00 (green)
- Slot 5: #FFFF00 (yellow)

---

## 5. Mobile UI Layout Specification

### 5.1 Welcome Page Layout

**Screen Structure**:
1. **Animated Logo Area** (40% viewport height)
   - Pixel art logo with entrance animation
   - Fade-in and scale effects
\n2. **App Title** (10% viewport height)
   - Pixel Art Pro text with fade-in animation
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
   - Color swatches (56×56px each)
   - Layer controls\n   - Action buttons
   - Canvas size selector
   - Export resolution indicator
   - Zoom button with dropdown
   - Background color selector
\n4. **Footer Area** (below drawer, always visible)
   - 6 customizable color icons (48×48px each)
   - Horizontal layout with equal spacing
   - Positioned at bottom of screen
   - Independent from drawer state

### 5.4 Drawer Layout\n
**Section 1: First Row** (horizontal layout)
- Zoom button with dropdown (56×56px)
- Undo (56×56px)
- Redo (56×56px)
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

**Section 3: Colors** (2 rows)
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
- Opacity slider\n\n### 5.5 Footer Color Icons Layout

**Position**: Fixed at bottom of screen, below drawer
**Structure**:
- 6 color icon slots arranged horizontally
- Each icon: 48×48px with 8px spacing
- Total width: 328px (centered on screen)
- Background: Semi-transparent overlay for visibility
- Always visible regardless of drawer state

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
   - Cancel button (120×56px, secondary color)
   - Buttons horizontally centered with spacing
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
\n### 5.8 Brush Size Icons

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

- **Primary Zone** (bottom 30%): Most-used tools, brush sizes, zoom controls, and footer color icons
- **Secondary Zone** (middle 40%): Canvas\n- **Tertiary Zone** (top 30%): Less frequent actions\n
---

## 6. Mobile-Specific Optimizations

### 6.1 Touch Interactions
- **Single Tap**: Draw/select\n- **Long Press** (800ms): Eyedropper or footer color customization
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
- **Tap Footer Color Icon**: Apply saved color to current tool
- **Long Press Footer Color Icon**: Open color customization dialog

### 6.2 Viewport Configuration
\n```html
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
- Optimized footer color icon rendering
- Efficient localStorage operations for footer color persistence

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
- Effect: Fade + slide
- Easing: ease-in-out
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
**Footer Color Icon Selection**:
- Duration: 150ms
- Effect: Scale 1.1 + border highlight
- Easing: ease-out

**Color Customization Dialog**:
- Duration: 250ms
- Effect: Fade-in overlay + scale dialog from 0.9 to 1.0
- Easing: ease-out
\n---

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
- 8 quick swatches
- Color picker\n- Recent colors
- Current color indicator
\n### Phase 8: Footer Color Icons (Week 5-6)
- Footer area UI design and implementation
- 6 customizable color icon slots (48×48px)\n- Tap interaction to apply saved color
- Long press interaction to open customization dialog
- Color customization dialog UI (color picker + save/cancel buttons)
- localStorage integration for color persistence
- Default color configuration
- Visual feedback for active footer color icon
- Independent state management from other color systems

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
- Footer color icon interaction polish
- Mobile device testing
- Export quality validation
- Background color functionality testing
- Zoom control usability testing
- Welcome page animation testing
- Canvas selection flow testing
- Brush size selector usability testing
- Export preview workflow testing
- Footer color icon usability testing
- Footer color persistence testing
- User testing (15+ participants)
- Bug fixes\n- Launch\n
---

## 9. Next Steps

1. **Design Footer Color Icons UI**: Create mockups for footer area with 6 customizable color icons (48×48px)\n2. **Design Color Customization Dialog**: Create UI mockups for color customization dialog with picker and save/cancel buttons
3. **Validate Footer Color Icon UX**: Confirm footer color icon placement, interaction flow, and independence from other color systems with stakeholders
4. **Design Export Preview Popup Mockups**: Create UI mockups for export preview popup with image display, download button, and cancel button
5. **Validate Export Preview UX**: Confirm preview popup layout, button placement, and interaction flow with stakeholders
6. **Design Brush Size Icons**: Create visual mockups for 5 brush size mini icons showing clear size differentiation
7. **Update Drawer Layout**: Integrate brush size selector into drawer design with proper spacing and visual hierarchy
8. **Validate Brush Size UX**: Confirm brush size selector placement and interaction flow with stakeholders
9. **Design Welcome Page Mockups**: Create animated mockups for welcome page with logo, features, and button\n10. **Design Canvas Selection Screen**: Create UI mockups for preset and custom size selection\n11. **Validate Animation Scope**: Confirm animation requirements and performance targets with stakeholders
12. **Create Mobile Mockups**: Design portrait-optimized UI wireframes with zoom dropdown, background color selector, brush size selector, export preview popup, footer color icons, and resolution indicators
13. **Set Up Development Environment**: Initialize React + TypeScript project with high-resolution canvas support, animation libraries, and localStorage integration
14. **Begin Phase 1**: Start with welcome page and animation implementation
15. **Establish Testing Strategy**: Define mobile device test matrix, export quality benchmarks, animation performance metrics, brush size usability tests, export preview workflow tests, and footer color icon usability tests
16. **Plan User Testing**: Recruit 15-20 mobile beta testers\n\n---

**Document Version**: 14.0  
**Last Updated**: 2026-01-17  
**Status**: Footer Color Icons Feature Added - MVP Ready for Development  
**Key Changes**: Added 6 customizable footer color icons feature with independent state management; updated functional requirements (FR-48 to FR-59, FR-95 to FR-96) to include footer color icon specifications; enhanced data models to include FooterColorIcon and FooterColorState interfaces; added footer color icons layout specification (Section 5.5) with detailed structure and interaction states; updated touch interactions to include footer color icon tap and long press gestures; added footer color icon animations to animation specifications; updated non-functional requirements to include footer color icon performance metrics (NFR-14 to NFR-16, NFR-25 to NFR-26, NFR-31); updated success metrics to track footer color icon usage, customization, and persistence rates; added Phase 8 in implementation roadmap to focus on footer color icons functionality; added footer color icon design and validation tasks to next steps; updated user journeys to demonstrate footer color icon workflow in icon creation and sprite creation scenarios; clarified independence of footer color icons from other color systems (8 quick swatches, recently used colors, color picker settings)