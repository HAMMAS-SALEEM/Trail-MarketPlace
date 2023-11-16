import React from 'react'
import metaMountain from '../assets/main-logo.png'
import gifMountain from '../assets/mountain.gif'

export const TrailMainHeading = () => {
  return (
    <section className='trail-main-heading-container' id="home">
      <div>
      <div className="trail-main-h1-container">
        <h1 className="trail-main-left">
          <span className="main-heading">TRAIL</span>
          <img src={metaMountain} alt="meta mountain" className="meta-mountain-logo" />
          <span className="main-heading">MARKETPLACE</span>
        </h1>
      </div>
      <p className="main-description">REDEEM AWARDS WITH YOUR TRAIL CURRENCY</p>
      </div>
      <img src={gifMountain} alt="mountain" className="mountain-gif" />
    </section>
  )
}
