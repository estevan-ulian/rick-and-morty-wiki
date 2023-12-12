"use client";
import { motion } from "framer-motion";

import { TCharacter } from "@/@types/character_entity";
import CharacterCard from "../molecules/CardCharacter";

type TGridCharacters = {
  results: Omit<TCharacter, "episode" | "location">[];
};

const GridCharacters = ({ results }: TGridCharacters) => {
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
      {results.map((character) => (
        <CharacterCardMotion
          variants={variants}
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          status={character.status}
          gender={character.gender}
          species={character.species}
        />
      ))}
    </motion.div>
  );
};

export default GridCharacters;
