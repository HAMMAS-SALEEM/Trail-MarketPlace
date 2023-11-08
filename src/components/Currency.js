import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../store/slices/currencySlice';
import Token from '../assets/Token.png'
import polygon from '../assets/polygon.svg'

export const Currency = ({userId}) => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency);
  
  useEffect(() => {
    dispatch(fetchCurrency(userId));
  }, [dispatch, userId]);

  if (currency.status === 'loading' || currency.error === "Cannot read properties of undefined (reading 'attributes')") {
    return (
      <div className="currency-box">
        <img src={polygon} />
        <span className="currency-value">Loading...</span>
        <img src={Token} className="currency-icon" />
      </div>
    );
  }

  if (currency.status === 'failed' && currency.error !== "Cannot read properties of undefined (reading 'attributes')") {
    return (
      <div className="currency-box">
        <img src={polygon} />
        <span className="currency-value">Error</span>
        <img src={Token} className="currency-icon" />
      </div>
    );
  }

  return (
    <div className="currency-box">
      <img src={polygon} />
      <span className="currency-value">{currency.status === 'succeeded' &&   currency.currency.trails}</span>
      <img src={Token} className="currency-icon" />
    </div>
  );
};