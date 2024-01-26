import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { endpoints } from '@root/api/endpoints';
import { CurrencyTitles } from '@root/constants/currencyTitles';
import axiosWithCache from '@root/utils/axios';
import axios, { AxiosResponse } from 'axios';

export const getCurrencies = createAsyncThunk(
  'currenсies/fetchCurrencies',
  async () => {
    const response = await axiosWithCache<ExchangeRateApiResponse>(
      endpoints.getCurrencyList,
      {
        method: 'GET',
      },
    );

    return response;
  },
);

export const exchangeCurrency = createAsyncThunk(
  'currencies/exchange',
  async (params: { exchangeCurrency: string; selectCurrency: string }) => {
    const response: AxiosResponse<ExchangeCurrencyResponse> = await axios.get(
      `${endpoints.exchangeCurrency + params.selectCurrency}/${
        params.exchangeCurrency
      }`,
      {
        headers: {
          'X-CoinAPI-Key': process.env.COIN_API_KEY,
        },
      },
    );
    return response.data;
  },
);

interface InitialState {
  currencies: Currency[];
  lastTimeUpdate: string;
  selectedCurrency: string;
  currencyToExchange: string;
  rate: number;
}

const initialState: InitialState = {
  currencies: [],
  lastTimeUpdate: '',
  selectedCurrency: '',
  currencyToExchange: '',
  rate: 0,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    exchangeRate: (state, action) => {
      const firstCurrency = state.currencies.find(
        (currency) => currency.code === action.payload.selectedCurrency,
      );

      const secondCurrency = state.currencies.find(
        (currency) => currency.code === action.payload.exchangeCurrency,
      );

      if (firstCurrency && secondCurrency) {
        const rate1 = 1 / firstCurrency.value;
        const rate2 = 1 / secondCurrency.value;

        state.rate = rate1 / rate2;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
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
    builder.addCase(exchangeCurrency.fulfilled, (state, action) => {
      state.selectedCurrency = action.payload.asset_id_base;
      state.currencyToExchange = action.payload.asset_id_quote;
      state.rate = action.payload.rate;
    });
  },
});

export default currencySlice.reducer;
export const { exchangeRate } = currencySlice.actions;
