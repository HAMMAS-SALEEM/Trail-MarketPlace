import React, { useEffect } from 'react'
import balance from '../assets/balance.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slices/userSlice'
import { Currency } from './Currency'

export const UserAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.User);
  const accessToken = JSON.parse(localStorage.getItem('userInfo')).access_token
  
  useEffect(()=>{
    dispatch(fetchUser(accessToken));
  }, [dispatch, accessToken])

  return (
    <div className="user-account-container">
        <img src={balance} alt='balance' />
        {
          !user.user.sub ?
          <span>Loading..</span> : 
          <Currency userId={user.user.sub} />
        }
        <span className="user-wallet">{user.status === 'succeeded' && user.user.sub}</span>
    </div>
  )
}
