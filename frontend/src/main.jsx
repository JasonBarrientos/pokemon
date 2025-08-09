import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PokedexApp } from './PokedexApp'
import "./styles.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokedexApp></PokedexApp>
  </StrictMode>,
)
