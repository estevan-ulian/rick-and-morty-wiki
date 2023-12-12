import errorInterceptor from "./error/error_interceptor";
import requestInterceptor from "./request/request_interceptor";
import responseInterceptor from "./response/response_interceptor";

const interceptors = {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
};

export default interceptors;
