import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3011/api/",
  // baseURL: "https://eclaim.mig.mn/api/",
  // baseURL: "http://3.141.246.9:3011/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export { AxiosError };
