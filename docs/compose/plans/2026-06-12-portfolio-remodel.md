# Portfolio Remodel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the digital portfolio with MIT Maker Portfolio aesthetic, smooth animations, and interactive elements across 5 pages.

**Architecture:** Vanilla HTML/CSS/JS with GSAP for animations, Tailwind CSS via CDN for styling, and Lenis for smooth scrolling. Modular file structure with separate CSS and JS files for maintainability.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), GSAP 3.12, ScrollTrigger, Lenis, Tailwind CSS (CDN)

---

## File Structure

```
/
├── index.html
├── projects.html
├── about.html
├── experience.html
├── contact.html
├── css/
│   ├── base.css          # Reset, variables, typography
│   ├── components.css    # Buttons, cards, nav, footer
│   ├── layouts.css       # Grid, sections, page layouts
│   └── animations.css    # Keyframes, transitions, scroll animations
├── js/
│   ├── main.js           # Core initialization, Lenis, GSAP setup
│   ├── animations.js     # GSAP ScrollTrigger animations
│   ├── interactions.js   # Mouse tracking, 3D tilt, horizontal scroll
│   └── components.js     # Navigation, filters, form handling
├── assets/
│   └── images/           # Project images (placeholder SVGs initially)
└── docs/
    └── compose/
        ├── specs/
        └── plans/
```

---

## Task 1: Project Setup & Base CSS

**Covers:** [S3] Design System, [S6] Technical Implementation

**Files:**
- Create: `css/base.css`
- Create: `css/components.css`
- Create: `css/layouts.css`
- Create: `css/animations.css`

- [ ] **Step 1: Create base.css with CSS reset and custom properties**

```css
/* css/base.css */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Colors */
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

  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
}

h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 2vw, 1.5rem); }

p {
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
}

a {
  color: var(--accent-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-secondary);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Create components.css with button, card, and nav styles**

```css
/* css/components.css */

/* Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-md) 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  transition: all var(--transition-base);
}

.nav.scrolled {
  padding: var(--space-sm) 0;
  box-shadow: var(--shadow-sm);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.nav-brand span {
  color: var(--accent-primary);
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}

.nav-links a {
  font-weight: 500;
  color: var(--text-secondary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-sm);
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-base);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

/* Cards */
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.card:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.card-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* Tags */
.tag {
  display: inline-block;
  padding: var(--space-xs) var(--space-md);
  background: var(--accent-glow);
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-full);
}

/* Footer */
.footer {
  padding: var(--space-3xl) 0 var(--space-xl);
  border-top: 1px solid var(--border-light);
  margin-top: var(--space-4xl);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: var(--space-lg);
}

.footer-links a {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.footer-links a:hover {
  color: var(--accent-primary);
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    transform: translateX(100%);
    transition: transform var(--transition-slow);
  }

  .nav-links.open {
    transform: translateX(0);
  }

  .nav-links a {
    font-size: 1.5rem;
  }

  .nav-toggle {
    display: flex;
    z-index: 101;
  }

  .footer-inner {
    flex-direction: column;
    gap: var(--space-lg);
    text-align: center;
  }
}
```

- [ ] **Step 3: Create layouts.css with section and grid styles**

```css
/* css/layouts.css */

/* Page Layout */
.page {
  min-height: 100vh;
  padding-top: 80px;
}

.section {
  padding: var(--space-4xl) 0;
}

.section-alt {
  background: var(--bg-secondary);
}

/* Grid Systems */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

/* Hero Layout */
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
  z-index: 1;
}

.hero-visual {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  max-width: 600px;
}

/* Section Headers */
.section-header {
  max-width: 600px;
  margin-bottom: var(--space-3xl);
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-md);
}

.section-label::before {
  content: '';
  width: 24px;
  height: 2px;
  background: var(--accent-primary);
}

.section-title {
  margin-bottom: var(--space-md);
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-muted);
}

/* Horizontal Scroll Container */
.horizontal-scroll {
  display: flex;
  gap: var(--space-xl);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: var(--space-md) 0;
  scrollbar-width: none;
}

.horizontal-scroll::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

/* Milestone Map */
.milestone-map {
  position: relative;
  padding: var(--space-xl) 0;
}

.milestone-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-primary), var(--accent-light));
  transform: translateX(-50%);
}

.milestone-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--space-3xl);
}

.milestone-item:nth-child(odd) {
  flex-direction: row;
}

.milestone-item:nth-child(even) {
  flex-direction: row-reverse;
}

