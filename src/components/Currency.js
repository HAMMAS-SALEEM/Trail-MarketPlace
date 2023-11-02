import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../store/slices/currencySlice';

export const Currency = ({userId}) => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency);
  console.log(typeof currency.currency, currency.currency)

  useEffect(() => {
    dispatch(fetchCurrency(userId));
  }, [dispatch, userId]);

  if (currency.status === 'loading') {
    return (
      <span>loading...</span>
    );
  }

  if (currency.status === 'failed') {
    return (
      <span>There is a problem. Please reload your page</span>
    );
  }
  
  // Assuming currency.currency is a string
  return (
    <span>{typeof currency.currency === 'object' ? 0 : currency.currency}</span>
  );
};