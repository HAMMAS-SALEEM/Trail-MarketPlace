import React from 'react'
import { useSelector } from 'react-redux';

export const SingleItem = ({id, name, price, img, desc, alreadyPurchased}) => {
  const user = useSelector(store => store.currency)
  const handleGetCurrency = (event) => {
    const id = event.target.id
    console.log(user);
    
  }
  return (
    <div className="single-item-container">
      <img className="single-item-img" src={img} alt='product' />
      <span className="single-item-name">{name}</span>
      <span className="single-item-price">Trail ${price}</span>
      <span className="single-item-desc">{desc}</span>
      {alreadyPurchased ?
      <button className="claim disable" type="button" >Already Claimed</button> :
      <button className="claim enable" type="button" id={id} onClick={handleGetCurrency}>Claim</button>}
    </div>
  )
};