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

### 2.1 Goals\n- Provide an intuitive pixel-by-pixel drawing experience optimized for smartphone screens (320px-480px)
- Enable one-handed operation for core drawing functions
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
- Create an engaging welcoming front page with animations
- Allow users to select canvas size before starting

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
5. Draws with thumb on lower canvas area
6. Uses zoom button dropdown to adjust view (Zoom In/Zoom Out/Fit)
7. Swipes up drawer to access color swatches
8. Continues drawing with one hand\n9. Selects transparent background for export
10. Taps Export button\n11. Receives high-resolution PNG (minimum 100KB) with transparent background
12. Total time: 3-5 minutes

**Journey 3: Simple Sprite with Layers and Movement**
1. User opens app on phone
2. Selects canvas size from welcome screen
3. Creates background layer\n4. Adds character layer\n5. Uses move tool to reposition drawn elements
6. Adjusts zoom level via dropdown for detailed work
7. Toggles layer visibility to check composition
8. Adjusts layer opacity\n9. Chooses custom background color for export
10. Exports final high-resolution sprite
11. Total time: 10-15 minutes
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
- **FR-22**: Pencil tool - primary drawing tool\n- **FR-23**: Eraser tool - remove pixels
- **FR-24**: Fill tool - flood fill with contiguous mode only
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
- **FR-41**: Layer thumbnails (40×40px)
- **FR-42**: Simplified blend modes: Normal, Multiply, Overlay only
\n#### Streamlined Color System
- **FR-43**: 8 quick-access color swatches (56×56px each)
- **FR-44**: Current color indicator (56×56px)
- **FR-45**: Basic color picker with hex input
- **FR-46**: Recently used colors (4 slots)
- **FR-47**: Transparency option\n\n#### Navigation\n- **FR-48**: Pan canvas - two-finger drag gesture
- **FR-49**: Zoom - pinch gesture
- **FR-50**: Zoom button with dropdown menu (56×56px)
- **FR-51**: Dropdown options: Zoom In, Zoom Out, Fit
- **FR-52**: Zoom button positioned in first row of drawer interface
- **FR-53**: Zoom In increases zoom level by one step (100% → 200% → 400%)
- **FR-54**: Zoom Out decreases zoom level by one step (400% → 200% → 100%)
- **FR-55**: Fit option adjusts canvas to optimal viewing size within viewport
- **FR-56**: Reset view button\n
#### History\n- **FR-57**: Undo button (56×56px) - 10 steps maximum
- **FR-58**: Redo button (56×56px) - 10 steps maximum
- **FR-59**: Undo/redo via swipe gestures (optional)
\n#### Export\n- **FR-60**: Export high-resolution PNG button (120×56px)
- **FR-61**: Export resolution multiplier: minimum 8× physical pixels per logical pixel
- **FR-62**: Ensure exported PNG file size meets minimum 100KB threshold
- **FR-63**: Background color selector for export (transparent or custom color)
- **FR-64**: Default export background: transparent\n- **FR-65**: Background color preview in export settings
- **FR-66**: Clear canvas button with confirmation
- **FR-67**: Auto-save to browser storage

#### Mobile-Optimized UI
- **FR-68**: Bottom drawer interface (maximum 30vh height)
- **FR-69**: Drawer toggle button (56×56px floating action button)
- **FR-70**: All buttons minimum 56×56px for thumb-friendly interaction
- **FR-71**: Drawer slides up from bottom with smooth animation
- **FR-72**: Canvas occupies 60-70% of viewport height
- **FR-73**: Portrait orientation as primary mode
- **FR-74**: Prevent accidental page zoom during drawing
- **FR-75**: Haptic feedback for tool selection (if supported)

### 2.6 Non-Functional Requirements

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

