import { AxiosError } from "axios";

import ApiClient from "../../axios_config";
import ApiPaths from "../../axios_config/config/api_paths";

import CharacterEntity from "@/@entities/character_entity";

const getCharacterById = async (id: number) => {
  try {
    const response = await ApiClient.get<CharacterEntity>(
      `${ApiPaths.character}/${id}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getCharacterById;
