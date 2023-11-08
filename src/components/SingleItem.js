import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ProductModal } from './ProductModal';
import token from '../assets/Token.png'

export const SingleItem = ({id, name, price, img, desc, alreadyPurchased}) => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productPopup, setProductPopup] = useState(false);
  const [claim, setClaim] = useState(false);

  const user = useSelector(store => store.currency);

  const handleProductPopup = () => setProductPopup(!productPopup)

  const handleGetCurrency = async () => {
    const alreadyPurchasedItems = user.currency.purchases;
    const balance = user.currency.trails;
    const userId = user.currency.trailUser;
    const amountAlreadySpent = +user.currency.amountSpent;

    if(price < balance) {
      const purchs = [userId, {
        data: {
            purchases: [
              ...alreadyPurchasedItems,
              id
            ],
            amount_spent: amountAlreadySpent+(+price)
          }
      }, amountAlreadySpent];
      setSelectedProduct(purchs);
      handleProductPopup();
    }
  }

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
      {/* <span className="single-item-desc">{desc}</span> */}
      {/* {alreadyPurchased ?
      <button className="claim disable" type="button" >Already Claimed</button> :
      <button className="claim enable" type="button" id={id} onClick={handleGetCurrency}>{claim ? 'Loading...' : 'Claim'}</button>
      } */}
      {
        productPopup ? <ProductModal
        selectedProduct={selectedProduct}
        handleProductPopup={handleProductPopup}
        productName={name}
        description={desc} /> : ''
      }
    </div>
  )
};