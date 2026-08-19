# Anti-AI-Slop Taxonomy (shared)

Shared reference for `image-to-code`, `imagegen-frontend-web` and `imagegen-frontend-mobile`. Five core buckets plus two web-specific ones (the last two apply to web pages, not app screens). Strictly avoid these patterns unless the user explicitly asks for them.

`imagegen-frontend-mobile` layers its own platform-specific tells (Visual / Layout / Copy / UI-clutter) on top of this list — read both.

> **Doctrine precedence.** `MASTER-DESIGN.md` wins over anything here, and is stricter on several of these (gradient backdrops are banned outright, not merely "purple/blue AI gradients"; the whole cream/sand/beige + brass warm band is banned; infinite micro-loops are BRAND-register-only and must be earned; emoji are zero-exception; Inter and the four default display serifs are banned). This list was aligned to the doctrine on 2026-08-12 — each entry now carries a `→` replacement where one applies, because a ban with no replacement is satisfied by the next un-banned default.

---

## Layout slop
- one giant unreadable collage
- endless centered sections
- identical card rows repeated section after section
- cloned left-text/right-image blocks
- perfect but lifeless symmetry everywhere
- fake complexity without hierarchy
- decorative / empty space with no purpose
- cards-inside-cards-inside-cards
- giant rounded wrapper sections around everything
- overcompartmentalized dashboard framing

## Visual slop
- any gradient page/section backdrop, purple/blue "AI" gradients worst of all → a flat brand canvas or a real sharp product visual cropped by the fold
- too many glowing edges → one hairline at full opacity carries the same separation
- floating spheres / blobs / aurora meshes everywhere → real imagery, or nothing
- glassmorphism stacked without reason → one separation strategy per surface
- random futuristic details with no structure → cut them; whitespace may stay empty
- over-rendered noise that hides the layout → fine even grain at a fixed opacity, or none
- the cream/sand/beige + brass premium-consumer palette → a tinted neutral outside the warm band (cool porcelain, graphite, green-tinted bone) or the project brand file's neutral

## Typography slop
- giant heading + weak tiny subcopy
- too many font moods in one page
- awkward line breaks
- lazy all-caps everywhere
- gradient headline as a shortcut for "premium"

## Content slop

Avoid generic filler copy vibes like:
- unleash
- elevate
- revolutionize
- next-gen
- seamless
- powerful solution
- transformative platform

Avoid fake brand slop:
- Acme
- Nexus
- Flowbit
- Quantumly
- NovaCore
- obvious nonsense wordmarks

Avoid fake complexity slop:
- pseudo-enterprise control labels
- decorative system markers
- filler status microcopy
- fake operator / runtime / orchestration jargon unless truly central to the brand

Use short, believable, design-friendly copy.

## Density slop
- over-packed sections
- card overload in every block
- tiny spacing between major sections
- trying to fill every empty area
- visually exhausting wall-of-content layouts

## Carousel / marquee slop (layout)
- infinity logo strips repeating the same 6 blobs → a static aligned logo wall, grayscale at ~40% opacity
- "trusted by" ticker that is unreadable mosquito logos → fewer real logos at a legible size, or a named-customer line in text
- auto-play-style hero dots with no semantic purpose → clip the next card at 30–60% so the cut edge signals scroll
- any perpetual/infinite loop outside the BRAND register, or one an informational section does not actively benefit from → stillness

## Data / KPI slop
- three identical stat columns (99% satisfaction, $10 saved, ∞ scale) unless the user asked for KPIs
- fake dashboards with pointless charts shading the real layout
