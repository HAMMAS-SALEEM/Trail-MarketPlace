import React from 'react'
import { GraniteAccess } from '../components/GraniteAccess'
import mountain from '../assets/mountain.gif'

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-page-info">
          <h1 className="login-page-heading">Welcome To Meta Mountaineers!</h1>
          <img src={mountain} alt="moutain" />
        </div>
        <div className="login-page-btn">
            <h2 className="login-page-btn-label">Login</h2>
            <GraniteAccess />
        </div>
      </div>
    </div>
  )
}
