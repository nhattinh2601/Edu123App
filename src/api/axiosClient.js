import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

const axiosClient = axios.create({
  baseURL: 'http://192.168.13.1:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => qs.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        await AsyncStorage.removeItem('refreshToken');
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const response = await axiosClient.post('/auth/refresh-token', {
          refresh_token: refreshToken,
        });

        if (response.data.accessToken) {
          await AsyncStorage.setItem('accessToken', response.data.accessToken);
          await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (error) {
        console.log('Gửi lại request' + error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
