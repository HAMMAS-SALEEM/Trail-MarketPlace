import React from 'react'
import './App.css'
import { Login } from './views/Login';
import { Home } from './views/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routing/ProtectedRoutes';

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      }
      />
      <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
};

export default App;