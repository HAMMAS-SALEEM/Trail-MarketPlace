import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../store/slices/currencySlice';

export const Currency = () => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency);
  useEffect(()=>{
    dispatch(fetchCurrency());
  })

  if (currency.status == 'loading' || currency.status == 'idle') {
    return (
        <span>loading...</span>
    )
  }
  return (
    <span>{currency.currency}</span>
  )
}
