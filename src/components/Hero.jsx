import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

// easeOutExpo — fast start, very smooth, organic settle
const ease = [0.16, 1, 0.3, 1]

export default function Hero({ id }) {
  return (
    <section id={id} aria-labelledby="hero-heading" className="min-h-screen flex flex-col justify-center py-20 border-b border-yale-blue relative z-10">
      <div className="max-w-4xl">

        {/* System Status Label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center justify-center bg-stormy-teal-light w-6 h-6 rounded-none">
            <Terminal size={12} className="text-graphite-100" />
          </div>
          <span className="font-mono text-xs tracking-widest text-stormy-teal-light uppercase font-semibold">
            System Online / Initializing Profile
          </span>
        </motion.div>

        {/* Main Identity Statement */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease, duration: 1.0, delay: 0.5 }}
          className="relative"
        >
          {/* Decorative architectural line */}
          <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-yale-blue" />

          <h1 id="hero-heading" className="text-5xl sm:text-7xl md:text-8xl font-sans font-extrabold leading-none tracking-tight text-brand-white mb-6">
            Sourik <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stormy-teal-light to-yale-blue-light">
              Dutta.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.9, delay: 0.8 }}
          className="relative max-w-2xl"
        >
          <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-stormy-teal-light" />
          <p className="font-mono text-alabaster/85 text-sm sm:text-base leading-relaxed pl-4 sm:pl-0">
            Software Engineer with 2+ years of experience building high-throughput distributed
            backend services. Strong focus on performance, telemetry, and reliability across cloud
            environments (Azure, AWS). MS in Computer Science at New York University.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.9, delay: 1.1 }}
          className="mt-12 flex gap-4 flex-wrap"
        >
          <a href="#blueprints" aria-label="View my projects" className="group relative inline-flex items-center justify-center px-8 py-4 bg-yale-blue/20 border sharp-border hover:border-stormy-teal-light transition-colors duration-200 ease-out overflow-hidden">
            <span className="absolute inset-0 w-full h-full bg-stormy-teal-light -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
            <span className="relative z-10 font-mono text-sm tracking-wider text-brand-white group-hover:text-graphite-100 transition-colors duration-200">
              DEPLOY_BLUEPRINTS
            </span>
            <svg
              className="relative z-10 ml-3 w-4 h-4 text-brand-white group-hover:text-graphite-100 transform -rotate-45 group-hover:rotate-0 transition-all duration-200 ease-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a href="https://github.com/sourikduttanyu" target="_blank" rel="noopener noreferrer" aria-label="View GitHub profile (opens in new tab)" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-yale-blue hover:border-stormy-teal-light transition-colors duration-200 ease-out">
            <span className="font-mono text-sm tracking-wider text-alabaster group-hover:text-stormy-teal-light transition-colors duration-200">
              [ GITHUB_NODE ]
            </span>
          </a>
          <a href="https://linkedin.com/in/sourik-dutta-71a34a17b/" target="_blank" rel="noopener noreferrer" aria-label="View LinkedIn profile (opens in new tab)" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-yale-blue hover:border-stormy-teal-light transition-colors duration-200 ease-out">
            <span className="font-mono text-sm tracking-wider text-alabaster group-hover:text-stormy-teal-light transition-colors duration-200">
              [ LINKEDIN_NODE ]
            </span>
          </a>
        </motion.div>

        {/* Metrics block */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ ease, duration: 0.8, delay: 1.4 }}
          style={{ originY: 1 }}
          className="absolute bottom-10 right-0 hidden lg:flex gap-4 border-l border-yale-blue pl-4"
        >
          <div className="flex flex-col">
            <span className="font-mono text-xs text-alabaster/50 mb-1 tracking-widest uppercase">LATENCY</span>
            <span className="font-mono text-sm font-semibold text-brand-white">12ms</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-alabaster/50 mb-1 tracking-widest uppercase">UPTIME</span>
            <span className="font-mono text-sm font-semibold text-stormy-teal-light">99.9%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-alabaster/50 mb-1 tracking-widest uppercase">STATUS</span>
            <span className="font-mono text-sm font-semibold text-brand-white">O/K</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
