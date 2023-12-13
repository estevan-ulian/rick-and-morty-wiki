import getCharacterById from "@/lib/services/http/characters/get_character_by_id";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const character = await getCharacterById(params.id);
  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
};

export default Page;
