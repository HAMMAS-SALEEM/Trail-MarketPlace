import { BASE_URL } from "../config/app.config";
import axios from "axios";

class PurchaseController {
  static createTrailUser(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/api/trail-market/`, data, {
        //   headers: {
        //     Authorization: apitoken,
        //   },
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

  static updateTrailUser(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/api/trail-market/${id}`, data, {
        //   headers: {
        //     Authorization: apitoken,
        //   },
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

  static getTrailUser(gid) {
    return axios.get(`${BASE_URL}/api/trail-users?filters[granite_id][$eq]=${gid}`)
  }

  static async buyProduct(data) {
    const res = await axios.put(`${BASE_URL}/api/trail-users/${data[0]}`, data[1])
    return res;
  }
};

export default PurchaseController;