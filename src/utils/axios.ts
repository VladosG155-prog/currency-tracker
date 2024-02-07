import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.CURRENCY_API_URL,
  timeout: 3000,
  headers: { apikey: process.env.CURRENCY_API_KEY },
});

export default instance;

