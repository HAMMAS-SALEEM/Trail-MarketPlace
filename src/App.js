import { useEffect } from "react";
import "./App.css";
import { GeneralStore } from "./components/GeneralStore";
import { GraniteAccess } from "./components/GraniteAccess";
import { Items } from "./components/Items";
import { Navbar } from "./components/Navbar";
import { TrailMainHeading } from "./components/TrailMainHeading";
import { UserAccount } from "./components/UserAccount";
import { getToken } from "./utils/authGenerators";

const App = () => {
  //get the code from the url
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
      <GraniteAccess />
      <GeneralStore />
      <UserAccount />
      <Items />
    </>
  );
};

export default App;
