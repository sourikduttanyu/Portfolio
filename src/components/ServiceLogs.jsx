import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experienceLog = [
  {
    id: 'exp-01',
    role: 'Software Engineer',
    subtitle: 'App Modernization & Azure',
    company: 'Insight Enterprises',
    period: 'Jan 2022 – Nov 2023',
    location: 'Remote',
    highlights: [
      'Accomplished a highly scalable distributed backend serving millions of users, sustaining 3,412 concurrent authentication requests per second by decomposing monolithic integrations into Java Spring Boot microservices with distributed consensus algorithms across multi-region environments.',
      'Improved system reliability and cost efficiency — 21% increase in unit test coverage and 18% reduction in cloud budget via Azure Monitor right-sizing and auto-scaling by eliminating over-provisioned infrastructure for Entra ID service modules.',
      'Achieved 99.86% SLA availability as Designated Responsible Individual (DRI), monitoring 12,143 production signals across a millions-scale user base by executing incident playbooks and enforcing GitHub Actions security workflows with SAST and secrets scanning.',
      'Accelerated feature delivery velocity by 32% by partnering cross-functionally to ship complex distributed work items and codifying reusable, maintainable components for directory services.'
    ]
  },
  {
    id: 'exp-02',
    role: 'Software Engineering Intern',
    subtitle: null,
    company: 'Ernst & Young',
    period: 'May 2021 – Jul 2021',
    location: 'Remote',
    highlights: [
      'Built a high-throughput IoT ingestion pipeline processing 1,842 daily sensor signals by implementing MQTT brokers and Apache Kafka for distributed message streaming on AWS.',
      'Decreased data access latency by 212ms — dropping dashboard queries from 250ms to 2ms — by introducing a Redis caching layer with TTL-based invalidation in front of Apache Spark SQL aggregations.',
      'Reduced manual reporting overhead by 38% (14-hour weekly reduction in triage time) by building React dashboards with WebSocket-driven real-time alerts and live equipment health visualization using a Flask backend.',
      'Streamlined distributed deployment cadence by 27% by codifying reusable architectural blueprints for containerized microservices and NoSQL data synchronization across client environments.'
    ]
  },
  {
    id: 'exp-03',
    role: 'Graduate Assistant',
    subtitle: null,
    company: 'New York University',
    period: 'May 2025 – Sep 2025',
    location: 'New York, NY',
    highlights: [
      'Accomplished a 30% acceleration in operational workflows across 52 departmental offerings by engineering a Java backend microservice with Slack API integrations.',
      'Achieved 100% data integrity and enhanced cross-platform scalability by deploying automated CI/CD validation pipelines.'
    ]
  }
]

export default function ServiceLogs({ id }) {
  return (
    <section id={id} className="min-h-screen py-32 border-b border-yale-blue relative z-10">

      {/* Section Header */}
      <div className="mb-16 relative">
        {/* Separator with section number */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-stormy-teal-light font-bold tracking-widest">02</span>
          <div className="flex-1 h-px bg-yale-blue" />
          <span className="font-mono text-[10px] text-alabaster/30 tracking-[0.2em] uppercase">CAREER_TELEMETRY</span>
          <div className="w-12 h-px bg-stormy-teal-light/50" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-yale-blue gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight uppercase">
              <span className="text-brand-white">Service </span>
              <span style={{ WebkitTextStroke: '2px #539a9e', color: 'transparent' }}>Logs</span>
            </h2>
            <div className="font-mono text-xs mt-5 space-y-1.5">
              <p>
                <span className="text-stormy-teal-light mr-2">$</span>
                <span className="text-alabaster/55">query --table=work_history --order=DESC --format=highlights</span>
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
                      <p className="font-mono text-xs text-alabaster/50 mt-0.5 tracking-wide">{exp.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 text-stormy-teal-light font-mono text-sm uppercase mt-2 font-semibold tracking-wide">
                      <Briefcase size={13} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-alabaster/65 font-semibold flex-shrink-0">
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
                  <li key={hIdx} className="flex items-start gap-4 text-sm font-sans text-alabaster/85 group-hover:text-alabaster transition-colors duration-200 leading-relaxed">
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
