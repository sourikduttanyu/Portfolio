const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')

const dot = document.createElement('div')
dot.className = 'lag-cursor'
dot.setAttribute('aria-hidden', 'true')
document.body.appendChild(dot)

const state = { enabled: false, initialized: false, x: 0, y: 0, tx: 0, ty: 0, raf: 0 }

function isTextTarget(el) {
  if (!el) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return true
  if (el.isContentEditable) return true
  return false
}

function loop() {
  if (!state.enabled) return
  state.x += (state.tx - state.x) * 0.12
  state.y += (state.ty - state.y) * 0.12
  dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`
  state.raf = requestAnimationFrame(loop)
}

function setEnabled(enabled) {
  state.enabled = enabled
  document.body.classList.toggle('lag-cursor-enabled', enabled)
  if (!enabled) {
    document.body.classList.remove('lag-cursor-text-mode')
    dot.classList.remove('visible', 'is-text')
    if (state.raf) cancelAnimationFrame(state.raf)
    state.raf = 0
    return
  }
  if (!state.raf) state.raf = requestAnimationFrame(loop)
}

document.addEventListener('pointermove', (e) => {
  if (!state.enabled) return
  state.tx = e.clientX
  state.ty = e.clientY
  if (!state.initialized) {
    state.x = e.clientX
    state.y = e.clientY
    state.initialized = true
  }
  const textMode = isTextTarget(e.target)
  document.body.classList.toggle('lag-cursor-text-mode', textMode)
  dot.classList.toggle('is-text', textMode)
  dot.classList.add('visible')
}, { passive: true })

document.addEventListener('pointerleave', () => dot.classList.remove('visible'))
window.addEventListener('blur', () => dot.classList.remove('visible'))

setEnabled(media.matches)
media.addEventListener('change', (e) => setEnabled(e.matches))
