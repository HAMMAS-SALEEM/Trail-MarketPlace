import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
import { ProductModal } from './ProductModal';
import token from '../assets/Token.png'
import { ErrorPopup } from './ErrorPopup';

export const SingleItem = ({id, name, price, img, desc, alreadyPurchased}) => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productPopup, setProductPopup] = useState(false);
  const [lessTRAILS, setLessTRAILS] = useState(false)
// 
  // const user = useSelector(store => store.currency);
// 
  const handleProductPopup = () => setProductPopup(!productPopup)
  const handleError = () => setLessTRAILS(!lessTRAILS)

  const title = "Can't buy it"
  const message = "You don't have enough TRAILS"

  const handleGetCurrency = async () => {
    // const alreadyPurchasedItems = user.currency.purchases;
    // const balance = user.currency.trails;
    // const userId = user.currency.trailUser;
    // const amountAlreadySpent = +user.currency.amountSpent;

    const alreadyPurchasedItems = [1];
    const balance = 33;
    const userId = '5d66d6b9-b8e5-476f-8248-27ca7cf75be1';
    const amountAlreadySpent = 100;

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
    } else {
      handleError();
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
      {alreadyPurchased ?
      <button className="claim disable" type="button" >Already Claimed</button> :
      <button className="claim enable" type="button" id={id} onClick={handleGetCurrency}>Claim</button>
      }
      {
        productPopup ? <ProductModal
        selectedProduct={selectedProduct}
        handleProductPopup={handleProductPopup}
        product={{name, desc, img, price}} /> : lessTRAILS ? 
        <ErrorPopup handleErrorPopup={handleError} title={title} message={message} /> : ''
      }
    </div>
  )
};