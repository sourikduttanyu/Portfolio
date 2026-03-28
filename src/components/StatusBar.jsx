import { motion, useScroll, useSpring } from 'framer-motion'
import { Terminal, Lightbulb, Blocks, Send, ScrollText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const navItems = [
  { id: 'hero', icon: Terminal, label: '00: /INIT' },
  { id: 'blueprints', icon: Lightbulb, label: '01: /BLPRNTS' },
  { id: 'logs', icon: ScrollText, label: '02: /LOGS' },
  { id: 'system', icon: Blocks, label: '03: /SYSTM' },
  { id: 'contact', icon: Send, label: '04: /CMND' }
]

export default function StatusBar() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-0 top-0 bottom-0 z-50 flex flex-col items-center w-12 sm:w-16 border-l border-yale-blue bg-graphite-100 w-[48px] sm:w-[64px]">
      {/* Background Track */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-yale-blue -translate-x-1/2" />
      
      {/* Scroll Progress Line */}
      <motion.div 
        className="absolute top-0 left-1/2 w-px bg-stormy-teal-light origin-top -translate-x-1/2"
        style={{ scaleY, bottom: 0 }}
      />

      <div className="flex flex-col justify-center items-center h-full gap-12 sm:gap-16 w-full relative z-10">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          const Icon = item.icon

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative group flex items-center justify-center w-full transition-all duration-200 ease-out",
                isActive ? "text-brand-white" : "text-yale-blue-light hover:text-stormy-teal-light"
              )}
              title={item.label}
            >
              <div 
                className={cn(
                  "absolute right-full mr-4 px-2 py-1 bg-graphite-100 border sharp-border text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out whitespace-nowrap hidden sm:block pointer-events-none",
                  isActive ? "border-stormy-teal-light text-stormy-teal-light" : "border-yale-blue text-yale-blue-light"
                )}
              >
                {item.label}
              </div>
              
              <div className={cn(
                "relative flex items-center justify-center bg-graphite-100 w-8 h-8 rounded-none border transition-colors duration-200 ease-out",
                isActive ? "border-stormy-teal-light outline-1 outline-brand-orange outline-offset-2" : "border-yale-blue group-hover:border-stormy-teal-light group-hover:text-stormy-teal-light text-yale-blue-light/70"
              )}>
                <Icon size={16} strokeWidth={1.5} />
              </div>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
