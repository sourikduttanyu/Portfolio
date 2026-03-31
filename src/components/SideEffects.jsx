import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'

const PATH_H = 3000

// All dash+gap periods = 300 → offset of -3000 = 10 full periods = seamless loop
const LEFT_WAVES = [
  { amp: 22, freq: 2.5, phase: 0,   dash: 120, gap: 180, dur: 18, color: '#539a9e', opacity: 0.65, sw: 2.0 },
  { amp: 14, freq: 4.0, phase: 1.2, dash: 90,  gap: 210, dur: 25, color: '#6099be', opacity: 0.45, sw: 1.4 },
  { amp: 30, freq: 1.8, phase: 2.5, dash: 150, gap: 150, dur: 34, color: '#539a9e', opacity: 0.28, sw: 2.5 },
  { amp: 10, freq: 6.0, phase: 0.7, dash: 70,  gap: 230, dur: 12, color: '#a78bfa', opacity: 0.42, sw: 1.0 },
  { amp: 18, freq: 3.2, phase: 3.8, dash: 110, gap: 190, dur: 28, color: '#6099be', opacity: 0.22, sw: 1.6 },
]

const RIGHT_WAVES = [
  { amp: 18, freq: 3.0, phase: Math.PI,       dash: 120, gap: 180, dur: 20, color: '#539a9e', opacity: 0.55, sw: 1.8 },
  { amp: 12, freq: 4.5, phase: Math.PI + 0.8, dash: 90,  gap: 210, dur: 27, color: '#6099be', opacity: 0.38, sw: 1.2 },
  { amp: 24, freq: 2.0, phase: Math.PI + 2.0, dash: 150, gap: 150, dur: 36, color: '#a78bfa', opacity: 0.28, sw: 2.2 },
  { amp: 8,  freq: 7.0, phase: Math.PI + 1.1, dash: 70,  gap: 230, dur: 13, color: '#539a9e', opacity: 0.34, sw: 1.0 },
]

function genPath(cx, amp, freq, phase) {
  let d = ''
  const steps = 300
  for (let i = 0; i <= steps; i++) {
    const y = (i / steps) * PATH_H
    const x = cx + amp * Math.sin((freq * 2 * Math.PI * y) / PATH_H + phase)
    d += (i === 0 ? 'M' : ' L') + x.toFixed(2) + ',' + y.toFixed(2)
  }
  return d
}

export default function SideEffects() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  const leftPaths  = useMemo(() => LEFT_WAVES.map(w  => genPath(65,  w.amp, w.freq, w.phase)), [])
  const rightPaths = useMemo(() => RIGHT_WAVES.map(w => genPath(55, w.amp, w.freq, w.phase)), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      leftRef.current.querySelectorAll('path').forEach((path, i) => {
        gsap.to(path, {
          strokeDashoffset: -PATH_H,
          duration: LEFT_WAVES[i].dur,
          repeat: -1,
          ease: 'none',
        })
      })
      rightRef.current.querySelectorAll('path').forEach((path, i) => {
        gsap.to(path, {
          strokeDashoffset: -PATH_H,
          duration: RIGHT_WAVES[i].dur,
          repeat: -1,
          ease: 'none',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Aurora blobs ─────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Left column — blobs positioned ~70% in-frame */}
        <div style={{
          position: 'fixed', left: -30, top: '6%',
          width: 460, height: 520,
          background: 'radial-gradient(circle, rgba(83,154,158,0.45) 0%, transparent 65%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          animation: 'aurora-a 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', left: -20, top: '44%',
          width: 360, height: 420,
          background: 'radial-gradient(circle, rgba(96,153,190,0.38) 0%, transparent 65%)',
          filter: 'blur(35px)',
          borderRadius: '50%',
          animation: 'aurora-b 28s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', left: -25, top: '76%',
          width: 400, height: 360,
          background: 'radial-gradient(circle, rgba(83,154,158,0.32) 0%, transparent 65%)',
          filter: 'blur(38px)',
          borderRadius: '50%',
          animation: 'aurora-c 35s ease-in-out infinite',
        }} />

        {/* Right column */}
        <div style={{
          position: 'fixed', right: 30, top: '15%',
          width: 420, height: 480,
          background: 'radial-gradient(circle, rgba(96,153,190,0.40) 0%, transparent 65%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          animation: 'aurora-b 24s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'fixed', right: 25, top: '58%',
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(83,154,158,0.35) 0%, transparent 65%)',
          filter: 'blur(36px)',
          borderRadius: '50%',
          animation: 'aurora-a 30s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'fixed', right: 35, top: '82%',
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 65%)',
          filter: 'blur(38px)',
          borderRadius: '50%',
          animation: 'aurora-c 22s ease-in-out infinite',
        }} />
      </div>

      {/* ── Left SVG wave strip ──────────────────────────────── */}
      <div
        ref={leftRef}
        className="fixed top-0 left-0 pointer-events-none overflow-hidden"
        style={{ width: 130, height: '100vh', zIndex: 3 }}
        aria-hidden="true"
      >
        <svg
          width="130"
          height={PATH_H}
          viewBox="0 0 130 3000"
          style={{ position: 'absolute', top: 0 }}
        >
          <defs>
            <filter id="glow-left" x="-50%" y="-10%" width="200%" height="120%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {LEFT_WAVES.map((w, i) => (
            <path
              key={i}
              d={leftPaths[i]}
              fill="none"
              stroke={w.color}
              strokeWidth={w.sw}
              strokeOpacity={w.opacity}
              strokeDasharray={`${w.dash} ${w.gap}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              filter="url(#glow-left)"
            />
          ))}
        </svg>
      </div>

      {/* ── Right SVG wave strip ─────────────────────────────── */}
      <div
        ref={rightRef}
        className="fixed top-0 pointer-events-none overflow-hidden"
        style={{ width: 110, height: '100vh', right: 64, zIndex: 3 }}
        aria-hidden="true"
      >
        <svg
          width="110"
          height={PATH_H}
          viewBox="0 0 110 3000"
          style={{ position: 'absolute', top: 0 }}
        >
          <defs>
            <filter id="glow-right" x="-50%" y="-10%" width="200%" height="120%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {RIGHT_WAVES.map((w, i) => (
            <path
              key={i}
              d={rightPaths[i]}
              fill="none"
              stroke={w.color}
              strokeWidth={w.sw}
              strokeOpacity={w.opacity}
              strokeDasharray={`${w.dash} ${w.gap}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              filter="url(#glow-right)"
            />
          ))}
        </svg>
      </div>
    </>
  )
}
