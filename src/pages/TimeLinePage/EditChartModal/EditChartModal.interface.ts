export interface IEditChartModalProps {
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
  onClose: () => void;
  onChange: (day: number, data: IChartData) => void;
  onRemove: (day: number) => void;
}

export interface IEditChartModalState {
  open: number;
  low: number;
  high: number;
  close: number;
}