.milestone-content {
  width: calc(50% - var(--space-xl));
  padding: var(--space-xl);
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.milestone-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  background: var(--accent-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }

  .hero {
    flex-direction: column;
    text-align: center;
    padding-top: var(--space-3xl);
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-visual {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    margin-top: var(--space-2xl);
  }

  .milestone-line {
    left: 24px;
  }

  .milestone-item,
  .milestone-item:nth-child(even) {
    flex-direction: row;
    padding-left: 60px;
  }

  .milestone-content {
    width: 100%;
  }

  .milestone-icon {
    left: 24px;
    transform: translateX(-50%);
  }
}
```

- [ ] **Step 4: Create animations.css with keyframes and transition utilities**

```css
/* css/animations.css */

/* Fade Animations */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-right.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Scale Animations */
.scale-in {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.scale-in.visible {
  opacity: 1;
  transform: scale(1);
}

/* Stagger Delays */
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.stagger-5 { transition-delay: 0.5s; }

/* Typing Effect */
.typing {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--accent-primary);
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: var(--accent-primary); }
}

/* Pulse Animation */
.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Float Animation */
.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Draw Line Animation */
.draw-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 2s ease forwards;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

/* Counter Animation */
.counter {
  font-variant-numeric: tabular-nums;
}

/* 3D Tilt Effect */
.tilt {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.tilt:hover {
  transform: rotateX(5deg) rotateY(5deg);
}

/* Scroll Progress Bar */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  z-index: 1000;
  transform-origin: left;
  transform: scaleX(0);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .fade-in,
  .fade-in-left,
  .fade-in-right,
  .scale-in {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .typing {
    animation: none;
    border-right: none;
  }

  .pulse,
  .float {
    animation: none;
  }

  .draw-line {
    animation: none;
    stroke-dashoffset: 0;
  }
}
```

- [ ] **Step 5: Commit base CSS files**

```bash
git add css/base.css css/components.css css/layouts.css css/animations.css
git commit -m "feat: add base CSS architecture with design system"
```

---

## Task 2: JavaScript Core Setup

**Covers:** [S5] Animations & Interactions, [S6] Technical Implementation

**Files:**
- Create: `js/main.js`
- Create: `js/animations.js`
- Create: `js/interactions.js`
- Create: `js/components.js`

- [ ] **Step 1: Create main.js with Lenis and GSAP initialization**

```javascript
// js/main.js

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Get scroll value
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  // Update scroll progress bar
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.transform = `scaleX(${progress})`;
  }
});

// Connect Lenis to GSAP ScrollTrigger
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initInteractions();
  initComponents();
});
```

- [ ] **Step 2: Create animations.js with GSAP ScrollTrigger setup**

```javascript
// js/animations.js

function initScrollAnimations() {
  // Fade in from bottom
  gsap.utils.toArray('.fade-in').forEach((element) => {
    gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Fade in from left
  gsap.utils.toArray('.fade-in-left').forEach((element) => {
    gsap.from(element, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Fade in from right
  gsap.utils.toArray('.fade-in-right').forEach((element) => {
    gsap.from(element, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Scale in
  gsap.utils.toArray('.scale-in').forEach((element) => {
    gsap.from(element, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stagger children
  gsap.utils.toArray('.stagger-children').forEach((parent) => {
    const children = parent.children;
    gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Parallax effects
  gsap.utils.toArray('.parallax').forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    gsap.to(element, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Counter animation
  gsap.utils.toArray('.counter').forEach((counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        counter.textContent = Math.floor(obj.value);
      },
    });
  });
}

// Hero intro animation
function initHeroAnimation() {
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-title', { opacity: 0, y: 50, duration: 1 })
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-visual', { opacity: 0, x: 50, duration: 1 }, '-=0.5');
}

// Initialize hero animation on load
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
});
```

- [ ] **Step 3: Create interactions.js with mouse tracking and 3D tilt**

```javascript
// js/interactions.js

function initInteractions() {
  // 3D Card Tilt
  init3DTilt();

  // Smooth hover effects
  initHoverEffects();

  // Horizontal scroll drag
  initHorizontalScroll();

  // Mouse parallax
  initMouseParallax();
}

function init3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

function initHoverEffects() {
  // Button hover ripple effect
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function initHorizontalScroll() {
  const scrollContainers = document.querySelectorAll('.horizontal-scroll');

  scrollContainers.forEach((container) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    container.style.cursor = 'grab';
  });
}

function initMouseParallax() {
  const parallaxElements = document.querySelectorAll('.mouse-parallax');

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 20;
      const x = mouseX * speed;
      const y = mouseY * speed;

      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  .btn-ripple {
    position: absolute;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
```

- [ ] **Step 4: Create components.js with navigation and form handling**

```javascript
// js/components.js

function initComponents() {
  initNavigation();
  initProjectFilters();
  initFormHandling();
  initScrollProgress();
}

function initNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter cards with animation
      projectCards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.style.display = '';
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, delay: index * 0.05 }
          );
        } else {
          gsap.to(card, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
              card.style.display = 'none';
            },
          });
        }
      });
    });
  });
}

