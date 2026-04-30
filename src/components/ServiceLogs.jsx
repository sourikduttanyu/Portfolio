import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experienceLog = [
  {
    id: 'exp-01',
    role: 'Software Engineer',
    subtitle: 'Full Stack Systems & Cloud Architecture',
    company: 'Insight Enterprises',
    period: 'Jan 2023 – Nov 2023',
    location: 'Remote',
    highlights: [
      'Architected a production LLM-as-a-service platform on Azure, deploying .NET and Java Spring Boot microservices on AKS with circuit breaking, exponential backoff, and Redis response caching — enabling governed GenAI tooling access for 13,000+ teammates.',
      'Built an AIOps telemetry pipeline on Azure Event Hubs ingesting production signals into Z-Score and EWMA anomaly detection models containerized on AKS, routing pre-escalation alerts to PagerDuty before SLO breach.',
      'Sustained 99.86% SLO at 3,412 concurrent req/sec across 12,143 production signals by root-causing HttpClientFactory TIME_WAIT exhaustion, repartitioning Kafka from 12→48 partitions, and codifying DRI runbooks as version-controlled decision trees.',
      'Delivered an Angular 15 real-time ops dashboard with WebSocket-driven signal feeds via Azure SignalR, OnPush change detection for 60fps under high-frequency data, and Entra ID RBAC-gated views — primary operational interface for the AIOps platform org-wide.',
    ]
  },
  {
    id: 'exp-02',
    role: 'Software Engineer',
    subtitle: 'API Development & Cloud Security',
    company: 'Hanu Software (acquired by Insight Enterprises)',
    period: 'Jan 2022 – Jan 2023',
    location: 'Remote',
    highlights: [
      'Sustained sub-100ms p95 latency under millions of enterprise API requests by profiling C# .NET hot paths with dotnet-trace, eliminating GC pressure via Span<T> and ArrayPool<T>, redesigning CosmosDB partition keys, and centralizing OAuth 2.0 at the Azure APIM gateway.',
      'Drove critical SAST findings to zero and raised unit test coverage 21% by engineering GitHub Actions pipelines with Semgrep SAST gates, Gitleaks secrets scanning, and SonarQube coverage enforcement — pipeline template adopted by 4 additional service teams.',
      'Cut Azure infrastructure costs 18% over 3 months by running Databricks Spark analytics on Cost Analysis exports to right-size over-provisioned VMs and idle AKS node pools via Terraform and custom-metric VMSS autoscaling — CI/CD velocity improved 27%.',
      'Built a React 18 internal tooling dashboard with live GitHub Actions and Azure Cost Analysis REST API feeds, Recharts visualizations, and Entra ID OAuth 2.0 PKCE auth delivering RBAC-gated SAST and FinOps visibility to Security, FinOps, and Engineering managers.',
    ]
  },
  {
    id: 'exp-03',
    role: 'Software Engineer Intern',
    subtitle: 'Data & Backend Infrastructure',
    company: 'Ernst & Young',
    period: 'May 2021 – Jul 2021',
    location: 'Remote',
    highlights: [
      'Processed 1,842 daily industrial IoT sensor signals by implementing MQTT broker ingestion and a 3-topic Apache Kafka distributed streaming pipeline on AWS, enabling high-throughput delivery to multiple downstream consumer groups.',
      'Reduced mean time to detection across 3 production services by building an AIOps telemetry pipeline with Z-Score and EWMA anomaly detection as containerized inference microservices, shifting triage from reactive paging to automated pre-escalation routing.',
      'Reduced deployment risk across 4 production services by codifying containerized microservice blueprints and NoSQL synchronization runbooks, achieving zero-downtime blue-green release cadence throughout the internship.',
    ]
  },
]

export default function ServiceLogs({ id }) {
  return (
    <section id={id} aria-labelledby="logs-heading" className="py-16 sm:py-24 lg:py-32 border-b border-yale-blue relative z-10">

      {/* Section Header */}
      <div className="mb-10 sm:mb-16 relative">
        {/* Separator with section number */}
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <span className="font-mono text-xs text-stormy-teal-light font-bold tracking-widest">02</span>
          <div className="flex-1 h-px bg-yale-blue" />
          <span className="font-mono text-[10px] text-alabaster/30 tracking-[0.2em] uppercase">CAREER_TELEMETRY</span>
          <div className="w-12 h-px bg-stormy-teal-light/50" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-yale-blue gap-6">
          <div>
            <h2 id="logs-heading" className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight uppercase">
              <span className="text-brand-white">Service </span>
              <span style={{ WebkitTextStroke: '2px #2dd4f0', color: 'transparent' }}>Logs</span>
            </h2>
            <div className="font-mono text-xs mt-5 space-y-1.5">
              <p>
                <span className="text-stormy-teal-light mr-2">$</span>
                <span className="text-alabaster/70">query --table=work_history --order=DESC --format=highlights</span>
              </p>
              <p>
                <span className="text-yale-blue-light mr-2">→</span>
                <span className="text-alabaster/45">{experienceLog.length} records found | DRI certified | chronological</span>
              </p>
            </div>
          </div>
          <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider">
            RECORDS: {experienceLog.length} <br />
            STATE: VERIFIED
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-12 pl-4 sm:pl-8 border-l border-yale-blue relative">
        {experienceLog.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ease: "easeOut", duration: 0.3, delay: idx * 0.1 }}
            className="group relative"
          >
            {/* Timeline Node */}
            <div className="absolute -left-4 sm:-left-8 top-1 w-2 h-2 bg-yale-blue group-hover:bg-stormy-teal-light transition-colors duration-200 shadow-[0_0_10px_rgba(83,154,158,0)] group-hover:shadow-[0_0_10px_rgba(83,154,158,0.5)] -translate-x-1/2" />
            <div className="absolute -left-4 sm:-left-8 top-1.5 w-8 h-px bg-yale-blue group-hover:bg-stormy-teal-light transition-colors duration-200" />

            <div className="pl-6 sm:pl-8">
              {/* Header Box */}
              <div className="mb-6 p-4 border sharp-border bg-graphite-100 relative overflow-hidden group-hover:border-yale-blue transition-colors duration-200">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-stormy-teal-light/5 to-transparent pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-xl font-bold text-brand-white tracking-tight">
                      {exp.role}
                    </h3>
                    {exp.subtitle && (
                      <p className="font-mono text-xs text-alabaster/65 mt-0.5 tracking-wide">{exp.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 text-stormy-teal-light font-mono text-sm uppercase mt-2 font-semibold tracking-wide">
                      <Briefcase size={13} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-alabaster/80 font-semibold flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} />
                      {exp.period}
                    </div>
                    <div className="uppercase tracking-widest">{exp.location}</div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-3">
                {exp.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-4 text-sm font-sans text-alabaster/90 group-hover:text-alabaster transition-colors duration-200 leading-relaxed">
                    <span className="font-mono text-stormy-teal-light mt-1 flex-shrink-0">&gt;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  )
}
