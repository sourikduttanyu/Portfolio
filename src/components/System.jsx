import { motion } from 'framer-motion'
import { Sparkles, Code2, Cloud, Server, Database, Monitor, Shield, Activity } from 'lucide-react'

const skillCategories = [
  {
    category: "AGENTIC AI & LLM",
    icon: Sparkles,
    accent: '#d946ef',
    accentRgb: '217,70,239',
    skills: [
      "LangChain", "LangGraph", "RAG Pipelines", "LLM-as-a-Service", "Azure OpenAI",
      "OpenAI API", "Claude API", "Ollama", "Amazon SageMaker",
      "Prompt Engineering", "AIOps", "Z-Score / EWMA Anomaly Detection", "NLP",
    ]
  },
  {
    category: "LANGUAGES",
    icon: Code2,
    accent: '#fbbf24',
    accentRgb: '251,191,36',
    skills: [
      "Python", "Java", "Go", "C++", "C#", "TypeScript", "JavaScript", "SQL", "Bash", "C",
    ]
  },
  {
    category: "CLOUD & PLATFORM",
    icon: Cloud,
    accent: '#60a5fa',
    accentRgb: '96,165,250',
    skills: [
      "Azure AKS", "Azure API Management", "Azure Event Hubs", "Azure CosmosDB",
      "Azure SignalR", "Azure OpenAI Service", "Azure Chaos Studio", "Azure App Configuration",
      "AWS Lambda", "AWS DynamoDB", "AWS S3", "GCP",
      "Docker", "Kubernetes", "Terraform", "Helm",
    ]
  },
  {
    category: "BACKEND & DISTRIBUTED",
    icon: Server,
    accent: '#2dd4f0',
    accentRgb: '45,212,240',
    skills: [
      "Java Spring Boot 3", ".NET 7", "FastAPI", "Flask", "GraphQL", "REST APIs",
      "Apache Kafka", "PySpark", "Redis", "OAuth 2.0 / PKCE",
      "Polly", "Resilience4j", "Circuit Breaking", "Exponential Backoff",
    ]
  },
  {
    category: "SRE & OBSERVABILITY",
    icon: Activity,
    accent: '#22c55e',
    accentRgb: '34,197,94',
    skills: [
      "SLO / SLA Ownership", "Error Budget Management", "Incident Command (DRI)",
      "Runbook Authoring", "Chaos Engineering", "Azure Chaos Studio",
      "PagerDuty", "Grafana", "Azure Monitor", "k6 Load Testing",
      "MTTD / MTTR Reduction", "Toil Reduction", "Capacity Planning",
      "Distributed Tracing", "Pre-Escalation Alerting",
    ]
  },
  {
    category: "DATA & ML OPS",
    icon: Database,
    accent: '#a78bfa',
    accentRgb: '167,139,250',
    skills: [
      "Azure Databricks", "Apache Spark SQL", "PostgreSQL", "Azure CosmosDB",
      "DynamoDB", "OpenSearch", "SQLite", "Azure Data Lake",
      "pandas", "NumPy", "SciPy", "XGBoost", "SHAP", "ChromaDB",
    ]
  },
  {
    category: "FRONTEND",
    icon: Monitor,
    accent: '#fb923c',
    accentRgb: '251,146,60',
    skills: [
      "Angular 15", "React 18", "RxJS", "TypeScript",
      "WebSockets", "Azure SignalR", "Recharts", "Tailwind CSS",
      "Framer Motion", "Storybook", "Cypress", "Vite",
    ]
  },
  {
    category: "DEVSECOPS",
    icon: Shield,
    accent: '#f43f5e',
    accentRgb: '244,63,94',
    skills: [
      "GitHub Actions", "Azure DevOps", "Semgrep (SAST)", "Gitleaks",
      "SonarQube", "OWASP Top 10", "Secrets Scanning", "Branch Protection",
      "k6", "Blue-Green Deployments", "Feature Flags", "CI/CD Pipeline Design",
    ]
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

function SkillPill({ skill, accent, accentRgb, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.82, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.55, delay: index * 0.038 }}
      className="skill-pill group inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-semibold select-none cursor-default transition-all duration-200"
      style={{
        background: `rgba(${accentRgb},0.07)`,
        border: `1px solid rgba(${accentRgb},0.22)`,
        color: `rgba(${accentRgb},0.85)`,
        '--glow-color': `rgba(${accentRgb},0.35)`,
      }}
    >
      <span
        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-150"
        style={{ background: accent }}
      />
      {skill}
    </motion.span>
  )
}

export default function System({ id }) {
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)

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
              <span style={{ WebkitTextStroke: '2px rgba(91,164,245,0.85)', color: 'transparent' }}>THE </span>
              <span className="text-brand-white">SYSTEM</span>
            </h2>
            <p className="font-mono text-alabaster/70 mt-4 text-sm max-w-xl leading-relaxed">
              Production-proven skills across distributed systems, agentic AI, and cloud infrastructure.
            </p>
          </div>
          <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider shrink-0">
            NODE_COUNT: {totalSkills} <br />
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
              className="group relative border-b border-yale-blue last:border-b-0 py-6"
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
                  {String(group.skills.length).padStart(2, '0')}
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
