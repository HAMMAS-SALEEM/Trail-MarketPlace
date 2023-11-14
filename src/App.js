import React, { useEffect } from 'react';
import './App.css';
import { Home } from './views/Home';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccessToken } from './store/slices/userSlice';
import { signIn, signOut } from './store/slices/sessionSlice';

export const App = () => {
  const dispatch = useDispatch();
  const session = useSelector(store => store.Session.session)

  const refToken = (data) => localStorage.getItem(data);

  useEffect(() => {
    if ((!refToken('refreshToken')) || refToken('refreshToken') === "undefined" || !refToken('userInfo')) {
      dispatch(signOut())
    }
    else {
      dispatch(fetchAccessToken(JSON.parse(refToken())));
      dispatch(signIn());
    }
  }, [dispatch])

  return <Home session={session} />
};

export default App;