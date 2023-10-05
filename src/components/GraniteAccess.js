// import React, { useEffect, useState } from 'react'
// import graniteAccess from '../assets/GraniteAccess.png'
// import axios from 'axios';

// const clientId = '2xnSfHwFht2dQVek';
// const redirectUri = 'https://auth.trailmarket.xyz/oauth/granite/callback';
// const authorizationUrl = 'https://api.graniteaccess.xyz/oidc/auth';
// const tokenUrl = 'https://api.graniteaccess.xyz/oidc/token';
// const userInfoUrl = 'https://api.graniteaccess.xyz/oidc/me';
// const scope = 'openid profile'; // Add any additional scopes as needed

// export const GraniteAccess = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Check if the user is authenticated
//     if (accessToken) {
//       // Make an API request using the access token
//       axios.get(userInfoUrl, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then(response => {
//         setUserData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//     }
//   }, [accessToken]);

//   const handleLogin = () => {
//     // Generate a random state value to include in the authorization request
//     const state = Math.random().toString(36).substring(7);

//     // Construct the authorization URL
//     const authUrl = `${authorizationUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

//     // Redirect the user to the authorization URL
//     window.location.href = authUrl;
//   };

//   const handleCallback = () => {
//     // Parse the callback URL to extract the authorization code
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');

//     // Make a POST request to exchange the authorization code for an access token
//     axios.post(tokenUrl, {
//       grant_type: 'authorization_code',
//       client_id: clientId,
//       redirect_uri: redirectUri,
//       code: code,
//     })
//     .then(response => {
//       setAccessToken(response.data.access_token);
//     })
//     .catch(error => {
//       console.error('Error exchanging authorization code for access token:', error);
//     });
//   };

//   useEffect(() => {
//     // Check if the current URL contains the authorization code
//     if (window.location.search.includes('code')) {
//       // Handle the callback and exchange code for access token
//       handleCallback();
//     }
//   }, []);
//   return (
//     <div className="granite-access-btn-container">
//         <button type='button' onClick={handleLogin}><img src={graniteAccess} alt='granite-access' className="granite-access-btn" /></button>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const clientId = '2xnSfHwFht2dQVek';
const redirectUri = 'https://auth.trailmarket.xyz/oauth/granite/callback';
const authorizationUrl = 'https://api.graniteaccess.xyz/oidc/auth';
const tokenUrl = 'https://api.graniteaccess.xyz/oidc/token';
const userInfoUrl = 'https://api.graniteaccess.xyz/oidc/me';
const scope = 'openid profile'; // Add any additional scopes as needed

export function GraniteAccess() {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [codeVerifier, setCodeVerifier] = useState('');

  const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleLogin = () => {
    // Generate a random state value and code verifier for PKCE
    const state = generateRandomString(8);
    const codeVerifier = generateRandomString(43);

    // Encode the code verifier to base64
    const codeVerifierBase64 = btoa(codeVerifier);

    // Store the code verifier in the component state for later use
    setCodeVerifier(codeVerifier);

    // Construct the authorization URL with PKCE parameters
    const authUrl = `${authorizationUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=${codeVerifierBase64}&code_challenge_method=S256`;

    // Redirect the user to the authorization URL
    window.location.href = authUrl;
  };

  const handleCallback = () => {
    // Parse the callback URL to extract the authorization code and state
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    // Ensure that the state matches the stored state
    if (state !== codeVerifier) {
      console.error('Invalid state parameter in callback');
      return;
    }

    // Make a POST request to exchange the authorization code for an access token
    axios.post(tokenUrl, {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code: code,
      code_verifier: codeVerifier, // Use the stored code verifier
    })
    .then(response => {
      setAccessToken(response.data.access_token);
    })
    .catch(error => {
      console.error('Error exchanging authorization code for access token:', error);
    });
  };

  useEffect(() => {
    // Check if the current URL contains the authorization code
    if (window.location.search.includes('code')) {
      // Handle the callback and exchange code for access token
      handleCallback();
    }
  }, []);

  useEffect(() => {
    // Check if the user is authenticated
    if (accessToken) {
      // Make an API request using the access token
      axios.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Your React App</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.sub}!</p>
          {/* Display other user information */}
        </div>
      ) : (
        <button onClick={handleLogin}>Login with GraniteAccess</button>
      )}
    </div>
  );
}
