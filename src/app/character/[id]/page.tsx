import CharacterPage from "@/components/templates/CharacterPage";
import getCharacterById from "@/lib/services/http/characters/get_character_by_id";

type ICharacterPage = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: ICharacterPage) => {
  const character = await getCharacterById(params.id);
  return (
    <>
      <CharacterPage data={character} />
    </>
  );
};

export default Page;
