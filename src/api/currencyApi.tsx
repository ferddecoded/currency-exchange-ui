import request from './request';

const get = () =>
  request({
    url: '/api/currency',
    method: 'GET',
  });

const post = (config) =>
  request({
    url: '/api/currency',
    method: 'POST',
    ...config,
  });

export default {
  post,
  get,
};
