import React from 'react'
import metaMountain from '../assets/main-logo.png'
import gifMountain from '../assets/mountain.gif'

export const TrailMainHeading = () => {
  return (
    <section className='trail-main-heading-container' id="home">
      <div className="trail-main-left">
        <img src={metaMountain} alt="meta mountain" className="meta-mountain-logo"/>
        <h1 className="main-heading">TRAIL MARKETPLACE</h1>
        <p className="main-description">REDEEM AWARDS WITH YOUR TRAIL CURRENCY</p>
      </div>
      <img src={gifMountain} alt="mountain" className="mountain-gif" />
    </section>
  )
}