#### Mobile Usability
- **NFR-11**: All interactive elements minimum 56×56px
- **NFR-12**: Thumb reach zone optimization for portrait mode
- **NFR-13**: One-handed operation for core functions
- **NFR-14**: Drawer height never exceeds 30vh
- **NFR-15**: Canvas always visible when drawer is open
- **NFR-16**: Welcome page animations smooth at 60fps
\n#### Browser Support
- **NFR-17**: iOS Safari 14+, Chrome Mobile 90+, Firefox Mobile 88+
- **NFR-18**: Responsive design for 320px-480px width (portrait)
- **NFR-19**: Touch event support required\n- **NFR-20**: CSS animation support required
\n#### Accessibility
- **NFR-21**: High contrast mode support
- **NFR-22**: Screen reader compatibility
- **NFR-23**: Minimum 4.5:1 color contrast for UI elements
- **NFR-24**: Option to disable animations for accessibility
\n#### Export Quality
- **NFR-25**: Minimum export resolution: 8× physical pixels per logical pixel
- **NFR-26**: Exported PNG file size minimum: 100KB
- **NFR-27**: Support for lossless PNG compression
- **NFR-28**: Support for transparent background export
- **NFR-29**: Support for custom background color export
\n### 2.7 Success Metrics
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
- **Welcome Page Engagement**: 80%+ of users watch full welcome animation
- **Canvas Selection**: 90%+ of users successfully select canvas size on first attempt
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
- Pencil tool\n- Eraser tool
- Fill tool (contiguous mode only)
- Eyedropper tool (long press)
- Line tool\n- Move tool (select and move pixels)
\n**Simplified Layers**:
- Maximum 5 layers\n- Create/delete layer\n- Layer visibility toggle
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
- Bottom drawer interface (max 30vh)\n- 56×56px touch targets
- Portrait-optimized layout
- Floating action button for drawer toggle
- Zoom button in first row of drawer
\n### 3.2 MVP Excluded Features

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

---
\n## 4. Technical Architecture

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
- **Layer State**: Simplified layer array\n- **Color State**: 8 swatches + 4 recent colors\n- **History State**: 10-step undo/redo stack
- **Persistence**: localStorage for auto-save
- **Move Tool State**: Selected pixels coordinates and movement tracking
- **Zoom State**: Current zoom level and dropdown menu visibility
- **Export State**: Resolution multiplier configuration (minimum 8×) and background color settings
- **Welcome State**: Animation progress and skip status
- **Canvas Selection State**: Selected size and validation status

### 4.3 Data Models
\n```typescript
type Color = string; // hex format
type Pixel = Color;\ntype CanvasGrid = Pixel[][];
type Tool = 'pencil' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'move';
type BlendMode = 'normal' | 'multiply' | 'overlay';
type ZoomLevel = 1 | 2 | 4; // 100%, 200%, 400%\n\ninterface Layer {
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
\ninterface ExportConfig {
  resolutionMultiplier: number; // minimum 8\n  targetFileSize: number; // minimum 100KB
  backgroundColor: Color | 'transparent'; // transparent or custom color
}\n\ninterface WelcomeState {
  animationComplete: boolean;
  skipped: boolean;
}
\ninterface CanvasSizeSelection {
  width: number;\n  height: number;
  preset: '16x16' | '32x32' | '64x64' | '128x128' | 'custom';
  isValid: boolean;
}\n\ninterface AppState {
  welcomeState: WelcomeState;
  canvasSizeSelection: CanvasSizeSelection;
  layers: Layer[]; // max 5
  activeLayerId: string;\n  currentTool: Tool;
  currentColor: Color;
  quickSwatches: Color[]; // 8 colors
  recentColors: Color[]; // 4 colors\n  history: AppState[]; // 10 steps
  historyIndex: number;
  canvasSize: {width: number, height: number};
  drawerOpen: boolean;
  zoom: ZoomControl;
  selection: Selection;
  exportConfig: ExportConfig;
}\n```

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
   - Confirm button (120×56px)
   - Centered and prominent
\n### 5.3 Drawing Interface Layout (Portrait)

**Screen Division**:
1. **Canvas Area** (60% viewport height)\n   - Centered pixel grid with user-selected size
   - Touch-optimized for thumb reach
   - Upper screen positioning
   - Display canvas shows scaled-down version of high-resolution backing store

2. **Drawer Toggle FAB** (bottom-right, 56×56px)
   - Always visible\n   - Opens/closes drawer\n\n3. **Bottom Drawer** (slides up, max 30vh)
   - Tool buttons (56×56px each)
   - Color swatches (56×56px each)
   - Layer controls\n   - Action buttons
   - Canvas size selector
   - Export resolution indicator
   - Zoom button with dropdown
   - Background color selector

### 5.4 Drawer Layout\n
**Section 1: First Row** (horizontal layout)
- Zoom button with dropdown (56×56px)
- Undo (56×56px)\n- Redo (56×56px)
- Export (120×56px) with resolution indicator
- Clear (56×56px)\n\n**Section 2: Tools** (horizontal scroll)
- Pencil, Eraser, Fill, Line, Eyedropper, Move
- Each 56×56px\n- Active tool highlighted
\n**Section 3: Colors** (2 rows)
- Row 1: 8 quick swatches (56×56px)
- Row 2: Current color + 4 recent colors\n\n**Section 4: Canvas Settings** (collapsible)
- Canvas size display and change option
- Grid toggle
- Resolution multiplier display (8× minimum)
\n**Section 5: Export Settings** (collapsible)
- Background color selector
- Transparent background option (default)
- Custom color picker for background
- Background color preview

