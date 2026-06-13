# Design Spec: Maker's Sketchbook Portfolio

## [S1] Problem
Complete redesign of Nicholas Rueb's digital portfolio from "Futuristic Glass UI" to a "Geometric Maker's Sketchbook" aesthetic — personal, textured, down-to-earth but clean, with geometric fonts and blueprint/sketch elements.

## [S2] Design Direction
**Warm-Craft + Geometric**: Graph paper textures, blueprint CAD backgrounds, sketch annotations, geometric shapes as decorations. Feels like a well-organized maker's notebook — structured but personal.

## [S3] Color Palette
```
--cream:       #FEF3C7    (page backgrounds)
--linen:       #F5F0E1    (card backgrounds, secondary)
--kraft:       #C4A77D    (borders, accents, shadows)
--brown:       #92400E    (labels, tags)
--ink:         #1A1A1A    (headings, primary text)
--body-text:   #4A4A4A    (body copy)
--muted:       #6B7280    (secondary text)
--blueprint:   #2563EB    (accent, links, highlights)
--blue-light:  #EFF6FF    (blueprint backgrounds)
--blue-border: #BFDBFE    (blueprint grid lines)
```

## [S4] Typography
- **Headers**: Space Grotesk (700, 600) — geometric, technical
- **Body**: DM Sans (400, 500) — clean, readable, geometric
- **Accents**: Caveat (600) — handwritten notes, annotations ONLY (sparingly)
- **Mono/Tags**: DM Mono or system monospace for code/tags

## [S5] Page Structure (4 pages)
1. **Home** (index.html) — Welcome, featured projects, quick intro
2. **About** (about.html) — Story, skills, journey, personality
3. **Projects** (projects.html) — Full project gallery with CAD blueprint backgrounds
4. **Social** (social.html) — Links to GitHub, Instagram, Email (NO form)

## [S6] Texture & Material Elements
- **Graph Paper Grid**: Subtle grid lines on page backgrounds (CSS repeating-linear-gradient)
- **Blueprint Overlays**: Blue grid + technical drawing feel on project cards/sections
- **Sketch Annotations**: Caveat font arrows, underlines, circles, "← important!" notes
- **Geometric Decorations**: Diamonds, circles, triangles, hash patterns as scatter decor
- **Offset Shadows**: Cards have colored offset shadows (stacked paper effect)
- **Paper Grain**: Subtle noise texture overlay on backgrounds

## [S7] Components
### Navigation
- Floating nav bar with graph paper texture
- Geometric shapes as brand mark (not text logo)
- Links: Home, About, Projects, Social

### Cards
- Offset shadow (kraft brown, 4px right/down)
- Dashed or solid borders
- Hover: lift + shadow grows + geometric decoration rotates

### Buttons
- Primary: Blueprint blue fill, white text
- Secondary: Transparent with kraft border
- Hover: slight lift, shadow shift

### Project Cards
- Blueprint grid background on image area
- CAD-style placeholder illustrations
- Tags in monospace
- Links with arrow indicators

### Footer
- Minimal, graph paper background
- Social links with geometric icons

## [S8] Motion & Animation (GSAP)
- **Scroll Reveal**: Elements fade in + slide up (y: 30 → 0, opacity 0 → 1)
- **Stagger**: Cards stagger in with 0.1s delay between each
- **Parallax**: Blueprint backgrounds scroll at 0.5x speed
- **Hover**: Cards lift (translateY: -4px), offset shadow grows
- **Geometric Decorations**: Rotate on scroll, slight wiggle on hover
- **Page Load**: Content "sketches in" — lines draw, elements appear sequentially
- **Reduced Motion**: Respect prefers-reduced-motion

## [S9] Responsive Breakpoints
- Desktop: 1200px+ (multi-column layouts)
- Tablet: 768px-1199px (stacked layouts, reduced padding)
- Mobile: <768px (single column, hamburger nav, full-width cards)

## [S10] Technical Requirements
- Pure HTML/CSS/JS (no frameworks)
- GSAP + ScrollTrigger for animations
- Google Fonts: Space Grotesk, DM Sans, Caveat
- No custom cursor (normal cursor)
- No contact form
- All SVG icons (no emojis as icons)
- prefers-reduced-motion respected
