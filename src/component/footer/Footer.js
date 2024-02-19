import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookMessenger, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    return (
        <div className='footer-container'>
            <p className='txt-slogan'>Connecting you to great homes,<br></br> Room_rental is the best app for finding your dream house.</p>
            <button className='btn-top-footer'>Click to Top</button>
            <div className='icon-container'>
                <div><FontAwesomeIcon icon={faFacebook} /></div>
                <div><FontAwesomeIcon icon={faGoogle} /></div>
                <div><FontAwesomeIcon icon={faTwitter} /></div>
                <div><FontAwesomeIcon icon={faInstagram} /></div>
                <div><FontAwesomeIcon icon={faFacebookMessenger} /></div>
            </div>
        </div>
    )
}

export default Footer
