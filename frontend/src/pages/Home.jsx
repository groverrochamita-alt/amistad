import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Loader2, AlertCircle } from 'lucide-react'
import perfilImg from '../assets/perfil.jpeg'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', apPaterno: '', apMaterno: '', genero: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')
  const [orbs, setOrbs] = useState([])
  const [lines, setLines] = useState([])

  useEffect(() => {
    // Detener música de sorpresa si viene de ahí
    if (window.__sorpresaAudio) {
      window.__sorpresaAudio.pause()
      window.__sorpresaAudio.currentTime = 0
      window.__sorpresaAudio = null
    }

    setOrbs(Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 200 + Math.random() * 300,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    })))
    setLines(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 6,
      width: 1 + Math.random() * 2,
    })))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.apPaterno || !form.apMaterno || !form.genero) {
      setError('Completa todos los campos para continuar')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/visitas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      localStorage.setItem('visitante', JSON.stringify(form))
      navigate(`/${form.genero}`)
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'nombre',    label: 'Nombre',          placeholder: 'Tu nombre' },
    { name: 'apPaterno', label: 'Apellido Paterno', placeholder: 'Apellido paterno' },
    { name: 'apMaterno', label: 'Apellido Materno', placeholder: 'Apellido materno' },
  ]

  return (
    <div className="home-container">

      {/* Orbs de luz de fondo */}
      {orbs.map(o => (
        <motion.div
          key={o.id}
          className="bg-orb"
          style={{ left: `${o.x}%`, top: `${o.y}%`, width: o.size, height: o.size }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{ duration: o.duration, delay: o.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Líneas de luz que caen */}
      {lines.map(l => (
        <motion.div
          key={l.id}
          className="light-line"
          style={{ left: `${l.x}%`, width: l.width }}
          animate={{ y: ['-10vh', '110vh'], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Grid de fondo */}
      <div className="home-grid" />

      {/* Contenido */}
      <div className="home-inner">

        {/* Lado izquierdo — texto decorativo */}
        <motion.div
          className="home-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="home-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {'Mi Regalo del\nDía de la Amistad'.split('\n').map((line, i) => (
              <span key={i} className="headline-line">
                {line.split('').map((char, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.2 + j * 0.04 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.img
            src={perfilImg}
            alt="Grover"
            className="home-perfil-img"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6, ease: 'backOut' }}
          />

          {/* Línea decorativa animada */}
          <motion.div
            className="deco-line"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />

          {/* Puntos orbitando */}
          <div className="orbit-wrap">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="orbit-dot"
                animate={{ rotate: 360 }}
                transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.2 }}
                style={{ '--r': `${40 + i * 20}px` }}
              />
            ))}
            <div className="orbit-center" />
          </div>
        </motion.div>

        {/* Lado derecho — formulario */}
        <motion.div
          className="home-right"
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          {/* Borde brillante animado */}
          <motion.div
            className="card-glow-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <div className="form-card">
            <motion.p
              className="form-eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Ingresa tus datos
            </motion.p>

            <form onSubmit={handleSubmit}>
              {fields.map(({ name, label, placeholder }, i) => (
                <motion.div
                  key={name}
                  className={`input-group ${focused === name ? 'is-focused' : ''}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <label>{label}</label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused('')}
                      autoComplete="off"
                    />
                    <motion.div
                      className="input-underline"
                      animate={{ scaleX: focused === name ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Género */}
              <motion.div
                className="input-group"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label>Género</label>
                <div className="genero-options">
                  {['femenino', 'masculino'].map(g => (
                    <motion.label
                      key={g}
                      className={`genero-btn ${form.genero === g ? 'active' : ''}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <input type="radio" name="genero" value={g} onChange={handleChange} hidden />
                      <motion.div
                        className="genero-indicator"
                        animate={{ scale: form.genero === g ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      />
                      {g === 'femenino' ? 'Femenino' : 'Masculino'}
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="error"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                  >
                    <AlertCircle size={13} />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Botón */}
              <motion.button
                type="submit"
                className="submit-btn"
                disabled={loading}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="btn-bg"
                  animate={{ x: loading ? 0 : ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <span className="btn-label">
                  {loading
                    ? <><Loader2 size={16} className="spin" /> Cargando...</>
                    : <>Ver mi regalo <ChevronRight size={16} /></>
                  }
                </span>
              </motion.button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Home
