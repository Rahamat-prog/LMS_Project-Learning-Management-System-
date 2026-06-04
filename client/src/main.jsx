import './index.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'



createRoot(document.getElementById('root')).render(
    // BrowserRouter karne se react router dom ki jo bhi capability h oh app active ho jaye ha 
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  
)
