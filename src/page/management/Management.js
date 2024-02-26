import React from 'react'
import "./Management.css"
import Header from '../../component/header/Header'
import Footer from '../../component/footer/Footer'
import { Link, Outlet, useLocation } from 'react-router-dom'
function Management() {
    const location = useLocation();

    return (
        <div className='page-containner'>
            <Header></Header>
            <div className='management-content-container'>
                <div className='management-navigate'>
                    <Link to={"/management/product"} className={location.pathname.includes('/management/product') ? 'active-link' : 'inactive-link'}>Management product</Link>
                    <Link to={"/management/contract"} className={location.pathname.includes('/management/contract') ? 'active-link' : 'inactive-link'}>Management contract</Link>
                </div>
                <div className='management-content'>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Management
