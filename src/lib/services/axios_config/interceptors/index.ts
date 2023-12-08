import errorInterceptor from "./error/error_interceptor.js";
import requestInterceptor from "./request/request_interceptor.js";
import responseInterceptor from "./response/response_interceptor.js";

const interceptor = {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
};

export default interceptor;
