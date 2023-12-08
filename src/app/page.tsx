import CharacterCard from "@/components/atoms/Character/Card";
import Homepage from "@/components/templates/Homepage";
import getAllCharacters from "@/lib/services/http/get_all_characters";

export default function Home() {
  return (
    <section className="max-w-screen-xl mx-auto w-full">
      <Homepage />
    </section>
  );
}
