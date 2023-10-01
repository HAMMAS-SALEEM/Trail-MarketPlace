import React from 'react'

export const SingleItem = ({name, price, img, desc}) => {
  return (
    <div className="single-item-container">
        <img className="single-item-img" src={img} alt='product' />
        <span className="single-item-name">{name}</span>
        <span className="single-item-price">Trail ${price}</span>
        <span className="single-item-desc">{desc}</span>
    </div>
  )
};