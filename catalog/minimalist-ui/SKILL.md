---
name: minimalist-ui
description: Clean editorial-style minimalist interfaces — hue-tinted monochrome palette outside the warm band, typographic contrast, flat bento grids, muted pastel accents, no gradients and no heavy shadows.
---

# Protocol: Premium Utilitarian Minimalism UI Architect

> **Register gate — BRAND, plus low-density PRODUCT surfaces** (marketing pages, docs, settings, reading-first app screens). Do NOT apply the macro-whitespace and editorial serif to data-dense dashboards or tables — density is a feature there. Doctrine (`MASTER-DESIGN.md`) wins on any conflict.

## 1. Protocol Overview
Name: Premium Utilitarian Minimalism & Editorial UI
Description: An advanced frontend engineering directive for generating highly refined, ultra-minimalist, "document-style" web interfaces analogous to top-tier workspace platforms. This protocol strictly enforces a high-contrast hue-tinted monochrome palette (outside the cream/sand/beige warm band), bespoke typographic hierarchies, meticulous structural macro-whitespace, bento-grid layouts, and an ultra-flat component architecture with deliberate muted pastel accents. It actively rejects standard generic SaaS design trends.

## 2. Absolute Negative Constraints (Banned Elements)
The AI must strictly avoid the following generic web development defaults:
- DO NOT use the "Inter", "Roboto", or "Open Sans" typefaces.
- DO NOT use generic, thin-line icon libraries like "Lucide", "Feather", or standard "Heroicons".
- DO NOT use Tailwind's default heavy drop shadows (e.g., `shadow-md`, `shadow-lg`, `shadow-xl`). Shadows must be practically non-existent or heavily customized to be ultra-diffuse and low opacity (< 0.05).
- DO NOT use primary colored backgrounds for large elements or sections (e.g., no bright blue, green, or red hero sections).
- DO NOT use gradients, neon colors, or 3D glassmorphism (beyond subtle navbar blurs).
- DO NOT use `rounded-full` (pill shapes) for large containers, cards, or primary buttons.
- DO NOT use emojis anywhere in code, markup, text content, headings, or alt text. Replace with proper icons or clean SVG primitives.
- DO NOT use generic placeholder names like "John Doe", "Acme Corp", or "Lorem Ipsum". Use realistic, contextual content.
- DO NOT use AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve". Write plain, specific language.

## 3. Typographic Architecture
The interface must rely on extreme typographic contrast and premium font selection to establish an editorial feel.
- Primary Sans-Serif (Body, UI, Buttons): Use clean, geometric, or system-native fonts with character. Target: `font-family: 'SF Pro Display', 'Geist Sans', 'Helvetica Neue', 'Switzer', sans-serif`.
- Editorial Serif (Hero Headings & Quotes): Target: `font-family: 'PP Editorial New', 'Tiempos Headline', 'Canela', 'Domaine Display', 'GT Sectra', 'Lyon Text', 'Newsreader', serif`. Playfair Display, Instrument Serif, Fraunces and Cormorant Garamond are BANNED — they are the training-data default serifs and read instantly as AI output. Apply tight tracking (`letter-spacing: -0.02em` to `-0.04em`) and tight line-height (`1.1`).
- Monospace (Code, Keystrokes, Meta-data): Target: `font-family: 'Geist Mono', 'SF Mono', 'JetBrains Mono', monospace`.
- Text Colors: Body text must never be absolute black (`#000000`). Use off-black/graphite (`#111318` or `#2C3038`) with a generous `line-height` of `1.6` for legibility. Secondary text should be a cool muted gray (`#71757E`) — measured at 4.5:1 against the canvas, never estimated.

## 4. Color Palette (Tinted Monochrome + Spot Pastels)
> **Re-tinted 2026-08-12:** the original warm bone/sand/taupe base was removed — `MASTER-DESIGN.md` §2 bans the cream/sand/beige + brass warm-neutral band outright. The skill's identity (editorial typographic contrast, flat bento, muted pastels, no gradients, no heavy shadows) is unchanged; only the hue of the neutral moved.

Color is a scarce resource, utilized only for semantic meaning or subtle accents. The monochrome base is a **hue-tinted neutral OUTSIDE the warm cream/sand/beige band** — cool porcelain (`#F6F7F9`-class), green-tinted bone, or graphite — or, where the project has its own brand token file, the neutral ramp from that file, which overrides these literals.
- Canvas / Background: cool porcelain `#F6F7F9` or `#FAFAFB` (never pure `#FFFFFF` as a page ground, never the warm-bone `#F7F6F3` class). Neutrals carry 0.005–0.015 chroma toward the brand hue; HSL saturation 3–12%.
- Primary Surface (Cards): `#FFFFFF` or `#F2F4F7` — one step off the canvas, elevation by background delta.
- Structural Borders / Dividers: Ultra-light cool gray `#E6E8EC` or `rgba(15,20,30,0.07)`.
- Accent Colors: Exclusively use highly desaturated, washed-out pastels for tags, inline code backgrounds, or subtle icon backgrounds.
  - Pale Red: `#FDEBEC` (Text: `#9F2F2D`)
  - Pale Blue: `#E1F3FE` (Text: `#1F6C9F`)
  - Pale Green: `#EDF3EC` (Text: `#346538`)
  - Pale Yellow: `#FBF3DB` (Text: `#956400`)

