# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## Project: sourik.dev Portfolio

**Stack:** React 19 · Vite · hand-written canvas pixel-art engine · No UI component libraries.

**Commands:**
```bash
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
npm run lint      # ESLint
```

**Architecture:**
- `src/App.jsx` → `src/components/PixelWorld.jsx` — page markup (hero, channel remote, readable project strip, beam, work scene, ship-log cards); mounts the engine in `useEffect`
- `src/pixel/world.js` — `mountWorld(root, { projects, jobs })`: all pixel art drawn into small canvases scaled nearest-neighbour. Returns a cleanup (StrictMode-safe). Sections: CRT TVs (3/4 view, knobs, channel flip, static), city sky + thunderstorm, aged-wood beam + vine + sign, work monitors (curved flagship / ultrawide / 16:9), tiny-planet scene (campfire, ship-log trail, 22-min supernova loop), Signalscope hover
- `src/data/projects.js` / `src/data/experience.js` — all content; engine reads these
- `public/clips/<slug>.mp4` — real footage; auto-replaces the procedural placeholder on that screen. Slugs: projects (`jellysynth sentinel go-pubsub veil chronos astral`), jobs (`insight hanu ey`). Encode with `scripts/encode-clip.sh`
- `src/index.css` — page styles (ported from the approved sketch)

**Design constraints:**
- Pixel-art world, Katana Zero night city (hero) → Outer Wilds-inspired tiny planet (work). Inspired by, never copying game characters/logos/UI
- Readable text stays in DOM on solid backgrounds (project strip, ship-log cards); art never carries the only copy of information
- `prefers-reduced-motion`: no float, rain, static, lightning, supernova; still frames only
- Lightning flashes stay low-intensity and under 3/s (WCAG 2.3.1)
- `DESIGN.md` describes the system; `PRODUCT.md` is outdated (old terminal aesthetic)

**Gotchas:**
- Tailwind v4 is config-file-free; tokens live in `src/index.css` via `@theme`, not `tailwind.config.js`
- `screenshot.mjs` is a Puppeteer utility script, not part of the app build
