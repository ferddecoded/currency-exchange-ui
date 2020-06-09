import request from './request';

const exchangeRate = (currency) =>
  request({
    url: `/api/exchangeRates/${currency}`,
    method: 'GET',
  });

const currencyData = () =>
  request({
    url: '/api/currencyData',
    method: 'GET',
  });

const news = (currency) =>
  request({
    url: `/api/news/${currency}`,
    method: 'GET',
  });

export default {
  exchangeRate,
  currencyData,
  news,
};
