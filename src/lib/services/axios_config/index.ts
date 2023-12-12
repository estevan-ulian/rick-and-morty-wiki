import axios from "axios";
import interceptors from "./interceptors";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

API.interceptors.response.use(
  (response) => interceptors.responseInterceptor(response),
  (error) => interceptors.errorInterceptor(error)
);

API.interceptors.request.use((config) =>
  interceptors.requestInterceptor(config)
);

export default API;
