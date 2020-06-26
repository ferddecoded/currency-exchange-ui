import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import dataReducer from './dataSlice';
import currencyReducer from './currencySlice';

export default configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    currencies: currencyReducer,
  },
});
