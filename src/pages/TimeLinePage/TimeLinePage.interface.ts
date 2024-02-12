import { Themes } from '@root/constants/enums';

export interface ITimeLinePageProps {
  theme: Themes;
  data: {
    [key: string]: IChartData[];
  };
  generateData: () => void;
  deleteData: (day: number) => void;
  changeDayData: (day: number, data: IChartData) => void;
  currencies: Currency[];
  fetchCurrencies: () => void;
  setCurrency: (currency: string) => void;
  activeCurrency: string;
  showModal: boolean;
  toggleModal: () => void;
}

export interface ITimeLinePageState {
  selectedDay: {
    day: number;
    open: number;
    close: number;
    high: number;
    low: number;
  } | null;
}
