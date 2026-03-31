import { motion } from 'framer-motion'
import { TerminalSquare, Send } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'

export default function CommandCenter({ id }) {
  const [formState, setFormState] = useState('idle') // idle, submitting, success
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input) return
    
    setFormState('submitting')
    
    // Simulate terminal execution
    setTimeout(() => {
      setFormState('success')
      setInput('')
      
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }, 800)
  }

  return (
    <section id={id} className="min-h-screen py-32 relative z-10 flex flex-col justify-center">
      
      {/* Target Reticle decoration */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-yale-blue opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-yale-blue" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yale-blue" />
      </div>

      {/* Section number marker */}
      <div className="flex items-center gap-3 mb-12 max-w-3xl w-full mx-auto">
        <span className="font-mono text-xs text-alabaster/25 font-bold tracking-widest">04</span>
        <div className="flex-1 h-px bg-yale-blue/30" />
        <span className="font-mono text-[10px] text-alabaster/20 tracking-[0.2em] uppercase">DIRECT_LINE</span>
        <div className="w-12 h-px bg-alabaster/10" />
      </div>

      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut", duration: 0.3 }}
          className="border sharp-border bg-graphite-200 shadow-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b sharp-border bg-graphite-100 p-4">
            <div className="flex items-center gap-3 text-yale-blue-light font-bold">
              <TerminalSquare size={16} />
              <span className="font-mono text-xs uppercase tracking-widest text-stormy-teal-light">
                Direct_Line :: SECURE_CHANNEL
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-yale-blue" />
              <div className="w-2 h-2 bg-yale-blue" />
              <div className="w-2 h-2 bg-stormy-teal-light animate-pulse" />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-brand-white mb-6 tracking-tight">
              Establish Connection
            </h2>
            <p className="font-mono text-alabaster/80 text-sm mb-12 leading-relaxed">
              $ READY_FOR_INPUT. <br />
              $ Awaiting protocol initiation for new architectural inquiries.
            </p>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <div className="flex-1 relative flex items-center">
                  <span className="absolute left-4 font-mono text-stormy-teal-light font-bold">
                    &gt;
                  </span>
                  <input
                    type="email"
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={formState !== 'idle'}
                    className="w-full bg-graphite-100 border sharp-border font-mono text-sm text-brand-white py-4 pl-10 pr-4 placeholder:text-yale-blue-light focus:outline-none focus:border-stormy-teal-light focus:ring-1 focus:ring-brand-orange transition-colors duration-150 rounded-none disabled:opacity-50"
                    placeholder="ENTER_EMAIL_ADDRESS"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={clsx(
                    "group relative flex items-center justify-center font-mono text-sm font-bold tracking-wider px-8 py-4 transition-all duration-150 ease-out border overflow-hidden",
                    formState === 'idle' ? "bg-stormy-teal-light border-stormy-teal-light text-graphite-100 hover:bg-transparent" : "bg-green-500/10 border-green-500 text-green-500"
                  )}
                >
                  <span className={clsx(
                    "absolute inset-0 w-full h-full bg-graphite-100 -translate-x-full transition-transform duration-150 ease-out",
                    formState === 'idle' ? "group-hover:translate-x-0" : ""
                  )} />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-stormy-teal-light transition-colors duration-150">
                    {formState === 'idle' && (
                      <>EXECUTE <Send size={14} /></>
                    )}
                    {formState === 'submitting' && 'PROCESSING...'}
                    {formState === 'success' && 'PACKET_SENT'}
                  </span>
                </button>
              </div>

              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 font-mono text-xs text-green-500"
                >
                  $ [OK] Handshake successful. Standing by for response.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
