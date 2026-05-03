import { motion } from 'framer-motion'
import { Sparkles, Code2, Cloud, Server, Database, Monitor, Shield, Activity } from 'lucide-react'

const skillCategories = [
  {
    category: "AGENTIC AI & LLM",
    icon: Sparkles,
    skills: [
      "LangChain", "RAG Pipelines", "LLM-as-a-Service", "Azure OpenAI",
      "OpenAI API", "Claude API", "Ollama", "Amazon SageMaker",
      "Prompt Engineering", "AIOps", "Z-Score / EWMA Anomaly Detection", "NLP",
    ]
  },
  {
    category: "LANGUAGES",
    icon: Code2,
    skills: [
      "Python", "Java", "Go", "C++", "C#", "TypeScript", "JavaScript", "SQL", "Bash", "C",
    ]
  },
  {
    category: "CLOUD & PLATFORM",
    icon: Cloud,
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
    skills: [
      "Java Spring Boot 3", ".NET 7", "FastAPI", "Flask", "GraphQL", "REST APIs",
      "Apache Kafka", "PySpark", "Redis", "OAuth 2.0 / PKCE",
      "Polly", "Resilience4j", "Circuit Breaking", "Exponential Backoff",
    ]
  },
  {
    category: "SRE & OBSERVABILITY",
    icon: Activity,
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
    skills: [
      "Azure Databricks", "Apache Spark SQL", "PostgreSQL", "Azure CosmosDB",
      "DynamoDB", "OpenSearch", "SQLite", "Azure Data Lake",
      "pandas", "NumPy", "SciPy", "openpyxl",
    ]
  },
  {
    category: "FRONTEND",
    icon: Monitor,
    skills: [
      "Angular 15", "React 18", "RxJS", "TypeScript",
      "WebSockets", "Azure SignalR", "Recharts", "Tailwind CSS",
      "Framer Motion", "Storybook", "Cypress", "Vite",
    ]
  },
  {
    category: "DEVSECOPS",
    icon: Shield,
    skills: [
      "GitHub Actions", "Azure DevOps", "Semgrep (SAST)", "Gitleaks",
      "SonarQube", "OWASP Top 10", "Secrets Scanning", "Branch Protection",
      "k6", "Blue-Green Deployments", "Feature Flags", "CI/CD Pipeline Design",
    ]
  },
]

export default function System({ id }) {
  return (
    <section id={id} aria-labelledby="system-heading" className="py-16 sm:py-24 lg:py-32 border-b border-yale-blue relative z-10 transition-colors duration-200">

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
            <h2 id="system-heading" className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight uppercase">
              <span style={{ WebkitTextStroke: '2px rgba(91,164,245,0.85)', color: 'transparent' }}>THE </span>
              <span className="text-brand-white">SYSTEM</span>
            </h2>
            <p className="font-mono text-alabaster/90 mt-4 text-sm max-w-xl leading-relaxed">
              Operational capability matrices. Brutalist block structure
              representing foundational to advanced proficiency.
            </p>
          </div>
          <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider">
            NODE_COUNT: {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} <br />
            INTEGRITY: 100%
          </div>
        </div>
      </div>

      {/* Capability Manifest */}
      <div>
        {skillCategories.map((group, idx) => {
          const Icon = group.icon

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ease: 'easeOut', duration: 0.4, delay: idx * 0.07 }}
              className="group relative border-b border-yale-blue last:border-b-0 overflow-hidden"
            >
              {/* Ghost watermark */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <span
                  className="font-sans font-black uppercase leading-none"
                  style={{ fontSize: '4.5rem', color: 'rgba(45,212,240,0.055)', letterSpacing: '-0.04em' }}
                >
                  {group.category}
                </span>
              </div>

              {/* Module header */}
              <div className="relative flex items-center gap-4 pt-6 pb-3">
                <div className="flex items-center justify-center w-7 h-7 border border-yale-blue bg-yale-blue/15 group-hover:border-stormy-teal-light group-hover:bg-stormy-teal-light/10 transition-colors duration-200 flex-shrink-0">
                  <Icon size={13} className="text-yale-blue-light group-hover:text-stormy-teal-light transition-colors duration-200" strokeWidth={2} />
                </div>
                <span className="font-mono text-xs tracking-widest text-alabaster font-bold group-hover:text-brand-white transition-colors duration-200 flex-shrink-0">
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-yale-blue/40" />
                <span className="font-mono text-[10px] text-stormy-teal-light/55 flex-shrink-0 tracking-widest">
                  {String(group.skills.length).padStart(2, '0')} MODULES
                </span>
              </div>

              {/* Skills inline */}
              <div className="relative pb-6 flex flex-wrap gap-x-8 gap-y-2.5">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4, delay: idx * 0.07 + skillIdx * 0.035 }}
                    className="flex items-center gap-2"
                  >
                    <span className="font-mono text-[9px] text-stormy-teal-light/35 group-hover:text-stormy-teal-light/65 transition-colors duration-200 select-none">
                      {String(skillIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-sm text-alabaster/90 group-hover:text-brand-white transition-colors duration-200 font-medium">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
