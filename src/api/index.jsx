import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/store";

const apiNoAuth = axios.create({
  baseURL: "/api/",
  timeout: 1000,
});

const apiAuth = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: {
    Authorization: store.getState("user/auth"),
  },
});

const apiAdmin = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: {
    Authorization: store.getState("user/auth"),
  },
});

apiNoAuth.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return error.response.data;
  }
);

apiAuth.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      useSelector((state) => {
        state.user.cleanUserInfo();
      });
      const navigate = useNavigate();
      navigate("/user/login");
    }
    return error.response.data;
  }
);

export { apiNoAuth, apiAuth, apiAdmin };
