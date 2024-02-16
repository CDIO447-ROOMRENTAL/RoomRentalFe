import { profile } from "../../../connection/api/Localhost";
import { profileFailed, profileStart, profileSuccess } from "./ProfileSlice";

export const fetchProfile = async (dispatch, jwt) => {
    try {
        dispatch(profileStart());
        const response = await fetch(`${profile}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`, // Include the JWT token in the headers
            },
        })
    } catch (error) {
        console.error('Error fetching profile:', error);
        dispatch(profileFailed());
    }
};

