import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../../store/redux/auth/AuthRequest';
import "./LoginPage.css"
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo/Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state?.auth?.login); // Moved useSelector outside useEffect

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await loginRequest(dispatch, loginForm);
      if (response) {
        toast.success('Login successful!');
        navigate("../../")
      } else {
        toast.error('Login failed..');
      }
      // Đăng nhập thành công, hiển thị thông báo
    } catch (error) {
      console.error('Error during login:', error.message);
      setLoginError('Login failed. Please check your credentials.');
      // Đăng nhập thất bại, hiển thị thông báo lỗi
    }
  };

  return (
    <div className="loginForm-container">
      <ToastContainer />
      <form className="loginForm">
        <Link to={"/"} className='logo-container'>
          <Logo></Logo>
        </Link>
        <h1 className='label-title'>Login</h1>
        <div className="loginForm-input">
          <label className="loginFormLabel">Username:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="loginForm-input">
          <label className="loginFormLabel">Password:</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button className="loginFormButton" onClick={handleLogin} type='button'>Login</button>
        {loginError && <p className="loginFormError">{loginError}</p>}
        <Link to={"/auth/register"}>Create new account</Link>
      </form>
    </div>
  );
};

export default LoginPage;
