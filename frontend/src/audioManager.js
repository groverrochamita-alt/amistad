// Manejo global del audio de la sorpresa femenina
let _audio = null

export function playAudio(url) {
  stopAudio()
  _audio = new Audio(url)
  _audio.loop = false
  _audio.volume = 0.5
  return _audio.play().catch(() => null)
}

export function stopAudio() {
  if (_audio) {
    _audio.pause()
    _audio.currentTime = 0
    _audio = null
  }
}

export function getAudio() {
  return _audio
}

// Vigilante permanente: para el audio si la URL no es /femenino/sorpresa
setInterval(() => {
  if (window.location.pathname !== '/femenino/sorpresa') {
    stopAudio()
  }
}, 150)
