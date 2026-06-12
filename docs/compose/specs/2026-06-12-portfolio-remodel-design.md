# Portfolio Remodel Design Specification

**Date**: 2026-06-12
**Author**: MiMoCode Compose Agent
**Status**: Approved

## [S1] Problem

The current portfolio website has a solid foundation but lacks the polished, interactive feel of a professional maker portfolio. The design is too "futuristic tech" (Orbitron font, heavy green glows) and doesn't convey the MIT Maker Portfolio vibe the user wants - engineered precision meets creative expression. The site needs:

- Modern, clean typography that feels technical but approachable
- Smooth, purposeful animations that enhance rather than distract
- Interactive elements that respond to user input (scroll, mouse, clicks)
- More pages to tell a complete story (About, Experience)
- A project showcase that feels premium and engaging

## [S2] Solution Overview

Complete redesign using MIT Maker Portfolio aesthetic with:

- **Typography**: Space Grotesk (headings) + DM Sans (body) - geometric, technical, friendly
- **Colors**: Emerald/spring green accent on clean whites/grays - fresh, techy, not corporate
- **Stack**: Vanilla HTML/CSS/JS + GSAP + Tailwind CSS (CDN) + Lenis smooth scroll
- **Animations**: GSAP ScrollTrigger for scroll-based reveals, 3D card tilt, parallax depth
- **Pages**: 5 pages (Home, Projects, About, Experience, Contact)

## [S3] Design System

### Colors

```css
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;
--bg-tertiary: #f1f5f9;
--text-primary: #0f172a;
--text-secondary: #334155;
--text-muted: #64748b;
--accent-primary: #059669;
--accent-secondary: #10b981;
--accent-light: #d1fae5;
--accent-glow: rgba(16, 185, 129, 0.15);
--border-light: #e2e8f0;
--border-subtle: rgba(0, 0, 0, 0.06);
```

### Typography

- **Headings**: Space Grotesk (500, 600, 700)
- **Body**: DM Sans (400, 500)
- **Mono/Code**: JetBrains Mono (for technical details)
- **Scale**: 14px base, 1.25 ratio

### Spacing

- **Base unit**: 4px
- **Section padding**: 80px (desktop), 48px (mobile)
- **Component padding**: 24px-32px
- **Gap between elements**: 16px-24px

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
```

### Border Radius

```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

## [S4] Page Structure

### Home Page

1. **Animated Hero Sequence**
   - Name types out letter by letter
   - Tagline fades in after name completes
   - Subtle particle background (not overwhelming)
   - Scroll indicator arrow pulses

2. **About Preview Section**
   - Two-column layout: text left, visual right
   - Scroll-triggered fade-in from left/right
   - Brief narrative about who you are

3. **Horizontal Project Showcase**
   - Drag/swipe to browse projects
   - 3D tilt effect on hover
   - Project cards with image, title, category, brief description
   - Smooth scroll-snap behavior

4. **Skills Grid**
   - Animated skill bars or tags
   - Staggered reveal on scroll
   - Hover effects on each skill

5. **CTA Section**
   - Simple "Let's connect" with social links
   - Fade-in from bottom

### Projects Page

1. **Page Hero**
   - Title with gradient text
   - Subtitle describing project philosophy

2. **Horizontal Scroll Gallery**
   - Full-width project cards
   - Drag to navigate
   - 3D tilt on hover
   - Category filters with smooth transitions

3. **Project Cards**
   - Large image/preview area
   - Title, category, description
   - Tech tags
   - Links (live, repo, etc.)

### About Page

1. **Hero Section**
   - Name and title
   - Brief tagline

2. **Narrative Sections**
   - Scroll-driven story reveals
   - Each section fades/slides in as you scroll
   - Personal narrative about journey and motivation

3. **Skills Showcase**
   - Visual skill categories
   - Interactive hover states
   - Not proficiency bars (too resume-like)

4. **What Drives Me**
   - Values and interests
   - Clean card layout

### Experience Page

1. **Visual Milestone Map**
   - Custom SVG or CSS-based timeline
   - Connecting lines between milestones
   - Icons for each achievement type

2. **Milestone Cards**
   - Award/competition name
   - Date/season
   - Brief description
   - Relevant links

3. **Scroll Animations**
   - Milestones reveal as you scroll
   - Lines draw themselves
   - Icons animate in

### Contact Page

