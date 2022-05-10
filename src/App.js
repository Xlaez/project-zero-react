import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeBase from './pages/HomeBase'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeBase />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dash' element={<Dashboard />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}


