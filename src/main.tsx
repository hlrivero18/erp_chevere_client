import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/tanstack/query-client.ts'
import { AppThemeProvider } from './app/provider/theme/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
