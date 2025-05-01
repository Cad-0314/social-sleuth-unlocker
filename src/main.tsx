
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HackerProvider } from './context/HackerContext.tsx'

createRoot(document.getElementById("root")!).render(
  <HackerProvider>
    <App />
  </HackerProvider>
);
