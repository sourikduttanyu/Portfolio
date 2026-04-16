import { motion } from 'framer-motion'
import { Server, Cpu, Layers, Layout, Globe, Code2 } from 'lucide-react'

const skillCategories = [
  {
    category: "LANGUAGES",
    icon: Code2,
    skills: ["Python", "C++", "Java", "C#", "SQL", "JavaScript", "TypeScript", "Bash"]
  },
  {
    category: "CLOUD & DEVOPS",
    icon: Globe,
    skills: ["AWS", "Azure", "Docker", "CI/CD Pipelines", "Serverless"]
  },
  {
    category: "BACKEND & STREAM",
    icon: Server,
    skills: ["RESTful APIs", "Flask", "Microservices", "Apache Kafka", "PySpark"]
  },
  {
    category: "FRONTEND & DB",
    icon: Layout,
    skills: ["React", "HTML5/CSS3", "PostgreSQL", "NoSQL", "OpenSearch"]
  },
  {
    category: "PRACTICES & AI",
    icon: Cpu,
    skills: ["Agile/Scrum", "TDD", "Git", "GitHub Copilot", "Prompt Engineering"]
  }
]

export default function System({ id }) {
  return (
    <section id={id} aria-labelledby="system-heading" className="py-16 sm:py-24 lg:py-32 border-b border-yale-blue relative z-10 transition-colors duration-200">
      
      {/* Section Header */}
      <div className="mb-10 sm:mb-16 relative">
        {/* Separator with section number */}
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <span className="font-mono text-xs text-yale-blue-light font-bold tracking-widest">03</span>
          <div className="flex-1 h-px bg-yale-blue" />
          <span className="font-mono text-[10px] text-alabaster/30 tracking-[0.2em] uppercase">CAPABILITY_MATRIX</span>
          <div className="w-12 h-px bg-yale-blue-light/50" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-yale-blue gap-6">
          <div>
            <h2 id="system-heading" className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight uppercase">
              <span style={{ WebkitTextStroke: '2px rgba(96,153,190,0.85)', color: 'transparent' }}>THE </span>
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

      {/* Capability Manifest — full-width module rows */}
      <div>
        {skillCategories.map((group, idx) => {
          const Icon = group.icon

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ease: 'easeOut', duration: 0.4, delay: idx * 0.09 }}
              className="group relative border-b border-yale-blue last:border-b-0 overflow-hidden"
            >
              {/* Ghost category watermark */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <span
                  className="font-sans font-black uppercase leading-none"
                  style={{ fontSize: '4.5rem', color: 'rgba(40,75,99,0.14)', letterSpacing: '-0.04em' }}
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
                  <div key={skill} className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-stormy-teal-light/35 group-hover:text-stormy-teal-light/65 transition-colors duration-200 select-none">
                      {String(skillIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-sm text-alabaster/90 group-hover:text-brand-white transition-colors duration-200 font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
