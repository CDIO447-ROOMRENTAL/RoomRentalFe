import React, { useState } from "react";
import { verifyRequest } from "../../../store/redux/auth/AuthRequest";
import "./VerifyPage.css"
import { Link, useNavigate } from "react-router-dom";
import CountdownTimer from "../../../component/timer/countdown/CountdownTimer ";
import RegisterPage from "../register/RegisterPage";
function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [time,setTime] = useState (60);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) || value === '') {
      setOtp(value);
    }

  };
  const onSubmit = async () => {
    await verifyRequest(otp);
    navigate("/auth/login");
  }
  return (
    <div className="verify-container">
      <input
        name="otp"
        type="text"
        value={otp}
        onChange={handleChange}
        pattern="[0-9]*"
        title="Please enter only numbers"
        required
      />
      <div className="resend-container">
        <CountdownTimer seconds={time} className="countdown"></CountdownTimer>
        {/* <p onClick={handleResendOTP}>Resend OTP</p> */}
      </div>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default VerifyPage;
