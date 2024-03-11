import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Management.css";
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function Management() {
    const location = useLocation();
    const user = useSelector((state) => state?.auth?.login?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hideMenu, setHideMenu] = useState(false);
    const [isAdminOrPM, setIsAdminOrPM] = useState(false);

    const hideMenuMethod = () => {
        setHideMenu(!hideMenu);
    };

    useEffect(() => {
        checkRoleAdminPm();
    }, [dispatch]);

    const checkRoleAdminPm = () => {
        const isAdminOrPM = user?.roles.some(role => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_PM');
        setIsAdminOrPM(isAdminOrPM);
        if (!isAdminOrPM) {
            navigate('/auth/login');
            window.localStorage.clear();
        }
    };

    return (
        <div className='page-containner'>
            <Header />
            <div className='management-content-container'>
                {hideMenu && (
                    <div className='btn-open-close-menu btn-open-menu' onClick={hideMenuMethod}>
                        <FontAwesomeIcon icon={faBackward} />
                    </div>
                )}
                <div className='management-navigate' style={{ display: hideMenu ? "none" : "flex" }}>
                    {!hideMenu && (
                        <div className='btn-open-close-menu btn-close-menu' onClick={hideMenuMethod}>
                            <FontAwesomeIcon icon={faBackward} />
                        </div>
                    )}
                    <Link to={"/management/product"} className={location.pathname.includes('/management/product') ? 'active-link' : 'inactive-link'}>Management product</Link>
                    <Link to={"/management/contract"} className={location.pathname.includes('/management/contract') ? 'active-link' : 'inactive-link'}>Management contract</Link>
                </div>
                <div className='management-content' style={{ width: hideMenu ? "100%" : "calc(100% - 320px)" }}>
                    <Outlet />
                    {location.pathname === '/management' && isAdminOrPM && (
                        <p style={{ fontSize: "28px", fontWeight: "600", display: "flex", justifyContent: "center", alignContent: "center" }}>Welcome to the Management Page</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Management;
