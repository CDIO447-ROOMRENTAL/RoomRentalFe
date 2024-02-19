// ProfileAPI.js
import { profileFailed, profileStart, profileSuccess } from "./ProfileSlice";

export const fetchProfile = async (dispatch, jwt) => {
    try {
        dispatch(profileStart());
        const response = await fetch(`http://localhost:8080/api/user/getProfile`, {
          method: 'GET',
          credentials: "include", // Include credentials to send cookies
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          dispatch(
            profileSuccess(data)
          );
    
          return true;
        } else {
          dispatch(profileFailed());
          console.error('Error:', response.statusText);
          return false;
        }
      } catch (error) {
        dispatch(profileFailed());
        console.error('Error:', error.message);
        return false;
      }
};
