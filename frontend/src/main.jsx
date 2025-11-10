import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import UserContext from './context/userContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContext from './context/shopContext.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <UserContext>
        <ShopContext>
          <App />
        </ShopContext>
      </UserContext>
    </AuthProvider>
  </BrowserRouter>
  //</StrictMode>,
)
