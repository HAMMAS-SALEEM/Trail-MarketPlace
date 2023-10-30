import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routing/ProtectedRoutes';
import PublicRoutes from './routing/PublicRoutes';
import { useDispatch } from 'react-redux';
import { getCookie } from './utils/getCookie';
import { fetchAccessToken, fetchUser } from './store/slices/userSlice';

export const App = () => {
  const dispatch = useDispatch();
  const [session, setSession] = useState(false);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('refreshToken'))) {
      setSession(false);
    } else {
      dispatch(fetchAccessToken(JSON.parse(localStorage.getItem('refreshToken'))));
      setSession(true);
    }
    const interval = setInterval(() => {
      dispatch(fetchAccessToken(JSON.parse(localStorage.getItem('refreshToken'))));
    }, 3600000);
    return () => {
      clearInterval(interval)
    };
  }, [dispatch])

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