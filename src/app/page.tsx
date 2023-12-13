import Homepage from "@/components/templates/Homepage";
import getAllCharacters from "@/lib/services/http/characters/get_all_characters";

const Home = async () => {
  const characters = await getAllCharacters();

  return <Homepage data={characters} />;
};

export default Home;
