import { AxiosError } from "axios";

import ApiPaths from "../../axios_config/config/api_paths";
import ApiClient from "../../axios_config";

import InfoEntity from "@/@entities/info_entity";
import CharacterEntity from "@/@entities/character_entity";

type IResponseCharacters = {
  info: InfoEntity;
  results: CharacterEntity[];
};

const getAllCharacters = async () => {
  try {
    const response = await ApiClient.get<IResponseCharacters>(
      ApiPaths.character
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
};

export default getAllCharacters;
