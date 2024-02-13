import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@root/api/axios';
import { RootState } from '@root/store/store';

export const getCurrencies = createAsyncThunk(
  'currenсies/fetchCurrencies',
  async () => {
    const response = await axios.get<ExchangeRateApiResponse>('', {
      params: {
        currencies: 'EUR,USD,CAD,ARS,JPY,AUD,CNY,BTC,ARS',
        base_currency: 'BYN',
      },
    });

    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return state.currency.currencies.length === 0;
    },
  },
);
