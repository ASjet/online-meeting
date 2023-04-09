import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/User/Login";
import Register from "@/pages/User/Register";
import Entry from "@/pages/Entry";
import Video from "@/pages/Room/Guest";
import ErrorPage400 from "../pages/ErrorPages/400";

import BasicLayout from "@/layouts/Basic";
import LoginLayout from "@/layouts/Login";
import { AuthNoLogin, AuthLogin } from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLogin>
        <BasicLayout />
      </AuthLogin>
    ),
    errorElement: <ErrorPage400 />,
    children: [
      {
        path: "/",
        element: <Entry />,
      },
      {
        path: "/room/guest",
        element: <Video />,
      },
      {
        path: "/room/admin",
        element: <Video />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <AuthNoLogin>
        <LoginLayout />
      </AuthNoLogin>
    ),
    children: [
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
