// Profile.js

import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/redux/profile/ProfileRequest';

function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state?.profile?.user);
    const user = useSelector((state) => state?.auth?.login?.user)
    const [statusUpload, setStatusUpload] = useState(false);
    
    useEffect(() => {
        fetchProfileMethod();
    }, [dispatch]);

    const fetchProfileMethod = async () => {
        await fetchProfile(dispatch, user?.accessToken);
    }

    const handleStatusUpload = () => {
        setStatusUpload(prevStatus => !prevStatus);
    };

    const handleUploadImage = () => {

    };

    return (
        <div className='profile-container'>
            <div className='left-container'>
                <div className='avatar-container'>
                    <img src={profile?.avatar || imgUrl} className='avatar'></img>
                    <label for="upload-photo" style={{ zIndex: "1" }} className='btn-update-image'>Upload</label>
                    <input type="file" className='' accept="image/*" id="upload-photo" />
                </div>
                <div className='text-container'>
                    <span className='txt-username'>{profile?.username}</span>
                    <span className='txt-email'>{profile?.email}</span>
                </div>
            </div>
            <div className='right-container'>
                <form className='form-container'>
                    <h2>Profile</h2>
                    <div className='input-container'>
                        <span className='label-input-tite'>Name</span>
                        <input className='input-style' value={profile?.name} disabled={!statusUpload}></input>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Gender</span>
                        <div className='checkbox-container'>
                            <div className='input-checkbox-container'>
                                <input
                                    type='radio'
                                    className='checkbox'
                                    value='MALE'
                                    name='gender'
                                    checked={profile?.gender === 'MALE'}
                                    disabled={!statusUpload}
                                />
                                <label className='nested-label'>Male</label>
                            </div>
                            <div className='input-checkbox-container'>
                                <input
                                    type='radio'
                                    className='checkbox'
                                    value='FEMALE'
                                    name='gender'
                                    checked={profile?.gender === 'FEMALE'}
                                    disabled={!statusUpload}
                                />
                                <label className='nested-label'>Female</label>
                            </div>
                            <div className='input-checkbox-container'>
                                <input
                                    type='radio'
                                    className='checkbox'
                                    value='OTHER'
                                    name='gender'
                                    checked={profile?.gender === 'OTHER'}
                                    disabled={!statusUpload}
                                />
                                <label className='nested-label'>Other</label>
                            </div>
                        </div>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Birthday</span>
                        <input type='date' className='input-style' value={profile?.dob} disabled={!statusUpload}></input>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Phone</span>
                        <input className='input-style' value={profile?.phone} disabled={!statusUpload}></input>
                    </div>
                    <div className='input-container'>
                        <span className='label-input-tite'>Address</span>
                        <input className='input-style' value={profile?.address} disabled={!statusUpload} ></input>
                    </div>
                    <div className='button-container'>
                        {statusUpload ? (
                            <div>
                                <button type='button' className='btn-update'>Update</button>
                                <button type='button' className='btn-cancel' onClick={handleStatusUpload}>Cancel</button>
                            </div>
                        ) : (
                            <button type='button' className='btn-edit' onClick={handleStatusUpload}>Edit</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;

const imgUrl = "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg";