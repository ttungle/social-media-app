import { AuthURLList } from '@/models';
import { getBaseApiURL } from '@/utils';
import axios, { AxiosRequestHeaders } from 'axios';

const axiosClient = axios.create({
  baseURL: getBaseApiURL('/v1'),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { config, status, data } = error.response;
    const URLs = Object.values(AuthURLList);
    if (URLs.includes(config.url) && status === 400) {
      const errorMessage = data?.error?.message ?? '';

      throw new Error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
