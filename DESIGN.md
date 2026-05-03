---
name: Sourik Dutta — Portfolio
description: Terminal-native ops portfolio for a senior software engineer specializing in distributed systems and agentic AI.
colors:
  signal-teal: "#2dd4f0"
  signal-teal-mid: "#0a87a3"
  deep-navy: "#07111f"
  elevated-navy: "#0c1a30"
  yale-blue: "#1a3a6a"
  relay-blue: "#5ba4f5"
  alabaster: "#dde8f5"
  command-white: "#f0f8ff"
typography:
  display:
    fontFamily: "\"Exo 2\", sans-serif"
    fontSize: "clamp(3rem, 12vw, 9.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "\"Exo 2\", sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "\"Exo 2\", sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "\"Exo 2\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.01em"
  label:
    fontFamily: "\"Fira Code\", \"JetBrains Mono\", monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    letterSpacing: "0.2em"
rounded:
  none: "0px"
spacing:
  section: "8rem"
  component: "2rem"
  tight: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "#26bcd9"
    textColor: "{colors.deep-navy}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.alabaster}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ghost-hover:
    textColor: "{colors.signal-teal}"
  nav-icon:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.yale-blue}"
    rounded: "{rounded.none}"
    size: "32px"
  nav-icon-active:
    textColor: "{colors.command-white}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.command-white}"
    rounded: "{rounded.none}"
    padding: "10px 8px 10px 24px"
---

# Design System: Sourik Dutta — Portfolio

## 1. Overview

**Creative North Star: "The Operational Manifest"**

This is not a portfolio — it is a live capability record. The aesthetic comes from mission-critical production dashboards, not creative showcases. Every section has an ID, a section number, and a status indicator. The typography is geometric-military: Exo 2 for structure, Fira Code for signal. The palette is a deep navy void with a single high-chroma teal accent that reads like a status LED, not a brand color.

The system rewards the kind of reader who inspects devtools. Section labels are alphanumeric (`CAREER_TELEMETRY`, `CAPABILITY_MATRIX`, `DIRECT_LINE`). Ghost watermarks behind section headers are teal-tinted at near-zero opacity. Console output is styled. Tab title changes on blur. These are details that surface only to engineers who look — which is precisely the audience.

Density signals credibility. Sparse, airy layouts read as junior. The skill matrix has 97 nodes. The experience entries carry architecture specifics (composite partition keys, circuit-breaker libraries, exact SLO percentages). The design holds that weight without becoming unreadable.

**Key Characteristics:**
- Sharp corners throughout — `border-radius: 0` on every interactive element
- Two-font system: geometric sans display + monospace labels
- Tonal layering for depth; no drop shadows
- Section grammar: number chip + horizontal rule + tag label, repeated identically across all sections
- All headings uppercase; section labels in `ALL_CAPS_WITH_UNDERSCORES`
- Grid background at 0.4 opacity, pulsing slowly — structural, never decorative

## 2. Colors: The Control Room Palette

A near-black void with one signal-teal accent and a structural blue-navy family for borders and inactive states.

### Primary
- **Signal Teal** (`#2dd4f0`): The system's single active-state color. Used on CTAs, hover borders, active nav icons, scroll progress bar, terminal cursor pulses, and the outlined display text technique. It appears on less than 15% of any given screen. Its scarcity is load-bearing.

### Secondary
- **Relay Blue** (`#5ba4f5`): Secondary accent. Used on hover text, tooltip labels, and year/date indicators. Never competes with Signal Teal for hierarchy — always subordinate.

### Neutral
- **Deep Navy** (`#07111f`): The page background. All section body color. Tinted toward navy, never pure black.
- **Elevated Navy** (`#0c1a30`): Raised surfaces: panels, the terminal titlebar, the CommandCenter right column. One tonal step above the background.
- **Yale Blue** (`#1a3a6a`): Structural borders, dividers, inactive nav borders, inactive timeline nodes. The grid of the system.
- **Alabaster** (`#dde8f5`): Primary body text at full opacity. Used at `/90`, `/65`, `/40`, `/25` opacities for secondary text hierarchy.
- **Command White** (`#f0f8ff`): Emphasis text, heading text, CTA label on the primary button, identity card names. Never used at reduced opacity.

