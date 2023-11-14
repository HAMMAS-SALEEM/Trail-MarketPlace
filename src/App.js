import React, { useEffect } from 'react';
import './App.css';
import { Home } from './views/Home';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccessToken } from './store/slices/userSlice';
import { signIn, signOut } from './store/slices/sessionSlice';

export const App = () => {
  const dispatch = useDispatch();
  const session = useSelector(store => store.Session.session)

  useEffect(() => {
    const refreshToken = (localStorage.getItem('refreshToken'));
    if ((!refreshToken) || refreshToken === "undefined") {
      dispatch(signOut())
    }
    else {
      dispatch(fetchAccessToken(JSON.parse(refreshToken)));
      dispatch(signIn());
    }
  }, [dispatch])

  return <Home session={session} />
};

export default App;