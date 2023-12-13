import { AxiosError } from "axios";

import ApiClient from "../../axios_config";
import InfoEntity from "@/@entities/info_entity";

import LocationEntity from "@/@entities/location_entity";
import ApiPaths from "../../axios_config/config/api_paths";

type IResponseLocations = {
  info: InfoEntity;
  results: Array<LocationEntity>;
};

const getAllLocations = async () => {
  try {
    const response = await ApiClient.get<IResponseLocations>(ApiPaths.location);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getAllLocations;
