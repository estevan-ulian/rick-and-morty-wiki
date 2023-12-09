import { TCharacter } from "@/@types/character_entity";
import CharacterCard from "../molecules/CardCharacter";

type TGridCharacters = {
  results: Omit<TCharacter, "episode" | "location">[];
};

const GridCharacters = ({ results }: TGridCharacters) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((character) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          status={character.status}
          gender={character.gender}
          species={character.species}
        />
      ))}
    </div>
  );
};

export default GridCharacters;
