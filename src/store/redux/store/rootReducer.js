// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from '../auth/AuthSlice'; // Corrected import statement

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
