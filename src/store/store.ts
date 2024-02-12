import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import chartReducer from './slices/chartSlice';
import currencyReducer from './slices/currencySlice';
import globalReducer from './slices/globalSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['global'],
};

const globalPersistConfig = {
  key: 'global',
  storage,
  blacklist: ['showModal'],
};

const rootReducer = combineReducers({
  currency: currencyReducer,
  global: persistReducer(globalPersistConfig, globalReducer),
  chart: chartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (window.Cypress) {
  window.store = store;
}

export const persistor = persistStore(store);
