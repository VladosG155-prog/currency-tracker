import { generateCandlestickData } from '@root/utils/generateDataForChart';

interface IChartData {
  x: Date;
  o: number;
  l: number;
  h: number;
  c: number;
}

class ChartService {
  public data: IChartData[];

  constructor() {
    this.data = [];
  }

  handleGenerate() {
    this.data = generateCandlestickData(30);
  }

  changeDataPerDay(day: number, data: Omit<IChartData, 'x'>) {
    this.data[day - 1] = {
      x: this.data[day - 1].x,
      o: data.o,
      h: data.h,
      l: data.l,
      c: data.c,
    };
  }

  removeDay(day: number) {
    this.data = this.data.filter((data, index) => index !== day - 1);
  }
}

export const chartService = new ChartService();

