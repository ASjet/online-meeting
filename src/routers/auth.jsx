import React from "react";
import { Navigate } from "react-router-dom";

function isLogin() {
  return JSON.parse(localStorage.getItem("auth"));
}

// 已登录的用户不应该继续访问该页面，直接重定向到主页
export function AuthNoLogin(props) {
  return isLogin() ? <Navigate to="/" replace /> : props.children;
}

// 未登录的用户需要重定向到登陆页面完成登陆认证
export function AuthLogin(props) {
  return isLogin() ? props.children : <Navigate to="/user/login" replace />;
}
