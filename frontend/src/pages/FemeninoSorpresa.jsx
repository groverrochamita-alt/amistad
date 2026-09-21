import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ramoImg from '../assets/girasoles.jpg'
import ratitaImg from '../assets/ratita.jpg'
import musicaUrl from '../assets/RosaPastel.mp3'
import './FemeninoSorpresa.css'

/* ══════════════════════════════════════════
   PAISAJE
══════════════════════════════════════════ */

/* Flor individual del paisaje */
function LandFlower({ x, groundY, size, color, petalColor, delay }) {
  return (
    <motion.g
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay, duration: 0.7, ease: 'backOut' }}
      style={{ transformOrigin: `${x}px ${groundY}px` }}
    >
      {/* Tallo */}
      <line x1={x} y1={groundY} x2={x} y2={groundY - size * 1.6}
        stroke="#3d8a20" strokeWidth={size * 0.18} strokeLinecap="round" />
      {/* Hoja izq */}
      <ellipse cx={x - size * 0.5} cy={groundY - size * 0.9}
        rx={size * 0.35} ry={size * 0.15}
        fill="#4a9a22" transform={`rotate(-30 ${x - size*0.5} ${groundY - size*0.9})`} />
      {/* Hoja der */}
      <ellipse cx={x + size * 0.5} cy={groundY - size * 1.1}
        rx={size * 0.35} ry={size * 0.15}
        fill="#4a9a22" transform={`rotate(30 ${x + size*0.5} ${groundY - size*1.1})`} />
      {/* Pétalos */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (360 / 8) * i
        return (
          <ellipse key={i}
            cx={x} cy={groundY - size * 1.6 - size * 0.45}
            rx={size * 0.22} ry={size * 0.42}
            fill={petalColor}
            transform={`rotate(${angle} ${x} ${groundY - size * 1.6})`}
            opacity="0.92"
          />
        )
      })}
      {/* Centro */}
      <circle cx={x} cy={groundY - size * 1.6} r={size * 0.28} fill={color} />
      <circle cx={x} cy={groundY - size * 1.6} r={size * 0.14} fill={color === '#4a2800' ? '#6a3800' : '#ffcc00'} />
    </motion.g>
  )
}

/* Mariposa */
function Butterfly({ x, y, delay }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [0, 40, 80, 50, 100], y: [0, -20, 10, -30, -10] }}
      transition={{ delay, duration: 8, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 40 30" width="40" height="30">
        <motion.ellipse cx="12" cy="12" rx="11" ry="8" fill="#ff69b4" opacity="0.8"
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse cx="28" cy="12" rx="11" ry="8" fill="#ff4da6" opacity="0.8"
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
        />
        <motion.ellipse cx="14" cy="20" rx="7" ry="5" fill="#ff80c0" opacity="0.7"
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse cx="26" cy="20" rx="7" ry="5" fill="#ff80c0" opacity="0.7"
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
        />
        <ellipse cx="20" cy="15" rx="2" ry="7" fill="#2a1a00" />
      </svg>
    </motion.div>
  )
}

