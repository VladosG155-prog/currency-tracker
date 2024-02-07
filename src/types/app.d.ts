interface IChartData {
  x: number;
  o: number;
  l: number;
  h: number;
  c: number;
}

interface Currency {
  title: string;
  code: string;
  value: number;
}

interface CurrencyData {
  [key: string]: Currency;
}

interface ExchangeRateApiResponse {
  meta: {
    last_updated_at: string;
  };
  data: CurrencyData;
}

