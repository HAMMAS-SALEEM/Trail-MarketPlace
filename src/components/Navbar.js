import React from 'react'
import { Logo } from './Logo';
import { SocialIcons } from './SocialIcons';

export const Navbar = () => {
  return (
    <div className="navbar">
      <Logo />
      <SocialIcons />
    </div>
  )
}
