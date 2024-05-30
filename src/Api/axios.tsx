// api.ts
import axios, { AxiosInstance } from 'axios';

const token = localStorage.getItem('token');

const api: AxiosInstance = axios.create({
  baseURL: `https://localhost:7256`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: '*/*',
    Authorization: `Bearer ${token}`
  }
});

api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);





// 2º versão
export const apiImagem: AxiosInstance = axios.create({
  baseURL: `https://localhost:7256`,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
    Authorization: `Bearer ${token}`
  },
});

apiImagem.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

apiImagem.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;