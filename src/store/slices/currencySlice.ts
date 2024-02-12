import { createSlice } from '@reduxjs/toolkit';
import { getCurrencies } from '@root/api/currencies';
import { CurrencyTitles } from '@root/constants/currencyTitles';

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
