import axios from 'axios';

export const setAuthToken = (token: String) => {
  // check if token is true
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // if false, remove axios header
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
