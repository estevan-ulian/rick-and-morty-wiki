import { AxiosError } from "axios";

import ApiPaths from "../../axios_config/config/api_paths";
import ApiClient from "../../axios_config";

import EpisodeEntity from "@/@entities/episode_entity";

const getEpisodeById = async (id: number) => {
  try {
    const response = await ApiClient.get<EpisodeEntity>(
      `${ApiPaths.episode}/${id}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getEpisodeById;
