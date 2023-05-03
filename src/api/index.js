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

    if (error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: "Something went wrong" });
    }
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
    if (error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: "Something went wrong" });
    }
  }
);

apiAdmin.interceptors.response.use(
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
      navigate("/room/guest");
    }
    if (error.response.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: "Something went wrong" });
    }
  }
);

export { apiNoAuth, apiAuth, apiAdmin };
