export const endpoints = {
  getCurrencyList: `${process.env.CURRENCY_API_URL}&currencies=EUR,USD,CAD,ARS,JPY,AUD,CNY,BTC,ARS&base_currency=BYN`,
  exchangeCurrency: `${process.env.COIN_API_BASE}exchangerate/`,
};
