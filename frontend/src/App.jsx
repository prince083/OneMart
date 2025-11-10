import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';

//pages
import Register from './pages/registration.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Nav from './component/nav.jsx'
import { UserDataContext } from './context/userContext.jsx'
import About from './pages/about.jsx'
import Collections from './pages/collections.jsx'
import Product from './pages/product.jsx'
import Contact from './pages/contact.jsx'
import ProductDetail from './pages/productDetail.jsx'
import Cart from './pages/cart.jsx'
import PlaceOrder from './pages/placeOrder.jsx'
import Order from './pages/order.jsx'
import NotFound from './pages/notFound.jsx';
import Ai from './component/ai.jsx';

function App() {
  let { userData } = useContext(UserDataContext)
  let location = useLocation();

  return (
    <>
        <ToastContainer />
        {<Nav />}
        <Routes>

          <Route path="/register" element={userData ? (<Navigate to={location.state?.from || '/'} />) : (<Register />)} />

          <Route path="/login" element={userData ? (<Navigate to={location.state?.from || '/'} />) : (<Login />)} />

          <Route path="/" element={userData ? <Home /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/about" element={userData ? <About /> : <Navigate to='/login' state={{from:location.pathname}} />} />
          
          <Route path="/collection" element={userData ? <Collections /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/product" element={userData ? <Product /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/contact" element={userData ? <Contact /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/productdetail/:productId" element={userData ? <ProductDetail /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/cart" element={userData ? <Cart /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/placeorder" element={userData ? <PlaceOrder /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="/order" element={userData ? <Order /> : <Navigate to='/login' state={{from:location.pathname}} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Ai />
    </>
  )
}

export default App
