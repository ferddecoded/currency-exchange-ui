/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import dataApi from '../api/dataApi';

const dataInitialState = {
  currencies: [],
  rates: null,
  isFetching: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: dataInitialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setRates: (state, action) => {
      state.rates = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setCurrencies, setRates, setFetching } = dataSlice.actions;

export const fetchRates = (currency) => async (dispatch) => {
  try {
    const rates = await dataApi.exchangeRate(currency);
    return dispatch(setRates(rates));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchCurrencies = () => async (dispatch) => {
  try {
    // fetch currencies
    dispatch(setFetching(true));
    const currencies = await dataApi.currencyData();

    // create async function to fetch news data for each currency
    const getCurrenciesWithNews = async (currs) => {
      // this returns an array of promises
      const currencyPromises = currs.map(async (currency) => {
        const { articles } = await dataApi.news(currency.abbreviation);
        return {
          ...currency,
          label: currency.name,
          value: currency.abbreviation,
          news: articles,
        };
      });

      // use Promise.all to fetch and wait for news data to be fetched
      const currenciesWithNews = await Promise.all(currencyPromises);
      return currenciesWithNews;
    };

    const formattedCurrencies = await getCurrenciesWithNews(currencies);
    dispatch(setFetching(false));
    return dispatch(setCurrencies(formattedCurrencies));
  } catch (error) {
    console.error(error);
    return null;
  }
};

// selectors
export const getDataCurrencies = (state) => state.data;

export default dataSlice.reducer;
