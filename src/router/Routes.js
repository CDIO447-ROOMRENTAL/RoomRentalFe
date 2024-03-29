import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../page/auth/AuthPage";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
import Error404 from "../page/error/404/Error404";
import UserPage from "../page/user/UserPage";
import HomePage from "../page/user/home/HomePage";
import VerifyPage from "../page/auth/verify/VerifyPage";
import ProfilePage from "../page/user/profile/ProfilePage";
import ProductPage from "../page/user/product/ProductPage";
import MyContract from "../page/user/contract/MyContract";
import AboutPage from "../page/user/about/AboutPage";
import ContactPage from "../page/user/contact/ContactPage";
import MyFavouritePage from "../page/user/favourite/MyFavouritePage";
import Management from "../page/management/Management";
import ProductManagementPage from "../page/management/product/ProductManagementPage";
import ListProduct from "../component/manager/product/list/ListProduct";
import CreateProduct from "../component/manager/product/create/CreateProduct";
import UpdateProduct from "../component/manager/product/update/UpdateProduct";
import RoomPage from "../page/user/product/room/RoomPage";
import ListRoom from "../component/manager/room/listRoom/ListRoom";
import CreateRoom from "../component/manager/room/createRoom/CreateRoom";
import DetailRoom from "../component/manager/room/detailRoom/DetailRoom";
import ProductDetail from "../page/user/product/productDetail/ProductDetail";
import Contract from "../page/user/contract/Contract";

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
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "my-contract",
        element: <MyContract></MyContract>,
      },
      {
        path: "product",
        element: <ProductPage></ProductPage>,
      },
      {
        path: "product/detail/:id",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "contract/:id",
        element: <Contract></Contract>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "my-favourite",
        element: <MyFavouritePage></MyFavouritePage>,
      },

    ],
  }, {
    path: "/management",
    element: <Management></Management>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "product",
        element: <ProductManagementPage></ProductManagementPage>,
        children: [
          {
            path: "",
            element: <ListProduct></ListProduct>
          },
          {
            path: "create",
            element: <CreateProduct></CreateProduct>
          },
          {
            path: "detail/:id",
            element: <UpdateProduct />,
          },
          {
            path: "detail/:id/room",
            element: <RoomPage />,
            children:
              [
                {
                  path: "",
                  element: <ListRoom />
                }, 
                {
                  path: "create",
                  element: <CreateRoom />
                },
                {
                  path: "update/:roomID",
                  element: <DetailRoom />
                }
              ]
          },
        ]
      },
      {
        path: "contract",
        element: <ProductManagementPage></ProductManagementPage>
      }
    ]
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
      {
        path: "register/verify",
        element: <VerifyPage></VerifyPage>
      },
    ],
  },
]);
