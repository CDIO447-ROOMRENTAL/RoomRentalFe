// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from '../auth/AuthSlice'; // Corrected import statement
import profileReducer from "../profile/ProfileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
