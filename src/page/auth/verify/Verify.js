import React, { useState } from "react";
import { verifyRequest } from "../../../store/redux/auth/AuthRequest";

function Verify() {
  const [otp, setOtp] = useState("");
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const onSubmit = async() =>{
    await verifyRequest(otp);
  }
  return (
    <div>
      <input name="otp" type="number" onChange={handleChange}></input>
      <br></br>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default Verify;
