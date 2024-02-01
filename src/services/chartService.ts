import { generateCandlestickData } from '@root/utils/generateDataForChart';
import Observer from '@root/utils/observer';

interface IChartData {
  x: Date;
  o: number;
  l: number;
  h: number;
  c: number;
}

class ChartService {
  public observer: Observer;

  public data: IChartData[];

  constructor() {
    this.observer = new Observer();
    this.data = generateCandlestickData(30);
  }

  handleGenerate() {
    this.data = generateCandlestickData(30);
    this.observer.notify();
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

