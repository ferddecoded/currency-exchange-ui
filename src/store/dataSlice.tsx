/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import dataApi from '../api/dataApi';

const dataInitialState = {
  currencies: [],
  rates: null,
  isFetching: null,
  news: null,
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
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  setCurrencies,
  setRates,
  setFetching,
  setNews,
} = dataSlice.actions;

export const fetchRates = (currency) => async (dispatch) => {
  try {
    const rates = await dataApi.exchangeRate(currency);
    return dispatch(setRates(rates));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchNews = (currency) => async (dispatch) => {
  try {
    const news = await dataApi.news(currency);
    return dispatch(setNews(news));
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

    const formattedCurrencies = currencies.map((currency) => ({
      ...currency,
      label: currency.name,
      value: currency.abbreviation,
    }));
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
