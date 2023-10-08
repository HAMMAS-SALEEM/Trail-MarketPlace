import axios from "axios";

const dec2hex = (dec) => {
  return ("0" + dec.toString(16)).substr(-2);
};

//generate code verifier
export const generateCodeVerifier = () => {
  let array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
};

//generate code challenge
export const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const buffer = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

//get the token by code
export const getToken = async (code, codeVerifier) => {
  const params = {
    grant_type: "authorization_code",
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_CALLBACK_URL,
    code_verifier: codeVerifier,
    code: code,
  };

  const formBody = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");

  try {
    const response = await axios.post(
      process.env.REACT_APP_TOKEN_URL,
      formBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem("accessToken", response.data.access_token);
  } catch (error) {
    console.error(error);
  }
};
