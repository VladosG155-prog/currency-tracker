import { configureStore } from '@reduxjs/toolkit';

import currencyReducer from './slices/currencySlice';
import globalReducer from './slices/globalSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (window.Cypress) {
  window.store = store;
}

