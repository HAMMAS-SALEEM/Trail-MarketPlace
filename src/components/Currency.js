import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../store/slices/currencySlice';
import Token from '../assets/Token.png'
import polygon from '../assets/polygon.svg'
import { ThreeDots } from 'react-loader-spinner';
import { signOut } from '../store/slices/sessionSlice';
import { clearState } from '../store/slices/productsSlice';
import arrowDown from '../assets/arrowDown.svg'
import { renderStatus } from '../store/slices/renderSlice';

export const Currency = ({userId}) => {
  const dispatch = useDispatch();
  const currency = useSelector(store => store.currency);
  const renderS = useSelector(store => store.Render)

  const handleLogout = () => {
    localStorage.clear();
    dispatch(signOut())
    dispatch(clearState())
  }
  
  useEffect(() => {
    if(renderS.session && typeof userId == 'string' && currency.status !== 'succeeded') {
      dispatch(fetchCurrency(userId));
      dispatch(renderStatus());
    }
  }, [currency.status, dispatch, userId, renderS]);

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
    <div className="logout-container">
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
      <div className="hidden-logout-btn">
        <img src={arrowDown} alt={arrowDown} className="arrow-down" />
        <button type="button" onClick={handleLogout} className="logout-btn">LOGOUT</button>
      </div>
    </div>
  );
};