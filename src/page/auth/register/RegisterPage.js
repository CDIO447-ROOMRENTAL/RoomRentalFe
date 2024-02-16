import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerRequest } from "../../../store/redux/auth/AuthRequest";
import Verify from "../verify/VerifyPage";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import Dialog from "../../../component/dialog/Dialog";
import Logo from "../../../assets/logo/Logo";

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

  const handleRegisterAndOpenModal = async () => {
    const response = await registerRequest(registerForm);
    if (response) {
      toast.success("Register successful!", configToast);
    } else {
      toast.error(
        "Register failed: Please check your credentials.",
        configToast
      );
    }

    openModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <Link to={"/"} className='logo-container'>
          <Logo></Logo>
        </Link>
        <h1>Register</h1>
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
          <button onClick={handleRegisterAndOpenModal} type="button">
            Submit
          </button>
        </div>
        <Link to={"/auth/login"}>I already have an account</Link>
      </form>
      <Dialog
        isOpen={isModalOpen} onRequestClose={closeModal}
        title="Confirm OTP" customStyles={{
          content: { maxWidth: '500px', height: '200px' },
          title: { textAlign: 'center' }
        }}>
        <Verify />
      </Dialog>
    </div>
  );
}

export default RegisterPage;
