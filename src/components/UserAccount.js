import React, { useEffect } from 'react'
import balance from '../assets/balance.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slices/userSlice'
import { fetchCurrency } from '../store/slices/currencySlice'

export const UserAccount = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.User);
  const accessToken = JSON.parse(localStorage.getItem('userInfo')).access_token
  const currency = useSelector(store => store.currency);
  console.log(currency);

  useEffect(()=>{
    dispatch(fetchUser(accessToken));
    dispatch(fetchCurrency());
  }, [dispatch])

  return (
    <div className="user-account-container">
        <img src={balance} alt='balance' />
        <span>{}</span>
        <span className="user-wallet">{user.status === 'succeeded' && user.user.sub}</span>
    </div>
  )
}
