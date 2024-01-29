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

interface ExchangeCurrencyResponse {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
}
