import request from './request';

const register = (config) =>
  request({
    url: '/api/user',
    method: 'POST',
    ...config,
  });

const login = (config) =>
  request({
    url: '/api/auth',
    method: 'POST',
    ...config,
  });

export default {
  register,
  login,
};
