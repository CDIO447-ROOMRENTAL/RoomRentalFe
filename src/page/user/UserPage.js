import React from "react";
import { Outlet } from "react-router-dom";
import "./UserPage.css";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

function UserPage() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default UserPage;
