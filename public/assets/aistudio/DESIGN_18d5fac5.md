---
name: Sketch & Marker System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4d4632'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#7f7660'
  outline-variant: '#d1c6ab'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#facc15'
  on-primary-container: '#6c5700'
  inverse-primary: '#eec200'
  secondary: '#006c4b'
  on-secondary: '#ffffff'
  secondary-container: '#64f9bc'
  on-secondary-container: '#00714e'
  tertiary: '#7b41b4'
  on-tertiary: '#ffffff'
  tertiary-container: '#e4c5ff'
  on-tertiary-container: '#763baf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe083'
  primary-fixed-dim: '#eec200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#68fcbf'
  secondary-fixed-dim: '#45dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb8ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#62259b'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 54px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The visual identity channels the spontaneous, low-fidelity freedom of an architect's desk pad, wireframing canvases like Excalidraw and Balsamiq, and collaborative whiteboard thinking. It replaces clinical digital perfection with approachable, tactile craft: hand-drawn graphite lines, structural grid-paper underlays, and vivid felt-tip highlighter fills.

The target audience spans product teams, engineers, designers, and educators who value ideation, quick conceptual clarity, and unfiltered creative momentum over stiff corporate minimalism. The interface evokes playfulness, unpretentious clarity, and the sensory familiarity of paper, stationery, and tactile stationery notes.

The aesthetic fuses **Tactile Skeuomorphism** with **Structural Neo-Brutalism**:
- Deep graphite pencil strokes instead of hair-thin digital lines.
- Warm paper stock canvas backing with subtle dot grids or millimeter graph lines.
- Asymmetrical paper cutouts, tape strips, and highlighter swipes functioning as functional accents, focus states, and priority badges.
- Strict interaction feedback using hard-offset pencil drop shadows rather than blurred atmospheric gradients.

## Colors

The palette simulates physical stationery: unbleached sketchpad paper, rich charcoal graphite strokes, and vibrant fluorescent highlighter pens.

### Canvas & Surfaces
- **Canvas Base (`#FAF7F2`)**: Warm, fibrous cream paper serving as the primary viewport canvas.
- **Surface / Paper Sheet (`#FFFFFF`)**: Pure white sketchbook cutouts and floating paper sheets layered on top of the warm cream background.
- **Grid Accent (`#EAE4D9`)**: Dot grid or subtle drafting ledger lines, used strictly as structural backgrounds.

### Ink & Graphite
- **Pencil Black / Ink (`#2D2D2D`)**: The primary ink token. Used for high-contrast text, 2px borders, button bounds, icon strokes, and hard drop-shadows.
- **Pencil Graphite (`#52525B`)**: Secondary text, subtle sketching rules, hints, and structural metadata.
- **Pencil Wash (`#A1A1AA`)**: Disabled outlines, passive gridlines, and de-emphasized dividers.

### Highlighters (Accents & Status)
- **Primary Marker (`#FACC15`)**: Bold, joyful highlighter yellow. Applied as background washes on active buttons, selected tabs, important badge callouts, and key interaction triggers.
- **Mint Highlighter (`#34D399`)**: Fresh felt-tip green for success states, completed tasks, and validation confirms. Accompanied by light tint (`#ECFDF5`).
- **Scribble Violet (`#C084FC`)**: Vibrant purple marker for creative elements, links, and secondary interactive flows. Accompanied by light tint (`#F5F3FF`).
- **Pencil Coral / Pink (`#F472B6`)**: Hand-drawn corrective red/pink used for alert banners, deletion warnings, error states, and sticky notes. Accompanied by light tint (`#FDF2F8`).

## Typography

The typography pairs the organic character of **Bricolage Grotesque** with the draftsman-like precision of **JetBrains Mono**.

- **Display & Headings (Bricolage Grotesque)**: Features idiosyncratic glyph shapes, expressive curves, and flared terminals that resemble freehand marker lettering without sacrificing legibility or layout integrity. Used strictly for section titles, modal headers, major KPIs, and card headings.
- **Body, Inputs & Code (JetBrains Mono)**: Supplies architectural clarity. Mimicking an engineer's graph-paper annotations, its monospace cadence ensures data arrays, text passages, and form inputs look deliberate, technical, and organized against the fluid doodles.
- **Styling Rules**:
  - Emphasized headline words can receive an inline highlight block using a background span of `#FACC15` with an internal padding of `2px 6px`.
  - Uppercase transformations should be reserved for `label-md` and `label-sm` to simulate rubber stamp markings or uppercase architectural drafting notes.

## Layout & Spacing

The layout model is anchored in an 8-point baseline rhythm designed to harmonize with dot-grid graph paper backgrounds.

### Grid & Composition
- **Desktop (1024px and up)**: 12-column fluid grid with `2rem` page margins and `1.5rem` gutters. Content containers mimic loose physical sheets pin-boarded to the drafting table, bounded by an intentional maximum container width of `1280px`.
- **Tablet (768px - 1023px)**: 8-column layout with `1.5rem` outer margin and `1rem` gutters. Multi-column cards stack into 2-up patterns.
- **Mobile (Below 768px)**: 4-column flow with `1rem` margin and `1rem` gutters. Lateral sheet cards hug the viewport margins, letting content scroll vertically like an unfolding paper roll.

