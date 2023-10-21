import React, { useEffect } from 'react'
import balance from '../assets/balance.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slices/userSlice'

export const UserAccount = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.User);

  useEffect(()=>{
    dispatch(fetchUser());
  }, [dispatch])

  return (
    <div className="user-account-container">
        <img src={balance} alt='balance' />
        <span className="user-wallet">{user.status === 'succeeded' && user.user.sub}</span>
    </div>
  )
}
