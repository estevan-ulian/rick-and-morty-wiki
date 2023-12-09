import { EStatus } from "@/@types/character_entity";

const CircleStatus = ({ status }: { status: EStatus }) => {
  const handleStatus = () => {
    switch (status) {
      case EStatus.alive:
        return {
          color: "bg-green-400",
          title: "Vivo",
        };
      case EStatus.dead:
        return {
          color: "bg-red-400",
          title: "Morto",
        };
      default:
        return {
          color: "bg-gray-400",
          title: "Desconhecido",
        };
    }
  };

  return (
    <div
      title={handleStatus().title}
      className={`rounded-full w-4 h-4 ${handleStatus().color}`}
    ></div>
  );
};

export default CircleStatus;
