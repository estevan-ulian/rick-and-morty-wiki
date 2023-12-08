export enum EStatus {
  alive = "Alive",
  dead = "Dead",
  unknown = "unknown",
}

export enum EGender {
  female = "female",
  male = "male",
  genderless = "genderless",
  unknown = "unknown",
}

export type TCharacter = {
  id: number;
  name: string;
  status: EStatus;
  species: string;
  type: string;
  gender: EGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

// filters => name(string), status(EStatus), species, type, gender