/* Paisaje SVG completo */
function Landscape({ msgIndex }) {
  const W = 800, H = 400
  const groundY = H * 0.72

  // flores rojas — aparecen en mensaje 0
  const redFlowers = [
    { x: 60,  size: 22, color: '#8b0000', petalColor: '#e8001a', delay: 0.3 },
    { x: 130, size: 18, color: '#8b0000', petalColor: '#ff1a2e', delay: 0.5 },
    { x: 200, size: 24, color: '#7a0000', petalColor: '#cc0016', delay: 0.7 },
    { x: 90,  size: 16, color: '#900000', petalColor: '#ff3344', delay: 0.9 },
    { x: 160, size: 20, color: '#8b0000', petalColor: '#e8001a', delay: 1.1 },
    { x: 30,  size: 14, color: '#7a0000', petalColor: '#ff2233', delay: 1.3 },
  ]

  // flores amarillas — aparecen en mensaje 1
  const yellowFlowers = [
    { x: 580, size: 24, color: '#4a2800', petalColor: '#ffd700', delay: 0.2 },
    { x: 650, size: 20, color: '#4a2800', petalColor: '#ffcc00', delay: 0.4 },
    { x: 720, size: 26, color: '#4a2800', petalColor: '#ffe044', delay: 0.6 },
    { x: 610, size: 17, color: '#4a2800', petalColor: '#ffc800', delay: 0.8 },
    { x: 760, size: 19, color: '#4a2800', petalColor: '#ffd700', delay: 1.0 },
    { x: 550, size: 15, color: '#4a2800', petalColor: '#ffda00', delay: 1.2 },
  ]

  // flores mixtas centro — aparecen en mensaje 2
  const mixFlowers = [
    { x: 280, size: 20, color: '#8b0000', petalColor: '#ff1a2e', delay: 0.1 },
    { x: 340, size: 23, color: '#4a2800', petalColor: '#ffd700', delay: 0.25 },
    { x: 400, size: 21, color: '#8b0000', petalColor: '#e8001a', delay: 0.4 },
    { x: 460, size: 25, color: '#4a2800', petalColor: '#ffcc00', delay: 0.55 },
    { x: 510, size: 18, color: '#8b0000', petalColor: '#ff3344', delay: 0.7 },
    { x: 310, size: 16, color: '#4a2800', petalColor: '#ffe044', delay: 0.85 },
    { x: 440, size: 17, color: '#8b0000', petalColor: '#cc0016', delay: 1.0 },
    { x: 370, size: 19, color: '#4a2800', petalColor: '#ffd700', delay: 1.15 },
  ]

  return (
    <div className="landscape-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMax meet">

        {/* Cielo degradado */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0020" />
            <stop offset="60%" stopColor="#1a0535" />
            <stop offset="100%" stopColor="#2d1060" />
          </linearGradient>
          <linearGradient id="skyBright" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0535" />
            <stop offset="50%" stopColor="#4a1580" />
            <stop offset="100%" stopColor="#7a2da0" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4a08" />
            <stop offset="100%" stopColor="#0d2a04" />
          </linearGradient>
          <radialGradient id="moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9e0" />
            <stop offset="100%" stopColor="#ffe080" />
          </radialGradient>
        </defs>

        {/* Cielo */}
        <motion.rect x="0" y="0" width={W} height={H}
          fill="url(#sky)"
          animate={msgIndex >= 1 ? { fill: 'url(#skyBright)' } : {}}
          transition={{ duration: 2 }}
        />

        {/* Luna */}
        <motion.circle cx={W * 0.8} cy={H * 0.18} r={30}
          fill="url(#moon)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ filter: 'drop-shadow(0 0 12px rgba(255,240,150,0.6))' }}
        />

        {/* Estrellas */}
        {Array.from({ length: 30 }, (_, i) => (
          <motion.circle key={i}
            cx={(i * 137.5) % W} cy={(i * 73) % (H * 0.6)}
            r={1 + (i % 3) * 0.5}
            fill="white" opacity={0.4 + (i % 4) * 0.15}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.5 + (i % 4), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}

        {/* Colinas de fondo */}
        <motion.path
          d={`M0 ${groundY + 30} Q${W*0.25} ${groundY - 60} ${W*0.5} ${groundY + 20} Q${W*0.75} ${groundY + 60} ${W} ${groundY - 20} L${W} ${H} L0 ${H}Z`}
          fill="#0f3005"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        />
        {/* Colina más cercana */}
        <motion.path
          d={`M0 ${groundY + 50} Q${W*0.2} ${groundY} ${W*0.4} ${groundY + 30} Q${W*0.65} ${groundY + 60} ${W} ${groundY + 10} L${W} ${H} L0 ${H}Z`}
          fill="#163d07"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        />
        {/* Suelo principal */}
        <motion.rect x="0" y={groundY + 50} width={W} height={H - groundY - 50}
          fill="url(#ground)"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          style={{ transformOrigin: `0 ${H}px` }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Pasto */}
        {Array.from({ length: 60 }, (_, i) => {
          const gx = (i * 14) % W
          const h = 8 + (i % 5) * 4
          return (
            <motion.line key={i}
              x1={gx} y1={groundY + 52} x2={gx + (i%2===0?3:-3)} y2={groundY + 52 - h}
              stroke={`hsl(${110 + (i%20)}, 60%, ${25 + (i%10)*2}%)`}
              strokeWidth="1.5" strokeLinecap="round"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${gx}px ${groundY + 52}px` }}
              transition={{ delay: 0.5 + i * 0.01, duration: 0.4 }}
            />
          )
        })}

        {/* FLORES ROJAS — mensaje 0 */}
        {msgIndex >= 0 && redFlowers.map((f, i) => (
          <LandFlower key={`r${i}`} {...f} groundY={groundY + 52} />
        ))}

        {/* FLORES AMARILLAS — mensaje 1 */}
        {msgIndex >= 1 && yellowFlowers.map((f, i) => (
          <LandFlower key={`y${i}`} {...f} groundY={groundY + 52} />
        ))}

        {/* FLORES MIXTAS CENTRO — mensaje 2 */}
        {msgIndex >= 2 && mixFlowers.map((f, i) => (
          <LandFlower key={`m${i}`} {...f} groundY={groundY + 52} />
        ))}

        {/* Brillo de luna en suelo */}
        <motion.ellipse cx={W * 0.8} cy={groundY + 55} rx={60} ry={10}
          fill="rgba(255,240,150,0.08)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

      </svg>

      {/* Mariposas — aparecen con mensaje 2 */}
      {msgIndex >= 2 && [
        { x: '15%', y: '55%', delay: 0.5 },
        { x: '60%', y: '60%', delay: 1.2 },
        { x: '40%', y: '50%', delay: 2 },
      ].map((b, i) => <Butterfly key={i} x={b.x} y={b.y} delay={b.delay} />)}

      {/* Partículas de luz flotantes */}
      {msgIndex >= 1 && Array.from({ length: 18 }, (_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            left: `${5 + (i * 17) % 90}%`,
            top: `${20 + (i * 11) % 60}%`,
            width: 4, height: 4,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(255,215,0,0.7)' : 'rgba(255,80,120,0.7)',
            pointerEvents: 'none',
            boxShadow: `0 0 6px ${i % 2 === 0 ? 'rgba(255,215,0,0.8)' : 'rgba(255,80,120,0.8)'}`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
function TypeWriter({ text, className = '', onDone }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        if (onDone) setTimeout(onDone, 1800)
      }
    }, 65)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span className="cursor"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >|</motion.span>
      )}
    </span>
  )
}

const MESSAGES = [
  { text: 'Por si no te regalaron tus flores amarillas.....', size: 'lg' },
  { text: 'no te preocupes, yo te voy a regalar una.......', size: 'md' },
  { text: 'Pero en digital, como buen inge que soy XD.', size: 'md' },
  { text: 'Si estás viendo esto, desearte lo mejor y muchas gracias por tu amistad.', size: 'xl' },
]

/* ══════════════════════════════════════════
   CONFETI + GIRASOL CAYENDO
══════════════════════════════════════════ */
function Confetti({ x, color, delay, shape }) {
  return (
    <motion.div style={{
      position: 'fixed', left: `${x}%`, top: -20,
      width: shape === 'rect' ? 10 : 7, height: shape === 'rect' ? 5 : 7,
      background: color, borderRadius: shape === 'rect' ? '2px' : '50%',
      zIndex: 0, pointerEvents: 'none',
    }}
      animate={{ y: ['0vh','110vh'], x:[0,40,-30,20,0], rotate:[0,720], opacity:[1,1,0.2] }}
      transition={{ duration: 4 + Math.random()*4, delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function FallingSunflower({ x, size, duration, delay }) {
  return (
    <motion.div style={{ position:'fixed', left:`${x}%`, top:-80, zIndex:0, pointerEvents:'none' }}
      animate={{ y:['0vh','115vh'], rotate:[0,360] }}
      transition={{ duration, delay, repeat:Infinity, ease:'linear' }}
    >
      <svg viewBox="0 0 60 60" width={size} height={size}>
        {Array.from({length:12},(_,i)=>(
          <ellipse key={i} cx="30" cy="12" rx="5" ry="11"
            fill={i%2===0?'#ffc200':'#ffd700'} opacity="0.85"
            transform={`rotate(${(360/12)*i} 30 30)`} />
        ))}
        <circle cx="30" cy="30" r="11" fill="#4a2800"/>
        <circle cx="30" cy="30" r="7" fill="#3a1e00"/>
      </svg>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════════ */
export default function FemeninoSorpresa() {
  const navigate = useNavigate()
  const audioRef = useRef(null)
  const [phase, setPhase] = useState('message')
  const [msgIndex, setMsgIndex] = useState(0)
  const [showFirma, setShowFirma] = useState(false)
  const [falling, setFalling] = useState([])
  const [confetti, setConfetti] = useState([])
  const [ready, setReady] = useState(false) // pantalla de entrada

  useEffect(() => {
    const data = localStorage.getItem('visitante')
    if (!data) { navigate('/'); return }

    // Reutilizar el audio que ya arrancó en Femenino.jsx (interacción del usuario)
    if (window.__sorpresaAudio) {
      audioRef.current = window.__sorpresaAudio
    } else {
      // Fallback: crear audio nuevo (puede ser bloqueado por el navegador)
      const audio = new Audio(musicaUrl)
      audio.loop = false
      audio.volume = 0.5
      audio.play().catch(() => {})
      audioRef.current = audio
      window.__sorpresaAudio = audio
    }

    // Forzar reload cuando el usuario navega con flechas del navegador
    const handlePop = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
        window.__sorpresaAudio = null
      }
      window.location.href = window.location.href
    }
    window.addEventListener('popstate', handlePop)

    setFalling(Array.from({ length: 10 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      size: 18 + Math.random() * 18,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 8,
    })))
    setConfetti(Array.from({ length: 35 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      color: ['#ffd700','#ff69b4','#ff4d9e','#ffec4d','#fff','#ff9500','#3d8a20'][i%7],
      delay: Math.random() * 6,
      shape: i % 3 === 0 ? 'rect' : 'circle',
    })))

    // Al montar, marcar como listo directamente (sin pantalla de entrada)
    setReady(true)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
        window.__sorpresaAudio = null
      }
      window.removeEventListener('popstate', handlePop)
    }
  }, [navigate])

  const handleMsgDone = () => {
    if (msgIndex < MESSAGES.length - 1) {
      setTimeout(() => setMsgIndex(i => i + 1), 1000)
    } else {
      setTimeout(() => setPhase('bouquet'), 2000)
    }
  }

  return (
    <div className="sorpresa-container">
      <div className="sorpresa-bg" />

      {falling.map(f => <FallingSunflower key={f.id} {...f} />)}
      {phase === 'bouquet' && confetti.map(c => <Confetti key={c.id} {...c} />)}

      <div className="sorpresa-stage">
        <AnimatePresence mode="wait">

          {/* ── FASE 1: paisaje + mensajes ── */}
          {phase === 'message' && (
            <motion.div key="msgs" className="msgs-scene"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            >
              {/* Paisaje de fondo */}
              <Landscape msgIndex={msgIndex} />

              {/* Mensajes encima */}
              <div className="msgs-overlay">
                {MESSAGES.map((m, i) => (
                  <AnimatePresence key={i}>
                    {msgIndex >= i && (
                      <motion.p className={`msg-line msg-${m.size}`}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      >
                        {msgIndex === i
                          ? <TypeWriter text={m.text} onDone={handleMsgDone} className={`tw-${m.size}`} />
                          : <span className={`tw-${m.size}`}>{m.text}</span>
                        }
                      </motion.p>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── FASE 2: ramo foto + mensaje final ── */}
          {phase === 'bouquet' && (
            <motion.div key="bouquet" className="bouquet-phase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="ramo-img-wrap"
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'backOut' }}
              >
                <motion.div className="ramo-glow"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.img src={ramoImg} alt="Ramo de girasoles" className="ramo-img"
                  animate={{ y: [0,-8,0], rotate: [-1,1,-1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              <motion.div className="final-msg-wrap"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                <motion.h1 className="final-title"
                  initial={{ opacity: 0, letterSpacing: '0.5em' }}
                  animate={{ opacity: 1, letterSpacing: '0.02em' }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                >
                  Feliz Día de la Amistad
                </motion.h1>

                <motion.div className="final-divider"
                  initial={{ width: 0 }} animate={{ width: '70%' }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                />

                <motion.p className="final-message"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  onAnimationComplete={() => setTimeout(() => setShowFirma(true), 400)}
                >
                  Gracias por tu amistad, Nunca me arrepentiré de haberte conocido :D
                </motion.p>

                <AnimatePresence>
                  {showFirma && (
                    <motion.div className="firma-wrap"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.7, ease: 'backOut' }}
                    >
                      <motion.div className="firma-line" />
                      <motion.p className="firma-text">Con cariño,</motion.p>
                      <motion.p className="firma-nombre"
                        animate={{ textShadow: [
                          '0 0 10px rgba(255,215,0,0.3)',
                          '0 0 30px rgba(255,215,0,0.8)',
                          '0 0 10px rgba(255,215,0,0.3)',
                        ]}}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        tu amigo: Grover
                      </motion.p>
                      <motion.div className="ratita-wrap"
                        initial={{ opacity: 0, scale: 0.7, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: 'backOut' }}
                      >
                        <motion.img src={ratitaImg} alt="ratita" className="ratita-img"
                          animate={{ y:[0,-5,0], rotate:[-2,2,-2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button className="final-btn"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause()
                      audioRef.current.currentTime = 0
                    }
                    navigate('/')
                  }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.8 }}
                >
                  Volver al inicio
                </motion.button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  )
}
