import axios from "axios";
import { BASE_URL } from "../config/app.config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAllNoteBooks } from "../store/slices/noteSlice";
import ToastController from "./toastController";
import AuthController from "./authContoller";

const apitoken = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODcxOTExNDh9.Ln0dHOXX7lwVb4kTI3JMbJD3jxchJHOGp7k2hu_-2Vs`;

class NotebookController {
  static create(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/api/notebook/create`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static createFolder(data){
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api/subfolder/create`, data, {
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getAllNoteBooks() {
    const id = AuthController.getPresistedCredencials()?.user?._id
    console.log("user...", id);
    return new Promise((resolve, reject) => {
     if(id){
        axios
        .get(`${BASE_URL}/api/notebook/get-all/${id}`, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
     }
    });
  }

  static deleteFolder(id){
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/api/subfolder/delete/${id}`, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateFolder(id, data){
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}/api/subfolder/update/${id}`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static deleteNotebook(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/api/notebook/delete/${id}`, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateNoteBook(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}/api/notebook/update/${id}`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          console.log("@note update res...", res);
          if (res?.data?.success) {
            resolve(res?.data?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static createNote(id, data) {
    console.log("@create note....", id, data);
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/api/note/create/${id}`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          console.log("@res Note...", res);
          if (res?.data?.success) {
            resolve(res?.data?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateNote(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}/api/note/update/${id}`, data, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  

  static search(query){
    const id = AuthController.getPresistedCredencials()?.user?._id
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/api/notebook/search?queryText=${query}&user=${id}`,{
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        console.log("@search res....", res);
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static uploadAttachment(id,data){
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api/note/upload/${id}`, data, {
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        console.log("@search res....", res);
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static getSingleNoteBook(id){
    return new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/api/notebook/get/${id}`, {
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        console.log("@search res....", res);
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static validateLink(data){
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api/note/validate-link`, data, {
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static createLink(id,data){
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api/note/add-link/${id}`, data, {
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static createTodo(id, data){
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/api/note/create-todo/${id}`, data, {
        headers:{
          Authorization: apitoken
        }
      }).then(res => {
        console.log("@search res....", res);
        if(res?.data?.success){
          resolve(res?.data?.data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static deleteNote(id){
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}/api/note/delete/${id}`, {
          headers: {
            Authorization: apitoken,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            resolve(res?.data);
          } else {
            reject(res?.data?.error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default NotebookController;

export const useCurrentUser = () => {
  const currentUser = AuthController.getPresistedCredencials()?.user;
  return currentUser;
};

export const useNoteBooks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const notebooks = useSelector((state) => state.NoteBook.notebooks);

  useEffect(() => {
    if (!notebooks) {
      setLoading(true);
      NotebookController.getAllNoteBooks()
        .then((res) => {
          setLoading(false)
          dispatch(setAllNoteBooks(res?.data));
          console.log("@notebooks res...", res);
        })
        .catch((err) => {
          ToastController.error(err?.message);
          setError(err?.message);
          console.log("@notebooks err...", err);
          setLoading(false)

        });
    }
  }, []);

  return {
    notebooks,
    loading,
    error,
  };
};
