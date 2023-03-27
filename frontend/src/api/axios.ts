import { AuthURLList } from '@/models';
import { getBaseApiURL } from '@/utils/common';
import axios, { AxiosRequestHeaders } from 'axios';

const axiosClient = axios.create({
  baseURL: getBaseApiURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    if (localStorage.get('access_token')) {
      config.headers = {
        Authorization: `Bearer ${localStorage.get('access_token')}`,
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
