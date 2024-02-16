// AuthRequest.js
import { auth } from "../../../connection/api/Localhost";
import { clearCookie, setCookie } from "../../httponly/Cookie";
import { loginFailed, loginStart, loginSuccess } from "./AuthSlice";

export const loginRequest = async (dispatch, loginForm) => {
  try {
    dispatch(loginStart());
    console.log(loginForm);
    const response = await fetch(`${auth.login}`, {
      method: 'POST',
      credentials: "include", // Include credentials to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(
        loginSuccess(data)
      );

      return true;
    } else {
      dispatch(loginFailed());
      console.error('Error:', response.statusText);
      return false;
    }
  } catch (error) {
    dispatch(loginFailed());
    console.error('Error:', error.message);
    return false;
  }
};

export const logoutRequest = async (dispatch) => {
  try {
    dispatch(loginFailed());
    await clearCookie("accessToken");
    return true;
  } catch (error) {
    dispatch(loginFailed());
    console.error("Error:", error.message);
    return false;
  }
};

export const registerRequest = async (registerForm) => {
  try {
    const response = await fetch(`${auth.register}`, {
      method: "POST",
      credentials: "include", // Include credentials to send cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
    });
    console.log(document.cookie);

    console.log(response);
    if (response.ok) {
      console.log("Cookie set successfully:");
    } else {
      console.error("Error setting cookie:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const verifyRequest = async (otp) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/verify?otp=${otp}`,
      {
        method: "GET",
        credentials: "include", // Include credentials to send cookies
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("Verify successfully:");
      console.log(response);
      return true;
    } else {
      console.error("Verify setting cookie:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
};
export const jwtRequest = () => {
  return clearCookie("accessToken");
}
