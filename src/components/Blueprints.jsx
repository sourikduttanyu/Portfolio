import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  ChevronLeft, ChevronRight,
  Cpu, Globe, Database, Search, Sparkles, TrendingUp,
  Radio, Server, Cloud, GitBranch, Code2, HardDrive, Monitor,
} from 'lucide-react'

const CATEGORY = {
  compute: { color: '#f59e0b', bg: 'rgba(245,158,11,0.13)', Icon: Cpu },
  api:     { color: '#06b6d4', bg: 'rgba(6,182,212,0.13)',  Icon: Globe },
  database:{ color: '#8b5cf6', bg: 'rgba(139,92,246,0.13)', Icon: Database },
  search:  { color: '#10b981', bg: 'rgba(16,185,129,0.13)', Icon: Search },
  ai:      { color: '#ec4899', bg: 'rgba(236,72,153,0.13)', Icon: Sparkles },
  ml:      { color: '#f97316', bg: 'rgba(249,115,22,0.13)', Icon: TrendingUp },
  stream:  { color: '#3b82f6', bg: 'rgba(59,130,246,0.13)', Icon: Radio },
  infra:   { color: '#94a3b8', bg: 'rgba(148,163,184,0.13)',Icon: Server },
  cloud:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.13)', Icon: Cloud },
  algo:    { color: '#a78bfa', bg: 'rgba(167,139,250,0.13)',Icon: GitBranch },
  lang:    { color: '#fbbf24', bg: 'rgba(251,191,36,0.13)', Icon: Code2 },
  storage: { color: '#34d399', bg: 'rgba(52,211,153,0.13)', Icon: HardDrive },
  ui:      { color: '#fb923c', bg: 'rgba(251,146,60,0.13)', Icon: Monitor },
}

const projects = [
  {
    id: 'PRJ-01',
    title: 'FEAST_FLEET',
    subtitle: 'Serverless Food Delivery & Logistics Platform',
    description: 'Reduced order processing latency by 43% for 1,248 concurrent users by designing a serverless microservices architecture on AWS Lambda with decoupled, independently deployable services.',
    accent: '#f59e0b',
    accentRgb: '245,158,11',
    stats: [
      { value: '43%',   label: 'latency drop' },
      { value: '1,248', label: 'concurrent users' },
      { value: '312ms', label: 'search resp.' },
      { value: '74%',   label: 'intent res.' },
    ],
    stack: [
      { name: 'AWS Lambda',  category: 'compute' },
      { name: 'API Gateway', category: 'api' },
      { name: 'DynamoDB',    category: 'database' },
      { name: 'OpenSearch',  category: 'search' },
      { name: 'Amazon Lex',  category: 'ai' },
      { name: 'SageMaker',   category: 'ml' },
    ],
    metadata: [
      { label: 'ARCH',    value: 'Serverless Microservices' },
      { label: 'COMPUTE', value: 'AWS Lambda, API Gateway' },
      { label: 'DATA',    value: 'DynamoDB, OpenSearch' },
      { label: 'AI/ML',   value: 'Amazon Lex, SageMaker' },
    ],
  },
  {
    id: 'PRJ-02',
    title: 'ROUTE_SAVVY',
    subtitle: 'MTA Transit Telemetry & Mobility Optimizer',
    description: 'Processes 112M+ daily signals with 99.87% system stability, cutting pathfinding latency by 17% across 14,321 simulations via distributed graph algorithms.',
    accent: '#06b6d4',
    accentRgb: '6,182,212',
    stats: [
      { value: '112M+',  label: 'daily signals' },
      { value: '99.87%', label: 'uptime' },
      { value: '17%',    label: 'latency cut' },
      { value: '8,432h', label: 'continuous ops' },
    ],
    stack: [
      { name: 'Apache Kafka', category: 'stream' },
      { name: 'PySpark',      category: 'compute' },
      { name: 'Docker',       category: 'infra' },
      { name: 'AWS',          category: 'cloud' },
      { name: 'Azure',        category: 'cloud' },
      { name: 'Graph Algo',   category: 'algo' },
    ],
    metadata: [
      { label: 'STREAM', value: 'Apache Kafka, PySpark' },
      { label: 'INFRA',  value: 'Docker, Distributed Systems' },
      { label: 'SCALE',  value: '112M+ daily signals, <2 dropped' },
      { label: 'CLOUD',  value: 'AWS / Azure Multi-Cloud' },
    ],
  },
  {
    id: 'PRJ-03',
    title: 'NYU_REDDIT_PIPELINE',
    subtitle: 'AWS-Powered Social Data Engineering Pipeline',
    description: 'Ingests raw social data via PRAW into S3 and indexes meta-attributes into DynamoDB for downstream toxicity analysis dashboards across large-scale Reddit collections.',
    accent: '#a78bfa',
    accentRgb: '167,139,250',
    stats: [
      { value: 'S3',        label: 'raw storage' },
      { value: 'PRAW',      label: 'ingest source' },
      { value: 'DynamoDB',  label: 'meta-index' },
      { value: 'Streamlit', label: 'analysis UI' },
    ],
    stack: [
      { name: 'Python',    category: 'lang' },
      { name: 'PRAW API',  category: 'api' },
      { name: 'AWS S3',    category: 'storage' },
      { name: 'DynamoDB',  category: 'database' },
      { name: 'SQLite',    category: 'database' },
      { name: 'Streamlit', category: 'ui' },
    ],
    metadata: [
      { label: 'INGEST',   value: 'Python (PRAW API)' },
      { label: 'STORAGE',  value: 'AWS S3 (Raw JSON)' },
      { label: 'INDEXING', value: 'AWS DynamoDB, SQLite' },
      { label: 'UI',       value: 'Streamlit Analysis Dash' },
    ],
  },
]

