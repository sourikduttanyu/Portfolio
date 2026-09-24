# Design System: Pixel World

A portfolio told as a short journey in 2D pixel art with depth and texture.

## Scenes
1. **Night city (hero, projects):** Katana Zero mood. Indigo sky, pixel skyline, diagonal rain, random thunderstorm strikes (right side only, clear of text). Three floating beige CRTs in a triangle (two apart at the bottom, one raised), sized at load so all three are visible above the fold. ◀ ▶ / arrow keys flip every set at once: staggered static, per-TV knob turns, 7-segment channel readout, on-screen "CH" label.
2. **Wooden beam:** aged planks (grain, knots, cracks, bleached patches, rusty nails), Zelda-green vine wrapping the left third, hanging "WORK EXPERIENCE" sign on chains.
3. **Tiny planet (work):** Outer Wilds-inspired. Deep space, nebula, gas giant, moon, comet, sun on a 22-minute supernova loop (`supernova()` in the console previews it). Curved horizon, pines, wooden tower, launch pad, campfire with embers under the EY monitor casting warm light on all monitors. Amber ship-log trail links EY → Hanu → Insight.
4. **Ship log:** readable job cards; clicking a monitor highlights its entry.

## Palette
- City: indigo `oklch(10–14% .04 290)`, neon pink `oklch(70% .21 355)`, cyan `oklch(84% .12 205)`
- Space: `#05070f` → `#0f2433` bands, nebula teal `#15404f` / violet `#2b2152`, amber ship log `#e8a33d`
- Wood: 8-step ramp `#140c07` → `#b99466`, vine `#0b3b16 / #178a2a / #34b13a / #7ee04a / #c8ff7a`

## Type
- Press Start 2P: name, section and card headings, channel readout
- Silkscreen: tags, buttons, captions, dates
- Space Grotesk: everything people read in sentences

## Rendering rules
- Every sprite is drawn at native resolution and scaled with `image-rendering: pixelated`; shading uses ramps + ordered (Bayer) dithering, never smooth gradients.
- Light is diegetic: pink/cyan neon rim light in the city, warm campfire underlight on the planet, screen colour spilling onto bezels.
- One CRT/monitor = one project/job; real clips go through the same downscale.