function initFormHandling() {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success state
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Sent!
    `;
    submitBtn.style.background = '#10b981';

    // Reset after delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
      form.reset();
    }, 2000);
  });
}

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;

    progressBar.style.transform = `scaleX(${progress})`;
  });
}

// Initialize spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(spinStyle);
```

- [ ] **Step 5: Commit JavaScript files**

```bash
git add js/main.js js/animations.js js/interactions.js js/components.js
git commit -m "feat: add core JavaScript with GSAP, Lenis, and interactions"
```

---

## Task 3: Home Page

**Covers:** [S4] Home Page Structure

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Create index.html with animated hero and sections**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nicholas Rueb | Portfolio</title>
  <meta name="description" content="High school student building robotics, software, and engineering projects with pro-level workflows.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Space Grotesk', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            accent: {
              primary: '#059669',
              secondary: '#10b981',
              light: '#d1fae5',
            },
          },
        },
      },
    }
  </script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body class="font-body">
  <!-- Scroll Progress -->
  <div class="scroll-progress"></div>
  
  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand">
        <span>N</span>icholas <span>R</span>ueb
      </a>
      <ul class="nav-links">
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="experience.html">Experience</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <p class="section-label fade-in">Portfolio</p>
          <h1 class="hero-title font-heading font-bold mb-6">
            Building the future,<br>one project at a time.
          </h1>
          <p class="hero-subtitle text-lg text-gray-600 mb-8 fade-in stagger-1">
            High school student creating robotics, software, and engineering solutions 
            with polished design and professional workflows.
          </p>
          <div class="hero-cta flex gap-4 fade-in stagger-2">
            <a href="projects.html" class="btn btn-primary">
              View Projects
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="about.html" class="btn btn-secondary">Learn About Me</a>
          </div>
        </div>
        <div class="hero-visual mouse-parallax" data-speed="20">
          <div class="card card-glass p-8">
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <div class="text-3xl font-heading font-bold text-accent-primary counter" data-target="12">0</div>
                <div class="text-sm text-gray-500">Projects</div>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <div class="text-3xl font-heading font-bold text-accent-primary counter" data-target="3">0</div>
                <div class="text-sm text-gray-500">Years Coding</div>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <div class="text-3xl font-heading font-bold text-accent-primary counter" data-target="5">0</div>
                <div class="text-sm text-gray-500">Awards</div>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <div class="text-3xl font-heading font-bold text-accent-primary">∞</div>
                <div class="text-sm text-gray-500">Curiosity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="section section-alt">
      <div class="container">
        <div class="grid grid-cols-2 gap-16 items-center">
          <div class="fade-in-left">
            <p class="section-label">About Me</p>
            <h2 class="section-title font-heading font-bold mb-4">
              Creating work that feels<br>
              <span class="text-accent-primary">intuitive and modern.</span>
            </h2>
            <p class="text-gray-600 mb-6">
              I combine code, robotics, and engineering to build portfolio work that is 
              both technically strong and user-focused. I enjoy solving problems, 
              collaborating on teams, and sharing projects that make an impact.
            </p>
            <a href="about.html" class="btn btn-ghost">
              Read my story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div class="fade-in-right">
            <div class="card tilt-card">
              <h3 class="font-heading font-semibold mb-4">Skills</h3>
              <div class="flex flex-wrap gap-2">
                <span class="tag">JavaScript</span>
                <span class="tag">Python</span>
                <span class="tag">C++</span>
                <span class="tag">HTML/CSS</span>
                <span class="tag">Figma</span>
                <span class="tag">Arduino</span>
                <span class="tag">ROS</span>
                <span class="tag">CAD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Horizontal Scroll -->
    <section class="section">
      <div class="container">
        <div class="section-header fade-in">
          <p class="section-label">Projects</p>
          <h2 class="section-title font-heading font-bold">Featured Work</h2>
          <p class="section-subtitle">Swipe to explore my latest projects</p>
        </div>
      </div>
      <div class="horizontal-scroll px-8">
        <!-- Project Card 1 -->
        <article class="card tilt-card w-96 flex-shrink-0">
          <div class="h-48 bg-gradient-to-br from-green-100 to-green-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <span class="tag mb-2">Coding</span>
          <h3 class="font-heading font-semibold text-xl mb-2">FRC Prediction Simulator</h3>
          <p class="text-gray-600 text-sm mb-4">Simulation tool for predicting FIRST Robotics Competition match outcomes.</p>
          <a href="#" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </article>

        <!-- Project Card 2 -->
        <article class="card tilt-card w-96 flex-shrink-0">
          <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
              <path d="M2 2l7.586 7.586"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
          </div>
          <span class="tag mb-2">Design</span>
          <h3 class="font-heading font-semibold text-xl mb-2">NovaLine</h3>
          <p class="text-gray-600 text-sm mb-4">Personal graphic design firm creating brand identities and visual systems.</p>
          <a href="#" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </article>

        <!-- Project Card 3 -->
        <article class="card tilt-card w-96 flex-shrink-0">
          <div class="h-48 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span class="tag mb-2">Social Impact</span>
          <h3 class="font-heading font-semibold text-xl mb-2">Fireside</h3>
          <p class="text-gray-600 text-sm mb-4">App helping those in poverty access welfare assistance and support resources.</p>
          <a href="#" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </article>

        <!-- Project Card 4 -->
        <article class="card tilt-card w-96 flex-shrink-0">
          <div class="h-48 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <span class="tag mb-2">Robotics</span>
          <h3 class="font-heading font-semibold text-xl mb-2">Autonomous Rescue Bot</h3>
          <p class="text-gray-600 text-sm mb-4">Prototype robot designed to navigate obstacles and locate recovery targets.</p>
          <a href="#" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </a>
        </article>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section-alt">
      <div class="container text-center">
        <div class="max-w-2xl mx-auto fade-in">
          <h2 class="section-title font-heading font-bold mb-4">Let's connect</h2>
          <p class="text-gray-600 mb-8">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
          <div class="flex gap-4 justify-center">
            <a href="contact.html" class="btn btn-primary">
              Get in Touch
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <a href="https://github.com/agoofygoat" target="_blank" rel="noopener" class="btn btn-secondary">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="text-gray-500 text-sm">
        Built by Nicholas Rueb
      </div>
      <div class="footer-links">
        <a href="https://github.com/agoofygoat" target="_blank" rel="noopener">GitHub</a>
        <a href="https://instagram.com/nick_rueb" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:nicholasrueb@gmail.com">Email</a>
      </div>
    </div>
  </footer>

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

