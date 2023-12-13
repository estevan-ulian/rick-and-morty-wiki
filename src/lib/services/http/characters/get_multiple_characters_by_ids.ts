import { AxiosError } from "axios";

import ApiClient from "../../axios_config";
import ApiPaths from "../../axios_config/config/api_paths";

import CharacterEntity from "@/@entities/character_entity";

type IResponseMultipleCharacters = Array<CharacterEntity>;

const getMultipleCharactersByIds = async (ids: Array<number>) => {
  try {
    const response = await ApiClient.get<IResponseMultipleCharacters>(
      `${ApiPaths.character}/${ids}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getMultipleCharactersByIds;