function TechBadge({ name, category }) {
  const cfg = CATEGORY[category] ?? CATEGORY.infra
  const { color, bg, Icon } = cfg
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold"
      style={{
        backgroundColor: bg,
        color,
        border: `1px solid ${color}44`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.09), 0 2px 6px rgba(0,0,0,0.35), 0 0 0 1px ${color}18`,
      }}
    >
      <Icon size={11} strokeWidth={2.5} />
      {name}
    </div>
  )
}

function ProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false)
  const { accent, accentRgb } = project

  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7, delay: idx * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex-shrink-0 flex flex-col overflow-hidden"
      style={{
        width: 'min(72vw, 660px)',
        minWidth: 300,
        scrollSnapAlign: 'start',
        background: `linear-gradient(135deg, #151515 0%, rgba(${accentRgb},0.04) 100%)`,
        borderLeft: `3px solid ${accent}`,
        border: `1px solid rgba(${accentRgb},0.18)`,
        borderLeftWidth: 3,
        boxShadow: hovered
          ? `0 0 40px rgba(${accentRgb},0.12), 0 0 0 1px rgba(${accentRgb},0.25)`
          : `0 0 0 1px rgba(${accentRgb},0.1)`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Top accent gradient bar */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, ${accent}, rgba(${accentRgb},0.1), transparent)` }}
      />

      {/* Watermark project number */}
      <div
        className="absolute top-3 right-5 font-mono font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 96, color: `rgba(${accentRgb},0.05)` }}
      >
        {String(idx + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10 p-7 flex flex-col gap-5 h-full">

        {/* Header */}
        <div>
          <div
            className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
            style={{ color: accent }}
          >
            {project.id} — {project.subtitle}
          </div>
          <h3 className="font-sans text-2xl font-extrabold tracking-tight text-brand-white leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2">
          {project.stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 p-2.5"
              style={{
                background: `rgba(${accentRgb},0.07)`,
                borderTop: `1px solid rgba(${accentRgb},0.3)`,
              }}
            >
              <span className="font-mono font-bold text-xs text-brand-white leading-tight">{s.value}</span>
              <span
                className="font-mono text-[9px] uppercase tracking-widest leading-tight"
                style={{ color: `rgba(${accentRgb},0.65)` }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="font-sans text-alabaster/80 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div>
          <div className="font-mono text-[9px] text-alabaster/35 uppercase tracking-[0.2em] font-semibold mb-2.5">
            Tech Stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech, i) => (
              <TechBadge key={i} name={tech.name} category={tech.category} />
            ))}
          </div>
        </div>

        {/* Metadata revealer */}
        <motion.div
          className="mt-auto overflow-hidden"
          animate={{ height: hovered ? 148 : 40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderTop: `1px solid rgba(${accentRgb},0.2)` }}
        >
          <div className="pt-3 font-mono text-xs">
            <AnimatePresence mode="wait">
              {!hovered ? (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2"
                  style={{ color: `rgba(${accentRgb},0.45)` }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accent, opacity: 0.5 }}
                  />
                  <span className="text-[10px] uppercase tracking-widest">hover for specs</span>
                </motion.div>
              ) : (
                <motion.div
                  key="meta"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="flex flex-col gap-2"
                >
                  {project.metadata.map((m, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="min-w-[70px] font-bold text-[11px]" style={{ color: accent }}>
                        {m.label}
                      </span>
                      <span className="text-alabaster/80 text-[11px]">{m.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* Corner glow */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background: `radial-gradient(circle at bottom right, rgba(${accentRgb},0.1), transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

export default function Blueprints({ id }) {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const cardW = (card?.offsetWidth ?? 660) + 24
    el.scrollBy({ left: dir * cardW, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const cardW = (card?.offsetWidth ?? 660) + 24
    const idx = Math.round(el.scrollLeft / cardW)
    setActiveIndex(Math.max(0, Math.min(idx, projects.length - 1)))
  }

  return (
    <section id={id} aria-labelledby="blueprints-heading" className="py-32 border-b border-yale-blue relative z-10 transition-colors duration-200">

      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-yale-blue pb-8 gap-6 relative overflow-hidden">
        {/* Large watermark number */}
        <div
          className="absolute right-0 bottom-0 font-sans font-black leading-none select-none pointer-events-none"
          style={{ fontSize: 160, color: 'rgba(40,75,99,0.18)', lineHeight: 1 }}
          aria-hidden="true"
        >01</div>

        <div>
          <div className="font-mono text-[10px] text-stormy-teal-light tracking-[0.25em] uppercase mb-3">
            // SCHEMATIC_ARCHIVE — PROJ_COUNT: {projects.length}
          </div>
          <h2 id="blueprints-heading" className="text-4xl sm:text-5xl font-sans font-extrabold text-brand-white tracking-tight uppercase">
            The Blueprints
          </h2>
          <p className="font-mono text-alabaster/75 mt-4 text-sm max-w-lg leading-relaxed">
            Technical schematics & constructed architectures.
            Scroll to navigate — hover to extract metadata.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Pill indicators */}
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  backgroundColor: i === activeIndex ? p.accent : 'rgba(217,217,217,0.2)',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-2 rounded-full cursor-pointer"
                onClick={() => {
                  const el = scrollRef.current
                  const card = el?.querySelector('[data-card]')
                  const cardW = (card?.offsetWidth ?? 660) + 24
                  el?.scrollTo({ left: i * cardW, behavior: 'smooth' })
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollTo(-1)}
              aria-label="Previous project"
              className="p-2 border border-yale-blue hover:border-stormy-teal-light text-alabaster/50 hover:text-stormy-teal-light transition-colors duration-150"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollTo(1)}
              aria-label="Next project"
              className="p-2 border border-yale-blue hover:border-stormy-teal-light text-alabaster/50 hover:text-stormy-teal-light transition-colors duration-150"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="font-mono text-xs text-stormy-teal-light hidden md:block font-semibold tracking-wider">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Horizontal scroll track — bleeds to container edge */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 lg:-mx-12 lg:px-12"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
        {/* trailing space so last card can fully snap */}
        <div className="flex-shrink-0 w-4 lg:w-8" aria-hidden="true" />
      </div>

      <p className="mt-5 text-center font-mono text-[10px] text-alabaster/25 uppercase tracking-[0.2em]">
        ← scroll or use arrows →
      </p>

    </section>
  )
}
