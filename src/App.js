import React from 'react'
import './App.css'
import { Login } from './views/LoginView/Login';
import { Home } from './views/HomeView/Home'

export const App = () => {
  return (
    <>
      <Login />
      <Home />
    </>
  )
};

export default App;