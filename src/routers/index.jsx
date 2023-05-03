import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/User/Login";
import Register from "@/pages/User/Register";
import Entry from "@/pages/Entry";
import RoomGuest from "@/pages/Room/Guest";
import RoomAdmin from "@/pages/Room/Admin";
import ErrorPage400 from "@/pages/ErrorPages/400";
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
        element: <RoomGuest />,
      },
      {
        path: "/room/admin",
        element: <RoomAdmin />,
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
