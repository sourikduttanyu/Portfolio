export default function SideEffects() {
  return (
    <>
      {/* ── Aurora blobs ─────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Left column */}
        <div style={{
          position: 'fixed', left: -40, top: '6%',
          width: 500, height: 560,
          background: 'radial-gradient(circle, rgba(45,212,240,0.20) 0%, rgba(45,212,240,0.08) 45%, transparent 75%)',
          borderRadius: '50%',
          animation: 'aurora-a 22s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', left: -20, top: '44%',
          width: 380, height: 440,
          background: 'radial-gradient(circle, rgba(91,164,245,0.17) 0%, rgba(91,164,245,0.07) 45%, transparent 75%)',
          borderRadius: '50%',
          animation: 'aurora-b 30s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', left: -30, top: '76%',
          width: 420, height: 380,
          background: 'radial-gradient(circle, rgba(45,212,240,0.14) 0%, rgba(45,212,240,0.05) 50%, transparent 80%)',
          borderRadius: '50%',
          animation: 'aurora-c 38s ease-in-out infinite',
        }} />

        {/* Right column */}
        <div style={{
          position: 'fixed', right: 30, top: '14%',
          width: 460, height: 500,
          background: 'radial-gradient(circle, rgba(91,164,245,0.20) 0%, rgba(91,164,245,0.08) 45%, transparent 75%)',
          borderRadius: '50%',
          animation: 'aurora-b 26s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'fixed', right: 20, top: '56%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(45,212,240,0.16) 0%, rgba(45,212,240,0.06) 45%, transparent 75%)',
          borderRadius: '50%',
          animation: 'aurora-a 32s ease-in-out infinite reverse',
        }} />
        {/* Warm amber — adds life/warmth to the right side */}
        <div style={{
          position: 'fixed', right: 40, top: '78%',
          width: 340, height: 340,
          background: 'radial-gradient(circle, rgba(245,158,11,0.13) 0%, rgba(245,158,11,0.04) 50%, transparent 80%)',
          borderRadius: '50%',
          animation: 'aurora-c 24s ease-in-out infinite',
        }} />
      </div>

      {/* ── Left signal track ──────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 3, width: 80, height: '100vh' }}
        aria-hidden="true"
      >
        {/* Rail 1 */}
        <div style={{
          position: 'absolute', left: 22, top: '7%', bottom: '7%', width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(45,212,240,0.35) 20%, rgba(45,212,240,0.35) 80%, transparent)',
        }} />
        {/* Dot 1 — travels down */}
        <div style={{
          position: 'absolute', left: 18, top: '7%',
          width: 8, height: 8, borderRadius: '50%',
          background: '#2dd4f0',
          boxShadow: '0 0 10px rgba(45,212,240,0.9), 0 0 22px rgba(45,212,240,0.35)',
          animation: 'signal-down 9s linear infinite',
        }} />

        {/* Rail 2 */}
        <div style={{
          position: 'absolute', left: 48, top: '18%', bottom: '18%', width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(91,164,245,0.25) 25%, rgba(91,164,245,0.25) 75%, transparent)',
        }} />
        {/* Dot 2 — travels down, offset */}
        <div style={{
          position: 'absolute', left: 45, top: '18%',
          width: 5, height: 5, borderRadius: '50%',
          background: '#5ba4f5',
          boxShadow: '0 0 8px rgba(91,164,245,0.85)',
          animation: 'signal-down-b 14s linear infinite',
          animationDelay: '-5s',
        }} />
      </div>

      {/* ── Right signal track ─────────────────────────────────── */}
      <div
        className="fixed top-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 3, right: 64, width: 80, height: '100vh' }}
        aria-hidden="true"
      >
        {/* Rail 1 */}
        <div style={{
          position: 'absolute', left: 10, top: '7%', bottom: '7%', width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(45,212,240,0.28) 20%, rgba(45,212,240,0.28) 80%, transparent)',
        }} />
        {/* Dot 1 — travels up */}
        <div style={{
          position: 'absolute', left: 6, top: '93%',
          width: 8, height: 8, borderRadius: '50%',
          background: '#2dd4f0',
          boxShadow: '0 0 10px rgba(45,212,240,0.85)',
          animation: 'signal-up 11s linear infinite',
          animationDelay: '-4s',
        }} />

        {/* Rail 2 */}
        <div style={{
          position: 'absolute', left: 36, top: '14%', bottom: '14%', width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(91,164,245,0.20) 25%, rgba(91,164,245,0.20) 75%, transparent)',
        }} />
        {/* Dot 2 — travels up, offset */}
        <div style={{
          position: 'absolute', left: 33, top: '82%',
          width: 5, height: 5, borderRadius: '50%',
          background: '#5ba4f5',
          boxShadow: '0 0 7px rgba(91,164,245,0.75)',
          animation: 'signal-up-b 17s linear infinite',
          animationDelay: '-9s',
        }} />
      </div>
    </>
  )
}
