import React from 'react'
import token from '../assets/Token.png'

export const Prod = ({img, name, price}) => {
  return (
    <div className="single-item-container">
      <div className="single-item-img-container">
        <img className="single-item-img" src={img} alt='product' />
      </div>
        <span className="single-item-name">{name}</span>
      <div className="single-item-price-container">
        <img src={token} alt={token} className="single-item-price-logo" />
        <span className="single-item-price">{price}</span>
      </div>
    </div>
  )
}
