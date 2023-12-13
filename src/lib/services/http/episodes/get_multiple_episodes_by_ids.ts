import { AxiosError } from "axios";

import ApiPaths from "../../axios_config/config/api_paths";
import ApiClient from "../../axios_config";

import EpisodeEntity from "@/@entities/episode_entity";

type IResponseMultipleEpisodes = Array<EpisodeEntity>;

const getMultipleEpisodesByIds = async (ids: Array<number>) => {
  try {
    const response = await ApiClient.get<IResponseMultipleEpisodes>(
      `${ApiPaths.episode}/${ids}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getMultipleEpisodesByIds;
