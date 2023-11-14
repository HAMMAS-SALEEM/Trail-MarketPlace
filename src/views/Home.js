import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { TrailMainHeading } from "../components/TrailMainHeading";
import { getToken } from "../utils/authGenerators";
import { AvailableProducts } from "../components/AvailableProducts";
import { Contact } from "../components/Contact";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/sessionSlice";

export const Home = ({session}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStatus = useSelector(store => store.User)

  // get the code from the url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const handleLogin = () => {
      getToken(code, localStorage.getItem("codeVerifier"))
      .then(() => {
        navigate('/');
        dispatch(signIn());
      })
    }
    if (code) {
      handleLogin();
    }
  }, [navigate, dispatch]);

  return (
            <>
              <Navbar session={session} />
              <TrailMainHeading />
              <AvailableProducts session={session} />
              <Contact />
            </>
  );
};
