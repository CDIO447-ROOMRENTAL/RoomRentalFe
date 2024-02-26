import React, { useState } from 'react';
import "./Header.css"
import Logo from '../../assets/logo/Logo';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../dropdown/user/UserMenu';

function Header() {
  const auth = useSelector(state => state.auth.login?.user);
  return (
    <div className='header-container'>
      <div className='nav-container'>
        <Link to={"/"} className='logo-container'>
          <Logo style={{height:'100%',width:"120px", color:"white"}}></Logo>
        </Link>
        <div className='nav-links-container'>
          <Link to={"/"} className='nav-link'>Home</Link>
          <Link to={"/product"} className='nav-link'>Product</Link>
          <Link to={"/about"} className='nav-link'>About</Link>
          <Link to={"/contact"} className='nav-link'>Contact</Link>

          <div className='auth-container'>
            {
              auth ? (

                <UserMenu url={auth?.avatar}></UserMenu>
                
              ) : (
                <div className='login-register-container'>
                  <Link to={"/auth/login"}>Login</Link> /
                  <Link to={"/auth/register"}>Register</Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
