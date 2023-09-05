import Image from "next/image";
import Link from "next/link";
import { BsCircleFill } from "react-icons/bs";
import { fallbackImage, SITE_TITLE } from "../../../data/constants";
import Navbar from "../../../components/Navbar";
import Head from "next/head";
import Footer from "../../../components/Footer";
import {
  handleGender,
  handleLocation,
  handleOrigin,
  handleSpecies,
  handleStatus,
} from "../../../utils/handle-info-strings";
import Container from "../../../components/Container";
import Section from "../../../components/Section";
import Heading from "../../../components/Heading";
import { api, getDataFromArrayOfUrls } from "../../../lib/requests";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type EpisodesProps = {
  air_date: string;
  episode: string;
  id: number;
  name: string;
  url: string;
};

type CharacterProps = {
  id: string;
  name: string;
  gender: string;
  episode: EpisodesProps[];
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
};

interface CharacterParams {
  character: CharacterProps;
  episodes: EpisodesProps[];
}

export default function Character({ character, episodes }: CharacterParams) {
  const [loading, setLoading] = useState<boolean>(true);

  const img = !character?.image ? fallbackImage : character?.image;
  const characterStatus = character?.status ? character?.status : "unknown";

  useEffect(() => {
    setLoading(false);
  }, []);

  const metaTitle = `${character?.name}, ${handleSpecies(
    character?.species
  )} - ${SITE_TITLE}`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <Navbar />

      <Section>
        <Container>
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <div className="flex justify-center sm:justify-start">
              {loading ? (
                <AiOutlineLoading3Quarters
                  size={40}
                  className="animate-spin w-[300px]"
                />
              ) : (
                <Image
                  src={img}
                  width={300}
                  height={300}
                  alt={character?.name}
                  layout="fixed"
                  className={`rounded-lg`}
                />
              )}
            </div>
            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-1">
                <span className="capitalize flex items-center gap-2">
                  {handleStatus(characterStatus) === "vivo" && (
                    <BsCircleFill className="fill-green-500" />
                  )}
                  {handleStatus(characterStatus) === "morto" && (
                    <BsCircleFill className="fill-red-500" />
                  )}
                  {handleStatus(characterStatus) === "desconhecido" && (
                    <BsCircleFill className="fill-yellow-500" />
                  )}
                  {handleStatus(characterStatus)}
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-4 mt-2">
                <Heading text="left">{character?.name}</Heading>
                <div className="flex gap-2">
                  <span className="text-lg capitalize">
                    <strong>Gênero:</strong> {handleGender(character?.gender)}
                  </span>
                  <span>-</span>
                  <span className="text-lg capitalize">
                    <strong>Espécie:</strong>{" "}
                    {handleSpecies(character?.species)}
                  </span>
                </div>
                <span
                  className={`text-lg text-center sm:text-left ${
                    loading ? "flex items-center gap-2" : ""
                  }`}
                >
                  <strong>Primeira aparição em:</strong>
                  {loading ? (
                    <AiOutlineLoading3Quarters
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Link
                      href={`/episode/${episodes[0].id}`}
                      className="font-medium transition-all duration-300 text-slate-500 hover:text-slate-800"
                    >
                      {" "}
                      {episodes[0]?.episode} - {episodes[0]?.name}
                    </Link>
                  )}
                </span>
                <span className="text-slate-800 text-lg capitalize">
                  <strong>Origem:</strong>
                  <span> {handleOrigin(character?.origin?.name)}</span>
                </span>
                <span className="text-slate-800 text-lg capitalize">
                  <strong>Último local visto:</strong>
                  <span> {handleLocation(character?.location?.name)}</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <hr />
      <Section>
        <Container>
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-3xl font-bold text-slate-800 text-center">
              Episódios
            </h2>
            <span className="text-center my-2 text-slate-800">
              <strong>{character.name}</strong> aparece em{" "}
              {character.episode?.length}{" "}
              {character.episode?.length > 1 ? "episódios" : "episódio"}.
            </span>
            <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
              {loading ? (
                <AiOutlineLoading3Quarters size={40} className="animate-spin" />
              ) : (
                episodes?.map((episode) => {
                  return (
                    <Link
                      href={`/episode/${episode.id}`}
                      key={episode.id}
                      className="flex justify-center items-center text-center rounded-md border border-slate-300 px-2 py-1 transition-all duration-300 hover:bg-slate-500 hover:border-slate-500 hover:text-white"
                    >
                      {episode.episode} - {episode.name}
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await api.get("/character");

  const paths = data?.results?.map((data) => ({
    params: { id: data.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const { data: character } = await api.get(`/character/${id}`);
  const episodes = await getDataFromArrayOfUrls(character.episode);

  return {
    props: { character, episodes },
  };
}
