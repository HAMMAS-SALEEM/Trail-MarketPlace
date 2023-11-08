// import { useEffect } from "react";
// import { GraniteAccess } from "../components/GraniteAccess";
// import { Navbar } from "../components/Navbar";
// import { TrailMainHeading } from "../components/TrailMainHeading";
// import { getToken } from "../utils/authGenerators";
import { AvailableProducts } from "../components/AvailableProducts";

export const Home = () => {

  //get the code from the url
  // useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get("code");
    // if (code) {
      // getToken(code, localStorage.getItem("codeVerifier"));
    // }
  // }, []);

  return (
    <>
      {/* <Navbar /> */}
      {/* <TrailMainHeading /> */}
      {/* <GraniteAccess /> */}
      <AvailableProducts />
    </>
  );
};
