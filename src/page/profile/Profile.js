// Profile.js

import React, { useEffect } from 'react';
import "./Profile.css";
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.auth?.login?.user)
    useEffect(() => {
        // console.log(user);
        fetchProfile(dispatch,user?.accessToken); // Assuming you have jwt available
        // console.log(profile);
    }, [dispatch]);
    return (
        <div className='profile-container'>
            <div className='left-container'>
                <div className='avatar-container'>
                    <img src={imgUrl} className='avatar'></img>
                </div>
                <div className='text-container'>
                    <span className='txt-username'>Trần Văn Sơn</span>
                    <span className='txt-email'>tranvanson231099@gmail.com</span>
                </div>
                <div className='button-container'>
                    <button type='button' className='btn-update'>Update</button>
                </div>
            </div>
            <div className='right-container'>
                <form className='form-container'>
                    <h2>Profile</h2>
                    <div className='input-container'>
                        <span className='label-input-tite'>Name</span>
                        <input className='input-style'></input>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Gender</span>
                        <div className='checkbox-container'>
                            <div className='input-checkbox-container'>
                                <input type='radio' className='checkbox' value="MALE" name='gender'></input>
                                <label className='nested-label'>Male</label>
                            </div>
                            <div className='input-checkbox-container'>
                                <input type='radio' className='checkbox' value="FEMALE" name='gender'></input>
                                <label className='nested-label'>Female</label>
                            </div>
                            <div className='input-checkbox-container'>
                                <input type='radio' className='checkbox' value="OTHER" name='gender'></input>
                                <label className='nested-label'>Other</label>
                            </div>
                        </div>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Birthday</span>
                        <input type='date' className='input-style'></input>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Phone</span>
                        <input className='input-style'></input>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Address</span>
                        <input className='input-style'></input>
                    </div>
                    <div className='button-container'>
                        <button type='button' className='btn-update'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;

const imgUrl = "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg";