import React from "react";
import { Navigate } from "react-router-dom";

// 已登录的用户，不应该进入login页，直接重定向到主页
export function AuthNoLogin(props) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    return <Navigate to="/" replace />;
  }
  return props.children;
}

// 未登录的用户，重定向到登录页
export function AuthLogin(props) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    return <Navigate to="/user/login" replace />;
  }
  return props.children;
}
