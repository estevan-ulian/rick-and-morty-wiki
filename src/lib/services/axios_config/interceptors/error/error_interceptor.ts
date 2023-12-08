import { AxiosError } from "axios";

const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Erro de conexão."));
  }

  if (error.response) {
    console.error("Error response data: ", error.response.data);
    console.error("Error response status: ", error.response.status);
    console.error("Error response headers: ", error.response.headers);
  } else if (error.request) {
    console.error("Erro na requisição: ", error.request);
  } else {
    console.error("Erro na configuração da requisição: ", error.message);
  }

  return Promise.reject(error);
};

export default errorInterceptor;
