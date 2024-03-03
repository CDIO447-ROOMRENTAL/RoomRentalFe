import React from 'react'
import "./RoomPage.css"
import { Outlet } from 'react-router-dom'
function RoomPage() {
  return (
    <div>
       <Outlet></Outlet>
    </div>
  )
}

export default RoomPage;
