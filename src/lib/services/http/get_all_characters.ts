import { AxiosError } from "axios";

import API from "../axios_config";
import PATH from "../axios_config/config/path";

import { TCharacter } from "@/@types/character_entity";
import { TInfo } from "@/@types/info_entity";

type TResponseCharacters = {
  info: TInfo;
  results: TCharacter[];
};

const getAllCharacters = async () => {
  try {
    const response = await API.get<TResponseCharacters>(PATH.character);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getAllCharacters;
