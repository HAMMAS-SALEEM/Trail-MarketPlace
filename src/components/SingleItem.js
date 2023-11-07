import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyProduct } from '../store/slices/currencySlice';

export const SingleItem = ({id, name, price, img, desc, alreadyPurchased}) => {
  const user = useSelector(store => store.currency)
  const dispatch = useDispatch();

  const handleGetCurrency = () => {
    const alreadyPurchasedItems = user.currency.purchases;
    const currentBalance = user.currency.trails;
    const balance = user.currency.trails;
    const userId = user.currency.trailUser

    if(price < balance) {

      const purchs = [userId, {
        data: {
            purchases: [
              ...alreadyPurchasedItems,
              id
            ],
            amount_spent: 200+(+price)
          }
      }];

      dispatch(buyProduct(purchs))
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
    </div>
  )
};