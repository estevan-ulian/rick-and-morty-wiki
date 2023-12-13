import { AxiosResponse } from "axios";

const responseInterceptor = (response: AxiosResponse) => {
  const method = response.config.method?.toUpperCase();
  const path = response.config.url;
  const status = response.status;
  const data = JSON.stringify(response.data);

  const color = "color: #34ff30;";

  console.log(`%c-- REQUEST: [${method}] | PATH: ${path}`, color);
  console.log(`%c-- RESPONSE: [${status}] | PATH: ${path}`, color);
  console.log(`%c-- DATA: [${data}] | PATH: ${path}`, color);

  return response;
};

export default responseInterceptor;