### Named Rules
**The Signal Rule.** Signal Teal (`#2dd4f0`) is the only color that communicates an active, selected, or actionable state. No other color carries that semantic role. Relay Blue signals secondary hierarchy, never action.

**The Opacity Ladder Rule.** Text secondary hierarchy is expressed through opacity steps on Alabaster, not through separate color values. Standard ladder: `alabaster` (full) → `/90` (body) → `/65` (secondary) → `/40` (tertiary) → `/25` (ghost labels). Do not invent new values mid-ladder.

## 3. Typography

**Display Font:** Exo 2 (geometric sans; fallback: sans-serif)
**Label / Code Font:** Fira Code, JetBrains Mono (monospace; fallback: monospace)

**Character:** Exo 2 is geometric and military — wide at heavy weights, sharp without being angular. At display scale (9.5rem) it reads like a stencil. Fira Code brings terminal credibility to every label, timestamp, and status readout. The pairing is intentional: Exo 2 says "this person ships software at scale," Fira Code says "they've lived in a terminal."

### Hierarchy
- **Display** (extrabold, 800; `clamp(3rem, 12vw, 9.5rem)`; line-height 1): Name-scale hero heading only. Stacks vertically with a line break between first and last name on sm+ breakpoints.
- **Headline** (extrabold, 800; `clamp(2.5rem, 5vw, 5rem)`; line-height 1.15): Section titles — `SERVICE LOGS`, `THE SYSTEM`, `BLUEPRINTS`. Always uppercase. The solid word in plain `command-white`; the paired word in outlined stroke (`WebkitTextStroke: '2px {accent}'`, `color: transparent`).
- **Title** (bold, 700; `1.25rem`; line-height 1.4): Experience role names and project names inside detail panels.
- **Body** (regular, 400; `1rem`; line-height 1.6; max 65–75ch): Experience highlights, project descriptions, professional summary paragraph. Always left-aligned. Max line length enforced on containers with `max-w-3xl` or `max-w-2xl`.
- **Label** (Fira Code; bold 700; `0.625rem`–`0.75rem`; `letter-spacing: 0.2em`; uppercase): Status chips, section number indicators, metadata tags, terminal readouts. Never used for body content.

### Named Rules
**The Two-Font Rule.** Every text element uses either Exo 2 or Fira Code. No system fallback fonts, no third faces. Exo 2 = structure and identity. Fira Code = signal and metadata.

**The Stroke Pair Rule.** Section headlines always have two parts: one word in solid `command-white`, one word in outlined stroke. The outlined word gets `WebkitTextStroke` + `color: transparent`. Never both words outlined; never gradient text; never `background-clip: text`.

## 4. Elevation

