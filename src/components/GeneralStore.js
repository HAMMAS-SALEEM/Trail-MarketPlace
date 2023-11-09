import React from 'react'
import marketLogo from '../assets/market.png';
import storeArrow from '../assets/store_arrow.svg'

export const GeneralStore = () => {
  return (
    <div className="general-store-container"> 
        <img src={marketLogo} alt='general store' className="general-store-logo" />
        <h2 className="general-store-heading">GENERAL STORE</h2>
        <img src={storeArrow} alt='store arrow' />
    </div>
  )
}
