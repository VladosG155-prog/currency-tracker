import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_CURRENCY_API_URL,
  timeout: 3000,
  headers: { apikey: process.env.REACT_APP_CURRENCY_API_KEY },
});

export default instance;
