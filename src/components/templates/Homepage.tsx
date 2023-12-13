"use client";
import GridCharacters from "../organisms/GridCharacters";
import Header from "../organisms/Header";
import InfoEntity from "@/lib/@entities/info_entity";
import CharacterEntity from "@/lib/@entities/character_entity";
import { useState } from "react";

type IHomepage = {
  data: {
    info: InfoEntity;
    results: Array<CharacterEntity>;
  };
};

const Homepage = ({ data }: IHomepage) => {
  const { info, results: defaultResults } = data;
  const [results, setResults] = useState(defaultResults);

  return (
    <>
      <Header />
      <main className="w-full bg-slate-100">
        <section className="max-w-screen-xl mx-auto p-4">
          <GridCharacters results={results} />
        </section>
      </main>
    </>
  );
};

export default Homepage;
