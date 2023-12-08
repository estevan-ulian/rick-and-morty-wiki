import { AxiosError } from "axios";

import API from "../axios_config";
import PATH from "../axios_config/config/path";

import { TEpisode } from "@/@types/episode_entity";

const getEpisode = async (id: number) => {
  try {
    const response = await API.get<TEpisode>(`${PATH.episode}/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getEpisode;
