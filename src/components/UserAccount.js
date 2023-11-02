import React, { useEffect, useState } from 'react'
import balance from '../assets/balance.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slices/userSlice'
import { fetchCurrency } from '../store/slices/currencySlice'
import { currencyManager } from '../utils/currencyManager'
import { Currency } from './Currency'

export const UserAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.User);

  const accessToken = JSON.parse(localStorage.getItem('userInfo')).access_token
  useEffect(()=>{
    dispatch(fetchUser(accessToken));
    dispatch(fetchCurrency());
  }, [dispatch, accessToken])

  return (
    <div className="user-account-container">
        <img src={balance} alt='balance' />
        {/* <Currency /> */}
        <span className="user-wallet">{user.status === 'succeeded' && user.user.sub}</span>
    </div>
  )
}
