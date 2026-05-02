import { motion, AnimatePresence } from 'framer-motion'
import { TerminalSquare, Send, GitBranch, Briefcase, Mail, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

// Sign up at formspree.io → create a form → paste your form ID here
const FORMSPREE_ID = 'YOUR_FORM_ID'

const ease = [0.16, 1, 0.3, 1]

const CHANNELS = [
  { label: 'GITHUB_NODE',    href: 'https://github.com/sourikduttanyu',               Icon: GitBranch, handle: '/sourikduttanyu' },
  { label: 'LINKEDIN_NODE',  href: 'https://linkedin.com/in/sourik-dutta-71a34a17b/', Icon: Briefcase, handle: '/sourik-dutta' },
  { label: 'DIRECT_MAIL',    href: 'mailto:sourik1999dutta@gmail.com',                Icon: Mail,      handle: 'sourik1999dutta@gmail.com' },
]

export default function CommandCenter({ id }) {
  const [fields, setFields]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus]   = useState('idle')    // idle | sending | success | error
  const [log,    setLog]      = useState([])

  const appendLog = (msg, type = 'info') =>
    setLog(prev => [...prev, { msg, type, key: Date.now() + Math.random() }])

  const handleChange = (e) =>
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status !== 'idle') return

    setLog([])
    setStatus('sending')
    appendLog('Initiating handshake with target node...')

    await new Promise(r => setTimeout(r, 380))
    appendLog('Payload encrypted. Routing via secure channel...')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(fields),
      })

      await new Promise(r => setTimeout(r, 300))

      if (res.ok) {
        appendLog('ACK received. Transmission successful.', 'success')
        appendLog('Standby — response inbound.', 'success')
        setStatus('success')
        setFields({ name: '', email: '', message: '' })
      } else {
        throw new Error('non-ok')
      }
    } catch {
      appendLog('ERR: Connection refused. Retrying...', 'error')
      await new Promise(r => setTimeout(r, 600))
      appendLog('Max retries exceeded. Check inputs and retry.', 'error')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  const fieldClass =
    'w-full bg-transparent font-mono text-sm text-brand-white placeholder:text-yale-blue-light/35 ' +
    'focus:outline-none border-b border-yale-blue focus:border-stormy-teal-light ' +
    'transition-colors duration-200 py-2.5 pl-6 pr-2 disabled:opacity-40'

  return (
    <section id={id} className="py-16 sm:py-24 lg:py-32 relative z-10">

      {/* Section number marker */}
      <div className="flex items-center gap-3 mb-8 sm:mb-12">
        <span className="font-mono text-xs text-alabaster/25 font-bold tracking-widest">04</span>
        <div className="flex-1 h-px bg-yale-blue/30" />
        <span className="font-mono text-[10px] text-alabaster/20 tracking-[0.2em] uppercase">DIRECT_LINE</span>
        <div className="w-12 h-px bg-alabaster/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ease, duration: 0.55 }}
        className="border border-yale-blue overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5">

          {/* ── LEFT: form terminal (3/5) ── */}
          <div className="lg:col-span-3 flex flex-col border-b lg:border-b-0 lg:border-r border-yale-blue">

            {/* Terminal titlebar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-graphite-200 border-b border-yale-blue flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <TerminalSquare size={13} className="text-stormy-teal-light" />
                <span className="font-mono text-[10px] text-stormy-teal-light tracking-[0.2em] uppercase">
                  SECURE_CHANNEL :: DIRECT_LINE
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-yale-blue" />
                <div className="w-2 h-2 bg-yale-blue" />
                <div className="w-2 h-2 bg-stormy-teal-light animate-pulse" />
              </div>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-5 sm:p-8 gap-6 sm:gap-8">

              <div>
                <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight leading-tight">
                  <span className="text-brand-white">Establish</span>{' '}
                  <span style={{ WebkitTextStroke: '1.5px #2dd4f0', color: 'transparent' }}>Connection</span>
                </h2>
                <p className="font-mono text-[11px] text-alabaster/35 mt-3 leading-loose">
                  $ READY_FOR_INPUT. Awaiting protocol initiation.
                </p>
              </div>

              <div className="space-y-7">

                {/* Name */}
                <div>
                  <label htmlFor="cc-name" className="font-mono text-[9px] text-alabaster/30 tracking-[0.22em] uppercase block mb-2">
                    NAME
                  </label>
                  <div className="relative flex items-center">
                    <span aria-hidden="true" className="absolute left-0 font-mono text-stormy-teal-light text-base leading-none select-none">›</span>
                    <input
                      id="cc-name"
                      type="text"
                      name="name"
                      required
                      value={fields.name}
                      onChange={handleChange}
                      disabled={status === 'sending' || status === 'success'}
                      placeholder="your name"
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="cc-email" className="font-mono text-[9px] text-alabaster/30 tracking-[0.22em] uppercase block mb-2">
                    EMAIL
                  </label>
                  <div className="relative flex items-center">
                    <span aria-hidden="true" className="absolute left-0 font-mono text-stormy-teal-light text-base leading-none select-none">›</span>
                    <input
                      id="cc-email"
                      type="email"
                      name="email"
                      required
                      value={fields.email}
                      onChange={handleChange}
                      disabled={status === 'sending' || status === 'success'}
                      placeholder="your@email.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="cc-message" className="font-mono text-[9px] text-alabaster/30 tracking-[0.22em] uppercase block mb-2">
                    MESSAGE
                  </label>
                  <div className="relative flex items-start">
                    <span aria-hidden="true" className="absolute left-0 font-mono text-stormy-teal-light text-base leading-none select-none mt-2.5">›</span>
                    <textarea
                      id="cc-message"
                      name="message"
                      required
                      value={fields.message}
                      onChange={handleChange}
                      disabled={status === 'sending' || status === 'success'}
                      placeholder="your message..."
                      rows={4}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>
                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="group self-start flex items-center gap-2.5 font-mono text-[11px] tracking-widest uppercase px-6 py-3.5 border border-stormy-teal-light text-stormy-teal-light hover:bg-stormy-teal-light hover:text-graphite-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle'     && <><Send size={12} /> EXECUTE_TRANSMISSION</>}
                {status === 'sending'  && <><span className="animate-pulse">●●●</span>&nbsp;ROUTING</>}
                {status === 'success'  && <><span className="text-green-400">✓</span>&nbsp;PACKET_DELIVERED</>}
                {status === 'error'    && <><span className="text-red-400">✕</span>&nbsp;CONNECTION_FAILED</>}
              </button>

            </form>
          </div>

          {/* ── RIGHT: info + log (2/5) ── */}
          <div className="lg:col-span-2 bg-graphite-200 flex flex-col">

            {/* Identity card */}
            <div className="p-6 border-b border-yale-blue">
              <div className="font-mono text-[9px] text-stormy-teal-light/55 tracking-[0.25em] uppercase mb-5">
                TARGET_NODE :: IDENTITY
              </div>
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[9px] text-alabaster/25 tracking-wider uppercase block mb-1">DESIGNATION</span>
                  <span className="font-sans text-lg font-bold text-brand-white tracking-tight">Sourik Dutta</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-alabaster/25 tracking-wider uppercase block mb-1">ROLE</span>
                  <span className="font-mono text-xs text-alabaster/65 block">Software Engineer</span>
                  <span className="font-mono text-xs text-alabaster/40">MS CS @ New York University</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-alabaster/25 tracking-wider uppercase block mb-1.5">STATUS</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-stormy-teal-light animate-pulse" />
                    <span className="font-mono text-xs text-stormy-teal-light">ONLINE · OPEN_TO_WORK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary channels */}
            <div className="p-6 border-b border-yale-blue">
              <div className="font-mono text-[9px] text-stormy-teal-light/55 tracking-[0.25em] uppercase mb-4">
                SECONDARY_CHANNELS
              </div>
              <div className="space-y-3.5">
                {CHANNELS.map(({ href, Icon, handle }) => (
                  <a
                    key={handle}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-alabaster/45 hover:text-stormy-teal-light transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={12} strokeWidth={1.8} />
                      <span className="font-mono text-xs">{handle}</span>
                    </div>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  </a>
                ))}
              </div>
            </div>

            {/* Live transmission log */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="font-mono text-[9px] text-stormy-teal-light/55 tracking-[0.25em] uppercase mb-4">
                TRANSMISSION_LOG
              </div>
              <div className="flex-1 font-mono text-xs space-y-2 min-h-[80px]">
                <AnimatePresence mode="popLayout">
                  {log.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-alabaster/20"
                    >
                      _ awaiting input...
                    </motion.p>
                  ) : (
                    log.map((entry) => (
                      <motion.div
                        key={entry.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-2 leading-relaxed"
                      >
                        <span className="text-yale-blue-light flex-shrink-0">›</span>
                        <span className={
                          entry.type === 'success' ? 'text-green-400/80' :
                          entry.type === 'error'   ? 'text-red-400/75'   :
                          'text-alabaster/45'
                        }>
                          {entry.msg}
                        </span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
