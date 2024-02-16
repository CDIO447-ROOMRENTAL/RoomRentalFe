import React, { useState } from 'react';
import "./UserMenu.css";
import { Link } from 'react-router-dom';

function UserMenu() {
    const imgUrl = "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg";
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleButtonClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="custom-user-menu">
            <button onClick={handleButtonClick}>
                <img src={imgUrl} width="100%" height="100%"></img>
            </button>
            {isDropdownVisible && (
                <div className="dropdown-content">
                    <Link to={"/profile"}>Profile</Link>
                    <Link to={"/my-contract"}>My contract</Link>
                    <a href='/'>Logout</a>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