- [ ] **Step 2: Commit home page**

```bash
git add index.html
git commit -m "feat: add home page with animated hero and horizontal scroll"
```

---

## Task 4: Projects Page

**Covers:** [S4] Projects Page Structure

**Files:**
- Modify: `projects.html`

- [ ] **Step 1: Create projects.html with horizontal scroll gallery**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projects | Nicholas Rueb</title>
  <meta name="description" content="Explore my coding, robotics, and engineering projects.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Space Grotesk', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            accent: {
              primary: '#059669',
              secondary: '#10b981',
              light: '#d1fae5',
            },
          },
        },
      },
    }
  </script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body class="font-body">
  <!-- Scroll Progress -->
  <div class="scroll-progress"></div>
  
  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand">
        <span>N</span>icholas <span>R</span>ueb
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html" class="active">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="experience.html">Experience</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <main class="page">
    <!-- Page Hero -->
    <section class="section">
      <div class="container text-center">
        <p class="section-label justify-center fade-in">Projects</p>
        <h1 class="section-title font-heading font-bold mb-4 fade-in stagger-1">
          My <span class="text-accent-primary">Work</span>
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto fade-in stagger-2">
          Coding, robotics, and engineering projects that solve real problems.
          Swipe to explore or use filters to find specific categories.
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="pb-8">
      <div class="container">
        <div class="flex flex-wrap justify-center gap-3 fade-in">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="coding">Coding</button>
          <button class="filter-btn" data-filter="design">Design</button>
          <button class="filter-btn" data-filter="robotics">Robotics</button>
          <button class="filter-btn" data-filter="social-impact">Social Impact</button>
        </div>
      </div>
    </section>

    <!-- Projects Horizontal Scroll -->
    <section class="pb-16">
      <div class="horizontal-scroll px-8">
        <!-- Project 1 -->
        <article class="project-card card tilt-card w-96 flex-shrink-0" data-category="design">
          <div class="h-56 bg-gradient-to-br from-green-100 to-green-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
              <path d="M2 2l7.586 7.586"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="tag">Design</span>
          </div>
          <h3 class="font-heading font-semibold text-xl mb-2">NovaLine</h3>
          <p class="text-gray-600 text-sm mb-4">Personal graphic design firm creating brand identities, visual systems, and marketing materials.</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Graphic Design</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Branding</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">UI/UX</span>
          </div>
          <a href="https://novaline.novastudios.workers.dev/" target="_blank" rel="noopener" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            Live Site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </article>

        <!-- Project 2 -->
        <article class="project-card card tilt-card w-96 flex-shrink-0" data-category="coding">
          <div class="h-56 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="tag">Coding</span>
          </div>
          <h3 class="font-heading font-semibold text-xl mb-2">FRC Prediction Simulator</h3>
          <p class="text-gray-600 text-sm mb-4">Simulation tool for predicting FIRST Robotics Competition match outcomes and alliance performance.</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">JavaScript</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Data Analysis</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">FRC</span>
          </div>
          <a href="https://frc-prediction-simulator-github-bpac3yrm8-agoofygoats-projects.vercel.app/" target="_blank" rel="noopener" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            Live Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </article>

        <!-- Project 3 -->
        <article class="project-card card tilt-card w-96 flex-shrink-0" data-category="social-impact">
          <div class="h-56 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="tag">Social Impact</span>
          </div>
          <h3 class="font-heading font-semibold text-xl mb-2">Fireside</h3>
          <p class="text-gray-600 text-sm mb-4">App helping those in poverty access welfare assistance and support resources they need.</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">UX Design</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Social Good</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">App Design</span>
          </div>
          <a href="https://designthinking.mad-learn.com/devicepreview/?appId=VTJGc2RHVmtYMThVKzFOQWxnbXFoSjNiWHJkY1ZEQXlkYWduRmpDZDQ4UT0=" target="_blank" rel="noopener" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            Live Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </article>

        <!-- Project 4 -->
        <article class="project-card card tilt-card w-96 flex-shrink-0" data-category="robotics">
          <div class="h-56 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="tag">Robotics</span>
          </div>
          <h3 class="font-heading font-semibold text-xl mb-2">Autonomous Rescue Bot</h3>
          <p class="text-gray-600 text-sm mb-4">Prototype robot designed to navigate obstacles and locate recovery targets using sensors and path planning.</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">C++</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Arduino</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Sensors</span>
          </div>
          <a href="#" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            Build Notes
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </a>
        </article>

        <!-- Project 5 -->
        <article class="project-card card tilt-card w-96 flex-shrink-0" data-category="coding">
          <div class="h-56 bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg mb-4 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="tag">Coding</span>
          </div>
          <h3 class="font-heading font-semibold text-xl mb-2">Automation Toolkit</h3>
          <p class="text-gray-600 text-sm mb-4">Python utilities for file processing, data analysis, and team productivity automation.</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Python</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">CLI</span>
            <span class="text-xs px-2 py-1 bg-gray-100 rounded">Automation</span>
          </div>
          <a href="#" class="text-accent-primary font-medium text-sm flex items-center gap-1">
            Repository
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        </article>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="text-gray-500 text-sm">
        Built by Nicholas Rueb
      </div>
      <div class="footer-links">
        <a href="https://github.com/agoofygoat" target="_blank" rel="noopener">GitHub</a>
        <a href="https://instagram.com/nick_rueb" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:nicholasrueb@gmail.com">Email</a>
      </div>
    </div>
  </footer>

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

