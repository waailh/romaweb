import { axiosPure } from "./axios/axios";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("ecom_token") ||
      localStorage.getItem("ecom_guest_token")
    );
  }
  return null;
};

export const fetchUserData = async () => {
  const token = getToken();
  const axios = axiosPure();

  let res;

  if (token) {
    try {
      res = await axios.post(`/get-user-by-access_token`, {
        access_token: token,
      });

      if (res.data.result) {
        return { user: res.data, token };
      }
    } catch (error) {}
  }

  // If there's no token or `result` is false, create a guest account
  res = await axios.post(`/auth/guest-user-account-create`, {});
  return { user: res.data.user, token: res.data.access_token };
};
