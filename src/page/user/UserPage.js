import React from "react";
import { Outlet } from "react-router-dom";
import "./UserPage.css";
import Header from "../../component/header/Header";

function UserPage() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

export default UserPage;
