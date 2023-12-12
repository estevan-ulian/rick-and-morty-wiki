import getCharacter from "@/lib/services/http/get_character";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const character = await getCharacter(params.id);
  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
};

export default Page;
