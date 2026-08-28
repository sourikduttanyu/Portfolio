import { motion } from 'framer-motion'
import { Sparkles, Code2, Cloud, Server, Database, Monitor, Shield, Activity } from 'lucide-react'

// `core` = signal skills for Backend / Distributed Systems + Cloud Engineer roles. Rendered
// emphasized; everything else is supporting depth, rendered dimmed.
const skillCategories = [
  {
    category: "LANGUAGES",
    icon: Code2,
    accent: '#cca152',
    accentRgb: '204,161,82',
    skills: [
      "TypeScript", "Python", "JavaScript", "Java", "Go", "SQL", "C++", "C#", "Bash", "C",
      "Protobuf", "gRPC",
    ],
    core: ["TypeScript", "Python", "JavaScript", "Java", "Go", "SQL", "Protobuf", "gRPC"],
  },
  {
    category: "BACKEND & DISTRIBUTED",
    icon: Server,
    accent: '#509ba8',
    accentRgb: '80,155,168',
    skills: [
      "Java Spring Boot 3", ".NET 7", "FastAPI", "REST APIs", "GraphQL",
      "Apache Kafka", "Redis", "Flask", "PySpark", "OAuth 2.0 / PKCE",
      "Polly", "Resilience4j", "Circuit Breaking", "Exponential Backoff",
      "asyncpg", "TimescaleDB", "JWT RS256", "WebSocket / SSE", "Goroutines / RWMutex",
    ],
    core: ["Java Spring Boot 3", ".NET 7", "FastAPI", "REST APIs", "GraphQL", "Apache Kafka", "Redis"],
  },
  {
    category: "CLOUD & PLATFORM",
    icon: Cloud,
    accent: '#6fa0cc',
    accentRgb: '111,160,204',
    skills: [
      "Docker", "Kubernetes", "Azure AKS", "AWS Lambda", "Terraform",
      "Azure API Management", "Azure Event Hubs", "Azure CosmosDB",
      "Azure SignalR", "Azure OpenAI Service", "Azure Chaos Studio", "Azure App Configuration",
      "AWS DynamoDB", "AWS S3", "AWS EKS", "AWS SageMaker",
      "GCP Cloud Run", "GCP Cloud Build", "Vertex AI", "Helm",
    ],
    core: ["Docker", "Kubernetes", "Azure AKS", "AWS Lambda", "Terraform", "GCP Cloud Run", "GCP Cloud Build", "Vertex AI"],
  },
  {
    category: "SRE & OBSERVABILITY",
    icon: Activity,
    accent: '#569e71',
    accentRgb: '86,158,113',
    skills: [
      "SLO / SLA Ownership", "Error Budget Management", "Incident Command (DRI)",
      "Runbook Authoring", "Chaos Engineering", "Azure Chaos Studio",
      "PagerDuty", "Grafana", "Azure Monitor", "k6 Load Testing",
      "MTTD / MTTR Reduction", "Toil Reduction", "Capacity Planning",
      "Distributed Tracing", "Pre-Escalation Alerting",
    ],
    core: ["SLO / SLA Ownership", "Incident Command (DRI)", "Distributed Tracing"],
  },
  {
    category: "DATA & ML OPS",
    icon: Database,
    accent: '#8f81ba',
    accentRgb: '143,129,186',
    skills: [
      "PostgreSQL", "ChromaDB", "pandas", "NumPy",
      "Azure Databricks", "Apache Spark SQL", "Azure CosmosDB",
      "DynamoDB", "OpenSearch", "SQLite", "Azure Data Lake",
      "SciPy", "XGBoost", "SHAP",
    ],
    core: ["PostgreSQL", "ChromaDB", "pandas", "NumPy"],
  },
  {
    category: "FRONTEND",
    icon: Monitor,
    accent: '#cc8258',
    accentRgb: '204,130,88',
    skills: [
      "TypeScript", "React 18", "Angular 15", "Tailwind CSS", "WebSockets", "Vite",
      "WebGL2 / GLSL", "Chrome Extension APIs", "RxJS",
      "Azure SignalR", "Recharts", "Framer Motion", "Storybook", "Cypress",
    ],
    core: ["TypeScript", "React 18", "Angular 15", "Tailwind CSS", "WebSockets", "Vite"],
  },
  {
    category: "DEVSECOPS",
    icon: Shield,
    accent: '#bd5869',
    accentRgb: '189,88,105',
    skills: [
      "GitHub Actions", "CI/CD Pipeline Design", "Azure DevOps", "Semgrep (SAST)", "Gitleaks",
      "SonarQube", "OWASP Top 10", "Secrets Scanning", "Branch Protection",
      "k6", "Blue-Green Deployments", "Feature Flags", "Local Differential Privacy",
    ],
    core: ["GitHub Actions", "CI/CD Pipeline Design"],
  },
  {
    category: "AGENTIC AI & LLM",
    icon: Sparkles,
    accent: '#a85d95',
    accentRgb: '168,93,149',
    skills: [
      "Multi-Agent Orchestration", "MCP Server", "LLM-as-a-Service", "Ragas",
      "Vector Search", "Claude Code", "Cursor", "FinOps",
    ],
    core: [
      "Multi-Agent Orchestration", "MCP Server", "LLM-as-a-Service", "Claude Code",
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 } },
}

