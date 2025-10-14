import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Vacancies from './Vacancies.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Vacancies />
  </StrictMode>,
)
