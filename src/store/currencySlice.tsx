/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import currencyApi from '../api/currencyApi';

const currencyInitialState = {
  currencies: [],
};

const currencySlice = createSlice({
  name: 'currencies',
  initialState: currencyInitialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencies } = currencySlice.actions;

export const fetchUserCurrencies = () => async (dispatch) => {
  try {
    const { currencies } = await currencyApi.get();
    return dispatch(setCurrencies(currencies));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postUserCurrencies = (formData: object) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    };
    return await currencyApi.post(config);
  } catch (error) {
    // TODO: create error handling
    console.error(error);
    return null;
  }
};

// selectors
export const getUserCurrencies = (state) => state.currencies;

export default currencySlice.reducer;