**Section 6: Layers** (collapsible)
- Layer list (max 5)\n- Thumbnails (40×40px)\n- Visibility toggle
- Opacity slider\n\n### 5.5 Zoom Dropdown Menu

**Position**: Appears above zoom button when activated
**Options**:
1. Zoom In (increases zoom level)
2. Zoom Out (decreases zoom level)
3. Fit (adjusts canvas to optimal viewing size)
\n**Interaction**:
- Tap zoom button to open/close dropdown
- Tap option to execute zoom action
- Menu closes automatically after selection

### 5.6 Thumb Reach Zones

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
- **Tap Anywhere (Welcome Page)**: Skip animation
\n### 6.2 Viewport Configuration
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

---

## 7. Animation Specifications

### 7.1 Welcome Page Animations

**Logo Animation**:
- Duration: 800ms
- Effect: Fade-in + scale from 0.8 to 1.0
- Easing: ease-out
- Delay: 0ms

**Title Animation**:
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
- Opacity: 0.1-0.3
\n### 7.2 Transition Animations

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
- Pencil and eraser tools
- Touch interaction handling

### Phase 4: Essential Tools (Week 3-4)
- Fill tool\n- Line tool
- Eyedropper (long press)
- Move tool (select and move pixels)
- Tool selection UI
\n### Phase 5: Simplified Layers (Week 4-5)
- Layer creation/deletion (max 5)
- Layer visibility\n- Layer opacity
- Basic blend modes
- High-resolution layer compositing

### Phase 6: Color System (Week 5)\n- 8 quick swatches
- Color picker
- Recent colors
- Current color indicator\n\n### Phase 7: Navigation & History (Week 6)
- Pan and zoom gestures
- Zoom button with dropdown (Zoom In, Zoom Out, Fit)
- Undo/redo (10 steps)
- Auto-save\n
### Phase 8: Export & Polish (Week 7)
- High-resolution PNG export (minimum 100KB)
- Background color selector (transparent or custom color)
- Export resolution optimization
- Clear canvas\n- UI refinements
- Performance optimization
- Animation polish

### Phase 9: Testing & Launch (Week 8)
- Mobile device testing
- Export quality validation
- Background color functionality testing
- Zoom control usability testing
- Welcome page animation testing
- Canvas selection flow testing
- User testing (15+ participants)
- Bug fixes\n- Launch\n
---

## 9. Next Steps

1. **Design Welcome Page Mockups**: Create animated mockups for welcome page with logo, features, and button
2. **Design Canvas Selection Screen**: Create UI mockups for preset and custom size selection
3. **Validate Animation Scope**: Confirm animation requirements and performance targets with stakeholders
4. **Create Mobile Mockups**: Design portrait-optimized UI wireframes with zoom dropdown, background color selector, and resolution indicators
5. **Set Up Development Environment**: Initialize React + TypeScript project with high-resolution canvas support and animation libraries
6. **Begin Phase 1**: Start with welcome page and animation implementation
7. **Establish Testing Strategy**: Define mobile device test matrix, export quality benchmarks, and animation performance metrics
8. **Plan User Testing**: Recruit 15-20 mobile beta testers\n\n---

**Document Version**: 11.0  
**Last Updated**: 2026-01-16  
**Status**: Welcome Experience + Canvas Selection MVP Ready for Development  
**Key Changes**: Added welcoming front page with animated pixel art logo, feature highlights, and Start Creating button; implemented canvas size selection screen with preset options (16×16, 32×32, 64×64, 128×128) and custom size input; added animation specifications for welcome page elements including logo, title, features, and button with defined durations, effects, and easing; updated functional requirements (FR-1 to FR-15) to include welcome page and canvas selection functionality; modified user journeys to include first-time user experience with welcome page and canvas selection; enhanced data models to include WelcomeState and CanvasSizeSelection interfaces; updated non-functional requirements to include animation performance metrics; adjusted success metrics to track welcome page engagement and canvas selection success rate; updated implementation roadmap to include Phase 1 (Welcome Experience) and Phase 2 (Canvas Size Selection) as initial development phases