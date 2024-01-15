import React from "react";
import { Outlet } from "react-router-dom";
import "./UserPage.css";

function UserPage() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default UserPage;
