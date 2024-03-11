import React, { useState } from 'react';
import "./UserMenu.css";
import { Link , useNavigate } from 'react-router-dom';
import { logoutRequest } from '../../../store/redux/auth/AuthRequest';
import { useDispatch, useSelector } from 'react-redux';

function UserMenu({url}) {
    const imgUrl = "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-vector-avatar-icon-png-image_889567.jpg";
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const user = useSelector((state) => state?.auth?.login?.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleButtonClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () =>{
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    
    return (
        <div className="custom-user-menu">
            <button onClick={handleButtonClick}>
                <img src={url||imgUrl} width="100%" height="100%"></img>
            </button>
            {isDropdownVisible && (
                <div className="dropdown-content">
                    <Link to={"/profile"}>Profile</Link>
                    {
                        user.roles.some(role => role.authority === "ROLE_USER") &&
                        <Link to={"/my-contract"}>My contract</Link>
                    }
                    {
                        user.roles.some(role => role.authority === "ROLE_PM" || role.authority === "ROLE_ADMIN") && (
                            <Link to={"/management"}>Management</Link>
                        )
                    }

                    <a onClick={handleLogout}>Logout</a>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
