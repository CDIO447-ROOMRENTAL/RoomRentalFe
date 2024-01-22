import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../../store/httponly/Cookie';
import { loginRequest } from '../../../store/redux/auth/AuthRequest';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(null);

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await loginRequest(dispatch, loginForm);
      console.log(response);
    } catch (error) {
      console.error('Error during login:', error.message);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  const handleCookie = async () => {
    try {
      const response = await getCookie('accessToken');
      console.log(response);
    } catch (error) {
      console.error('Error getting cookie:', error.message);
      // Handle the case when the cookie is not found more gracefully
      setLoginError('Cookie not found.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <button onClick={handleCookie}>Get Cookie</button>
    </div>
  );
};

export default LoginPage;
