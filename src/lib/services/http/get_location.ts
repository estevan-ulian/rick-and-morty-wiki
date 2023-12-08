import { AxiosError } from "axios";

import API from "../axios_config";
import PATH from "../axios_config/config/path";

import { TLocation } from "@/@types/location_entity";

const getLocation = async (id: number) => {
  try {
    const response = await API.get<TLocation>(`${PATH.location}/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getLocation;
