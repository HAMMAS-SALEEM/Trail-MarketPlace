import axios from "axios";
import CryptoJS from "crypto-js";

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

export const generateCodeVerifier = () => {
  const rand = new Uint8Array(32);
  crypto.getRandomValues(rand);
  const code_verifier = base64URL(new CryptoJS.lib.WordArray.init(rand));
  return code_verifier;
};

const base64URL = (string) => {
  return string
    .toString(CryptoJS.enc.Base64)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
