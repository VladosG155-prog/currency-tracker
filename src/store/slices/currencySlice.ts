import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CurrencyTitles } from '@root/constants/currencyTitles';
import axios from '@utils/axios';

import type { RootState } from '../store';

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
    condition: (arg, { getState }) => {
      const state = getState() as RootState;
      return state.currency.currencies.length === 0;
    },
  },
);

interface InitialState {
  currencies: Currency[];
  lastTimeUpdate: string;
  rate: number;
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  currencies: [],
  lastTimeUpdate: '',
  rate: 0,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    exchangeRate: (state, action) => {
      const firstCurrency = state.currencies.find(
        (currency) => currency.code === action.payload.activeCurrency,
      );

      const secondCurrency = state.currencies.find(
        (currency) => currency.code === action.payload.selectedCurrency,
      );
      if (firstCurrency && secondCurrency) {
        const rate2 = firstCurrency.value / secondCurrency.value;
        state.rate = rate2;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      state.isLoading = false;
      const { data, meta } = action.payload;
      state.lastTimeUpdate = meta.last_updated_at;
      const newData: Currency[] = Object.keys(data).map((key: string) => {
        const newObj: Currency = {
          title: CurrencyTitles[key],
          code: data[key].code,
          value: data[key].value,
        };
        return newObj;
      });

      state.currencies = newData;
    });
    builder.addCase(getCurrencies.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default currencySlice.reducer;
export const { exchangeRate } = currencySlice.actions;

