# Changelog

## [Unreleased] — 2026-05-02

### Design System
- Added `PRODUCT.md` — brand register, users, personality, anti-references, design principles
- Added `DESIGN.md` — full Google Stitch-format design spec: color tokens, typography hierarchy, elevation, 6 component patterns, named rules
- Added `DESIGN.json` — machine-readable sidecar with tonal ramps, motion tokens, self-contained component HTML/CSS
- Added `brand-orange` (#f97316) and `signal-green` (#22c55e) tokens to `@theme`

### Hero
- Professional summary updated: AI/agentic/LLM framing, production-scale distributed systems
- Scrolling tech stack columns (right panel, desktop only) with mask fade and dual-speed scroll
- Scroll-down indicator: pulse line, fades on first scroll
- Hero name: fluid `clamp(3.5rem, 12vw, 10.5rem)` — smooth viewport scaling from mobile to billboard desktop
- "Dutta." changed from gradient text (banned) to `WebkitTextStroke` outlined technique
- Primary CTA: solid Signal Teal fill always (not just on hover)
- CTA hierarchy: `gap-8` between primary and secondary group, secondaries grouped with `gap-3`
- Container pushed from `max-w-4xl` to `max-w-5xl`
- Breathing room: `mb-10` after name, `mt-16` before CTAs

### Blueprints
- Full redesign: horizontal carousel → selector rail + detail panel (`AnimatePresence mode="wait"`)
- Hover-select on project names (`onMouseEnter`)
- Added PRJ-04 JOB_TRACKER (Gmail/Ollama/LangChain pipeline)
- Standard section separator grammar added (matching ServiceLogs/System)
- Heading uses stroke-pair technique: "The" solid white, "Blueprints" outlined teal
- Removed banned 2px side-stripe border from selector buttons
- Removed banned 3px side-stripe border from detail panel
- Removed decorative `boxShadow` from TechBadge chips
- Section heading: fluid `clamp(2.25rem, 5.5vw, 4.5rem)`

### Service Logs
- Three entries: Insight Enterprises, Hanu Software (acquired), Ernst & Young
- Removed NYU Graduate Assistant entry
- Enriched highlights: Polly/Resilience4j, `Span<T>`/`ArrayPool<T>`, composite CosmosDB partition keys, Azure Chaos Studio, HttpClientFactory TIME_WAIT root cause, false positive rates
- Removed fake CLI query decoration from section header
- Added "02" ghost watermark behind section header (matches Blueprints "01")
- Section heading: fluid `clamp(2.25rem, 5.5vw, 4.5rem)`
- Experience date/location: `text-yale-blue-light` (relay blue) to separate temporal metadata from body text

### The System
- Rebuilt from 5 categories/28 nodes → 8 categories/97 nodes
- Added SRE & OBSERVABILITY category: SLO/SLA Ownership, Error Budget Management, Incident Command (DRI), Runbook Authoring, Chaos Engineering, k6, PagerDuty, Grafana, MTTD/MTTR, Toil Reduction, Pre-Escalation Alerting
- Ghost watermark changed from dark-blue 7% to teal-tinted 5.5%
- Skills animate in with staggered `whileInView` entrance
- Section heading: fluid `clamp(2.25rem, 5.5vw, 4.5rem)`

### Command Center
- Field labels distilled: DESIGNATOR→NAME, RETURN_ADDRESS→EMAIL, PAYLOAD→MESSAGE
- ONLINE status dot and label: `bg-stormy-teal-light` → `bg-signal-green` (semantic green)
- Email channel: click copies address to clipboard, icon swaps to checkmark, `COPIED` flash

### StatusBar
- Nav icons: `motion.div` with `whileHover={{ scale: 1.12 }}` + `useReducedMotion` guard
- Touch targets: `py-2` added to each `<a>` — 48px minimum tap height

### App
- Console easter egg: styled `SYSTEM INTRUSION DETECTED` with stack, email, GitHub on devtools open
- Tab title cycles: `[ SYSTEM IDLE ] — Sourik Dutta` on blur, resets on focus

### Mobile / Responsive
- CTA secondary group: `flex-wrap` to prevent overflow on small viewports
- Section separator labels: `hidden sm:inline` on decorative tag text and accent line
- Blueprints detail panel: `min-h-[360px] sm:min-h-[480px]`

### Performance / Accessibility
- Google Fonts: Exo 2 trimmed to 5 weights, Fira Code to 3 weights, dropped italic variant
- `prefers-reduced-motion` block in CSS collapses all animations
- All interactive elements have `aria-label` and `aria-current` where applicable
