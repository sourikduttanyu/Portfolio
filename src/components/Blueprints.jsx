import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Cpu, Globe, Database, Search, Sparkles, TrendingUp,
  Radio, Server, Cloud, GitBranch, Code2, HardDrive, Monitor,
} from 'lucide-react'

const CATEGORY = {
  compute: { color: '#cca152', bg: 'rgba(204,161,82,0.13)', Icon: Cpu },
  api:     { color: '#509ba8', bg: 'rgba(80,155,168,0.13)',  Icon: Globe },
  database:{ color: '#8f81ba', bg: 'rgba(143,129,186,0.13)', Icon: Database },
  search:  { color: '#569e71', bg: 'rgba(86,158,113,0.13)', Icon: Search },
  ai:      { color: '#a85d95', bg: 'rgba(168,93,149,0.13)', Icon: Sparkles },
  ml:      { color: '#cc8258', bg: 'rgba(204,130,88,0.13)', Icon: TrendingUp },
  stream:  { color: '#708da8', bg: 'rgba(112,141,168,0.13)', Icon: Radio },
  infra:   { color: '#8f9fb0', bg: 'rgba(143,159,176,0.13)',Icon: Server },
  cloud:   { color: '#6fa0cc', bg: 'rgba(111,160,204,0.13)', Icon: Cloud },
  algo:    { color: '#5299a7', bg: 'rgba(82,153,167,0.13)', Icon: GitBranch },
  lang:    { color: '#cca152', bg: 'rgba(204,161,82,0.13)', Icon: Code2 },
  storage: { color: '#569e71', bg: 'rgba(86,158,113,0.13)', Icon: HardDrive },
  ui:      { color: '#cc8258', bg: 'rgba(204,130,88,0.13)', Icon: Monitor },
}

