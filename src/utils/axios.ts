import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheItem<any>;
}

const cache: Cache = {};

/**
 * @param cacheTime - Время хранения данных в кеше (в милисекундах)
 */
const axiosWithCache = async <T>(
  url: string,
  options: AxiosRequestConfig = {},
  cacheTime = 3000,
): Promise<T> => {
  const cacheKey = `${url}${JSON.stringify(options)}`;

  const storedData = localStorage.getItem(cacheKey);
  const data: CacheItem<T> | null = storedData ? JSON.parse(storedData) : null;

  const hasValidValueInStorage =
    data && Date.now() - data.timestamp < cacheTime * 1000;

  if (hasValidValueInStorage) {
    return Promise.resolve(data.data);
  }

  try {
    const response: AxiosResponse<T> = await axios(url, options); // добавить конфиг аксиос;

    const cacheItem: CacheItem<T> = {
      data: response.data,
      timestamp: Date.now(),
    };

    cache[cacheKey] = cacheItem;
    localStorage.setItem(cacheKey, JSON.stringify(cacheItem));

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default axiosWithCache;

