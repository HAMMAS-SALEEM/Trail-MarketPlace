import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { purchaseProduct } from '../store/slices/currencySlice';
import PurchaseController from '../controllers/purchaseController';

export const SingleItem = ({id, name, price, img, desc, alreadyPurchased}) => {
  const [lessAmount, setLessAmount] = useState(false);
  const [cantBuy, setCantBuy] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false)
  const user = useSelector(store => store.currency);
  const dispatch = useDispatch();

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
      }];
      setButtonLoad(true)
      const res = await PurchaseController.buyProduct(purchs)
      if(res.status === 200) {
      dispatch(purchaseProduct(purchs))
      setButtonLoad(false)
      }
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
      <button className="claim enable" type="button" id={id} onClick={handleGetCurrency}>{buttonLoad ? 'Loading...' : 'Claim'}</button>}
      {
        lessAmount ? <span>You don't have enough TRAILS</span> : ''
      }
      {
        cantBuy ? <span>You can't buy it right now. Try again</span> : ''
      }
    </div>
  )
};