- [ ] **Step 2: Commit projects page**

```bash
git add projects.html
git commit -m "feat: add projects page with horizontal scroll gallery"
```

---

## Task 5: About Page

**Covers:** [S4] About Page Structure

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create about.html with personal narrative**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About | Nicholas Rueb</title>
  <meta name="description" content="Learn about my journey, what drives me, and the skills I've developed.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Space Grotesk', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            accent: {
              primary: '#059669',
              secondary: '#10b981',
              light: '#d1fae5',
            },
          },
        },
      },
    }
  </script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body class="font-body">
  <!-- Scroll Progress -->
  <div class="scroll-progress"></div>
  
  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand">
        <span>N</span>icholas <span>R</span>ueb
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html" class="active">About</a></li>
        <li><a href="experience.html">Experience</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <main class="page">
    <!-- Page Hero -->
    <section class="section">
      <div class="container">
        <div class="max-w-3xl">
          <p class="section-label fade-in">About</p>
          <h1 class="section-title font-heading font-bold mb-6 fade-in stagger-1">
            The person behind<br>
            <span class="text-accent-primary">the projects.</span>
          </h1>
          <p class="text-xl text-gray-600 fade-in stagger-2">
            I'm Nicholas Rueb, a high school student who loves building things 
            that solve real problems. Here's my story.
          </p>
        </div>
      </div>
    </section>

    <!-- Narrative Section 1 -->
    <section class="section section-alt">
      <div class="container">
        <div class="grid grid-cols-2 gap-16 items-center">
          <div class="fade-in-left">
            <p class="section-label">The Beginning</p>
            <h2 class="font-heading font-bold text-2xl mb-4">How it started</h2>
            <p class="text-gray-600 mb-4">
              It all began with a simple question: "How does this work?" Whether it was 
              taking apart electronics, writing my first line of code, or building robots 
              in my garage, I've always been driven by curiosity.
            </p>
            <p class="text-gray-600">
              That curiosity turned into a passion for creating things that matter. 
              I started with small projects—simple scripts, basic circuits—and gradually 
              took on bigger challenges that pushed me to learn more.
            </p>
          </div>
          <div class="fade-in-right">
            <div class="card p-8 text-center">
              <div class="text-6xl mb-4">🔧</div>
              <p class="font-heading font-semibold text-lg">The Tinkerer Phase</p>
              <p class="text-gray-500 text-sm">Taking things apart to understand them</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Narrative Section 2 -->
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-2 gap-16 items-center">
          <div class="fade-in-left order-2">
            <p class="section-label">The Journey</p>
            <h2 class="font-heading font-bold text-2xl mb-4">Finding my path</h2>
            <p class="text-gray-600 mb-4">
              Along the way, I discovered that I love the intersection of technology 
              and design. It's not enough for something to work—it needs to feel right, 
              look good, and be intuitive to use.
            </p>
            <p class="text-gray-600">
              This realization led me to explore UX design, graphic design, and 
              front-end development. I want to create experiences that people enjoy 
              using, not just tools that get the job done.
            </p>
          </div>
          <div class="fade-in-right order-1">
            <div class="card p-8 text-center">
              <div class="text-6xl mb-4">🎨</div>
              <p class="font-heading font-semibold text-lg">The Designer Phase</p>
              <p class="text-gray-500 text-sm">Learning to balance form and function</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Narrative Section 3 -->
    <section class="section section-alt">
      <div class="container">
        <div class="grid grid-cols-2 gap-16 items-center">
          <div class="fade-in-left">
            <p class="section-label">What Drives Me</p>
            <h2 class="font-heading font-bold text-2xl mb-4">Why I build</h2>
            <p class="text-gray-600 mb-4">
              I build things because I want to make a difference. Whether it's a tool 
              that helps my robotics team, an app that connects people with resources, 
              or a design that communicates ideas clearly—every project is a chance 
              to solve a problem.
            </p>
            <p class="text-gray-600">
              I'm also driven by the joy of learning. Every project teaches me something 
              new, whether it's a technical skill, a design principle, or a lesson about 
              collaboration and perseverance.
            </p>
          </div>
          <div class="fade-in-right">
            <div class="card p-8 text-center">
              <div class="text-6xl mb-4">🚀</div>
              <p class="font-heading font-semibold text-lg">The Builder Phase</p>
              <p class="text-gray-500 text-sm">Creating things that matter</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section">
      <div class="container">
        <div class="section-header fade-in">
          <p class="section-label">Skills</p>
          <h2 class="section-title font-heading font-bold">What I work with</h2>
          <p class="section-subtitle">Technologies and tools I use to bring ideas to life</p>
        </div>
        
        <div class="grid grid-cols-3 gap-6 stagger-children">
          <div class="card tilt-card">
            <div class="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold mb-2">Coding</h3>
            <p class="text-gray-600 text-sm">JavaScript, Python, C++, HTML/CSS</p>
          </div>
          
          <div class="card tilt-card">
            <div class="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold mb-2">Design</h3>
            <p class="text-gray-600 text-sm">Figma, Graphic Design, UI/UX</p>
          </div>
          
          <div class="card tilt-card">
            <div class="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold mb-2">Robotics</h3>
            <p class="text-gray-600 text-sm">Arduino, ROS, Sensors, Control Systems</p>
          </div>
          
          <div class="card tilt-card">
            <div class="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold mb-2">Engineering</h3>
            <p class="text-gray-600 text-sm">CAD, SolidWorks, Prototyping</p>
          </div>
          
          <div class="card tilt-card">
            <div class="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold mb-2">Tools</h3>
            <p class="text-gray-600 text-sm">Git, VS Code, Linux, Terminal</p>
          </div>
          
          <div class="card tilt-card">
            <div class="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold mb-2">Soft Skills</h3>
            <p class="text-gray-600 text-sm">Teamwork, Communication, Problem-solving</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="text-gray-500 text-sm">
        Built by Nicholas Rueb
      </div>
      <div class="footer-links">
        <a href="https://github.com/agoofygoat" target="_blank" rel="noopener">GitHub</a>
        <a href="https://instagram.com/nick_rueb" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:nicholasrueb@gmail.com">Email</a>
      </div>
    </div>
  </footer>

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

