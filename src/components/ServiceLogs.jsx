import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experienceLog = [
  {
    id: 'exp-01',
    role: 'Software Engineer',
    company: 'Insight',
    period: 'Jan 2022 - Nov 2023',
    location: 'Remote',
    highlights: [
      'Accomplished a 22% increase in system resilience and fault tolerance by architecting distributed microservices using C++ and Java to decouple legacy monolithic infrastructure.',
      'Improved cloud budget efficiency by 18% by analyzing Azure telemetry data to implement resource allocation optimizations and cost-effective scaling.',
      'Achieved 99.9% SLA uptime across mission-critical service modules by developing automation for system monitoring and live-site incident triage.',
      'Accelerated software delivery cycles by 30% by integrating AI-assisted coding environments and enforcing rigorous peer code reviews.'
    ]
  },
  {
    id: 'exp-02',
    role: 'Software Engineering Intern',
    company: 'Ernst & Young',
    period: 'May 2021 - Jul 2021',
    location: 'Remote',
    highlights: [
      'Decreased API response latency by 200ms by optimizing SQL backend data access layers and developing high-performance RESTful web services using Python/Flask.',
      'Reduced manual reporting overhead by 38% by building interactive React dashboards for real-time production monitoring and telemetry.',
      'Streamlined enterprise deployments by codifying reusable Flask blueprints and scalable full-stack architectural patterns.'
    ]
  },
  {
    id: 'exp-03',
    role: 'Graduate Assistant',
    company: 'New York University',
    period: 'May 2025 - Sep 2025',
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
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-yale-blue pb-8 gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold text-brand-white tracking-tight uppercase">
            Service Logs
          </h2>
          <p className="font-mono text-alabaster/80 mt-4 text-sm max-w-lg leading-relaxed">
            Career telemetry & operational history. <br />
            Chronological documentation of professional deployments.
          </p>
        </div>
        <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider">
          RECORDS: {experienceLog.length} <br />
          STATE: VERIFIED
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
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-xl font-bold text-brand-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-stormy-teal-light font-mono text-sm uppercase mt-2 font-semibold tracking-wide">
                      <Briefcase size={13} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-alabaster/65 font-semibold">
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
