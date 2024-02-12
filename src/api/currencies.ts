import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@root/store/store';
import axios from '@utils/axios';

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
