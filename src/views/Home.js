import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { TrailMainHeading } from "../components/TrailMainHeading";
import { getToken } from "../utils/authGenerators";
import { AvailableProducts } from "../components/AvailableProducts";
import { Contact } from "../components/Contact";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const Home = ({session, handleSession}) => {
  const navigate = useNavigate();

  // get the code from the url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const handleLogin = () => {
      getToken(code, localStorage.getItem("codeVerifier"))
      .then(() => {
        navigate('/');
        handleSession();
      })
    }
    if (code) {
      handleLogin();
    }
  }, [navigate, handleSession]);

  return (
    <>
    {
      <>
        <Navbar session={session} />
        <TrailMainHeading />
        <AvailableProducts session={session} />
        <Contact />
        <Loading />
      </>
    }
    </>
  );
};
