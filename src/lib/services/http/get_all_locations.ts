import { AxiosError } from "axios";

import API from "../axios_config";
import PATH from "../axios_config/config/path";

import { TLocation } from "@/@types/location_entity";

const getAllLocations = async () => {
  try {
    const response = await API.get<TLocation[]>(PATH.location);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getAllLocations;
