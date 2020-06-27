import axios from 'axios';

export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://api-currency-exchange.herokuapp.com/',
});

const request = (options) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
