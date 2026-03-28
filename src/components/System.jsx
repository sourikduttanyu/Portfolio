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
    <section id={id} className="min-h-screen py-32 border-b border-yale-blue relative z-10 transition-colors duration-200">
      
      {/* Section Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-yale-blue pb-8 gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-sans font-extrabold text-brand-white tracking-tight uppercase">
            The System
          </h2>
          <p className="font-mono text-alabaster/80 mt-4 text-sm max-w-xl leading-relaxed">
            Operational capability matrices. Brutalist block structure
            representing foundational to advanced proficiency.
          </p>
        </div>
        <div className="font-mono text-xs text-stormy-teal-light text-right hidden md:block font-semibold tracking-wider">
          NODE_COUNT: {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} <br />
          INTEGRITY: 100%
        </div>
      </div>

      {/* Grid of Brutalist Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((group, idx) => {
          const Icon = group.icon
          
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ease: "easeOut", duration: 0.2, delay: idx * 0.05 }}
              className="group border border-yale-blue bg-graphite-100 hover:bg-yale-blue/10 transition-colors duration-150 flex flex-col"
            >
              {/* Top brutalist bar */}
              <div className="border-b sharp-border bg-yale-blue/20 p-4 flex items-center justify-between">
                <Icon className="text-yale-blue-light group-hover:text-stormy-teal-light transition-colors duration-150" size={20} strokeWidth={2} />
                <span className="font-mono text-xs tracking-wider text-alabaster font-bold group-hover:text-brand-white transition-colors duration-150">
                  {group.category}
                </span>
              </div>
              
              {/* Skills List */}
              <div className="p-6 flex-grow flex flex-col gap-3">
                {group.skills.map((skill, skillIdx) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-stormy-teal-light/30 group-hover:bg-stormy-teal-light transition-colors duration-150" style={{ transitionDelay: `${skillIdx * 30}ms` }} />
                    <span className="font-sans text-sm text-alabaster/90 group-hover:text-brand-white transition-colors duration-150 font-medium tracking-tight">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom decorative bracket */}
              <div className="h-2 border-t border-yale-blue relative">
                <div className="absolute top-0 right-0 w-8 h-[2px] bg-stormy-teal-light transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
