import { AxiosError } from "axios";

import ApiClient from "../../axios_config";
import ApiPaths from "../../axios_config/config/api_paths";

import LocationEntity from "@/@entities/location_entity";

const getLocation = async (id: number) => {
  try {
    const response = await ApiClient.get<LocationEntity>(
      `${ApiPaths.location}/${id}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getLocation;
