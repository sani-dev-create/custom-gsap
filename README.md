# Quick Web Animations

A lightweight animation library featuring JavaScript scroll animations powered by GSAP and a complementary CSS-only animation system. Add beautiful scroll-triggered or instant animations to any element using simple data attributes. Perfect for Webflow projects and custom websites.

## Features

This library provides two animation systems:

1. GSAP Animations - JavaScript-powered, scroll-triggered animations
2. CSS-only Animations - Pure CSS animations for instant loading

## Installation

1. **Add GSAP to your project**

   Add the GSAP script to your HTML file before the closing `</body>` tag:

   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
   ```

   _Note for Webflow users: Add this in Project Settings > Custom Code > Footer Code_

2. **Add Quick Web Animations via CDN**

   **JavaScript:**

   ```html
   <script src="https://cdn.jsdelivr.net/gh/austin-thesing/quick-web-animations@latest/dist/dxd-anim.min.js"></script>
   ```

   **CSS (prevents flicker/double fire of JS animations):**
   _Note: Add this CSS link in the <head> of your project._

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/austin-thesing/quick-web-animations@latest/dist/dxd-anim.min.css" />
   ```

   _Note for Webflow users: Add this in Project Settings > Custom Code > Head Code_

## Usage

### GSAP Scroll Animations

Add these attributes to any element you want to animate on scroll:

**`anim`** (required)

- Specifies which animation to use
- Available animations:
  - `fade-in`: Fades element in
  - `slide-up`: Slides up while fading in
  - `slide-down`: Slides down while fading in
  - `slide-left`: Slides left while fading in
  - `slide-right`: Slides right while fading in
  - `scale-in`: Scales up from 85% while fading in

**`anim-duration`** (optional)

- Controls how long the animation takes to complete
- Value in seconds (e.g., "0.4", "1.5")
- Defaults to 0.4s if not specified

**`anim-delay`** (optional)

- Adds a delay before the animation starts
- Value in seconds (e.g., "0", "0.2")
- Defaults to 0s if not specified

#### Animation Trigger Settings

GSAP animations use these scroll trigger settings:

- threshold: 0.25 (25% of element must be visible)
- rootMargin: "-72px" (animation triggers when element is 72px into viewport)

Mobile-optimized settings:

- threshold: 0.1 (only 10% visibility needed)
- rootMargin: "0px" (triggers as soon as element enters viewport)

#### Example Usage

```html
<!-- Basic scroll animation -->
<div anim="slide-up">I'll slide up when scrolled into view</div>

<!-- Animation with delay -->
<div anim="fade-in" anim-delay="0.3">I'll fade in with a 300ms delay when scrolled into view</div>

<!-- Animation with custom timing -->
<div anim="scale-in" anim-duration="0.8" anim-delay="0.2">I'll scale up with custom duration and delay</div>
```

### CSS-only Animations

The CSS-only animation system (`css-anim`) is specifically designed for hero sections and above-the-fold content where immediate animation is crucial. These animations:

- Start instantly without waiting for JavaScript
- Run as soon as the page loads
- Are perfect for critical content that needs immediate visual impact
- Use minimal system resources
- Work even if JavaScript fails to load

**You can use the CSS-only system by itself, without any JavaScript or GSAP.**

#### Standalone CSS-only CDN

If you only want CSS-only animations, use this CDN link:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/austin-thesing/quick-web-animations@latest/dist/dxd-css-anim.min.css" />
```

_Note: Add this CSS link in the <head> of your project._

#### Available Animations

- Slide Up: `css-anim="slide-up"`
- Slide Down: `css-anim="slide-down"`
- Slide Left: `css-anim="slide-left"`
- Slide Right: `css-anim="slide-right"`
- Fade In: `css-anim="fade-in"`
- Flip: `css-anim="flip"`

#### Delayed Animations

Add a delay by appending a dash and the delay in milliseconds (100–700ms, in 100ms increments):

- `css-anim="slide-up-300"` (300ms delay)
- `css-anim="fade-in-500"` (500ms delay)
- `css-anim="flip-200"` (200ms delay)

_Delays available: 100, 200, 300, 400, 500, 600, 700 (ms)_

#### Example Usage

```html
<!-- Instant animation -->
<div css-anim="slide-up">I'll animate immediately</div>

<!-- Animation with built-in delay -->
<div css-anim="fade-in-300">I'll fade in after 300ms</div>

<!-- Flip animation with delay -->
<div css-anim="flip-500">I'll flip in after 500ms</div>

<!-- Slide left with delay -->
<div css-anim="slide-left-200">I'll slide in from the left after 200ms</div>
```

### Using Both Systems Together

You can use both animation systems on the same page since they use different attributes:

```html
<!-- GSAP scroll-triggered animation -->
<div anim="slide-up">I'll animate when scrolled into view</div>

<!-- CSS instant animation -->
<div css-anim="slide-up">I'll animate immediately</div>
```

Choose between them based on your needs:

- Use `anim` for scroll-triggered animations with more control
- Use `css-anim` for instant animations in hero sections or above the fold

## Development Prerequisites

To modify or contribute to this project, set up your local development environment:

- Install [Bun](https://bun.sh): `curl -fsSL https://bun.sh/install | bash`
- Install dependencies:

  ```bash
  bun install
  ```

## Development

### Commands

- `bun run dev` - Start development mode with auto-minification on file changes
- `bun run build` - Build minified files once
- `bun run clean` - Clean the dist folder

### VS Code Integration

The project includes VS Code/Cursor/Windsurf settings that will automatically:

- Start the development watcher when you open the project
- Show build output in a dedicated terminal
- Exclude unnecessary files from the file explorer

### Build Output

When you run the build command or save files in development mode, minified files are automatically generated in the `dist` folder:

- `dxd-anim.min.js` – Minified JavaScript for scroll/GSAP animations.
- `dxd-anim.min.css` – Minified CSS for initial states of JS animations (prevents flicker/double fire).
- `dxd-css-anim.min.css` – Minified CSS for standalone CSS-only animations.
