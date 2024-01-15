import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../page/auth/AuthPage";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
import Error404 from "../page/error/404/Error404";
import UserPage from "../page/user/UserPage";
import HomePage from "../page/user/home/HomePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserPage></UserPage>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "service",
        element: <p>service</p>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage></AuthPage>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "register",
        element: <RegisterPage></RegisterPage>,
      },
    ],
  },
]);
