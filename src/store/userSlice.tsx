/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userAPI from '../api/userAPI';
import { setAuthToken } from '../utils/setAuthToken';

export const loadUser = createAsyncThunk('loadUser', async () => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await userAPI.get();
    return res.user;
  } catch (error) {
    // create error handling
    console.error(error);
    return null;
  }
});

// TODO: convert to normal thunk
export const loginUser = createAsyncThunk('login', async (data: object) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    const res = await userAPI.login(config);
    return res.token;
  } catch (error) {
    // create error handling
    console.error(error);
    return null;
  }
});

// TODO: convert to normal thunk
export const registerUser = createAsyncThunk(
  'register',
  async (data: object) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      };
      const res = await userAPI.register(config);
      return res.token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

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
      state.isAuthenticated = true;
      state.user = action.payload;
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
    // Login reducers
    [loginUser.fulfilled.toString()]: (state, action) => {
      const { payload } = action;
      state.isFetching = false;
      state.isAuthenticated = true;
      state.token = payload;
    },
    [loginUser.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected.toString()]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    // Register reducers
    [registerUser.fulfilled.toString()]: (state, action) => {
      const { payload } = action;
      state.isFetching = false;
      state.isAuthenticated = true;
      state.token = payload;
    },
    [registerUser.pending.toString()]: (state) => {
      state.isFetching = true;
    },
    [registerUser.rejected.toString()]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    // loadUser reducers
    [loadUser.fulfilled.toString()]: (state, action) => {
      const { payload } = action;
      state.isFetching = false;
      state.isAuthenticated = true;
      state.token = payload;
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

export const { setUser, authFailed, logoutUser } = userSlice.actions;

export default userSlice.reducer;
