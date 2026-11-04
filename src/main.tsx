import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initTracking } from './lib/tracking'
import { captureUtm } from './lib/utm'
import './styles/index.css'

captureUtm()
initTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
