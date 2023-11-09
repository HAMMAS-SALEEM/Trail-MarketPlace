import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slices/userSlice'
import { Currency } from './Currency'
import { HashLink as NavLink } from 'react-router-hash-link'

export const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.User);
  const accessToken = JSON.parse(localStorage.getItem('userInfo')).access_token

  useEffect(()=>{
    dispatch(fetchUser(accessToken));
  }, [dispatch, accessToken])

  return (
    <div className="navbar">
        {
          !user.user.sub ?
          <span>Loading..</span> : 
          <Currency userId={user.user.sub} />
        }
        <nav className="nav-links">
          <NavLink className="nav-link" to="#home">Home</NavLink>
          <NavLink className="nav-link" to="#store">Store</NavLink>
          <NavLink className="nav-link" to="#contact">Contact</NavLink>
        </nav>
    </div>
  )
}