### Rhythmic Padding
- Elements sit on paper "cards" with generous internal breathing room (`space-lg` to `space-xl`) to counteract the high visual weight of 2px charcoal borders.
- Micro-elements (such as chips, buttons, and inline tags) use tight, consistent spacing (`space-xs` vertical, `space-sm` horizontal) to maintain immediate tactile utility.

## Elevation & Depth

This system rejects soft, blurred, ambient shadows in favor of **hard-edge, physical offset paper shadows** and layered mechanical overlaps.

### Elevation Hierarchy
- **Level 0 (Desk Board / Background)**: Ground paper `#FAF7F2`, marked with a 24px-interval dotted grid (`radial-gradient(#D6CEBF 1.5px, transparent 1.5px)`).
- **Level 1 (Paper Sheets & Cards)**: Pure white background `#FFFFFF`, enclosed in a 2px solid `#2D2D2D` outline with a hard directional offset shadow: `box-shadow: 3px 3px 0px #2D2D2D`.
- **Level 2 (Interactive Buttons, Modals, Popovers)**: Elevated paper items lift off the page with increased offset: `box-shadow: 5px 5px 0px #2D2D2D`.
- **Level 3 (Active / Pressed)**: When an element is pressed or clicked, it moves along the shadow trajectory (`transform: translate(2px, 2px)`), reducing the drop shadow to `1px 1px 0px #2D2D2D` to simulate pressing an index card flat against the table.

### Skew & Hand-Drawn Metaphors
- Floating sheets, sticky callouts, and pinned notes can introduce a subtle organic tilt between `-0.75deg` and `+1deg`.
- Tape strips (semi-transparent cream strips `rgba(245, 240, 225, 0.75)` with jagged edges) can be placed at the top center of cards or paper notes as decorative anchor visual anchors.

## Shapes

The shape vocabulary uses the `roundedness: 2` scale, corresponding to a foundational radius of `0.5rem` (`8px`) for standard cards and controls, scaling up to `1rem` (`16px`) for primary sheets.

### Organic Edge Execution
To preserve the hand-drawn sketch philosophy while maintaining cross-browser reliability, apply asymmetrical corner radii to mimic irregular physical card cutting:
- **Base Components**: Default `border-radius: 8px`, but interactive cards and sticky notes can employ mild variable pairs such as `border-radius: 9px 5px 8px 6px`.
- **Highlighter Blobs & Badges**: Pill-shaped outlines with uneven corners (`border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px`) provide the signature Excalidraw / Rough.js marker aesthetic.
- **Pencil Borders**: All interactive controls, cards, input fields, and modals feature a continuous, deliberate `2px solid #2D2D2D` border.

## Components

### Buttons
- **Primary Button**: Background in `#FACC15`, 2px solid `#2D2D2D` border, font `JetBrains Mono` bold (`label-lg`), with `3px 3px 0px #2D2D2D` offset shadow. On hover, background shifts to a saturated highlighter tone and shadow widens to `4px 4px 0px #2D2D2D`. On active/click, translates `translate(2px, 2px)` with shadow reduced to `1px 1px 0px #2D2D2D`.
- **Secondary Button**: Background `#FFFFFF`, text `#2D2D2D`, 2px solid `#2D2D2D` border, with standard 3px offset shadow.
- **Ghost / Doodle Button**: Transparent background, text `#2D2D2D`, underlined with a 2px hand-drawn charcoal wavy stroke or marker hover wash.

### Input Fields & Controls
- **Text Inputs**: Rectangular white box, 2px solid `#2D2D2D` border, `box-shadow: 2px 2px 0px #2D2D2D`. Placeholder text in `#A1A1AA`. Focus state produces a thick `#FACC15` inner highlighter tint or a sharp outer outline in `#2D2D2D`.
- **Checkboxes**: 20x20px square with a 2px solid `#2D2D2D` stroke. Checked state renders a quick charcoal scribble or checkmark in `#2D2D2D` backed by a `#34D399` mint fill.
- **Radio Buttons**: Circle with 2px solid `#2D2D2D` outline; active state shows a hand-filled inner charcoal dot.

### Cards & Sticky Notes
- **Standard Card**: Crisp `#FFFFFF` surface, 2px solid `#2D2D2D` boundary, `box-shadow: 4px 4px 0px #2D2D2D`, padding `space-lg`.
- **Sticky Note Variant**: Pale yellow (`#FEF9C3`) or pale pink (`#FDF2F8`) background, mild `-1deg` tilt, top-pinned with a simulated 40x16px masking-tape strip in semi-translucent parchment (`rgba(229, 231, 235, 0.65)`).

### Chips & Tags
- **Marker Badges**: `label-sm` font, uppercase, enclosed in a 1.5px solid `#2D2D2D` border with vibrant highlighter fills (`#FACC15`, `#34D399`, `#C084FC`, `#F472B6`). Rounded using `border-radius: 12px 4px 12px 4px`.

### Lists & Dividers
- **Lists**: Items spaced using `space-sm`. Bullet points are replaced with hand-sketched hollow squares, en-dashes, or miniature charcoal circles.
- **Dividers**: Horizontal rules rendered as a deliberate 2px dashed or wavy graphite stroke (`#2D2D2D`) with broken cadences to evoke pencil lines drawn along an edge.