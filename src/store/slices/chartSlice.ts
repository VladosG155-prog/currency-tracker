import { createSlice } from '@reduxjs/toolkit';
import { generateCandlestickData } from '@root/utils/generateDataForChart';

interface IState {
  data: IChartData[];
}

const initialState: IState = {
  data: [],
};
const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    generateData: (state) => {
      state.data = generateCandlestickData(30);
    },
    changeDataPerDay: (state, action) => {
      const { data, day } = action.payload;
      state.data[day - 1] = {
        x: state.data[day - 1].x,
        o: data.o,
        h: data.h,
        l: data.l,
        c: data.c,
      };
    },
    removeDay: (state, action: { payload: { day: number } }) => {
      const { day } = action.payload;

      state.data = state.data.filter((data, index) => index !== day - 1);
    },
  },
});

export default chartSlice.reducer;

export const { changeDataPerDay, removeDay, generateData } = chartSlice.actions;

