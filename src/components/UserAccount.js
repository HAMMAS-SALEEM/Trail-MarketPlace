import React from 'react'
import balance from '../assets/balance.png'

export const UserAccount = () => {
  return (
    <div className="user-account-container">
        <img src={balance} alt='balance' />
        <span className="user-wallet">Wallet: 0x5DEBBBB5124312</span>
    </div>
  )
}
