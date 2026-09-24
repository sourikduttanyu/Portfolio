import { useEffect, useRef } from 'react'
import { mountWorld } from '../pixel/world'
import { projects } from '../data/projects'
import { experience } from '../data/experience'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

export default function PixelWorld() {
  const root = useRef(null)
  useEffect(() => mountWorld(root.current, { projects, jobs: experience }), [])

  return (
    <div ref={root}>
      <a href="#now" className="skip-link">Skip to projects</a>

      <section className="hero" aria-labelledby="name">
        <canvas id="sky" aria-hidden="true" />
        <div className="hero-inner">
          <button className="daynight" id="dayNight" type="button" aria-pressed="false" aria-label="Switch to sunrise">
            <span className="daynight-track" aria-hidden="true">
              <span className="daynight-knob"><canvas id="dayNightIcon" width="12" height="12" /></span>
            </span>
          </button>
          <h1 className="name" id="name">SOURIK DUTTA</h1>
          <p className="role">Backend &amp; distributed systems engineer <span>· MS in Computer Science, NYU</span></p>
          <p className="about">Brooklyn, NY. About two years building high-throughput, reliable backends at Insight Enterprises and Hanu Software, and owning them end to end.</p>
          <div className="links">
            <a className="btn primary" href="/Sourik_Dutta_Resume.pdf" {...ext}>Résumé</a>
            <a className="btn" href="https://github.com/sourikduttanyu" {...ext}>GitHub</a>
            <a className="btn" href="https://linkedin.com/in/sourik-dutta-71a34a17b/" {...ext}>LinkedIn</a>
            <a className="btn" href="mailto:sourik1999dutta@gmail.com">Email</a>
          </div>

          <div className="stage" id="stage" />

          <div className="remote">
            <button className="btn" id="prev" aria-label="Previous channel">◀</button>
            <div className="ch" id="chLabel" aria-live="polite">CH 01</div>
            <button className="btn" id="next" aria-label="Next channel">▶</button>
          </div>
          <p className="hint" id="hint">← → keys flip the channel · click a screen for details</p>
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
          <div className="work-inner">
            <h2 id="work-h" className="sr-only">Work experience</h2>
            <div className="lcds" id="lcds" />
          </div>
          <div className="loop-clock" id="loopClock" aria-hidden="true" />
        </div>
        <div className="log-panel">
          <div className="work-inner"><div className="jobs" id="jobs" /></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="work-inner footer-inner">
          <div>
            <p className="footer-name">SOURIK DUTTA</p>
            <p className="footer-meta">Brooklyn, NY · MS in Computer Science, NYU · Open to backend, distributed-systems and platform roles</p>
          </div>
          <nav className="links" aria-label="Contact">
            <a className="btn primary" href="/Sourik_Dutta_Resume.pdf" {...ext}>Résumé</a>
            <a className="btn" href="mailto:sourik1999dutta@gmail.com">Email</a>
            <a className="btn" href="https://linkedin.com/in/sourik-dutta-71a34a17b/" {...ext}>LinkedIn</a>
            <a className="btn" href="https://github.com/sourikduttanyu" {...ext}>GitHub</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
