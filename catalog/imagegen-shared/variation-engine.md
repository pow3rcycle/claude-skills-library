# The Combinatorial Variation Engine (shared)

Shared reference for `image-to-code` and `imagegen-frontend-web`. Read this file when you are about to art-direct a web page or generate section reference images; pick one option per axis and commit to it across the whole page.

`imagegen-frontend-mobile` has its **own** engine (mobile axes: Structure Bias, Image Art Direction Bias, Texture/Surface Treatment, Palette Logic, Decorative Asset Set) in its SKILL.md — do not substitute this one for it.

> **Doctrine precedence.** `MASTER-DESIGN.md` wins over anything here. The doctrine-illegal options that used to live on these axes (gradient-depth backgrounds, cinematic/tonal and micro-noise gradients, radial vignettes, the infinite brand marquee, and the bone/sand/taupe warm-neutral band) were **replaced with legal same-slot alternatives on 2026-08-12** — the axes and list lengths are unchanged. If you find yourself reaching for one of the removed options anyway, the doctrine's bans (§2 gradients, §2 warm band, §4 infinite loops) apply first: pick a different option on that axis rather than generating a compliant-looking violation.

---

To avoid repetitive AI-looking output, internally choose one option from each category based on the prompt and commit to it consistently.

Do not mash everything together into chaos.
Pick a strong combination and execute it clearly.

### Theme Paradigm
Choose 1:
1. Pristine Light Mode
   Off-white / paper tones (96–99% L with a brand-hue tint), sharp dark text, editorial confidence — not the cream/sand/beige + brass premium band.
2. Deep Dark Mode
   Charcoal / graphite / zinc, elegant glow only when justified.
3. Bold Studio Solid
   Strong controlled color fields like oxblood, royal blue, forest, vermilion, or emerald with crisp contrasting UI.
4. Quiet Tinted Neutral
   Cool porcelain / graphite-blue tinted monochrome (`#F6F7F9`-class light, `#0D0E10`-class dark), muted contrast, restrained luxury. Stay out of the cream/sand/beige + brass warm band (doctrine §2).

### Background Character
Choose 1:
1. Subtle technical grid / dotted field
2. Pure solid field with flat tinted surface steps (depth by background delta, page → card +3–5% L)
3. Full-bleed cinematic imagery with proper contrast control
4. Quiet textured paper / material / tactile surface feel

### Typography Character
Choose 1:
1. Satoshi-like clean grotesk
2. Neue-Montreal-like refined grotesk
3. Cabinet / Clash-like expressive display
4. Monument-like compressed statement typography
5. Elegant editorial serif + sans pairing
6. Swiss rational sans with very strong hierarchy

Never drift into boring default web typography energy.

### Hero Architecture
Choose 1:
1. Cinematic Centered Minimalist
2. Asymmetric Split Hero
3. Floating Polaroid Scatter
4. Inline Typography Behemoth
5. Editorial Offset Composition
6. Massive Image-First Hero with restrained text

### Section System
Choose 1 dominant structure:
1. Strict modular bento rhythm
2. Alternating editorial blocks
3. Poster-like stacked storytelling
4. Gallery-led visual cadence
5. Swiss grid discipline
6. Asymmetric premium marketing flow

### Signature Component Set
Choose exactly 4 unique components:
- Diagonal Staggered Square Masonry
- 3D Cascading Card Deck
- Hover-Accordion Slice Layout
- Pristine Gapless Bento Grid
- Static Brand Logo Wall (aligned grid, grayscale at ~40% opacity, no motion)
- Turning Polaroid Arc
- Vertical Rhythm Lines
- Off-Grid Editorial Layout
- Product UI Panel Stack
- Split Testimonial Quote Wall
- Oversized Metrics Strip
- Layered Image Crop Frames

### Motion-Implied Language
Choose exactly 2:
- scrubbing text reveal energy
- pinned narrative section energy
- staggered float-up energy
- parallax image drift energy
- smooth accordion expansion energy
- cinematic fade-through energy

