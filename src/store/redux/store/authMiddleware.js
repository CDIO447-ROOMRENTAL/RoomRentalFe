const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  localStorage.setItem('authState', JSON.stringify(store.getState()));
  
  return result;
};

export default authMiddleware;
