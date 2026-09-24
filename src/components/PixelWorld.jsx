import { useEffect, useRef, useState } from 'react'
import { mountWorld } from '../pixel/world'
import { projects } from '../data/projects'
import { experience } from '../data/experience'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

// Level-select scene buttons. Icons are 9x9 pixel bitmaps.
const ICONS = {
  intro: ['....X....', '...XXX...', '..XXXXX..', '.XXXXXXX.', 'XXXXXXXXX', '.X.....X.', '.X.XXX.X.', '.X.X.X.X.', '.XXX.XXX.'],
  projects: ['..X...X..', '...X.X...', 'XXXXXXXXX', 'X.....XX.', 'X.....X.X', 'X.....XX.', 'X.....X.X', 'XXXXXXXXX', '.X.....X.'],
  down: ['.........', '.........', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....', '.........', '.........'],
  left: ['.........', '.....X...', '....XX...', '...XXX...', '..XXXX...', '...XXX...', '....XX...', '.....X...', '.........'],
  right: ['.........', '...X.....', '...XX....', '...XXX...', '...XXXX..', '...XXX...', '...XX....', '...X.....', '.........'],
  up: ['.........', '....X....', '...XXX...', '..XXXXX..', '.XXXXXXX.', 'XXXXXXXXX', '.........', '.........', '.........'],
  close: ['.........', '.X.....X.', '..X...X..', '...X.X...', '....X....', '...X.X...', '..X...X..', '.X.....X.', '.........'],
  details: ['.XXXXXXX.', 'X.......X', '.XXXXXXX.', '.X.....X.', '.X.XXX.X.', '.X.....X.', '.X.XX..X.', '.XXXXXXX.', 'X.......X'],
  work: ['...XXX...', '.XX...XX.', 'X..XXX..X', 'XXXXXXXXX', 'X.XXXXX.X', 'XXXXXXXXX', 'X..XXX..X', '.XX...XX.', '...XXX...'],
}
const SCENES = [
  { id: 'intro', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'work', label: 'Work' },
  { id: 'details', label: 'Experience' },
]
const sceneTop = id => {
  if (id === 'intro') return 0
  if (id === 'work') return document.getElementById('scene').getBoundingClientRect().top + window.scrollY
  if (id === 'details') return document.querySelector('.log-panel').getBoundingClientRect().top + window.scrollY - 8
  // Projects: land so the descriptions are fully on screen, with as much of the TV row above as fits.
  const y = window.scrollY, stage = document.getElementById('stage').getBoundingClientRect().top + y - 16
  const nowBottom = document.getElementById('now').getBoundingClientRect().bottom + y
  const nowTop = document.getElementById('now').getBoundingClientRect().top + y
  return Math.min(Math.max(stage, nowBottom - window.innerHeight + 24), nowTop - 8)   // too tall to fit: start at its top
}
// Camera-like glide between scenes: duration grows with distance so the journey (beam, vine,
// planets) is actually seen; eased in and out; any wheel/touch/key hands control back.
let glideRaf = 0
function glide(top) {
  cancelAnimationFrame(glideRaf)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { window.scrollTo(0, top); return }
  // Peak speed of the cubic ease is 1.5x the average; keep it near 700px/s (~12px per 60Hz frame) so text stays legible in passing.
  const from = window.scrollY, dist = top - from, dur = Math.min(4500, Math.max(1000, 1.5 * Math.abs(dist) / .7)), t0 = performance.now()
  const ease = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
  const stop = () => { cancelAnimationFrame(glideRaf); off() }
  const off = () => ['wheel', 'touchstart', 'keydown'].forEach(e => window.removeEventListener(e, stop))
  ;['wheel', 'touchstart', 'keydown'].forEach(e => window.addEventListener(e, stop, { passive: true }))
  const step = now => {
    const k = Math.min(1, (now - t0) / dur)
    window.scrollTo(0, from + dist * ease(k))
    if (k < 1) glideRaf = requestAnimationFrame(step); else off()
  }
  document.documentElement.style.scrollBehavior = 'auto'                  // our own easing, not the browser's
  glideRaf = requestAnimationFrame(step)
}
function PixelIcon({ rows }) {
  return (
    <svg viewBox="0 0 9 9" aria-hidden="true">
      {rows.flatMap((r, y) => [...r].map((c, x) => (c === 'X' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)))}
    </svg>
  )
}
function SceneNav() {
  const [current, setCurrent] = useState('intro')
  const [hint, setHint] = useState(false)
  // Invitation: a few seconds after landing, if nobody has scrolled or used the nav yet.
  useEffect(() => {
    let done = false
    const dismiss = () => { done = true; setHint(false) }
    const timer = setTimeout(() => { if (!done && window.scrollY < 40) setHint(true) }, 3000)
    const onScroll = () => { if (window.scrollY > 40) dismiss() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('keydown', dismiss)
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); window.removeEventListener('wheel', dismiss); window.removeEventListener('keydown', dismiss) }
  }, [])
  const go = id => {
    setHint(false)
    glide(sceneTop(id))
  }
  useEffect(() => {
    const onScroll = () => {
      // a scene is current once you've scrolled to it; the very top is always Intro
      const y = window.scrollY
      setCurrent(y < 10 ? 'intro' : SCENES.reduce((best, s) => (sceneTop(s.id) <= y + 60 ? s.id : best), 'intro'))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
    <button type="button" className={`scroll-cue${hint ? ' show' : ''}`} tabIndex={hint ? 0 : -1} aria-hidden={!hint}
      onClick={() => { setHint(false); const now = document.getElementById('now'); glide(now.getBoundingClientRect().top + window.scrollY - 16) }}>
      <PixelIcon rows={ICONS.down} /><span>Scroll for projects</span>
    </button>
    <nav className={`scene-nav${hint ? ' beckon' : ''}`} aria-label="Scenes">
      {SCENES.map((s, i) => (
        <button key={s.id} type="button" className="btn" aria-label={s.label} aria-current={current === s.id} style={{ '--i': i }}
          onClick={() => go(s.id)}>
          <PixelIcon rows={ICONS[s.id]} />
          <span className="nav-tip">{s.label}</span>
        </button>
      ))}
    </nav>
    </>
  )
}

export default function PixelWorld() {
  const root = useRef(null)
  useEffect(() => mountWorld(root.current, { projects, jobs: experience }), [])

  return (
    <div ref={root}>
      <a href="#now" className="skip-link">Skip to projects</a>
      <SceneNav />

      <section className="hero" aria-labelledby="name">
        <canvas id="sky" aria-hidden="true" />
        <div className="hero-inner">
          <button className="daynight" id="dayNight" type="button" aria-pressed="false" aria-label="Switch to sunrise">
            <span className="daynight-track" aria-hidden="true">
              <span className="daynight-knob"><canvas id="dayNightIcon" width="12" height="12" /></span>
            </span>
          </button>
          <h1 className="name" id="name">SOURIK DUTTA</h1>
          <div className="intro-card">
            <p className="intro-meta">Brooklyn, NY <span aria-hidden="true">·</span> MS in Computer Science, NYU</p>
            <p className="role">Full-stack software engineer</p>
            <p className="about">About two years shipping full-stack systems at Insight Enterprises and Hanu Software, from high-throughput distributed backends to real-time frontends, and owning them end to end.</p>
          </div>
          <div className="links">
            <a className="btn primary" href="Sourik_Dutta_Resume.pdf" {...ext}>Résumé</a>
            <a className="btn" href="https://github.com/sourikduttanyu" {...ext}>GitHub</a>
            <a className="btn" href="https://linkedin.com/in/sourik-dutta-71a34a17b/" {...ext}>LinkedIn</a>
            <a className="btn" href="mailto:sourik1999dutta@gmail.com">Email</a>
          </div>

          <div className="stage" id="stage" />

          <div className="remote">
            <button className="btn chan" id="prev" aria-label="Previous channel"><PixelIcon rows={ICONS.left} /></button>
            <div className="ch" id="chLabel" aria-live="polite">CH 01</div>
            <button className="btn chan" id="next" aria-label="Next channel"><PixelIcon rows={ICONS.right} /></button>
          </div>
          <p className="hint" id="hint"><PixelIcon rows={ICONS.up} />Click a screen for details</p>
        </div>
      </section>

      <section className="now" id="now" aria-label="Projects on screen" />

      <div className="beam-wrap" aria-hidden="true">
        <canvas id="beam" />
        <canvas id="sign" />
      </div>

      <section className="work" aria-labelledby="work-h">
        <div className="work-scene" id="scene">
          <canvas id="space" aria-hidden="true" />
          <p className="hint work-hint"><PixelIcon rows={ICONS.down} />Click a screen for details</p>
          <div className="work-inner">
            <h2 id="work-h" className="sr-only">Work experience</h2>
            <div className="lcds" id="lcds" />
          </div>
          <div className="loop-clock" id="loopClock" aria-hidden="true" />
          <button className="btn music" id="music" type="button" aria-pressed="false">♪ Campfire</button>
          <div className="warp" role="group" aria-label="Sky speed">
            {[1, 2, 4].map(n => (
              <button key={n} className="btn" type="button" data-speed={n} aria-pressed={n === 1}>{n}x</button>
            ))}
          </div>
        </div>
        <div className="log-panel">
          <div className="work-inner"><div className="jobs" id="jobs" /></div>
        </div>
      </section>

      <dialog className="closeup" id="closeup" aria-labelledby="cuName">
        <div className="cu-wrap">
          <div className="cu-set">
            <canvas id="cuTV" aria-hidden="true" />
            <div className="remote cu-remote">
              <button className="btn chan" id="cuPrev" type="button" aria-label="Previous project"><PixelIcon rows={ICONS.left} /></button>
              <div className="ch" id="cuCh" aria-live="polite" />
              <button className="btn chan" id="cuNext" type="button" aria-label="Next project"><PixelIcon rows={ICONS.right} /></button>
            </div>
          </div>
          <article className="cu-sheet" id="cuSheet" />
        </div>
        <button className="btn cu-close" id="cuClose" type="button" aria-label="Close"><PixelIcon rows={ICONS.close} /></button>
      </dialog>

      <footer className="site-footer">
        <div className="work-inner footer-inner">
          <div>
            <p className="footer-name">SOURIK DUTTA</p>
            <p className="footer-meta">Brooklyn, NY · MS in Computer Science, NYU · Open to full-stack, backend and platform roles</p>
          </div>
          <nav className="links" aria-label="Contact">
            <a className="btn primary" href="Sourik_Dutta_Resume.pdf" {...ext}>Résumé</a>
            <a className="btn" href="mailto:sourik1999dutta@gmail.com">Email</a>
            <a className="btn" href="https://linkedin.com/in/sourik-dutta-71a34a17b/" {...ext}>LinkedIn</a>
            <a className="btn" href="https://github.com/sourikduttanyu" {...ext}>GitHub</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
