import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
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
  algo:    { color: '#14b8a6', bg: 'rgba(20,184,166,0.13)', Icon: GitBranch },
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
  {
    id: 'PRJ-04',
    title: 'JOB_TRACKER',
    subtitle: 'Gmail Job Classification & Analytics Pipeline',
    description: 'Auto-scans Gmail inbox, classifies job application emails into Applied / Interview / Offer / Rejected / Unknown via regex with an optional local LLM fallback (Ollama), deduplicates on Message ID, exports colour-coded jobs.xlsx, and serves an interactive Streamlit dashboard — zero manual entry.',
    accent: '#f43f5e',
    accentRgb: '244,63,94',
    stats: [
      { value: '95%+',  label: 'regex accuracy' },
      { value: '0',     label: 'manual entry' },
      { value: '5',     label: 'status classes' },
      { value: 'local', label: 'LLM inference' },
    ],
    stack: [
      { name: 'Python',            category: 'lang' },
      { name: 'Gmail API',         category: 'api' },
      { name: 'Ollama / LLaMA',    category: 'ai' },
      { name: 'Streamlit',         category: 'ui' },
      { name: 'pandas / openpyxl', category: 'storage' },
      { name: 'GitHub Actions',    category: 'infra' },
    ],
    metadata: [
      { label: 'INGEST',    value: 'Gmail API (OAuth 2.0)' },
      { label: 'CLASSIFY',  value: 'Regex-first + Ollama LLM fallback' },
      { label: 'OUTPUT',    value: 'pandas + openpyxl (jobs.xlsx)' },
      { label: 'DASHBOARD', value: 'Streamlit — filters, charts, editable' },
    ],
    github: 'https://github.com/sourikduttanyu/gmail-job-tracker-ollama',
  },
  {
    id: 'PRJ-05',
    title: 'GO_PUBSUB_BROKER',
    subtitle: 'Lightweight In-Memory Pub/Sub Engine',
    description: 'Built a Go pub/sub broker from scratch mirroring Google Cloud Pub/Sub semantics — at-least-once delivery, per-subscription goroutine fan-out, configurable retry budget, dead-letter queue, and graceful shutdown. Designed so handler panics can\'t crash the delivery loop.',
    accent: '#22c55e',
    accentRgb: '34,197,94',
    stats: [
      { value: '256',        label: 'inbox buffer' },
      { value: 'at-least-1', label: 'delivery guarantee' },
      { value: 'DLQ',        label: 'dead-letter queue' },
      { value: 'O(subs)',    label: 'goroutine model' },
    ],
    stack: [
      { name: 'Go',          category: 'lang' },
      { name: 'Goroutines',  category: 'compute' },
      { name: 'Channels',    category: 'stream' },
      { name: 'RWMutex',     category: 'infra' },
      { name: 'Dead-Letter', category: 'database' },
      { name: 'TUI / CLI',   category: 'ui' },
    ],
    metadata: [
      { label: 'ARCH',     value: 'In-Memory Pub/Sub Broker' },
      { label: 'CONCURR',  value: 'Goroutine fan-out, RWMutex' },
      { label: 'DELIVERY', value: 'At-least-once, Retry + DLQ' },
      { label: 'INSPIRED', value: 'Google Cloud Pub/Sub' },
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

function ProjectDetail({ project }) {
  const { accent, accentRgb } = project
  return (
    <div
      className="relative flex flex-col overflow-hidden h-full"
      style={{
        background: `linear-gradient(135deg, #151515 0%, rgba(${accentRgb},0.05) 100%)`,
        border: `1px solid rgba(${accentRgb},0.18)`,
        borderLeftWidth: 3,
        borderLeftColor: accent,
        borderLeftStyle: 'solid',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, ${accent}, rgba(${accentRgb},0.1), transparent)` }}
      />

      {/* Watermark */}
      <div
        className="absolute top-2 right-6 font-mono font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 120, color: `rgba(${accentRgb},0.04)` }}
        aria-hidden="true"
      >
        {project.id.replace('PRJ-0', '')}
      </div>

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5 h-full">

        {/* Header */}
        <div>
          <div
            className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
            style={{ color: accent }}
          >
            {project.id} — {project.subtitle}
          </div>
          <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-white leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {project.stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 p-3"
              style={{
                background: `rgba(${accentRgb},0.07)`,
                borderTop: `1px solid rgba(${accentRgb},0.3)`,
              }}
            >
              <span className="font-mono font-bold text-sm text-brand-white leading-tight">{s.value}</span>
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
        <p className="font-sans text-alabaster/90 text-sm leading-relaxed">
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

        {/* Metadata — always visible */}
        <div
          className="mt-auto pt-4"
          style={{ borderTop: `1px solid rgba(${accentRgb},0.2)` }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs">
            {project.metadata.map((m, i) => (
              <div key={i} className="flex gap-3">
                <span className="min-w-[70px] font-bold text-[11px]" style={{ color: accent }}>
                  {m.label}
                </span>
                <span className="text-alabaster/80 text-[11px]">{m.value}</span>
              </div>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 font-mono text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100 opacity-50"
              style={{ color: accent }}
            >
              ↗ View on GitHub
            </a>
          )}
        </div>

      </div>

      {/* Corner glow */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
        style={{ background: `radial-gradient(circle at bottom right, rgba(${accentRgb},0.1), transparent 70%)` }}
      />
    </div>
  )
}

export default function Blueprints({ id }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id={id} aria-labelledby="blueprints-heading" className="py-16 sm:py-24 lg:py-32 border-b border-yale-blue relative z-10">

      {/* Section Header */}
      <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-yale-blue pb-6 sm:pb-8 gap-4 sm:gap-6 relative overflow-hidden">
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
          <p className="font-mono text-alabaster/85 mt-4 text-sm max-w-lg leading-relaxed">
            Technical schematics & constructed architectures. Select to inspect.
          </p>
        </div>

        <div className="font-mono text-xs text-stormy-teal-light hidden md:block font-semibold tracking-wider text-right">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>
      </div>

      {/* Selector + Detail */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* Left: project selector rail */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible pb-1 lg:pb-0 lg:w-52 flex-shrink-0">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className="group flex-shrink-0 lg:flex-shrink flex flex-col text-left px-3 py-3 transition-colors duration-150 relative"
              style={{
                borderLeft: `2px solid ${i === activeIndex ? p.accent : 'rgba(255,255,255,0.08)'}`,
                background: i === activeIndex ? `rgba(${p.accentRgb},0.07)` : 'transparent',
                minWidth: 130,
              }}
            >
              <span
                className="font-mono text-[9px] tracking-[0.2em] uppercase transition-opacity"
                style={{ color: p.accent, opacity: i === activeIndex ? 1 : 0.45 }}
              >
                {p.id}
              </span>
              <span
                className={`font-mono text-xs font-bold mt-0.5 transition-colors ${
                  i === activeIndex ? 'text-brand-white' : 'text-alabaster/40 group-hover:text-alabaster/65'
                }`}
              >
                {p.title}
              </span>
            </button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="flex-1" style={{ minHeight: 480 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectDetail project={projects[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  )
}
