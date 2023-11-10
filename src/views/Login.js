import React, { useEffect } from 'react'
import { GraniteAccess } from '../components/GraniteAccess'
import mountain from '../assets/mountain.gif'
import { getToken } from '../utils/authGenerators'

export const Login = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      getToken(code, localStorage.getItem("codeVerifier"));
    }
  }, []);
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
