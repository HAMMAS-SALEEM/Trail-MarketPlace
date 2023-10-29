import { useEffect } from "react";
import { GeneralStore } from "../components/GeneralStore";
import { GraniteAccess } from "../components/GraniteAccess";
import { Products } from "../components/Products";
import { Navbar } from "../components/Navbar";
import { TrailMainHeading } from "../components/TrailMainHeading";
import { UserAccount } from "../components/UserAccount";
import { getToken } from "../utils/authGenerators";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessToken } from "../store/slices/userSlice";

export const Home = () => {
  const store = useSelector(store => store)
  const dispatch = useDispatch();

  const handleAccessToken = () => {
    dispatch(fetchAccessToken());
  }

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
      <Products />
      <button type="button" onClick={handleAccessToken}>Access Token</button>
    </>
  );
};
