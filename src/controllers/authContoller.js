import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config/app.config";
import { setCurrentUser } from "../store/slices/authSlice";
import {
  setActiveNote,
  setActiveNoteBook,
  setAllNoteBooks,
} from "../store/slices/noteSlice";
import ToastController from "./toastController";
import { store } from "../store";

class AuthController {
  static SAVED_SESSION_KEY = "key@notebook.webv.0.1";

  static logIn(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/user/auth/login`, data)
        .then((res) => {
          if (res?.data?.success) {
            console.log("@res success...", res?.data);
            store.dispatch(setCurrentUser(res?.data?.data));
            this.presistCredentials(res?.data?.data, res?.data?.data?.token);
            resolve(res?.data);
          } else {
            console.log("@res not success...", res?.data);
            reject(res?.data?.error?.message);
          }
        })
        .catch((err) => {
          console.log("@err login...", err);
          reject(err);
        });
    });
  }
  static signup(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/user/auth/signup`, data)
        .then((res) => {
          if (res?.data?.success) {
            console.log("@res signup success...", res?.data);
            resolve(res?.data);
          } else {
            console.log("@res signup not success...", res?.data);
            reject(res?.data?.error?.message);
          }
        })
        .catch((err) => {
          console.log("@err signup...", err);
          reject(err);
        });
    });
  }

  static presistCredentials = (user, token) => {
    if (user && token) {
      localStorage.setItem(
        AuthController.SAVED_SESSION_KEY,
        JSON.stringify({ user, token })
      );
    } else {
      console.log(`undefined credencials: not presisted`);
    }
  };

  static getPresistedCredencials = () => {
    let strSessionData = localStorage.getItem(AuthController.SAVED_SESSION_KEY);
    if (strSessionData) {
      return JSON.parse(strSessionData);
    } else {
      return null;
    }
  };

  static restorePresistedCredencials() {
    let presistedData = AuthController.getPresistedCredencials();
    if (presistedData) {
      store.dispatch(setCurrentUser(presistedData.user));
      axios.defaults.headers.common["Authorization"] = presistedData.token;
      return presistedData?.user;
    } else {
      return false;
    }
  }

  static logout() {
    const toast = new ToastController();
    toast.showProcessing(`logging out...!`);

    localStorage.removeItem(AuthController.SAVED_SESSION_KEY);
    axios.defaults.headers.common["Authorization"] = undefined;
    store.dispatch(setCurrentUser(null));
    store.dispatch(setActiveNote(null));
    store.dispatch(setActiveNoteBook(null));
    store.dispatch(setAllNoteBooks(null));
    setTimeout(() => {
      toast.endProcessingWithSuccess(`successfully logged out...!`);
    }, 500);
  }
}

export default AuthController;

export const useCurrentuser = () => {
  return useSelector((state) => state.Auth.currentUser);
};