### Composition Anchor (per-section)
The **left-text / right-image** layout is allowed, but it is the most overused AI pattern — do not use it as the default. Reach for it only when it is the genuinely best fit.

Each section picks 1 anchor; across the site at least 3 different anchors must appear; vary the hero so the page does not open on the AI default.
- Centered statement
- Top-left lead, support bottom-right
- Bottom-left text over background image
- Bottom-right CTA cluster
- Left-third caption + right-two-thirds visual (classic — use sparingly, never twice in a row)
- Right-third caption + left-two-thirds visual (inverted classic)
- Centered low (text in lower 40% over hero image)
- Off-grid editorial offset (asymmetric pull)
- Stacked center (label / headline / sub / CTA all centered, ultra minimalist)
- Image-as-canvas with text overlaid in a clean safe area

### Background Mode (per-section)
Pick 1 per section; vary across the page so it is never all the same mode. Be **confident** with backgrounds — they are a primary tool, not a risk.
- Solid surface with inline asset
- Subtle texture / paper / grid as background
- Full-bleed image background with tonal overlay (text remains highly readable)
- Editorial side-image (50/50, 60/40, 40/60 — invertible)
- Image as the entire visual + text overlaid in a clean safe area
- Flat color block + small product / detail crop as accent
- Flat tonal step field (two or three palette-matched flat bands, low chroma, hard edges — no blend)
- Atmospheric photo with strong color grade (single-tone graded for brand mood)
- Duotone treated image (two-color photo treatment, palette-locked)
- Flat surface + product crop, framed by a hairline rule (luxury / editorial feel, no vignette)
- Fine even grain / paper texture over a solid field (fixed, uniform — tactile depth, no gradient)
- Color-blocked diptych (two flat fields meeting, modernist)

### CTA Variation
Pick the CTA style that fits each section, not a default pill every time:
- Classic primary pill
- Outline / ghost
- Underlined inline link with arrow
- Banner-style full-width CTA
- Oversized headline + tiny CTA hint
- CTA as caption under a strong visual

Across the site, vary CTA style at least once. The page's primary action stays unmistakable.

### Hero Scale (per-page)
Pick 1 — must match brand mood:
- Giant Statement Hero (massive type, large image, dominant first viewport)
- Mid Editorial Hero (balanced type/image, cinematic but not screen-filling)
- Mini Minimalist Hero (tiny logo + short statement + thin CTA, almost no image, lots of negative space)

Mini does not mean weak — it means confident restraint.

### Narrative / Concept Spine
Pick 1 and let it thread through visuals and short copy across the page.
- Artifact / collectible — proof, specimen, treasured object framing
- Journey / pilgrimage — directional flow, waypoint sections, roadmap feeling
- Tool / precision instrument — machined detail, calibrated UI, tactile controls
- Living system / garden — organic growth metaphor, branching layout, nurtured tone
- Stage / spotlight — theatrical contrast, performer + audience framing
- Archive / dossier — indexed rows, captions, understated authority

### Second-Read Moment
Pick exactly 1 unobvious but legible motif and place it deliberately, once across the page:
- asymmetric bleed that still respects hierarchy
- one oversized punctuation or numeral serving structure
- a single unexpected material switch (paper vs gloss vs metal accent)
- a narrow vertical side-rail editorial note style
- a macro crop that carries brand color naturally
Avoid gimmick-for-gimmick: the moment must aid scan order or brand recall.

Important:
These are not coding instructions.
They are visual-direction cues the generated design should imply.

---


---

## Shorthand variant (as used by `image-to-code`)

`image-to-code` used a terser wording of the first seven axes with two option-list differences, preserved here so nothing is lost:

* **Background Character** option 3/4 read "full-bleed cinematic imagery" and "tactile textured surface feel".
* **Signature Component Set** omitted *Oversized Metrics Strip*.
* Everything else is the same axis, same options, shorter phrasing.

Its closing note: *"These are not coding instructions. They are visual-direction cues the design should imply."*
