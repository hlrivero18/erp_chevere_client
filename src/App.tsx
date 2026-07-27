import AppRouter from './app/router/AppRouter'
import './App.css'
import { Toaster } from '@/components/ui/sonner';

function App() {

  return (
    <>
      <AppRouter />
      <Toaster position="bottom-right" />
    </>
  )
}

export default App
