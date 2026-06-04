import './index.css'

import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App.jsx'
import store from './Redux/store'



createRoot(document.getElementById('root')).render(
    // BrowserRouter karne se react router dom ki jo bhi capability h oh app active ho jaye ha 
   <Provider store={store}>
     <BrowserRouter>
        <App />
        <Toaster />
    </BrowserRouter>
   </Provider>

)
