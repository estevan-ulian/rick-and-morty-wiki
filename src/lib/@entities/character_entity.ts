// filters => name(string), status(EStatus), species, type, gender

class CharacterEntity {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;

  constructor(character: CharacterEntity) {
    this.id = character.id;
    this.name = character.name;
    this.status = character.status;
    this.species = character.species;
    this.type = character.type;
    this.gender = character.gender;
    this.origin = character.origin;
    this.location = character.location;
    this.image = character.image;
    this.episode = character.episode;
    this.url = character.url;
    this.created = character.created;
  }

  get getStatus(): string {
    const status = this.status.toLowerCase();
    switch (status) {
      case "alive":
        return "Vivo";
      case "dead":
        return "Morto";
      case "unknown":
        return "Desconhecido";
      default:
        return this.status;
    }
  }

  get getGender(): string {
    const gender = this.gender.toLowerCase();
    switch (gender) {
      case "male":
        return "Masculino";
      case "female":
        return "Feminino";
      case "genderless":
        return "Sem gênero";
      case "unknown":
        return "Desconhecido";
      default:
        return this.gender;
    }
  }

  get getSpecies(): string {
    const species = this.species.toLowerCase();
    switch (species) {
      case "human":
        return "Humano";
      case "alien":
        return "Alienígena";
      case "humanoid":
        return "Humanóide";
      case "robot":
        return "Robô";
      case "cronenberg":
        return "Cronenberg";
      case "disease":
        return "Doença";
      case "poopybutthole":
        return "Poopybutthole";
      case "mythological creature":
        return "Criatura Mitológica";
      case "unknown":
        return "Desconhecido";
      default:
        return this.species;
    }
  }

  get getOriginName(): string {
    const originName = this.origin.name.toLowerCase();
    switch (originName) {
      case "":
        return "Desconhecida";
      case "unknown":
        return "Desconhecida";
      default:
        return this.origin.name;
    }
  }
}

export default CharacterEntity;
