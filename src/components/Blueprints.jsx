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
    id: 'PRJ-08',
    title: 'LUMISYNTH',
    subtitle: 'Browser-Based Real-Time Video Instrument',
    description: 'Real-time browser video instrument built with vanilla JavaScript, raw WebGL2, Canvas 2D, Vite, Playwright, and Cloudflare Pages Functions. It takes a local video, image, or webcam feed, detects visual regions in real time, tracks them across frames with stable identities, runs a GPU shader pipeline, and draws expressive tracking overlays on top. The architecture exposes the browser platform directly: CPU blob detection, Kalman + One Euro smoothing, a shared WebGL2 context with ping-pong FBOs, STRUCTURE effects, a chained COLOR rack, Canvas overlays, export gating, local internal auth fallback, Cloudflare API scaffolding, smoke tests, linting, and deployment setup.',
    accent: '#2dd4f0',
    accentRgb: '45,212,240',
    stats: [
      { value: 'WebGL2', label: 'render core' },
      { value: '7',      label: 'track modes' },
      { value: '3',      label: 'color slots' },
      { value: 'D1',     label: 'auth scaffold' },
    ],
    stack: [
      { name: 'JavaScript',  category: 'lang' },
      { name: 'WebGL2',      category: 'ui' },
      { name: 'Canvas 2D',   category: 'ui' },
      { name: 'Vite',        category: 'ui' },
      { name: 'Playwright',  category: 'infra' },
      { name: 'Cloudflare',  category: 'cloud' },
    ],
    metadata: [
      { label: 'PIPELINE', value: 'Blob detection → tracking → GL shader chain → Canvas overlays' },
      { label: 'MEDIA',    value: 'Local video, image, or webcam; media stays in browser' },
      { label: 'TRACK',    value: 'Motion, luma, dark, saturation, edge, sharp, color-key' },
      { label: 'EXPORT',   value: 'PNG snapshot + MediaRecorder clip with gated flows' },
    ],
    github: 'https://github.com/sourikduttanyu/LumiSynth',
  },
  {
    id: 'PRJ-06',
    title: 'SENTINEL',
    subtitle: 'Agentic Multi-Agent PR Review System',
    description: 'Multi-agent PR review system combining Semgrep static analysis with Claude LLM contextual reasoning — three specialized agents (Security, Docs, Performance) run in parallel via a LangGraph StateGraph, writing to isolated state keys to avoid collision. A SupervisorAgent deduplicates and severity-ranks findings before the graph pauses for human approval (HITL interrupt_before=["post_comment"], checkpointed to SQLite) — nothing posts to GitHub without a human gate. On a real PR, Claude caught an RCE Semgrep structurally cannot detect: a debug route still registered live, where the vulnerability was in the gap between what the comment said and what the code did.',
    accent: '#d946ef',
    accentRgb: '217,70,239',
    stats: [
      { value: '3',       label: 'parallel agents' },
      { value: '$0.016',  label: 'cost per review' },
      { value: '15.13s',  label: 'peak latency' },
      { value: 'HITL',    label: 'human-in-loop' },
    ],
    stack: [
      { name: 'LangGraph',    category: 'ai' },
      { name: 'Claude Haiku', category: 'ai' },
      { name: 'Semgrep',      category: 'search' },
      { name: 'FastAPI',      category: 'api' },
      { name: 'LangSmith',    category: 'ai' },
      { name: 'Prometheus',   category: 'infra' },
    ],
    metadata: [
      { label: 'ARCH',     value: 'LangGraph StateGraph + SqliteSaver' },
      { label: 'PIPELINE', value: 'Semgrep → Claude → SupervisorAgent' },
      { label: 'PATTERN',  value: 'Parallel agents + HITL interrupt' },
      { label: 'INSPIRED', value: 'GitHub Code Review Automation' },
    ],
    github: 'https://github.com/sourikduttanyu/Sentinel',
  },
  {
    id: 'PRJ-07',
    title: 'RETAIN_IQ',
    subtitle: 'XGBoost Employee Attrition Prediction + RAG',
    description: 'Predicts employee attrition probability with XGBoost (F1 0.511 on minority class), threshold-calibrated via isotonic regression at 0.368 after 50-trial Optuna HPO. Each prediction is grounded by three RAG-retrieved historical employees via ChromaDB (cosine HNSW) and explained by a local Ollama llama3.2 LLM — zero employee data leaves the system. SMOTE + scale_pos_weight lifted minority-class F1 from 0.35 to 0.511. Fairness audited across gender, age, and marital status via fairlearn MetricFrame.',
    accent: '#6366f1',
    accentRgb: '99,102,241',
    stats: [
      { value: '85.7%',  label: 'accuracy' },
      { value: '0.789',  label: 'ROC-AUC' },
      { value: '0.511',  label: 'F1 minority' },
      { value: '136',    label: 'features' },
    ],
    stack: [
      { name: 'XGBoost',         category: 'ml' },
      { name: 'FastAPI',         category: 'api' },
      { name: 'SHAP',            category: 'algo' },
      { name: 'ChromaDB',        category: 'database' },
      { name: 'Ollama llama3.2', category: 'ai' },
      { name: 'Docker',          category: 'infra' },
    ],
    metadata: [
      { label: 'MODEL',    value: 'XGBoost + isotonic calibration (threshold 0.368)' },
      { label: 'RAG',      value: 'sentence-transformers → ChromaDB (cosine, HNSW)' },
      { label: 'LLM',      value: 'Ollama llama3.2 — local, no API egress' },
      { label: 'FAIRNESS', value: 'fairlearn MetricFrame (gender, age, marital)' },
    ],
    github: 'https://github.com/sourikduttanyu/retainiq',
  },
  {
    id: 'PRJ-01',
    title: 'FEAST_FLEET',
    subtitle: 'Serverless Food Delivery & Logistics Platform',
    description: '24-Lambda serverless food delivery platform built entirely on AWS with deliberate architectural decisions under ambiguity. Order processing uses SQS async decoupling — placement Lambda validates and enqueues, a separate consumer handles fulfillment — so downstream failures (SES, DynamoDB) are invisible to the user at placement time. Restaurant search uses OpenSearch with dedicated indexes (restaurants_index, menu_items_index) instead of DynamoDB scans, chosen for the query pattern: partial matching, cuisine filtering, relevance ranking. 43% latency reduction for 1,248 concurrent users; 74% NLP intent resolution via Amazon Lex.',
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
      { name: 'LangChain',   category: 'ai' },
      { name: 'DynamoDB',    category: 'database' },
      { name: 'OpenSearch',  category: 'search' },
      { name: 'Amazon Lex',  category: 'ai' },
      { name: 'SageMaker',   category: 'ml' },
    ],
    metadata: [
      { label: 'ARCH',    value: 'Serverless Microservices' },
      { label: 'AI/ML',   value: 'LangChain RAG, Claude, OpenAI, SageMaker' },
      { label: 'DATA',    value: 'DynamoDB, OpenSearch' },
      { label: 'NLP',     value: 'Amazon Lex (natural language ops interface)' },
    ],
    github: 'https://github.com/sourikduttanyu/FeastFleetDeliveryApp',
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
    github: 'https://github.com/sourikduttanyu/routesavvy-bigdata-project',
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
    github: 'https://github.com/sourikduttanyu/Prototype-Reddit-NYU-Abuse',
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
    github: 'https://github.com/sourikduttanyu/go-pubsub-broker',
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
        background: `rgba(${accentRgb},0.04)`,
        border: `1px solid rgba(${accentRgb},0.18)`,
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
          <div className="flex items-start justify-between gap-4 mb-2">
            <div
              className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ color: accent }}
            >
              {project.id} — {project.subtitle}
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-150 hover:opacity-90 active:scale-95"
                style={{
                  color: accent,
                  border: `1px solid ${accent}`,
                  background: `rgba(${accentRgb},0.1)`,
                }}
              >
                ↗ GitHub
              </a>
            )}
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
        <p className="font-sans text-alabaster/90 text-base leading-relaxed">
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
      <div className="mb-8 sm:mb-10 relative">
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <span className="font-mono text-xs text-stormy-teal-light font-bold tracking-widest">01</span>
          <div className="flex-1 h-px bg-yale-blue" />
          <span className="hidden sm:inline font-mono text-[10px] text-alabaster/30 tracking-[0.2em] uppercase">SCHEMATIC_ARCHIVE</span>
          <div className="hidden sm:block w-12 h-px bg-stormy-teal-light/50" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 sm:pb-8 border-b border-yale-blue gap-4 sm:gap-6 relative overflow-hidden">
          <div
            className="absolute right-0 bottom-0 font-sans font-black leading-none select-none pointer-events-none"
            style={{ fontSize: 160, color: 'rgba(45,212,240,0.04)', lineHeight: 1 }}
            aria-hidden="true"
          >01</div>

          <div>
            <h2 id="blueprints-heading" className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-sans font-extrabold text-brand-white tracking-tight uppercase">
              The <span style={{ WebkitTextStroke: '2px #2dd4f0', color: 'transparent' }}>Blueprints</span>
            </h2>
            <p className="font-mono text-alabaster/40 mt-4 text-xs tracking-wider">
              PROJ_COUNT: {projects.length} · technical schematics · select to inspect
            </p>
          </div>

          <div className="font-mono text-xs text-stormy-teal-light hidden md:block font-semibold tracking-wider text-right">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Selector + Detail */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* Left: project selector rail */}
        {/* Mobile: horizontal pill tabs with visible active indicator */}
        {/* Desktop: vertical list */}
        <div
          className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0 lg:w-64 flex-shrink-0"
          role="tablist"
          aria-label="Projects"
        >
          {projects.map((p, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="project-detail-panel"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className="group flex-shrink-0 lg:flex-shrink flex flex-col text-left px-4 py-3.5 lg:py-4 transition-all duration-150 relative min-h-[56px] lg:min-h-0 focus-visible:outline-none"
                style={{
                  background: isActive ? `rgba(${p.accentRgb},0.1)` : 'transparent',
                  border: isActive ? `1px solid rgba(${p.accentRgb},0.35)` : '1px solid transparent',
                  minWidth: 140,
                }}
              >
                {/* Active left bar (desktop) / bottom bar (mobile) */}
                {isActive && (
                  <motion.div
                    layoutId="selector-bar"
                    className="absolute left-0 top-0 bottom-0 w-0.5 hidden lg:block"
                    style={{ background: p.accent }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="selector-bar-mobile"
                    className="absolute bottom-0 left-2 right-2 h-0.5 lg:hidden"
                    style={{ background: p.accent }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity"
                  style={{ color: p.accent, opacity: isActive ? 1 : 0.45 }}
                >
                  {p.id}
                </span>
                <span
                  className={`font-mono text-sm font-bold mt-0.5 transition-colors leading-tight ${
                    isActive ? 'text-brand-white' : 'text-alabaster/45 group-hover:text-alabaster/70'
                  }`}
                >
                  {p.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right: detail panel */}
        <div
          id="project-detail-panel"
          role="tabpanel"
          className="flex-1 min-h-[420px] sm:min-h-[520px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
