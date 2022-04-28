import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/Auth/SignIn'
import SignUp from './Pages/Auth/SignUp'
import MessengerApp from './Pages/Messenger/MessengerApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<MessengerApp />} />
      </Routes>
    </BrowserRouter>
  )
}


