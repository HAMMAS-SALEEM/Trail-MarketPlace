import React, { useEffect, useState } from 'react'
import './App.css'
import { Login } from './views/Login';
import { Home } from './views/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routing/ProtectedRoutes';
import PublicRoutes from './routing/PublicRoutes';
import { getCookie } from './utils/getCookie';

export const App = () => {
  const [session, setSession] = useState(false);
  const accessToken = getCookie('accessToken');
  // const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  // console.log(refreshToken)
  
  useEffect(() => {
    accessToken ? setSession(true) : setSession(false);
  }, [accessToken])

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <ProtectedRoutes session={session}>
          <Home />
        </ProtectedRoutes>
      }
      />
      <Route path='/login' element={
        <PublicRoutes session={session}>
          <Login />
        </PublicRoutes>
      } />
    </Routes>
    </BrowserRouter>
  )
};

export default App;