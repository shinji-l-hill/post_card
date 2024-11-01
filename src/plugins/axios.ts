import axios, { AxiosError, AxiosResponse } from "axios";


interface ApiResponse {
  data: AxiosResponse;
  status: number;
}

const baseUrl:string = import.meta.env.VITE_URL_API || null;
const options = {
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
}

const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (typeof response.data !== 'object') {
      return response?.data;
    }
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      const res = { ...error.response.data, status: error.response.status };
      return Promise.reject(res);
    } else {
      return Promise.reject(error);
    }
  }
);

export { axiosInstance };