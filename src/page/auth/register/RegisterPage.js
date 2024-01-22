import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerRequest } from "../../../store/redux/auth/AuthRequest";
import Verify from "../verify/Verify";
import "./RegisterPage.css";
const configToast = {
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
};
function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const response = await registerRequest(registerForm);
    if (response) {
      toast.success("Register successful!", configToast);
    } else {
      toast.error(
        "Register failed: Please check your credentials.",
        configToast
      );
    }
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <form>
        <div>
          <span>Name</span>
          <input
            name="name"
            type="text"
            value={registerForm.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <span>Username</span>
          <input
            name="username"
            type="text"
            value={registerForm.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={registerForm.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={registerForm.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleRegister} type="button">
            Submit
          </button>
        </div>
      </form>
      <div>
        <Verify></Verify>
      </div>
    </div>
  );
}
export default RegisterPage;
