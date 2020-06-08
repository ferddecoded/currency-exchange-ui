import { client } from '../api/request';

export const setAuthToken = (token: String) => {
  // check if token is true
  if (token) {
    client.defaults.headers.common['x-auth-token'] = token;
  } else {
    // if false, remove axios header
    delete client.defaults.headers.common['x-auth-token'];
  }
};
