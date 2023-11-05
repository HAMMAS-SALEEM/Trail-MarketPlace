import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../store/slices/currencySlice';

export const Currency = ({userId}) => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency);
  
  useEffect(() => {
    dispatch(fetchCurrency(userId));
  }, [dispatch, userId]);

  console.log(currency);

  if (currency.status === 'loading' || currency.error === "Cannot read properties of undefined (reading 'attributes')") {
    return (
      <span>loading...</span>
    );
  }

  if (currency.status === 'failed' && currency.error !== "Cannot read properties of undefined (reading 'attributes')") {
    return (
      <span>There is a problem. Please reload your page</span>
    );
  }

  return (
    <span>{currency.currency.trails}</span>
  );
};