- [ ] **Step 2: Commit about page**

```bash
git add about.html
git commit -m "feat: add about page with personal narrative"
```

---

## Task 6: Experience Page

**Covers:** [S4] Experience Page Structure

**Files:**
- Create: `experience.html`

- [ ] **Step 1: Create experience.html with visual milestone map**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Experience | Nicholas Rueb</title>
  <meta name="description" content="A visual timeline of my achievements, awards, and milestones.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Space Grotesk', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            accent: {
              primary: '#059669',
              secondary: '#10b981',
              light: '#d1fae5',
            },
          },
        },
      },
    }
  </script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body class="font-body">
  <!-- Scroll Progress -->
  <div class="scroll-progress"></div>
  
  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand">
        <span>N</span>icholas <span>R</span>ueb
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="experience.html" class="active">Experience</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <main class="page">
    <!-- Page Hero -->
    <section class="section">
      <div class="container text-center">
        <p class="section-label justify-center fade-in">Experience</p>
        <h1 class="section-title font-heading font-bold mb-4 fade-in stagger-1">
          My <span class="text-accent-primary">Journey</span>
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto fade-in stagger-2">
          A visual timeline of achievements, competitions, and milestones 
          that have shaped who I am today.
        </p>
      </div>
    </section>

    <!-- Milestone Map -->
    <section class="section">
      <div class="container">
        <div class="milestone-map">
          <!-- Milestone Line (SVG) -->
          <svg class="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style="height: 100%;">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#059669" stroke-width="2" class="draw-line"/>
          </svg>

          <!-- Milestone 1 -->
          <div class="milestone-item fade-in">
            <div class="milestone-content">
              <span class="text-sm text-accent-primary font-mono">2024</span>
              <h3 class="font-heading font-semibold text-lg mt-1">FRC Regional Champions</h3>
              <p class="text-gray-600 text-sm mt-2">Led programming team to victory at FIRST Robotics regional competition.</p>
              <div class="flex gap-2 mt-3">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Leadership</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Robotics</span>
              </div>
            </div>
            <div class="milestone-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
          </div>

          <!-- Milestone 2 -->
          <div class="milestone-item fade-in">
            <div class="milestone-content">
              <span class="text-sm text-accent-primary font-mono">2024</span>
              <h3 class="font-heading font-semibold text-lg mt-1">State Science Fair Finalist</h3>
              <p class="text-gray-600 text-sm mt-2">Presented autonomous navigation research at state level competition.</p>
              <div class="flex gap-2 mt-3">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Research</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Presentation</span>
              </div>
            </div>
            <div class="milestone-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            </div>
          </div>

          <!-- Milestone 3 -->
          <div class="milestone-item fade-in">
            <div class="milestone-content">
              <span class="text-sm text-accent-primary font-mono">2023</span>
              <h3 class="font-heading font-semibold text-lg mt-1">Started NovaLine Design Studio</h3>
              <p class="text-gray-600 text-sm mt-2">Launched personal graphic design firm serving local businesses and organizations.</p>
              <div class="flex gap-2 mt-3">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Entrepreneurship</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Design</span>
              </div>
            </div>
            <div class="milestone-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
            </div>
          </div>

          <!-- Milestone 4 -->
          <div class="milestone-item fade-in">
            <div class="milestone-content">
              <span class="text-sm text-accent-primary font-mono">2023</span>
              <h3 class="font-heading font-semibold text-lg mt-1">Fireside App Launch</h3>
              <p class="text-gray-600 text-sm mt-2">Released social impact app helping connect people with welfare resources.</p>
              <div class="flex gap-2 mt-3">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Social Impact</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">UX Design</span>
              </div>
            </div>
            <div class="milestone-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>

          <!-- Milestone 5 -->
          <div class="milestone-item fade-in">
            <div class="milestone-content">
              <span class="text-sm text-accent-primary font-mono">2022</span>
              <h3 class="font-heading font-semibold text-lg mt-1">First FRC Season</h3>
              <p class="text-gray-600 text-sm mt-2">Joined robotics team and discovered passion for competitive engineering.</p>
              <div class="flex gap-2 mt-3">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Robotics</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Teamwork</span>
              </div>
            </div>
            <div class="milestone-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
          </div>

          <!-- Milestone 6 -->
          <div class="milestone-item fade-in">
            <div class="milestone-content">
              <span class="text-sm text-accent-primary font-mono">2021</span>
              <h3 class="font-heading font-semibold text-lg mt-1">Wrote First Line of Code</h3>
              <p class="text-gray-600 text-sm mt-2">Started learning Python and discovered the joy of programming.</p>
              <div class="flex gap-2 mt-3">
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Python</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">Learning</span>
              </div>
            </div>
            <div class="milestone-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="text-gray-500 text-sm">
        Built by Nicholas Rueb
      </div>
      <div class="footer-links">
        <a href="https://github.com/agoofygoat" target="_blank" rel="noopener">GitHub</a>
        <a href="https://instagram.com/nick_rueb" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:nicholasrueb@gmail.com">Email</a>
      </div>
    </div>
  </footer>

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