1. **Friendly Header**
   - "Let's chat" or similar approachable title
   - Brief, warm message

2. **Social Links**
   - GitHub, Instagram, Email
   - Large, friendly cards with icons
   - Hover effects with scale and color

3. **No Form**
   - Just direct links
   - Feels personal, not corporate

## [S5] Animations & Interactions

### GSAP Animations

1. **Hero Intro Sequence**
   ```javascript
   // Text typing effect
   // Staggered fade-ins
   // Scroll indicator pulse
   ```

2. **Scroll-Triggered Reveals**
   ```javascript
   // Elements fade in from bottom/sides
   // Trigger at 80% viewport
   // Stagger children for cascade effect
   ```

3. **Parallax Depth**
   ```javascript
   // Background layers move slower
   // Subtle, not disorienting
   // 2-3 depth layers max
   ```

4. **3D Card Tilt**
   ```javascript
   // Cards tilt toward mouse position
   // Max 8-12 degrees
   // Smooth spring-back on leave
   ```

5. **Horizontal Scroll**
   ```javascript
   // Drag to navigate
   // Scroll-snap for sections
   // Momentum scrolling
   ```

### Micro-Interactions

1. **Button Hover**
   - Scale 1.02
   - Shadow elevation increase
   - Color shift (if applicable)

2. **Link Hover**
   - Underline animation (width transition)
   - Color shift to accent

3. **Card Hover**
   - Subtle lift (translateY -2px)
   - Shadow increase
   - Border color change

4. **Form Input Focus**
   - Border color change to accent
   - Subtle glow
   - Label animation (if floating)

### Smooth Scrolling

- Lenis library for buttery smooth scroll
- Configured with GSAP ScrollTrigger integration
- Prevents jank on scroll-based animations

## [S6] Technical Implementation

### File Structure

