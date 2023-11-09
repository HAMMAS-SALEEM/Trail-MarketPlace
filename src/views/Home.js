import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { TrailMainHeading } from "../components/TrailMainHeading";
import { getToken } from "../utils/authGenerators";
import { AvailableProducts } from "../components/AvailableProducts";
import { Contact } from "../components/Contact";

export const Home = () => {

  // get the code from the url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      getToken(code, localStorage.getItem("codeVerifier"));
    }
  }, []);

  return (
    <>
      <Navbar />
      <TrailMainHeading />
      <AvailableProducts />
      <Contact />
    </>
  );
};
