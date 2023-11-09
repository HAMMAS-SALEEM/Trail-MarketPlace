import React from 'react'
import errorIcon from '../assets/error4.png'

export const ErrorPopup = ({handleErrorPopup, title, message}) => {
  return (
    <div className="spinner-overlay">
      <div className="error-popup">
        <button onClick={handleErrorPopup} className="error-popup-close-btn">X</button>
        <div>
        <div className="error-popup-icon">
          <img src={errorIcon} alt="error popup" />
          <h3 className="error-popup-title">{title}</h3>
        </div>
        <p className="error-popup-desc">{message}</p>
        </div>
      </div>
    </div>
  )
}
