import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CategoryProvider } from './context/CategoryContext.tsx'
import { MethodProvider } from './context/MethodContext.tsx'
import App from './App.tsx'
import './index.css'
import { CardProvider } from './context/CardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardProvider>
      <MethodProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </MethodProvider>
    </CardProvider>
  </StrictMode>,
)