## 5. Component Specifications
- Bento Box Feature Grids:
  - Utilize asymmetrical CSS Grid layouts.
  - Cards must have exactly `border: 1px solid #E6E8EC`.
  - Border-radius must be crisp: `8px` or `12px` maximum.
  - Internal padding must be generous (e.g., `24px` to `40px`).
- Primary Call-To-Action (Buttons):
  - Solid background `#111318`, text `#FFFFFF`. 
  - Slight border-radius (`4px` to `6px`). No box-shadow. 
  - Hover state should be a subtle color shift to `#31353D` or a micro-scale `transform: scale(0.98)`.
- Tags & Status Badges:
  - Pill-shaped (`border-radius: 9999px`), very small typography (`text-xs`), uppercase with wide tracking (`letter-spacing: 0.05em`).
  - Background must use the defined Muted Pastels.
- Accordions (FAQ):
  - Strip all container boxes. Separate items only with a `border-bottom: 1px solid #E6E8EC`.
  - Use a clean, sharp `+` and `-` icon for the toggle state.
- Keystroke Micro-UIs:
  - Render shortcuts as physical keys using `<kbd>` tags: `border: 1px solid #E6E8EC`, `border-radius: 4px`, `background: #F6F7F9`, using the Monospace font.
- Faux-OS Window Chrome:
  - When mocking up software, wrap it in a minimalist container with a white top bar containing three small, light gray circles (replicating macOS window controls).

## 6. Iconography & Imagery Directives
- System Icons: Use "Phosphor Icons (Bold or Fill weights)" or "Radix UI Icons" for a technical, slightly thicker-stroke aesthetic. Standardize stroke width across all icons.
- Illustrations: Monochromatic, rough continuous-line ink sketches on a white background, featuring a single offset geometric shape filled with a muted pastel color.
- Photography: Use high-quality, desaturated images graded to the chosen neutral's hue (cool, not warm). Apply subtle overlays (`opacity: 0.04` grain at that same hue) to blend photos into the monochrome palette. Never use oversaturated stock photos. Use reliable placeholders like `https://picsum.photos/seed/{context}/1200/800` when real assets are unavailable.
- Hero & Section Backgrounds: Flat, committed, hue-tinted surfaces. Separate sections by a one-step background *delta* on the neutral ramp, not by a gradient. Where a section needs more presence, reach for a real full-width image at low opacity, a minimal geometric line pattern, or a fixed `pointer-events-none` grain layer — never a radial wash, mesh, aurora, or glow. Emptiness is not a defect: award-tier products ship 60%-empty screens; do not fill space out of fear of it.

## 7. Subtle Motion & Micro-Animations
Motion should feel invisible — present but never distracting. The goal is quiet sophistication, not spectacle.
- Scroll Entry: Elements fade in gently as they enter the viewport. Use `translateY(12px)` + `opacity: 0` resolving over `600ms` with `cubic-bezier(0.16, 1, 0.3, 1)`. Use `IntersectionObserver`, never `window.addEventListener('scroll')`.
- Hover States: Cards lift with an ultra-subtle shadow shift (`box-shadow` transitioning from `0 0 0` to `0 2px 8px rgba(0,0,0,0.04)` over `200ms`). Buttons respond with `scale(0.98)` on `:active`.
- Staggered Reveals: Lists and grid items enter with a cascade delay (`animation-delay: calc(var(--index) * 80ms)`). Never mount everything at once.
- Background Ambient Motion: **None.** Drifting gradient blobs are banned — a moving light source behind static text is the single loudest AI tell, and it fails `prefers-reduced-motion` for no user benefit. If a hero ground feels too bare, use a *static*, barely-there tinted wash (one flat surface one step off the canvas) or leave it flat. Flat is the correct answer far more often than it feels.
- Performance: Animate exclusively via `transform` and `opacity`. No layout-triggering properties (`top`, `left`, `width`, `height`). Use `will-change: transform` sparingly and only on actively animating elements.

## 8. Execution Protocol
When tasked with writing frontend code (HTML, React, Tailwind, Vue) or designing a layout:
1. Establish the macro-whitespace first. Use massive vertical padding between sections (e.g., `py-24` or `py-32` in Tailwind).
2. Constrain the main typography content width to `max-w-4xl` or `max-w-5xl`.
3. Apply the custom typographic hierarchy and monochromatic color variables immediately.
4. Ensure every card, divider, and border adheres strictly to the `1px solid #E6E8EC` rule (or the brand file's equivalent hairline token).
5. Add scroll-entry animations to all major content blocks.
6. Give sections depth through real imagery, a background-delta between adjacent sections, or subtle texture — never through gradients. A flat background is a valid, frequently correct outcome.
7. Provide code that reflects this high-end, uncluttered, editorial aesthetic natively without requiring manual adjustments.
