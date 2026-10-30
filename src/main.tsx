import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import { RouterProvider } from 'react-router'
import { router } from './app/router'
import './index.css'

// Punto de entrada: React toma el <div id="root"> del index.html y pinta ahí toda la app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
