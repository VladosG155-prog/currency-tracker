import { Themes } from '@root/constants/enums';

export interface IBankCardPageProps {
  fetchCurrencies: () => void;
  currencies: Currency[];
  theme: Themes;
}

export interface IBankCardPageState {
  selectedCurrency: string;
  popupInfo: IPopupInfo | null;
}

export interface IPopupInfo {
  title: string;
  description: string;
  image: string;
  longitude: number;
  latitude: number;
}
