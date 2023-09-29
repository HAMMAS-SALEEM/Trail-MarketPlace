import React from 'react'
import discord from '../assets/discord.png'
import x from '../assets/x.png'
import ship from '../assets/ship.png'

export const SocialIcons = () => {
  return (
    <div className='social-icons-container'>
        <img className='social-icons' src={discord} alt='' />
        <img className='social-icons' src={x} alt='' />
        <img className='social-icons' src={ship} alt='' />
    </div>
  )
}
