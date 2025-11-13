import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import Navegacao from './Routes.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navegacao />
    <Toaster position="top-right" richColors />
  </StrictMode>,
)
