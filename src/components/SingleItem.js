import React from 'react'

export const SingleItem = ({name, price, img, desc, active}) => {
  const handleGetCurrency = () => {

  }
  return (
    <div className="single-item-container">
        <img className="single-item-img" src={img} alt='product' />
        <span className="single-item-name">{name}</span>
        <span className="single-item-price">Trail ${price}</span>
        <span className="single-item-desc">{desc}</span>
        <button className="claim enable" type="button" >Claim</button>
        {active && <button className="claim disable" type="button" disabled>Already Claimed</button>}
    </div>
  )
};