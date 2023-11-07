import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyProduct } from '../store/slices/currencySlice';
import { purchaseProduct } from '../store/slices/currencySlice';

export const SingleItem = ({id, name, price, img, desc, alreadyPurchased}) => {
  const [lessAmount, setLessAmount] = useState(false);
  const user = useSelector(store => store.currency);
  const dispatch = useDispatch();

  const handleGetCurrency = () => {
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
      }];

      // dispatch(buyProduct(purchs))
      dispatch(purchaseProduct(purchs))
    } else {
      setLessAmount(!lessAmount)
    }
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
      {
        lessAmount ? <span>You don't have enough TRAILS</span> : ''
      }
    </div>
  )
};