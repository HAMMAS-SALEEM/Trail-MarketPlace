import React from 'react'
import './App.css'
import { Login } from './views/Login';
import { Home } from './views/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routing/ProtectedRoutes';
import PublicRoutes from './routing/PublicRoutes';

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
      <Route path='/login' element={
        <PublicRoutes>
          <Login />
          </PublicRoutes>
      } />
    </Routes>
    </BrowserRouter>
  )
};

export default App;