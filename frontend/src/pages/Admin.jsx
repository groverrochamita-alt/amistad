import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, RefreshCw, User, Calendar } from 'lucide-react'
import './Admin.css'

function Admin() {
  const [visitas, setVisitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchVisitas = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/visitas`)
      if (!res.ok) throw new Error('Error al obtener datos')
      const data = await res.json()
      setVisitas(data)
    } catch (err) {
      setError('No se pudo conectar al servidor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVisitas() }, [])

  const total    = visitas.length
  const totalFem = visitas.filter(v => v.genero === 'femenino').length
  const totalMasc = visitas.filter(v => v.genero === 'masculino').length

  const formatFecha = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className="admin-container">
      <div className="admin-bg" />

      <div className="admin-wrapper">

        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="admin-header-left">
            <div className="admin-logo">
              <Users size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h1>Panel de Admin</h1>
              <p>Día de la Amistad — 21 de Septiembre 2026</p>
            </div>
          </div>
          <button className="refresh-btn" onClick={fetchVisitas} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            Actualizar
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="stat-card total">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total visitantes</span>
          </div>
          <div className="stat-card fem">
            <span className="stat-number">{totalFem}</span>
            <span className="stat-label">Femenino</span>
          </div>
          <div className="stat-card masc">
            <span className="stat-number">{totalMasc}</span>
            <span className="stat-label">Masculino</span>
          </div>
        </motion.div>

        {/* Tabla */}
        <motion.div
          className="table-container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {loading ? (
            <div className="state-msg">
              <RefreshCw size={20} className="spin" />
              Cargando registros...
            </div>
          ) : error ? (
            <div className="state-msg error-msg">{error}</div>
          ) : visitas.length === 0 ? (
            <div className="state-msg">Aún no hay visitantes</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <span className="th-inner"><User size={13} /> Nombre completo</span>
                  </th>
                  <th>Género</th>
                  <th>
                    <span className="th-inner"><Calendar size={13} /> Fecha y hora</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visitas.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={v.genero === 'femenino' ? 'row-fem' : 'row-masc'}
                  >
                    <td className="td-num">{i + 1}</td>
                    <td>{v.nombre} {v.apPaterno} {v.apMaterno}</td>
                    <td>
                      <span className={`badge ${v.genero}`}>
                        {v.genero === 'femenino' ? 'Femenino' : 'Masculino'}
                      </span>
                    </td>
                    <td className="td-date">{formatFecha(v.createdAt)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

      </div>
    </div>
  )
}

export default Admin
