import { createSlice } from '@reduxjs/toolkit';
import { generateCandlestickData } from '@root/utils/generateDataForChart';

interface IState {
  data: {
    [key: string]: IChartData[];
  };
  activeCurrency: string;
}

const initialState: IState = {
  data: {},
  activeCurrency: 'USD',
};
const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    generateData: (state) => {
      const { activeCurrency } = state;

      state.data[activeCurrency] = generateCandlestickData(30);
    },

    changeCurrency: (state, action) => {
      state.activeCurrency = action.payload.currency;
    },
    changeDataPerDay: (state, action) => {
      const { data, day } = action.payload;
      const { activeCurrency } = state;
      state.data[activeCurrency][day - 1] = {
        x: state.data[activeCurrency][day - 1].x,
        o: data.o,
        h: data.h,
        l: data.l,
        c: data.c,
      };
    },
    removeDay: (state, action: { payload: { day: number } }) => {
      const { day } = action.payload;
      const { activeCurrency } = state;
      state.data[activeCurrency] = state.data[activeCurrency].filter(
        (data, index) => index !== day - 1,
      );
    },
  },
});

export default chartSlice.reducer;

export const { changeDataPerDay, removeDay, generateData, changeCurrency } =
  chartSlice.actions;

