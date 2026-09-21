import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import goldenUrl from '../assets/golden.mp3'
import imImg from '../assets/im.jpg'
import perfilImg from '../assets/perfil.jpeg'
import './Masculino.css'

const VIDEOS = [
  { key: 'video1', src: '/videos/1.mp4', next: 'midmsg' },
  { key: 'video4', src: '/videos/4.mp4', next: 'video5' },
  { key: 'video5', src: '/videos/5.mp4', next: 'done'   },
]

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
function TypeWriter({ text, onDone }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        if (onDone) setTimeout(onDone, 2200)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: '#ffd700' }}
        >|</motion.span>
      )}
    </span>
  )
}

const INTRO_MESSAGES = [
  'Los hombres sabemos que......',
  'a muchos de nosotros no nos felicitan.......',
  'pero no te preocupes, tu pastor Grover sí se acordó de tu existencia :D',
]

/* ══════════════════════════════════════════
   VIDEO PANTALLA COMPLETA
══════════════════════════════════════════ */
function FullscreenVideo({ src, onEnded }) {
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <motion.div className="video-fullscreen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        onEnded={onEnded}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
      <motion.button className="skip-btn" onClick={onEnded}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      >
        Saltar →
      </motion.button>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   FUEGO ARTIFICIAL
══════════════════════════════════════════ */
function Firework({ x, y, delay }) {
  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (360 / 16) * i
    const rad = (angle * Math.PI) / 180
    const dist = 50 + Math.random() * 40
    return { tx: Math.cos(rad) * dist, ty: Math.sin(rad) * dist }
  })
  const color = ['#ffd700','#00bfff','#ff4466','#00ff88','#bf80ff'][Math.floor(Math.random()*5)]

  return (
    <motion.div style={{ position: 'fixed', left: `${x}%`, top: `${y}%`, zIndex: 1, pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   FASE MENSAJE FINAL (imagen → fondo + card)
══════════════════════════════════════════ */
function MessagePhase({ visitante, fireworks, audioRef, navigate }) {
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    // Tras 2s la imagen se convierte en fondo y aparece la card
    const t = setTimeout(() => setShowCard(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div key="message" className="masc-main"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0 }}
    >
      {/* Imagen de fondo — siempre presente, se oscurece cuando sale la card */}
      <motion.div
        className="im-bg"
        animate={{ opacity: showCard ? 0.18 : 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${imImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Overlay oscuro para cuando sale la card */}
      <motion.div
        animate={{ opacity: showCard ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 1 }}
      />

      {/* Orbs y fuegos sobre el fondo */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="masc-orb"
          style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 28}%`, width: 180 + i * 60, height: 180 + i * 60, zIndex: 2 }}
          animate={{ x: [0,-25,20,0], y: [0,20,-25,0], scale: [1,1.1,0.92,1] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
        />
      ))}
      {fireworks.map(f => <Firework key={f.id} x={f.x} y={f.y} delay={f.delay} />)}

      {/* Card — aparece cuando showCard es true */}
      <div className="masc-stage" style={{ position: 'relative', zIndex: 3 }}>
        <AnimatePresence>
          {showCard && (
            <motion.div className="masc-card"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'backOut' }}
            >
              <div className="masc-card-glow" />

              <motion.h1 className="masc-title"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                Feliz Día de la Amistad
              </motion.h1>

              <motion.h2 className="masc-name"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              >
                {visitante.nombre} {visitante.apPaterno} {visitante.apMaterno}
              </motion.h2>

              <motion.p className="masc-by"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                By: Grover
              </motion.p>

              <motion.img
                src={perfilImg}
                alt="Grover"
                className="masc-perfil-img"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.5, ease: 'backOut' }}
              />

              <motion.div className="masc-divider"
                initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ delay: 0.5, duration: 0.6 }}
              />

              <motion.button className="masc-btn"
                onClick={() => {
                  if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 }
                  navigate('/')
                }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              >
                <ArrowLeft size={15} /> Volver al inicio
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════════ */
export default function Masculino() {
  const navigate = useNavigate()
  const audioRef = useRef(null)
  const [visitante, setVisitante] = useState(null)
  // phases: 'enter' | 'intro' | 'video1'...'video5' | 'message'
  const [phase, setPhase] = useState('enter')
  const [msgIndex, setMsgIndex] = useState(0)
  const [fireworks, setFireworks] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('visitante')
    if (!data) { navigate('/'); return }
    setVisitante(JSON.parse(data))
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
    }
  }, [navigate])

  const handleEnter = () => {
    const audio = new Audio(goldenUrl)
    audio.loop = true
    audio.volume = 0.5
    audio.play().catch(() => {})
    audioRef.current = audio
    setPhase('intro')
  }

  const handleMsgDone = () => {
    if (msgIndex < INTRO_MESSAGES.length - 1) {
      setTimeout(() => setMsgIndex(i => i + 1), 800)
    } else {
      setTimeout(() => setPhase('video1'), 1200)
    }
  }

  const handleVideoEnd = (next) => {
    if (next === 'done') {
      const fw = Array.from({ length: 12 }, (_, i) => ({
        id: i, x: 10 + Math.random() * 80, y: 10 + Math.random() * 60, delay: i * 0.15,
      }))
      setFireworks(fw)
      setPhase('message')
    } else {
      setPhase(next)
    }
  }

  // Auto-avance del mensaje intermedio tras 3s
  useEffect(() => {
    if (phase !== 'midmsg') return
    const t = setTimeout(() => setPhase('video4'), 3000)
    return () => clearTimeout(t)
  }, [phase])

  if (!visitante) return null

  const currentVideo = VIDEOS.find(v => v.key === phase)

  return (
    <div className="masc-container">
      <AnimatePresence mode="wait">

        {/* ── PANTALLA DE ENTRADA ── */}
        {phase === 'enter' && (
          <motion.div key="enter" className="masc-enter-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.button className="masc-enter-btn" onClick={handleEnter}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            >
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                Toca para continuar
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        {/* ── INTRO: textos en negro ── */}
        {phase === 'intro' && (
          <motion.div key="intro" className="intro-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="intro-messages">
              {INTRO_MESSAGES.map((msg, i) => (
                <AnimatePresence key={i}>
                  {msgIndex >= i && (
                    <motion.p className={`intro-line ${i === 2 ? 'intro-line-xl' : ''}`}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.7 }}
                    >
                      {msgIndex === i
                        ? <TypeWriter text={msg} onDone={handleMsgDone} />
                        : msg}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── VIDEOS 1, 4, 5 ── */}
        {currentVideo && (
          <FullscreenVideo
            key={currentVideo.key}
            src={currentVideo.src}
            onEnded={() => handleVideoEnd(currentVideo.next)}
          />
        )}

        {/* ── MENSAJE INTERMEDIO ── */}
        {phase === 'midmsg' && (
          <motion.div key="midmsg" className="intro-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.p
              className="intro-line-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              style={{ textAlign: 'center', padding: '0 32px' }}
            >
              Feliz día de la amistad perro :V
            </motion.p>
          </motion.div>
        )}

        {/* ── MENSAJE FINAL ── */}
        {phase === 'message' && (
          <MessagePhase visitante={visitante} fireworks={fireworks} audioRef={audioRef} navigate={navigate} />
        )}

      </AnimatePresence>
    </div>
  )
}
