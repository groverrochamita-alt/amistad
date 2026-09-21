import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import musicaUrl from '../assets/RosaPastel.mp3'
import './Femenino.css'

/* ── Pétalo cayendo ── */
function Petal({ x, size, duration, delay, rotate }) {
  return (
    <motion.div
      style={{ position: 'fixed', left: `${x}%`, top: -60, zIndex: 0, pointerEvents: 'none' }}
      animate={{ y: ['0vh', '110vh'], x: [0, 25, -15, 8, 0], rotate: [rotate, rotate + 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40">
        <ellipse cx="20" cy="20" rx="7" ry="15"
          fill="rgba(255,130,170,0.5)"
          transform={`rotate(${rotate} 20 20)`}
        />
      </svg>
    </motion.div>
  )
}

/* ── Caja de regalo SVG ── */
function GiftBox() {
  return (
    <motion.div
      className="gift-svg-wrap"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: 'backOut', delay: 0.3 }}
    >
      {/* Pulso de brillo */}
      <motion.div
        className="gift-glow"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 160 180" width="180" height="200">
          {/* Sombra */}
          <ellipse cx="80" cy="172" rx="50" ry="7" fill="rgba(0,0,0,0.35)" />

          {/* Cuerpo */}
          <rect x="20" y="90" width="120" height="80" rx="8"
            fill="#7c1f6b" stroke="#b03090" strokeWidth="2" />
          {/* Franja vertical cuerpo */}
          <rect x="68" y="90" width="24" height="80" fill="#b03090" />
          {/* Brillo cuerpo */}
          <rect x="22" y="92" width="6" height="76" rx="3" fill="rgba(255,255,255,0.1)" />

          {/* Tapa */}
          <rect x="14" y="72" width="132" height="22" rx="7"
            fill="#9b2882" stroke="#cc44aa" strokeWidth="2" />
          {/* Franja vertical tapa */}
          <rect x="68" y="72" width="24" height="22" fill="#cc44aa" />
          {/* Brillo tapa */}
          <rect x="16" y="74" width="5" height="18" rx="2.5" fill="rgba(255,255,255,0.12)" />

          {/* Moño izquierdo */}
          <motion.ellipse cx="62" cy="58" rx="22" ry="11"
            fill="#ff6eb0" stroke="#ff90c8" strokeWidth="1.5"
            transform="rotate(-35 62 58)"
            animate={{ rotate: [-35, -30, -35] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Moño derecho */}
          <motion.ellipse cx="98" cy="58" rx="22" ry="11"
            fill="#ff6eb0" stroke="#ff90c8" strokeWidth="1.5"
            transform="rotate(35 98 58)"
            animate={{ rotate: [35, 30, 35] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Centro moño */}
          <circle cx="80" cy="62" r="11" fill="#e0408a" />
          <circle cx="80" cy="61" r="6" fill="#ff80b8" />
          <circle cx="78" cy="59" r="2" fill="rgba(255,255,255,0.5)" />

          {/* Estrellas decorativas */}
          <circle cx="40" cy="120" r="3" fill="rgba(255,200,230,0.5)" />
          <circle cx="130" cy="110" r="2" fill="rgba(255,200,230,0.4)" />
          <circle cx="120" cy="140" r="2.5" fill="rgba(255,200,230,0.4)" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Femenino() {
  const navigate = useNavigate()
  const [visitante, setVisitante] = useState(null)
  const [petals, setPetals] = useState([])
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    // Detener música de sorpresa si viene de ahí
    if (window.__sorpresaAudio) {
      window.__sorpresaAudio.pause()
      window.__sorpresaAudio.currentTime = 0
      window.__sorpresaAudio = null
    }

    const data = localStorage.getItem('visitante')
    if (!data) { navigate('/'); return }
    setVisitante(JSON.parse(data))

    setPetals(Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 18,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 8,
      rotate: Math.random() * 360,
    })))

    // Botón aparece después de que la card entra
    setTimeout(() => setShowBtn(true), 1600)
  }, [navigate])

  if (!visitante) return null

  return (
    <div className="fem-container">
      {petals.map(p => <Petal key={p.id} {...p} />)}

      {/* Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="fem-orb"
          style={{
            left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 28}%`,
            width: 180 + i * 70, height: 180 + i * 70,
          }}
          animate={{ x: [0,30,-20,0], y: [0,-25,20,0], scale: [1,1.1,0.93,1] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}

      <div className="fem-stage">
        <motion.div
          className="fem-welcome-card"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          <GiftBox />

          {/* Mensaje de bienvenida */}
          <motion.div
            className="fem-welcome-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="fem-welcome-greeting">
              Hola,{' '}
              <span className="fem-name-highlight">
                {visitante.nombre} {visitante.apPaterno} {visitante.apMaterno}
              </span>
            </h2>
            <motion.p
              className="fem-welcome-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              te tengo una bonita sorpresa para ti
            </motion.p>
          </motion.div>

          {/* Botón ver regalo */}
          <AnimatePresence>
            {showBtn && (
              <motion.button
                className="fem-surprise-btn"
                onClick={() => {
                  const audio = new Audio(musicaUrl)
                  audio.loop = false
                  audio.volume = 0.5
                  audio.play().catch(() => {})
                  // Guardamos referencia para que FemeninoSorpresa la tome directamente
                  window.__sorpresaAudio = audio
                  navigate('/femenino/sorpresa')
                }}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <motion.span
                  animate={{ x: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="btn-shimmer"
                />
                Ver regalo
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
