import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CategoryProvider } from './context/CategoryContext.tsx'
import { MethodProvider } from './context/MethodContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MethodProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </MethodProvider>
  </StrictMode>,
)