```
/
├── index.html
├── projects.html
├── about.html
├── experience.html
├── contact.html
├── css/
│   ├── base.css          # Reset, variables, typography
│   ├── components.css    # Buttons, cards, nav
│   ├── layouts.css       # Grid, sections, page layouts
│   └── animations.css    # Keyframes, transitions
├── js/
│   ├── main.js           # Core initialization
│   ├── animations.js     # GSAP animations
│   ├── interactions.js   # Mouse, scroll, click handlers
│   └── components.js     # Reusable component logic
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

### External Libraries (CDN)

- **GSAP 3.12**: Animation engine
- **ScrollTrigger**: Scroll-based animations
- **Lenis**: Smooth scrolling
- **Tailwind CSS**: Utility classes (play CDN or compiled)

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nicholas Rueb | Portfolio</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body>
  <!-- Content -->
  
  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
  <script src="js/main.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/interactions.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

### CSS Architecture

**Base CSS** (`base.css`):
- CSS reset/normalize
- CSS custom properties (colors, typography, spacing)
- Base element styles
- Utility classes

**Components CSS** (`components.css`):
- Navigation bar
- Buttons (primary, secondary, ghost)
- Cards (glass, solid, outlined)
- Tags/badges
- Form elements
- Footer

**Layouts CSS** (`layouts.css`):
- Page shells
- Section containers
- Grid systems
- Hero layouts
- Horizontal scroll containers

**Animations CSS** (`animations.css`):
- Keyframe definitions
- Transition utilities
- Scroll-triggered animation classes
- Reduced motion overrides

### JavaScript Architecture

**Main JS** (`main.js`):
- Initialize Lenis smooth scroll
- Register GSAP plugins
- Set up global event listeners
- Initialize components

**Animations JS** (`animations.js`):
- Hero intro sequence
- Scroll-triggered reveals
- Parallax effects
- Counter animations
- Text typing effects

**Interactions JS** (`interactions.js`):
- Mouse move tracking
- 3D card tilt logic
- Horizontal scroll drag
- Button hover effects
- Form validation (if any)

**Components JS** (`components.js`):
- Navigation toggle
- Project filters
- Modal/lightbox (if needed)
- Toast notifications (if needed)

## [S7] Responsive Design

### Breakpoints

```css
/* Mobile first approach */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
```

### Mobile Adjustments

1. **Navigation**
   - Hamburger menu
   - Full-screen overlay nav
   - Touch-friendly tap targets (min 44px)

2. **Horizontal Scroll**
   - Convert to vertical scroll on mobile
   - Or keep horizontal with touch swipe

3. **Grid Layouts**
   - Single column on mobile
   - Two columns on tablet
   - Three+ columns on desktop

4. **Typography**
   - Scale down headings
   - Increase body text size for readability

5. **Animations**
   - Reduce complexity on mobile
   - Respect prefers-reduced-motion

### Touch Interactions

- Horizontal scroll via swipe gestures
- Tap to expand cards
- Long press for context menus (if applicable)

## [S8] Accessibility

### Requirements

1. **Semantic HTML**
   - Proper heading hierarchy
   - Landmark regions (nav, main, footer)
   - Alt text for images
   - ARIA labels for interactive elements

2. **Keyboard Navigation**
   - Focus visible states
   - Tab order logical
   - Skip to main content link

3. **Color Contrast**
   - WCAG AA compliance minimum
   - 4.5:1 for normal text
   - 3:1 for large text

4. **Motion**
   - Respect prefers-reduced-motion
   - Provide fallbacks for animations
   - No auto-playing animations that can't be paused

5. **Screen Readers**
   - ARIA labels for icons
   - Live regions for dynamic content
   - Descriptive link text

## [S9] Performance

### Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Strategies

1. **Images**
   - Use WebP/AVIF formats
   - Responsive srcset
   - Lazy loading below fold
   - Proper sizing (no oversized images)

2. **CSS**
   - Critical CSS inline
   - Async non-critical CSS
   - Purge unused Tailwind classes

3. **JavaScript**
   - Defer non-critical scripts
   - Code splitting (if needed)
   - Minify and compress

4. **Fonts**
   - Font display: swap
   - Preload critical fonts
   - Limit font weights

## [S10] Content Strategy

### Copy Tone

- **Friendly but not casual**: "Hey, I'm Nicholas" not "Sup, I'm Nick"
- **Confident but humble**: "I build things that solve problems" not "I'm an expert"
- **Specific but accessible**: "Built a robot that navigates obstacles" not "Developed autonomous navigation algorithms"
- **Personal but professional**: Share motivation, not just achievements

### Project Descriptions

- **Problem**: What challenge did you face?
- **Solution**: What did you build?
- **Impact**: What did it achieve?
- **Learning**: What did you learn?

### Call-to-Action

- "Let's chat" not "Contact me"
- "See what I'm working on" not "View projects"
- "Follow my journey" not "Learn about me"

## [S11] Implementation Phases

### Phase 1: Foundation (Days 1-2)

1. Set up file structure
2. Create CSS architecture
3. Build base components (nav, buttons, cards)
4. Implement responsive grid system

### Phase 2: Pages (Days 3-5)

1. Build Home page with animated hero
2. Build Projects page with horizontal scroll
3. Build About page with narrative sections
4. Build Experience page with milestone map
5. Build Contact page with social links

### Phase 3: Animations (Days 6-7)

1. Implement GSAP ScrollTrigger animations
2. Add 3D card tilt effects
3. Create parallax depth layers
4. Build horizontal scroll interactions
5. Add micro-interactions throughout

### Phase 4: Polish (Day 8)

1. Test across browsers
2. Optimize performance
3. Accessibility audit
4. Mobile testing
5. Final tweaks

## [S12] Success Criteria

### Must Have

- [ ] 5 pages with consistent design
- [ ] Animated hero intro sequence
- [ ] Horizontal scroll project showcase
- [ ] 3D card tilt on hover
- [ ] Scroll-triggered animations
- [ ] Smooth scrolling (Lenis)
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA)
- [ ] Fast loading (< 2.5s LCP)

### Nice to Have

- [ ] Particle background (subtle)
- [ ] Dark mode toggle
- [ ] Project filtering with smooth transitions
- [ ] Easter egg or hidden interaction
- [ ] Loading animation

### Not in Scope

- Blog/CMS integration
- Authentication
- Database
- Backend functionality
- Multi-language support

## [S13] Open Questions

1. **Project Images**: Do you have images for projects, or should I use placeholders/SVG illustrations?

2. **Social Links**: Confirm URLs for GitHub, Instagram, Email

3. **Experience Data**: List of awards, competitions, and achievements for the timeline

4. **About Content**: Personal narrative text about your journey and motivation

5. **Deployment**: Where do you want to deploy? (GitHub Pages, Netlify, Vercel)

---

**Next Step**: Proceed to compose:plan for detailed implementation plan.
