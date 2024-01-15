import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthPage.css'

function AuthPage() {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default AuthPage