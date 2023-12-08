import { AxiosResponse } from "axios";

const responseInterceptor = (response: AxiosResponse) => {
  const method = response.config.method?.toUpperCase();
  const path = response.config.url;
  const status = response.status;
  const data = JSON.stringify(response.data);

  const consoleStyles = "color: #34ff30;";

  console.log(`%c-- REQUEST: [${method}] | PATH: ${path}`, consoleStyles);
  console.log(`%c-- RESPONSE: [${status}] | PATH: ${path}`, consoleStyles);
  console.log(`%c-- DATA: [${data}] | PATH: ${path}`, consoleStyles);

  return response;
};

export default responseInterceptor;
