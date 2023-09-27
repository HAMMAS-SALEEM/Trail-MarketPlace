import axios from "axios";
import { BASE_URL } from "../config/app.config";
import AuthController from "./authContoller";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTodos } from "../store/slices/todoSlice";
import ToastController from "./toastController";

const apitoken = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODcxOTExNDh9.Ln0dHOXX7lwVb4kTI3JMbJD3jxchJHOGp7k2hu_-2Vs`;

class TodoController {
  static create(data) {
    const user = AuthController.getPresistedCredencials()?.user?._id;

    data = {
      ...data,
      user,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/api/todo/create`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}/api/todo/update/${id}`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/api/todo/delete/${id}`, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static get(user) {
   
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}/api/todo/get-all/${user?._id}`, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
            console.log("#res..", res);
          if (res?.data?.success) {
            resolve(res?.data?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default TodoController;

export const useTodos = (user) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const todos = useSelector((state) => state.Todo.todos);

  useEffect(() => {
    if (!todos) {
      setLoading(true);
      TodoController.get(user)
        .then((res) => {
          dispatch(setTodos(res));
          console.log("@todo res...", res);
        })
        .catch((err) => {
          ToastController.error(err?.message);
          setError(err?.message);
          console.log("@notebooks err...", err);
        });
    }
  }, []);

  return {
    todos,
    loading,
    error,
  };
};
