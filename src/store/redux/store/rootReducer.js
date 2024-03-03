// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from '../auth/AuthSlice'; // Corrected import statement
import profileReducer from "../profile/ProfileSlice";
import productReducer from "../product/ProductSlice"; // Import productReducer from productSlice

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  products: productReducer, // Include productReducer here
});

export default rootReducer;
