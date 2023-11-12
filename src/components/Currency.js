import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../store/slices/currencySlice';
import Token from '../assets/Token.png'
import polygon from '../assets/polygon.svg'
import { ThreeDots } from 'react-loader-spinner';
import { signOut } from '../store/slices/sessionSlice';
import { clearState } from '../store/slices/productsSlice';

export const Currency = ({userId}) => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(signOut())
    dispatch(clearState())
  }
  
  useEffect(() => {
    if(typeof userId == 'string' && currency.status !== 'succeeded') {
    dispatch(fetchCurrency(userId));
    }
  }, [currency.status, dispatch, userId]);

  if (currency.status === 'loading' || currency.error === "Cannot read properties of undefined (reading 'attributes')") {
    return (
      <div className="currency-box">
        <img src={polygon} alt="polygon" />
        <span className="currency-value">Loading...</span>
        <img src={Token} className="currency-icon" alt="currency icon" />
      </div>
    );
  }

  if (currency.status === 'failed' && currency.error !== "Cannot read properties of undefined (reading 'attributes')") {
    return (
      <div className="currency-box">
        <img src={polygon} alt="polygon" />
        <span className="currency-value">Error</span>
        <img src={Token} className="currency-icon" alt="currency icon" />
      </div>
    );
  }

  return (
    <>
    <div className="currency-box">
      <img src={polygon} alt="polygon" />
      <span className="currency-value">{
      currency.status === 'succeeded' ?  
      currency.currency.trails : 
      <ThreeDots 
        height="40" 
        width="40" 
        radius="9"
        color="#e8c42d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
       />
      }</span>
      <img src={Token} className="currency-icon" alt="currency icon" />
    </div>
    <button type="button" onClick={handleLogout}>Logout</button>
    </>
  );
};