This system is flat by default. No decorative drop shadows on cards, panels, or buttons. Depth is expressed through tonal layering: `deep-navy` (#07111f) as base, `elevated-navy` (#0c1a30) for raised surfaces like panels and the terminal titlebar. A third level would be `graphite` (#1a3354) for deeply nested or modal surfaces, but that level is currently unused.

The one exception is a procedural **teal glow** on interactive state transitions. Timeline nodes and nav icons emit `box-shadow: 0 0 10px rgba(45, 212, 240, 0.5)` on group hover — not a decorative shadow, but a state-change signal.

### Named Rules
**The Flat-By-Default Rule.** All surfaces are flat at rest. Tonal layering (+1 step on the navy scale) communicates elevation. Glows are reserved for hover state on nodes that are explicitly interactive. Ambient decorative shadows are prohibited.

## 5. Components

### Buttons
Sharp corners at every size. Monospace label, uppercase, tracked wide.

- **Primary:** Solid Signal Teal fill (`#2dd4f0`), Deep Navy text (`#07111f`), `border: 1px solid #2dd4f0`, zero radius, `padding: 16px 32px`. Hover: `background #26bcd9` (10% darker). Arrow icon shifts `translateX(4px)` on hover.
- **Ghost:** Transparent background, Alabaster text, `border: 1px solid #1a3a6a` (Yale Blue). Hover: border shifts to Signal Teal, text shifts to Signal Teal. No fill.
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`. No style change beyond opacity.

### Cards / Containers
No rounded corners. `border: 1px solid #1a3a6a` (Yale Blue). Background either `deep-navy` or `elevated-navy` depending on depth level. Internal padding varies by section: experience entries use `p-4`, the CommandCenter panel uses `p-5 sm:p-8`.

**The No-Card-Grid Rule.** Cards are not used in grids of identical siblings. The Blueprints section uses a selector-plus-detail-panel pattern. The System section uses flat grouped rows. Identical card grids are prohibited.

### Inputs / Fields
Bottom-border only — no full rectangle. `border-bottom: 1px solid #1a3a6a`. Transparent background. Fira Code font, `text-brand-white`. Left padding `24px` to clear the `›` prompt character. Focus: bottom border shifts to Signal Teal. Disabled: `opacity: 0.4`.

### Navigation (StatusBar)
Fixed right rail, 48px wide (64px at sm+). Each nav item: 32x32px square icon box with `border: 1px solid #1a3a6a` and background `deep-navy`. Active state: Signal Teal border + 1px orange outline-offset ring. Hover: `scale(1.12)` via Framer Motion `whileHover`. Tooltip appears left of the icon on hover (sm+ only), monospace label in Signal Teal.

### Section Separator (Signature Component)
Every section opens with the same grammar: monospace section number (`01`–`04`) in a small accent chip, a full-width 1px Yale Blue horizontal rule, a right-aligned `ALL_CAPS_LABEL` in Alabaster at near-zero opacity, and a short Signal Teal accent line. This repeats without variation across all sections — the repetition IS the system.

### Timeline Entry (Signature Component)
Left border: 1px Yale Blue vertical rule. Node: 8x8px Yale Blue square at the left edge, transitions to Signal Teal on group hover with `scale(1.5)` and a teal glow. Entry body: role name (Title scale), monospace company and period (Label scale), bullet highlights (Body scale) led by a `›` prompt character in Signal Teal.

## 6. Do's and Don'ts

### Do:
- **Do** use `WebkitTextStroke` + `color: transparent` for outlined display text. The outlined word of every section headline uses this technique.
- **Do** enforce opacity ladder on Alabaster for text hierarchy: full → `/90` → `/65` → `/40` → `/25`.
- **Do** keep all interactive corners sharp (`border-radius: 0`). This system has no rounded rectangles except `rounded-full` on 6px status pulse dots.
- **Do** prefix all section labels with a zero-padded number and use `ALL_CAPS_WITH_UNDERSCORES` for machine-style identifiers.
- **Do** use Fira Code exclusively for all metadata, labels, status readouts, section tags, and timestamps.
- **Do** keep the Signal Teal accent below 15% of any given screen's surface area. Scarcity makes it a signal.

### Don't:
- **Don't** use `background-clip: text` with a gradient — this is an absolute ban. Outlined display text uses `WebkitTextStroke` instead. Gradient text is explicitly listed as a prohibited pattern.
- **Don't** use glassmorphism. No `backdrop-filter: blur()` on cards, panels, or overlays. This is a flat-layer system.
- **Don't** build a card grid with identical siblings (icon + heading + body × N). The Blueprints section uses selector+detail instead for this exact reason.
- **Don't** use the hero-metric template (big number, small label, supporting stats, gradient accent). The removed LATENCY/UPTIME/STATUS block was an example of this failure — it was stripped during the distill pass.
- **Don't** add a `border-left` wider than 1px as a decorative colored accent stripe on list items, experience entries, or callout blocks.
- **Don't** use generic glassmorphism developer portfolio patterns, soft pastel creative developer aesthetics, over-animated scrollytelling, or any layout a recruiter would describe as "cute" or "artistic."
- **Don't** introduce a third typeface. The system is Exo 2 + Fira Code. Any other face breaks the Two-Font Rule.
- **Don't** use Relay Blue (`#5ba4f5`) for action states or active indicators — that role belongs exclusively to Signal Teal.
