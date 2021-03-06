import request from './request';

const register = (config) =>
  request({
    url: '/api/users',
    method: 'POST',
    ...config,
  });

const get = () =>
  request({
    url: '/api/auth',
    method: 'GET',
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
  get,
};
