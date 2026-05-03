import { useEffect } from 'react'
import StatusBar from './components/StatusBar'
import Hero from './components/Hero'
import Blueprints from './components/Blueprints'
import ServiceLogs from './components/ServiceLogs'
import System from './components/System'
import CommandCenter from './components/CommandCenter'
import ParticleField from './components/ParticleField'
import SideEffects from './components/SideEffects'

const TITLE_DEFAULT = 'Sourik Dutta — Software Engineer'
const TITLE_IDLE    = '[ SYSTEM IDLE ] — Sourik Dutta'

export default function App() {
  useEffect(() => {
    // Console easter egg
    const s1 = 'background:#07111f;color:#2dd4f0;font-size:13px;font-family:monospace;padding:4px 8px;border-left:3px solid #2dd4f0'
    const s2 = 'background:#07111f;color:#dde8f5;font-size:11px;font-family:monospace;padding:2px 8px'
    const s3 = 'background:#07111f;color:#5ba4f5;font-size:11px;font-family:monospace;padding:2px 8px'
    console.log('%c SYSTEM INTRUSION DETECTED', s1)
    console.log('%c Operator: Sourik Dutta — Software Engineer', s2)
    console.log('%c Stack: React · Framer Motion · Tailwind CSS v4 · Vite', s2)
    console.log('%c Hire signal: sourik1999dutta@gmail.com', s3)
    console.log('%c https://github.com/sourikduttanyu', s3)

    // Tab title on blur/focus
    const onBlur  = () => { document.title = TITLE_IDLE }
    const onFocus = () => { document.title = TITLE_DEFAULT }
    window.addEventListener('blur',  onBlur)
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('blur',  onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-graphite-100 text-alabaster selection:bg-stormy-teal-light selection:text-graphite-100 font-sans antialiased sm:pr-16 pr-12">
      <a href="#hero" className="skip-link">Skip to content</a>

      {/* Layer 1: floating network nodes + aurora + side waves */}
      <ParticleField />
      <SideEffects />

      {/* Layer 2: grid pulse — sits above particles */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 grid-bg grid-pulse opacity-40" />
      </div>

      <StatusBar />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-12 border-l border-r border-yale-blue min-h-screen bg-graphite-100/80">
        <Hero id="hero" />
        <Blueprints id="blueprints" />
        <ServiceLogs id="logs" />
        <System id="system" />
        <CommandCenter id="contact" />
      </main>
    </div>
  )
}
