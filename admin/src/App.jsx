import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Add from './pages/add'
import Lists from './pages/lists'
import Login from './pages/login'
import { useContext } from 'react'
import { adminDataContext } from './context/adminContext'
import Order from './pages/orders'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  let { adminData } = useContext(adminDataContext)

  return (
    <>
      <ToastContainer />
      {!adminData ? <Login/> : <>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/add' element={ <Add /> }/>
        <Route path='/lists' element={ <Lists /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/orders' element={ <Order /> }/>
      </Routes>
      </>
      }
    </>
  )
}

export default App
