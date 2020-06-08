/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userAPI from '../api/userAPI';
import { setAuthToken } from '../utils/setAuthToken';

export const loadUser = createAsyncThunk('loadUser', async () => {
  try {
    const data = await userAPI.get();
    return data;
  } catch (error) {
    // create error handling
    throw new Error(error);
  }
});

const userInitialState = {
  user: null,
  isAuthenticated: false,
  isFetching: null,
  token: localStorage.getItem('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      setAuthToken(action.payload);
      state.token = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    authFailed: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    // loadUser reducers
    [loadUser.fulfilled.toString()]: (state, action) => {
      const { payload } = action;
      state.isFetching = false;
      state.isAuthenticated = true;
      state.user = payload;
    },
    [loadUser.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [loadUser.rejected.toString()]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setUser,
  authFailed,
  logoutUser,
  setFetching,
  setAuthenticated,
  setToken,
} = userSlice.actions;

export const loginUser = (formData: object) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    };
    const res = await userAPI.login(config);
    dispatch(setToken(res.token));
    return dispatch(loadUser());
  } catch (error) {
    // TODO: create error handling
    console.error(error);
    return null;
  }
};

export const registerUser = (formData: object) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    };
    const res = await userAPI.register(config);
    dispatch(setToken(res.token));
    return dispatch(loadUser());
  } catch (error) {
    // TODO: create error handling
    console.error(error);
    return null;
  }
};

export const getUser = (state) => state.user;

export default userSlice.reducer;
