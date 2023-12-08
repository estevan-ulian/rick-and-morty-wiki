import { TCharacter } from "@/@types/character_entity";
import PATH from "@/lib/services/axios_config/config/path";
import Image from "next/image";
import Link from "next/link";

type TCharacterCard = Pick<
  TCharacter,
  "id" | "name" | "image" | "status" | "species" | "gender"
>;

const CharacterCard = ({
  id,
  name,
  image,
  status,
  species,
  gender,
}: TCharacterCard) => {
  return (
    <Link href={`${PATH.character}/${id}`}>
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="object-contain"
      />
      <div>
        <div>
          <span>{id}</span>
          <span>{status}</span>
        </div>
        <h3>{name}</h3>
        <div>
          <p>Espécie: {species}</p>
          <p>Gênero: {gender}</p>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
