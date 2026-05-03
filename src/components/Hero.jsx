import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useState, useEffect } from 'react'

const ease = [0.16, 1, 0.3, 1]

const TECH_COLS = [
  [
    'Python', 'LangChain', 'Apache Kafka', 'Azure AKS', 'Go',
    'Kubernetes', 'RAG Pipelines', 'Redis', 'Terraform', 'Spring Boot 3',
    'PySpark', 'Docker', '.NET 7', 'OpenAI API', 'Grafana', 'k6',
  ],
  [
    'TypeScript', 'Ollama', 'Azure OpenAI', 'SLO / SLA', 'React 18',
    'Polly', 'GitHub Actions', 'DynamoDB', 'Spark SQL', 'Semgrep',
    'Angular 15', 'CosmosDB', 'PagerDuty', 'Resilience4j', 'Databricks', 'Helm',
  ],
]

function ScrollColumn({ terms, duration, dimmer }) {
  const doubled = [...terms, ...terms]
  return (
    <div className="overflow-hidden flex-1" style={{ height: '100%' }}>
      <motion.div
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        className="flex flex-col gap-5"
      >
        {doubled.map((term, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-widest whitespace-nowrap uppercase"
            style={{
              color: dimmer
                ? `rgba(180,220,230,${i % 3 === 0 ? 0.26 : 0.14})`
                : `rgba(180,220,230,${i % 3 === 0 ? 0.40 : 0.22})`,
            }}
          >
            {term}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero({ id }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setScrolled(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id={id} aria-labelledby="hero-heading" className="min-h-screen flex flex-col justify-center py-14 sm:py-20 border-b border-yale-blue relative z-10 overflow-hidden">

      {/* Scrolling tech columns — right side, desktop only */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:flex gap-6 pointer-events-none"
        style={{
          width: '28%',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
        aria-hidden="true"
      >
        <ScrollColumn terms={TECH_COLS[0]} duration={22} dimmer={false} />
        <ScrollColumn terms={TECH_COLS[1]} duration={31} dimmer={true} />
      </div>

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
          <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-yale-blue" />
          <h1 id="hero-heading" className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-sans font-extrabold leading-none tracking-tight text-brand-white mb-6">
            Sourik <br className="hidden sm:block" />
            <span style={{ WebkitTextStroke: '3px #2dd4f0', color: 'transparent' }}>
              Dutta.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.9, delay: 0.8 }}
          className="relative max-w-2xl"
        >
          <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-stormy-teal-light" />
          <p className="font-mono text-alabaster/90 text-base leading-relaxed pl-4 sm:pl-0">
            Software Engineer with 2+ years shipping distributed backend systems at production scale —
            LLM-as-a-service platforms, AIOps telemetry pipelines, and agentic RAG architectures on
            Azure and AWS. Focused on reliability, observability, and AI-native system design.
            MS Computer Science, New York University.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease, duration: 0.9, delay: 1.1 }}
          className="mt-12 flex items-center gap-8 flex-wrap"
        >
          <a href="#blueprints" aria-label="View my projects" className="group inline-flex items-center justify-center px-8 py-4 bg-stormy-teal-light border border-stormy-teal-light text-graphite-100 hover:bg-stormy-teal-light/85 transition-colors duration-200 ease-out">
            <span className="font-mono text-sm tracking-wider font-semibold">
              DEPLOY_BLUEPRINTS
            </span>
            <svg
              className="ml-3 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/sourikduttanyu" target="_blank" rel="noopener noreferrer" aria-label="View GitHub profile (opens in new tab)" className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-yale-blue hover:border-stormy-teal-light transition-colors duration-200 ease-out">
              <span className="font-mono text-sm tracking-wider text-alabaster group-hover:text-stormy-teal-light transition-colors duration-200">
                [ GITHUB_NODE ]
              </span>
            </a>
            <a href="https://linkedin.com/in/sourik-dutta-71a34a17b/" target="_blank" rel="noopener noreferrer" aria-label="View LinkedIn profile (opens in new tab)" className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-yale-blue hover:border-stormy-teal-light transition-colors duration-200 ease-out">
              <span className="font-mono text-sm tracking-wider text-alabaster group-hover:text-stormy-teal-light transition-colors duration-200">
                [ LINKEDIN_NODE ]
              </span>
            </a>
          </div>
        </motion.div>


      </div>

      {/* Scroll indicator — fades on first scroll */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="absolute bottom-10 left-0 flex flex-col items-center gap-2 pointer-events-none"
            aria-hidden="true"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-alabaster/25">
              scroll
            </span>
            <div className="relative w-px h-10 bg-yale-blue/30 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-stormy-teal-light"
                animate={{ y: ['-100%', '400%'] }}
                transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
                style={{ height: '40%' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
