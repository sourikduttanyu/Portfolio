import StatusBar from './components/StatusBar'
import Hero from './components/Hero'
import Blueprints from './components/Blueprints'
import ServiceLogs from './components/ServiceLogs'
import System from './components/System'
import CommandCenter from './components/CommandCenter'
import ParticleField from './components/ParticleField'
import SideEffects from './components/SideEffects'

export default function App() {
  return (
    <div className="relative min-h-screen bg-graphite-100 text-alabaster selection:bg-stormy-teal-light selection:text-graphite-100 font-sans antialiased sm:pr-16 pr-12">

      {/* Layer 1: floating network nodes + aurora + side waves */}
      <ParticleField />
      <SideEffects />

      {/* Layer 2: grid pulse — sits above particles */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 grid-bg grid-pulse opacity-40" />
      </div>

      <StatusBar />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-12 border-l border-r border-yale-blue min-h-screen bg-graphite-100/90">
        <Hero id="hero" />
        <Blueprints id="blueprints" />
        <ServiceLogs id="logs" />
        <System id="system" />
        <CommandCenter id="contact" />
      </main>
    </div>
  )
}
