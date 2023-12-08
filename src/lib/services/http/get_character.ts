import { AxiosError } from "axios";

import API from "../axios_config";
import PATH from "../axios_config/config/path";

import { TCharacter } from "@/@types/character_entity";

const getCharacter = async (id: number) => {
  try {
    const response = await API.get<TCharacter>(`${PATH.character}/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getCharacter;
