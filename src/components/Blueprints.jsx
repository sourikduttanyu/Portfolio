import { motion } from 'framer-motion'
import { Folder, Database, Activity, MessageSquare } from 'lucide-react'

const projects = [
  {
    id: 'PRJ-01',
    title: 'FEAST_FLEET',
    description: 'Serverless Food Delivery & Reservations Platform achieving 99.9% uptime. Features NLP chatbot ordering, real-time location tracking, and smart food search via image recognition.',
    icon: Activity,
    metadata: [
      { label: 'ARCH', value: 'Serverless, Event-Driven' },
      { label: 'COMPUTE', value: 'AWS Lambda, API Gateway' },
      { label: 'DATA', value: 'DynamoDB, OpenSearch' },
      { label: 'AI/ML', value: 'Amazon Lex, SageMaker' },
      { label: 'ASYNC', value: 'SQS, EventBridge, SES' }
    ]
  },
  {
    id: 'PRJ-02',
    title: 'ROUTE_SAVVY',
    description: 'Big Data Urban Mobility Optimizer. Processes continuous real-time streams of MTA transit, NYC traffic, and weather data to predict congestion and deliver dynamic route adjustments.',
    icon: Database,
    metadata: [
      { label: 'STREAM', value: 'Apache Kafka' },
      { label: 'PROCESS', value: 'Apache Spark (PySpark)' },
      { label: 'LANG', value: 'Python' },
      { label: 'MODELS', value: 'Scikit-learn Predictive' },
      { label: 'CLOUD', value: 'AWS / Azure Multi-Cloud' }
    ]
  },
  {
    id: 'PRJ-03',
    title: 'NYU_REDDIT_PIPELINE',
    description: 'AWS-powered data engineering pipeline for large-scale Reddit collection. Ingests raw social data via PRAW into S3 and indexes meta-attributes into DynamoDB for downstream toxicity dashboards.',
    icon: MessageSquare,
    metadata: [
      { label: 'ARCH', value: 'Automated Data Pipeline' },
      { label: 'INGEST', value: 'Python (PRAW API)' },
      { label: 'STORAGE', value: 'AWS S3 (Raw JSON)' },
      { label: 'INDEXING', value: 'AWS DynamoDB, SQLite' },
      { label: 'UI', value: 'Streamlit Analysis Dash' }
    ]
  }
]

export default function Blueprints({ id }) {
  return (
    <section id={id} className="min-h-screen py-32 border-b border-yale-blue relative z-10 transition-colors duration-200">
      
      {/* Section Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-yale-blue pb-8 gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold text-brand-white tracking-tight uppercase">
            The Blueprints
          </h2>
          <p className="font-mono text-alabaster/80 mt-4 text-sm max-w-lg leading-relaxed">
            Technical schematics & constructed architectures.
            Hover modules to extract terminal-level metadata.
          </p>
        </div>
        <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider">
          TOTAL_SCHEMATICS: {projects.length} <br />
          STATUS: COMPILED
        </div>
      </div>

      {/* Grid Layout typical of schematics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-yale-blue border sharp-border">
        {projects.map((project, idx) => {
          const Icon = project.icon
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ease: "easeOut", duration: 0.3, delay: idx * 0.1 }}
              className="group relative bg-graphite-100 p-8 overflow-hidden hover:bg-yale-blue/10 transition-colors duration-200"
            >
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Header line of the blueprint */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 border sharp-border text-yale-blue-light group-hover:text-stormy-teal-light group-hover:border-stormy-teal-light transition-colors duration-200">
                      <Icon strokeWidth={1.5} size={24} />
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-bold tracking-tight text-brand-white">
                        {project.title}
                      </h3>
                      <div className="font-mono text-xs text-stormy-teal-light/70 mt-1 uppercase tracking-wider">
                        ID: {project.id}
                      </div>
                    </div>
                  </div>
                  <Folder className="text-yale-blue-light group-hover:text-stormy-teal-light transition-colors duration-200" size={20} />
                </div>

                {/* Description */}
                <p className="font-sans text-alabaster/90 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                {/* Terminal Metadata Revealer */}
                <div className="relative border-t sharp-border overflow-hidden transition-all duration-300 ease-out h-[50px] group-hover:h-[180px]">
                  
                  {/* Default State */}
                  <div className="absolute top-4 inset-x-0 font-mono text-xs text-alabaster/50 font-semibold flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-200">
                    <div className="w-2 h-2 rounded-full bg-stormy-teal-light/50" />
                    HOVER TO EXTRACT METADATA
                  </div>
                  
                  {/* Hover State - Terminal Details */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ease-out font-mono text-xs flex flex-col gap-y-3 pt-4">
                    {project.metadata.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-stormy-teal-light min-w-[65px] font-bold">{item.label}</span> 
                        <span className="text-alabaster/90">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  
                </div>

              </div>

              {/* Decorative Schematic lines appearing on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute top-0 left-10 w-px h-full bg-stormy-teal-light" />
                <div className="absolute top-10 w-full h-px bg-stormy-teal-light" />
              </div>
            </motion.div>
          )
        })}
      </div>
      
    </section>
  )
}
