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

export default {
  exchangeRate,
  currencyData,
};
