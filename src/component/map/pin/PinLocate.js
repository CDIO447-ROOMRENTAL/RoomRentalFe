// PinLocate.js
import React, { useState } from 'react';

function PinLocate({ pinEnable }) {
  const [status, setStatus] = useState(false);

  const pinEnableMethod = () => {
    // Toggle the status and pass it to the pinEnable function
    const newStatus = !status;
    setStatus(newStatus);
    pinEnable(newStatus);
  }

  return (
    <div>
      <button onClick={pinEnableMethod}>Pin Current Location</button>
    </div>
  );
}

export default PinLocate;
