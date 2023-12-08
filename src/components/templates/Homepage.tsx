import getAllCharacters from "@/lib/services/http/get_all_characters";
import CharacterCard from "../atoms/Character/Card";

const Homepage = async () => {
  const characters = await getAllCharacters();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {characters.results.map((character) => (
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

export default Homepage;
