import { AxiosError } from "axios";

import ApiClient from "../../axios_config";
import ApiPaths from "../../axios_config/config/api_paths";

import LocationEntity from "@/@entities/location_entity";

type IResponseMultipleLocations = Array<LocationEntity>;

const getMultipleLocationsByIds = async (ids: Array<number>) => {
  try {
    const response = await ApiClient.get<IResponseMultipleLocations>(
      `${ApiPaths.location}/${ids}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getMultipleLocationsByIds;