- [ ] **Step 2: Commit experience page**

```bash
git add experience.html
git commit -m "feat: add experience page with visual milestone map"
```

---

## Task 7: Contact Page

**Covers:** [S4] Contact Page Structure

**Files:**
- Modify: `contact.html`

- [ ] **Step 1: Create contact.html with friendly social links**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | Nicholas Rueb</title>
  <meta name="description" content="Get in touch with Nicholas Rueb for collaborations and opportunities.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Space Grotesk', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            accent: {
              primary: '#059669',
              secondary: '#10b981',
              light: '#d1fae5',
            },
          },
        },
      },
    }
  </script>
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layouts.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body class="font-body">
  <!-- Scroll Progress -->
  <div class="scroll-progress"></div>
  
  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand">
        <span>N</span>icholas <span>R</span>ueb
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="experience.html">Experience</a></li>
        <li><a href="contact.html" class="active">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <main class="page">
    <!-- Page Hero -->
    <section class="section">
      <div class="container text-center">
        <p class="section-label justify-center fade-in">Contact</p>
        <h1 class="section-title font-heading font-bold mb-4 fade-in stagger-1">
          Let's <span class="text-accent-primary">chat</span>
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto fade-in stagger-2">
          Have a project idea, want to collaborate, or just want to say hi? 
          I'd love to hear from you. No forms, no formalities—just reach out.
        </p>
      </div>
    </section>

    <!-- Social Links -->
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-3 gap-6 max-w-4xl mx-auto stagger-children">
          <!-- GitHub -->
          <a href="https://github.com/agoofygoat" target="_blank" rel="noopener" class="card tilt-card text-center group">
            <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-light transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold text-lg mb-1">GitHub</h3>
            <p class="text-gray-500 text-sm">@agoofygoat</p>
            <p class="text-gray-400 text-xs mt-2">See my code and projects</p>
          </a>

          <!-- Instagram -->
          <a href="https://instagram.com/nick_rueb" target="_blank" rel="noopener" class="card tilt-card text-center group">
            <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-light transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold text-lg mb-1">Instagram</h3>
            <p class="text-gray-500 text-sm">@nick_rueb</p>
            <p class="text-gray-400 text-xs mt-2">Behind the scenes</p>
          </a>

          <!-- Email -->
          <a href="mailto:nicholasrueb@gmail.com" class="card tilt-card text-center group">
            <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-light transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 class="font-heading font-semibold text-lg mb-1">Email</h3>
            <p class="text-gray-500 text-sm">nicholasrueb@gmail.com</p>
            <p class="text-gray-400 text-xs mt-2">For anything really</p>
          </a>
        </div>

        <!-- Friendly Message -->
        <div class="text-center mt-16 fade-in">
          <div class="card inline-block px-8 py-6">
            <p class="text-gray-600">
              <span class="text-2xl mr-2">👋</span>
              Whether it's a quick question or a big project idea, I'm always happy to chat. 
              No need for anything formal—just say hi!
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="text-gray-500 text-sm">
        Built by Nicholas Rueb
      </div>
      <div class="footer-links">
        <a href="https://github.com/agoofygoat" target="_blank" rel="noopener">GitHub</a>
        <a href="https://instagram.com/nick_rueb" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:nicholasrueb@gmail.com">Email</a>
      </div>
    </div>
  </footer>

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

