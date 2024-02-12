import { IPopupInfo } from '../BankCardPage.interface';

export interface IMapMarker {
  latitude: number;
  longitude: number;
  image: string;
  description: string;
  title: string;
  onClick: (data: IPopupInfo) => void;
}
