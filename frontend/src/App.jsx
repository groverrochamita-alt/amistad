import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Femenino from './pages/Femenino'
import FemeninoSorpresa from './pages/FemeninoSorpresa'
import Masculino from './pages/Masculino'
import Admin from './pages/Admin'

// Intervalo global que para la música si la URL ya no es /femenino/sorpresa
// Se inicia una sola vez al cargar la app y nunca se limpia
if (typeof window !== 'undefined') {
  setInterval(() => {
    if (window.location.pathname !== '/femenino/sorpresa') {
      if (window.__sorpresaAudio) {
        window.__sorpresaAudio.pause()
        window.__sorpresaAudio.currentTime = 0
        window.__sorpresaAudio = null
      }
    }
  }, 200)
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/femenino" element={<Femenino />} />
      <Route path="/femenino/sorpresa" element={<FemeninoSorpresa />} />
      <Route path="/masculino" element={<Masculino />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
