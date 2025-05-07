import axios from "axios";
import { fetchUserData, getToken } from "../auth";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

const creds = false; // with credentials: false for laravel admin auth confusion

export const axiosWithAuth = () => {
  let token = getToken();

  // this is not a solution, check it a hundred times first ****************

  // if (!token) {
  //   fetchUserData().then((res) => {
  //     token = res?.token;
  //   });
  // }

  const instance = axios.create({
    baseURL: backendHost,
    headers: {
      "X-Source": "web",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: creds,
  });
  return instance;
};

export const axiosPure = () => {
  const instance = axios.create({
    baseURL: backendHost,
    headers: {
      "X-Source": "web",
    },
    withCredentials: creds,
  });
  return instance;
};
