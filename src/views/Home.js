import { useEffect } from "react";
import { GeneralStore } from "../components/GeneralStore";
import { GraniteAccess } from "../components/GraniteAccess";
import { Products } from "../components/Products";
import { Navbar } from "../components/Navbar";
import { TrailMainHeading } from "../components/TrailMainHeading";
import { UserAccount } from "../components/UserAccount";
import { getToken } from "../utils/authGenerators";
import PurchaseController from "../controllers/purchaseController";
import { AvailableProducts } from "../components/AvailableProducts";

export const Home = () => {

  const handleGetPurchase = async () => {
    const gid = "5d66d6b9-b8e5-476f-8248-27ca7cf75be1"
    const result = await PurchaseController.getTrailUser(gid);
    console.log(result.data.data[0].attributes);
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
      {/* <Products /> */}
      <AvailableProducts />
      <button type="button" onClick={handleGetPurchase}>GetPurchaseData</button>
    </>
  );
};
