import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slices/userSlice'
import { Currency } from './Currency'
import { HashLink as NavLink } from 'react-router-hash-link'
import { GraniteAccess } from './GraniteAccess'

export const Navbar = ({session}) => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.User);

  useEffect(()=>{
    if(session) {
      dispatch(fetchUser(JSON.parse(localStorage.getItem('userInfo')).access_token));
    }
  }, [dispatch, session])

  return (
    <div className="navbar">
        {
          session && user.user.sub ?
          <Currency userId={user.user.sub} /> :
          <GraniteAccess />
        }
        <nav className="nav-links">
          <NavLink className="nav-link" to="#home">Home</NavLink>
          <NavLink className="nav-link" to="#store">Store</NavLink>
          <NavLink className="nav-link" to="#contact">Contact</NavLink>
        </nav>
    </div>
  )
}