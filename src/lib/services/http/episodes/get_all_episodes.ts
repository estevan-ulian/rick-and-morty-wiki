import { AxiosError } from "axios";

import ApiClient from "../../axios_config";
import ApiPaths from "../../axios_config/config/api_paths";

import InfoEntity from "@/@entities/info_entity";
import EpisodeEntity from "@/@entities/episode_entity";

type IResponseEpisodes = {
  info: InfoEntity;
  results: Array<EpisodeEntity>;
};

const getAllEpisodes = async () => {
  try {
    const response = await ApiClient.get<IResponseEpisodes>(ApiPaths.episode);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getAllEpisodes;
