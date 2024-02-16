import React, { useState } from 'react';
import "./ButtonMenu.css";

const ButtonMenu = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleButtonClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="custom-button-menu">
      <button onClick={handleButtonClick}>Toggle Dropdown</button>
      {isDropdownVisible && (
        <div className="dropdown-content">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      )}
    </div>
  );
};

export default ButtonMenu;
