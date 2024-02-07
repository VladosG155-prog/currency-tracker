import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.currencyapi.com/v3/latest',
  timeout: 3000,
  headers: { apikey: 'cur_live_oKc7otBDX8kyRM6T41p6Bjv8KJtWXa9km2Us0OSZ' },
});

export default instance;