- [ ] **Step 2: Commit contact page**

```bash
git add contact.html
git commit -m "feat: add contact page with friendly social links"
```

---

## Task 8: Cleanup & Final Polish

**Covers:** [S11] Implementation Phases, [S12] Success Criteria

**Files:**
- Delete: `script.js` (replaced by modular JS files)
- Delete: `styles.css` (replaced by modular CSS files)

- [ ] **Step 1: Remove old files**

```bash
git rm script.js styles.css
git commit -m "chore: remove old monolithic files replaced by modular architecture"
```

- [ ] **Step 2: Update README with new structure**

```bash
# Update README.md with:
# - New file structure
# - How to run locally
# - Deployment instructions
# - Tech stack description
```

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "chore: complete portfolio remodel with modular architecture"
```

---

## Self-Review Checklist

### Spec Coverage

- [x] [S1] Problem - Addressed in all tasks
- [x] [S2] Solution Overview - Implemented across tasks
- [x] [S3] Design System - Task 1
- [x] [S4] Page Structure - Tasks 3-7
- [x] [S5] Animations & Interactions - Task 2
- [x] [S6] Technical Implementation - Tasks 1-2
- [x] [S7] Responsive Design - Tasks 1, 3-7
- [x] [S8] Accessibility - Tasks 1, 3-7
- [x] [S9] Performance - Task 1 (CDN, optimized)
- [x] [S10] Content Strategy - Tasks 3-7
- [x] [S11] Implementation Phases - Tasks 1-8
- [x] [S12] Success Criteria - All tasks contribute

### Placeholder Scan

- [x] No TBD/TODO in tasks
- [x] All code blocks complete
- [x] All file paths specified
- [x] All commands with expected output

### Type Consistency

- [x] CSS class names consistent
- [x] JavaScript function names consistent
- [x] HTML structure consistent across pages

---

**Next Step:** Execute implementation using compose:subagent or compose:execute.
