import React, { useEffect, useState } from 'react';
import './App.css';
import { Home } from './views/Home';
import { useDispatch } from 'react-redux';
import { fetchAccessToken } from './store/slices/userSlice';

export const App = () => {
  const dispatch = useDispatch();
  const [session, setSession] = useState(false);

  const handleSession = () => setSession(!session);

  const refreshToken = (localStorage.getItem('refreshToken'));

  useEffect(() => {
    if ((!refreshToken) || refreshToken == "undefined") {
      setSession(false);
    }
    else {
      dispatch(fetchAccessToken(JSON.parse(refreshToken)));
      setSession(true);
    }
    const interval = setInterval(() => {
      dispatch(fetchAccessToken(JSON.parse(refreshToken)));
    }, 3600000);
    return () => {
      clearInterval(interval)
    };
  }, [refreshToken, dispatch])

  return <Home session={session} handleSession={handleSession} />
};

export default App;