// api.ts
import axios, { AxiosInstance } from 'axios';


const api: AxiosInstance = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: '*/*',
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
  baseURL: `http://127.0.0.1:8000/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
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