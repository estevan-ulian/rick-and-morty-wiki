import axios from "axios";
import interceptors from "./interceptors";
import ApiPaths from "./config/api_paths";

const ApiClient = axios.create({
  baseURL: ApiPaths.baseUrl,
});

ApiClient.interceptors.response.use(
  (response) => interceptors.responseInterceptor(response),
  (error) => interceptors.errorInterceptor(error)
);

ApiClient.interceptors.request.use((config) =>
  interceptors.requestInterceptor(config)
);

export default ApiClient;