const projects = [
  {
    id: 'PRJ-06',
    title: 'SENTINEL',
    subtitle: 'Agentic Multi-Agent PR Review System',
    description: 'Multi-agent PR review system combining Semgrep static analysis with Claude LLM contextual reasoning — three specialized agents (Security, Docs, Performance) run in parallel via a LangGraph StateGraph, writing to isolated state keys to avoid collision. A SupervisorAgent deduplicates and severity-ranks findings before the graph pauses for human approval (HITL interrupt_before=["post_comment"], checkpointed to SQLite) — nothing posts to GitHub without a human gate. On a real PR, Claude caught an RCE Semgrep structurally cannot detect: a debug route still registered live, where the vulnerability was in the gap between what the comment said and what the code did.',
    accent: '#a85d95',
    accentRgb: '168,93,149',
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
    id: 'PRJ-01',
    title: 'FEAST_FLEET',
    subtitle: 'Serverless Food Delivery & Logistics Platform',
    description: '24-Lambda serverless food delivery platform built entirely on AWS with deliberate architectural decisions under ambiguity. Order processing uses SQS async decoupling — placement Lambda validates and enqueues, a separate consumer handles fulfillment — so downstream failures (SES, DynamoDB) are invisible to the user at placement time. Restaurant search uses OpenSearch with dedicated indexes (restaurants_index, menu_items_index) instead of DynamoDB scans, chosen for the query pattern: partial matching, cuisine filtering, relevance ranking. 43% latency reduction for 1,248 concurrent users; 74% NLP intent resolution via Amazon Lex.',
    accent: '#cca152',
    accentRgb: '204,161,82',
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
    id: 'PRJ-07',
    title: 'RETAIN_IQ',
    subtitle: 'XGBoost Employee Attrition Prediction + RAG',
    description: 'Predicts employee attrition probability with XGBoost (F1 0.511 on minority class), threshold-calibrated via isotonic regression at 0.368 after 50-trial Optuna HPO. Each prediction is grounded by three RAG-retrieved historical employees via ChromaDB (cosine HNSW) and explained by a local Ollama llama3.2 LLM — zero employee data leaves the system. SMOTE + scale_pos_weight lifted minority-class F1 from 0.35 to 0.511. Fairness audited across gender, age, and marital status via fairlearn MetricFrame.',
    accent: '#6fa0cc',
    accentRgb: '111,160,204',
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
    id: 'PRJ-05',
    title: 'GO_PUBSUB_BROKER',
    subtitle: 'Lightweight In-Memory Pub/Sub Engine',
    description: 'Built a Go pub/sub broker from scratch mirroring Google Cloud Pub/Sub semantics — at-least-once delivery, per-subscription goroutine fan-out, configurable retry budget, dead-letter queue, and graceful shutdown. Designed so handler panics can\'t crash the delivery loop.',
    accent: '#569e71',
    accentRgb: '86,158,113',
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
  {
    id: 'PRJ-04',
    title: 'JOB_TRACKER',
    subtitle: 'Gmail Job Classification & Analytics Pipeline',
    description: 'Auto-scans Gmail inbox, classifies job application emails into Applied / Interview / Offer / Rejected / Unknown via regex with an optional local LLM fallback (Ollama), deduplicates on Message ID, exports colour-coded jobs.xlsx, and serves an interactive Streamlit dashboard — zero manual entry.',
    accent: '#bd5869',
    accentRgb: '189,88,105',
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
    id: 'PRJ-08',
    title: 'LUMISYNTH',
    subtitle: 'Browser-Based Real-Time Video Instrument',
    description: 'Real-time browser video instrument with vanilla JS, raw WebGL2, Canvas 2D, Vite, Playwright, and Cloudflare Pages Functions. Input sources: local video, image, webcam, and four raymarched GLSL generative shaders (Dive Clouds, Phantom Star, Star Nest, Hyperkart). A STRUCTURE → COLOR → GRADE → FX RACK pipeline runs fully on GPU — STRUCTURE covers ASCII, Erode, Watershed, Pixel Sort, Melt, FreqMod; FX RACK chains up to three feedback passes (Flow Field, Drag, Burn-In, Wobble Tape) or stateless passes (CRT, Scanlines, Degrade). Seven blob-detection modes plus MediaPipe EfficientDet object tracking bundled offline — no install, works in air-gap. BigBrain mode wires new GLSL shaders from TouchDesigner source through dispatcher, schema, UI, and verification in a single Cursor prompt.',
    accent: '#509ba8',
    accentRgb: '80,155,168',
    stats: [
      { value: 'WebGL2', label: 'render core' },
      { value: '8',      label: 'track modes' },
      { value: '4K',     label: 'max export' },
      { value: 'D1',     label: 'auth scaffold' },
    ],
    stack: [
      { name: 'JavaScript',  category: 'lang' },
      { name: 'WebGL2/GLSL', category: 'ui' },
      { name: 'Canvas 2D',   category: 'ui' },
      { name: 'MediaPipe',   category: 'ml' },
      { name: 'Playwright',  category: 'infra' },
      { name: 'Cloudflare',  category: 'cloud' },
    ],
    metadata: [
      { label: 'PIPELINE', value: 'STRUCTURE → COLOR → GRADE → FX RACK (up to 3 chained GL passes)' },
      { label: 'MEDIA',    value: 'Local video, image, webcam, or 4 raymarched GLSL generative shaders' },
      { label: 'TRACK',    value: '7 blob modes + MediaPipe EfficientDet object detection (bundled)' },
      { label: 'EXPORT',   value: '720p / 1080p / 4K PNG snapshot + MediaRecorder clip, gated' },
    ],
    github: 'https://github.com/sourikduttanyu/LumiSynth',
  },
  {
    id: 'PRJ-09',
    title: 'VEIL',
    subtitle: 'Differential Privacy Ad Frequency Capper',
    description: 'Chrome MV3 extension + Go backend enforcing ad frequency caps with Local Differential Privacy — no user IDs, no cookies, no tracking pixels. A Geometric mechanism (ε=1.0) scrambles true impression counts in pure JS inside the service worker before any fetch() call; the server only sees noisy cohort aggregates. No user_id column exists in any table — the absence is architectural, enforced by the migration comment. Fail-closed epsilon budget uses SELECT FOR UPDATE in Postgres: when the budget is exhausted the ad is not served, privacy over availability. Two-tier suppression: DOM hide then declarativeNetRequest session rule blocks the ad iframe at the network layer — ad server never receives the request, no tracking pixel fires. Works on YouTube, Facebook, and first-party domains where filter-list blockers fail. Python simulator with pluggable NoiseMechanism ABC; React dashboard with budget gauge and per-cohort charts.',
    accent: '#569e71',
    accentRgb: '86,158,113',
    stats: [
      { value: 'ε=1.0',      label: 'noise level' },
      { value: 'No PII',     label: 'structurally' },
      { value: 'fail-closed', label: 'budget' },
      { value: '2-tier',     label: 'suppression' },
    ],
    stack: [
      { name: 'Go',         category: 'lang' },
      { name: 'Chrome MV3', category: 'ui' },
      { name: 'React',      category: 'ui' },
      { name: 'Redis',      category: 'database' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Docker',     category: 'infra' },
    ],
    metadata: [
      { label: 'PRIVACY',  value: 'Geometric LDP — noise applied in-browser before fetch()' },
      { label: 'SCHEMA',   value: 'No user_id column — PII storage structurally impossible' },
      { label: 'ENFORCE',  value: 'Redis counters + SELECT FOR UPDATE epsilon budget (Postgres)' },
      { label: 'SUPPRESS', value: 'DOM hide → declarativeNetRequest block (ad server never called)' },
    ],
    github: 'https://github.com/sourikduttanyu/Veil',
  },
  {
    id: 'PRJ-10',
    title: 'ASTRAL',
    subtitle: 'Context-Budget Manager for Claude Code',
    description: 'Claude Code plugin that warns before auto-compact silently rewrites your session. A Python hook reads real context usage from the transcript on every prompt and fires at 40/55/70% of the window — thresholds derived from long-context accuracy degradation research, not arbitrary. A checkpoint command lets you multi-select which completed work to shed and generates a steered /compact line that drops the done work but keeps the live thread, instead of flattening everything. A Read-gate intercepts unbounded large-file reads and delegates them to a subagent so a 10K-token dump never lands in your main context. A PreCompact hook snapshots about-to-be-evicted turns to a SQLite FTS5 store; an MCP server exposes a recall(query) tool so Claude can re-fetch what compaction dropped. Ships with a statusline badge tracking live context percent, a one-line installer for macOS/Linux/Windows, and an audit command that finds never-used or stale agents loaded into every session.',
    accent: '#a85d95',
    accentRgb: '168,93,149',
    stats: [
      { value: '3 bands', label: '40/55/70%' },
      { value: 'MCP',     label: 'recall server' },
      { value: 'FTS5',    label: 'index backend' },
      { value: '1-line',  label: 'installer' },
    ],
    stack: [
      { name: 'Python',      category: 'lang' },
      { name: 'MCP Server',  category: 'ai' },
      { name: 'SQLite FTS5', category: 'database' },
      { name: 'Claude Code', category: 'ai' },
      { name: 'Shell',       category: 'infra' },
      { name: 'PowerShell',  category: 'infra' },
    ],
    metadata: [
      { label: 'HOOKS',   value: 'UserPromptSubmit + PreToolUse:Read + PreCompact' },
      { label: 'RECALL',  value: 'SQLite FTS5 snapshot store + MCP recall(query) tool' },
      { label: 'WINDOW',  value: 'Occupancy-floor heuristic + /astral:window per-project override' },
      { label: 'INSTALL', value: 'curl one-liner — idempotent, chains existing statusline' },
    ],
    github: 'https://github.com/sourikduttanyu/astral',
  },
  {
    id: 'PRJ-02',
    title: 'ROUTE_SAVVY',
    subtitle: 'MTA Transit Telemetry & Mobility Optimizer',
    description: 'Processes 112M+ daily signals with 99.87% system stability, cutting pathfinding latency by 17% across 14,321 simulations via distributed graph algorithms.',
    accent: '#509ba8',
    accentRgb: '80,155,168',
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
    accent: '#8f81ba',
    accentRgb: '143,129,186',
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
            style={{ fontSize: 160, color: 'rgba(80,155,168,0.04)', lineHeight: 1 }}
            aria-hidden="true"
          >01</div>

          <div>
            <h2 id="blueprints-heading" className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-sans font-extrabold text-brand-white tracking-tight uppercase">
              The <span style={{ WebkitTextStroke: '2px #509ba8', color: 'transparent' }}>Blueprints</span>
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
