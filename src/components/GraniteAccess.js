import { useEffect, useState } from "react";
import graniteAccess from "../assets/GraniteAccess.png";
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "../utils/authGenerators";

export const GraniteAccess = () => {
  const [link, setLink] = useState("");

  const generateLink = async () => {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem("codeVerifier", codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    setLink(
      `${process.env.REACT_APP_AUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=openid offline_access&prompt=consent`
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      generateLink();
    }
  }, []);

  return (
    <a className="granite-access-btn-container" href={link}>
      <img
        src={graniteAccess}
        alt="granite-access"
        className="granite-access-btn"
      />
    </a>
  );
};
