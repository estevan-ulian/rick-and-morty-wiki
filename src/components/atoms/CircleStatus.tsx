import CharacterEntity from "@/lib/@entities/character_entity";

type CircleStatusProps = {
  status: CharacterEntity["status"];
};

const CircleStatus = ({ status }: CircleStatusProps) => {
  const handleStatus = () => {
    switch (status) {
      case "Vivo":
        return {
          color: "bg-green-400",
          title: "Vivo",
        };
      case "Morto":
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
