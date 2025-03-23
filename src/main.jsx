import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'


import App from './App.jsx'
import { SearchProvider } from './Context/StoredContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <SearchProvider>
        <App />
     </SearchProvider>
        
    </BrowserRouter>

  </StrictMode>,
)
