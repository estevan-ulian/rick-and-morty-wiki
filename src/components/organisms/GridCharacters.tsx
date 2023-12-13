"use client";
import { motion } from "framer-motion";
import CharacterCard from "../molecules/CardCharacter";
import CharacterEntity from "@/lib/@entities/character_entity";

type IGridCharacters = {
  results: Array<CharacterEntity>;
};

const GridCharacters = ({ results }: IGridCharacters) => {
  const CharacterCardMotion = motion(CharacterCard);

  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.15,
      },
    },
    whileInHover: {
      scale: 1.1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {results.map((result) => {
        const character = new CharacterEntity(result);
        const gender = character.getGender;
        const status = character.getStatus;
        const species = character.getSpecies;
        return (
          <CharacterCardMotion
            variants={variants}
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            status={status}
            gender={gender}
            species={species}
          />
        );
      })}
    </motion.div>
  );
};

export default GridCharacters;
