import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeBase from './pages/HomeBase'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard';
import SingleArticle from './components/other/SingleArticle'
import EditArticle from './components/other/EditArticle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeBase />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dash' element={<Dashboard />} />
        <Route path="/single" element={<SingleArticle />} />
        <Route path='/edit-article' element={<EditArticle />} />
      </Routes>
    </BrowserRouter>
  )
}


