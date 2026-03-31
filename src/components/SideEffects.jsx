import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'

// SVG path height — larger than any viewport, provides path length for dashes to flow through
const PATH_H = 3000

// All dash+gap periods = 300, so offset of -3000 = exactly 10 full periods → seamless loop
const LEFT_WAVES = [
  { amp: 20, freq: 2.5, phase: 0,        dash: 100, gap: 200, dur: 18, color: '#539a9e', opacity: 0.32, sw: 1.0 },
  { amp: 13, freq: 4.0, phase: 1.2,      dash: 80,  gap: 220, dur: 25, color: '#6099be', opacity: 0.22, sw: 0.7 },
  { amp: 27, freq: 1.8, phase: 2.5,      dash: 120, gap: 180, dur: 34, color: '#539a9e', opacity: 0.13, sw: 1.5 },
  { amp: 9,  freq: 6.0, phase: 0.7,      dash: 60,  gap: 240, dur: 12, color: '#a78bfa', opacity: 0.20, sw: 0.5 },
  { amp: 17, freq: 3.2, phase: 3.8,      dash: 140, gap: 160, dur: 28, color: '#6099be', opacity: 0.10, sw: 0.8 },
]

const RIGHT_WAVES = [
  { amp: 16, freq: 3.0, phase: Math.PI,       dash: 100, gap: 200, dur: 20, color: '#539a9e', opacity: 0.26, sw: 0.9 },
  { amp: 11, freq: 4.5, phase: Math.PI + 0.8, dash: 80,  gap: 220, dur: 27, color: '#6099be', opacity: 0.18, sw: 0.6 },
  { amp: 21, freq: 2.0, phase: Math.PI + 2.0, dash: 120, gap: 180, dur: 36, color: '#a78bfa', opacity: 0.13, sw: 1.3 },
  { amp: 7,  freq: 7.0, phase: Math.PI + 1.1, dash: 60,  gap: 240, dur: 13, color: '#539a9e', opacity: 0.16, sw: 0.5 },
]

// Generate vertical sine wave SVG path, cx = horizontal center of the strip
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

  const leftPaths  = useMemo(() => LEFT_WAVES.map(w  => genPath(40, w.amp,  w.freq, w.phase)), [])
  const rightPaths = useMemo(() => RIGHT_WAVES.map(w => genPath(35, w.amp, w.freq, w.phase)), [])

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
        {/* Left column */}
        <div style={{
          position: 'fixed', left: -90, top: '8%',
          width: 300, height: 440,
          background: 'radial-gradient(circle, rgba(83,154,158,0.20) 0%, transparent 70%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          animation: 'aurora-a 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', left: -60, top: '48%',
          width: 220, height: 340,
          background: 'radial-gradient(circle, rgba(96,153,190,0.15) 0%, transparent 70%)',
          filter: 'blur(55px)',
          borderRadius: '50%',
          animation: 'aurora-b 28s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', left: -50, top: '78%',
          width: 260, height: 300,
          background: 'radial-gradient(circle, rgba(83,154,158,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          animation: 'aurora-c 35s ease-in-out infinite',
        }} />

        {/* Right column */}
        <div style={{
          position: 'fixed', right: 60, top: '18%',
          width: 240, height: 380,
          background: 'radial-gradient(circle, rgba(96,153,190,0.17) 0%, transparent 70%)',
          filter: 'blur(65px)',
          borderRadius: '50%',
          animation: 'aurora-b 24s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'fixed', right: 50, top: '62%',
          width: 200, height: 300,
          background: 'radial-gradient(circle, rgba(83,154,158,0.13) 0%, transparent 70%)',
          filter: 'blur(55px)',
          borderRadius: '50%',
          animation: 'aurora-a 30s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'fixed', right: 70, top: '85%',
          width: 180, height: 260,
          background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          animation: 'aurora-c 22s ease-in-out infinite',
        }} />
      </div>

      {/* ── Left SVG wave strip ──────────────────────────────── */}
      <div
        ref={leftRef}
        className="fixed top-0 left-0 pointer-events-none overflow-hidden"
        style={{ width: 80, height: '100vh', zIndex: 3 }}
        aria-hidden="true"
      >
        <svg
          width="80"
          height={PATH_H}
          viewBox={`0 0 80 ${PATH_H}`}
          style={{ position: 'absolute', top: 0 }}
        >
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
            />
          ))}
        </svg>
      </div>

      {/* ── Right SVG wave strip ─────────────────────────────── */}
      <div
        ref={rightRef}
        className="fixed top-0 pointer-events-none overflow-hidden"
        style={{ width: 70, height: '100vh', right: 64, zIndex: 3 }}
        aria-hidden="true"
      >
        <svg
          width="70"
          height={PATH_H}
          viewBox={`0 0 70 ${PATH_H}`}
          style={{ position: 'absolute', top: 0 }}
        >
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
            />
          ))}
        </svg>
      </div>
    </>
  )
}