function SkillPill({ skill, accent, accentRgb, index, isCore }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.82, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.55, delay: index * 0.038 }}
      className={`skill-pill group inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs select-none cursor-default transition-all duration-200 ${isCore ? 'font-bold' : 'font-medium'}`}
      style={{
        background: isCore ? `rgba(${accentRgb},0.14)` : `rgba(${accentRgb},0.05)`,
        border: `1px solid rgba(${accentRgb},${isCore ? 0.5 : 0.14})`,
        color: isCore ? `rgba(${accentRgb},1)` : `rgba(${accentRgb},0.55)`,
        '--glow-color': `rgba(${accentRgb},0.35)`,
        '--i': index,
      }}
    >
      <span
        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-150"
        style={{
          background: isCore ? accent : 'transparent',
          border: isCore ? 'none' : `1px solid rgba(${accentRgb},0.4)`,
        }}
      />
      {skill}
    </motion.span>
  )
}

export default function System({ id }) {
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  const coreSkills = skillCategories.reduce((acc, cat) => acc + (cat.core?.length || 0), 0)

  return (
    <section id={id} aria-labelledby="system-heading" className="py-16 sm:py-24 lg:py-32 border-b border-yale-blue relative z-10">

      {/* Section Header */}
      <div className="mb-10 sm:mb-16 relative">
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <span className="font-mono text-xs text-yale-blue-light font-bold tracking-widest">03</span>
          <div className="flex-1 h-px bg-yale-blue" />
          <span className="hidden sm:inline font-mono text-[10px] text-alabaster/30 tracking-[0.2em] uppercase">CAPABILITY_MATRIX</span>
          <div className="hidden sm:block w-12 h-px bg-yale-blue-light/50" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-yale-blue gap-6">
          <div>
            <h2 id="system-heading" className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-sans font-extrabold tracking-tight uppercase">
              <span style={{ WebkitTextStroke: '2px rgba(112,141,168,0.85)', color: 'transparent' }}>THE </span>
              <span className="text-brand-white">SYSTEM</span>
            </h2>
            <p className="font-mono text-alabaster/70 mt-4 text-sm max-w-xl leading-relaxed">
              Production-proven skills across distributed systems, cloud infrastructure, and agentic AI.
            </p>
            {/* Legend: brighter pills = core role signal, dim = supporting depth */}
            <div className="flex items-center gap-4 mt-4 font-mono text-[10px] tracking-wider">
              <span className="inline-flex items-center gap-1.5 text-alabaster/80">
                <span className="w-1.5 h-1.5 rounded-full bg-alabaster/80" />
                CORE (BACKEND + DISTRIBUTED SYSTEMS)
              </span>
              <span className="inline-flex items-center gap-1.5 text-alabaster/35">
                <span className="w-1.5 h-1.5 rounded-full border border-alabaster/40" />
                SUPPORTING DEPTH
              </span>
            </div>
          </div>
          <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider shrink-0">
            NODE_COUNT: {totalSkills} <br />
            CORE_SIGNAL: {coreSkills} <br />
            INTEGRITY: 100%
          </div>
        </div>
      </div>

      {/* Capability Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-0"
      >
        {skillCategories.map((group) => {
          const Icon = group.icon
          return (
            <motion.div
              key={group.category}
              variants={rowVariants}
              className="cap-row group relative border-b border-yale-blue last:border-b-0 py-6"
            >
              {/* Ghost watermark */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="font-sans font-black uppercase leading-none"
                  style={{ fontSize: '4.5rem', color: `rgba(${group.accentRgb},0.04)`, letterSpacing: '-0.04em' }}
                >
                  {group.category}
                </span>
              </div>

              {/* Category header row */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-8 h-8 flex-shrink-0 transition-all duration-200"
                  style={{
                    background: `rgba(${group.accentRgb},0.1)`,
                    border: `1px solid rgba(${group.accentRgb},0.3)`,
                  }}
                >
                  <Icon size={14} strokeWidth={2} style={{ color: group.accent }} />
                </div>

                <span className="font-mono text-xs tracking-widest font-bold text-alabaster/90 group-hover:text-brand-white transition-colors duration-200">
                  {group.category}
                </span>

                <div className="flex-1 h-px" style={{ background: `rgba(${group.accentRgb},0.15)` }} />

                <span
                  className="font-mono text-[10px] tracking-widest font-bold flex-shrink-0 px-2 py-0.5"
                  style={{
                    color: group.accent,
                    background: `rgba(${group.accentRgb},0.08)`,
                    border: `1px solid rgba(${group.accentRgb},0.2)`,
                  }}
                >
                  {String(group.core?.length || 0).padStart(2, '0')}<span style={{ opacity: 0.5 }}>/{String(group.skills.length).padStart(2, '0')}</span>
                </span>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {group.skills.map((skill, skillIdx) => (
                  <SkillPill
                    key={skill}
                    skill={skill}
                    accent={group.accent}
                    accentRgb={group.accentRgb}
                    index={skillIdx}
                    isCore={group.core?.includes(skill)}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

    </section>
  )
}
