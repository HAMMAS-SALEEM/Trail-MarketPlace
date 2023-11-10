import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './routing/ProtectedRoutes';
import PublicRoutes from './routing/PublicRoutes';
import { useDispatch } from 'react-redux';
import { fetchAccessToken, fetchUser } from './store/slices/userSlice';
import { generateCodeVerifier } from './utils/authGenerators';

// export const App = () => {
//   const dispatch = useDispatch();
//   const [session, setSession] = useState(false);

//   const refreshToken = (localStorage.getItem('refreshToken'));

//   useEffect(() => {
//     if ((!refreshToken) || refreshToken == "undefined") {
//       localStorage.clear();
//       const codeVerifier = generateCodeVerifier();
//       localStorage.setItem("codeVerifier", codeVerifier);
//       setSession(false);
//     } else {
//       dispatch(fetchAccessToken(JSON.parse(refreshToken)));
//       setSession(true);
//     }
//     const interval = setInterval(() => {
//       dispatch(fetchAccessToken(JSON.parse(refreshToken)));
//     }, 3600000);
//     return () => {
//       clearInterval(interval)
//     };
//   }, [dispatch])

//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={
//         <ProtectedRoutes session={session}>
//           <Home />
//         </ProtectedRoutes>
//       }
//       />
//       <Route path='/login' element={
//         <PublicRoutes session={session}>
//           <Login />
//         </PublicRoutes>
//       } />
//     </Routes>
//     </BrowserRouter>
//   )
// };

export const App = () => {
  const dispatch = useDispatch();
  const [session, setSession] = useState(false);

  const refreshToken = (localStorage.getItem('refreshToken'));

  useEffect(() => {
    if ((!refreshToken) || refreshToken == "undefined") {
      localStorage.clear();
      const codeVerifier = generateCodeVerifier();
      localStorage.setItem("codeVerifier", codeVerifier);
      setSession(false);
    } else {
      dispatch(fetchAccessToken(JSON.parse(refreshToken)));
      setSession(true);
    }
    const interval = setInterval(() => {
      dispatch(fetchAccessToken(JSON.parse(refreshToken)));
    }, 3600000);
    return () => {
      clearInterval(interval)
    };
  }, [dispatch, refreshToken])

  return <Home session={session} />
};

export default App;