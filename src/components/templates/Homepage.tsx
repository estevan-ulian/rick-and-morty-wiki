import getAllCharacters from "@/lib/services/http/get_all_characters";
import GridCharacters from "../organisms/GridCharacters";

const Homepage = async () => {
  const characters = await getAllCharacters();

  return <GridCharacters results={characters.results} />;
};

export default Homepage;
