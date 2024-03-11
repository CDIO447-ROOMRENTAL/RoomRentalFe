import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import authMiddleware from './authMiddleware'; // Import the middleware

// Load persisted state from localStorage
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

// Create store with middleware and initial state
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(authMiddleware)
);

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
