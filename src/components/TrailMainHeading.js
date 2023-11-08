import React from 'react'
import trailMarketPlace from '../assets/TrailMarketPlace.png'
import metaMountain from '../assets/main-logo.png'
import gifMountain from '../assets/mountain.gif'

export const TrailMainHeading = () => {
  return (
    <section className='trail-main-heading-container'>
      {/* <img className='trail-main-heading' src={trailMarketPlace} alt='trail marketplace' /> */}
      <div className="trail-main-left">
        <img src={metaMountain} className="meta-mountain-logo"/>
        <h1 className="main-heading">TRAIL MARKETPLACE</h1>
        <p className="main-description">REDEEM AWARDS WITH YOUR TRAIL CURRENCY</p>
      </div>
      <img src={gifMountain} className="mountain-gif" />
    </section>
  )
}
