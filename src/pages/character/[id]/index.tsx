import Image from "next/image";
import Link from "next/link";
import { BsCircleFill } from "react-icons/bs";
import { CHARACTER_ENDPOINT, LOCATION_ENDPOINT, SITE_TITLE } from "../../../data/constants";
import { fetcherArrayUrls } from "../../../utils/fetcher-array-urls";
import { fetchAPI } from "../../../utils/fetch-api";
import Navbar from "../../../components/Navbar";
import Head from "next/head";
import Footer from "../../../components/Footer";
import { handleGender, handleSpecies, handleStatus } from "../../../utils/handle-info-strings";
import Container from "../../../components/Container";
import Section from "../../../components/Section";

export default function Character({ character, episodes, location }) {
  console.log(episodes)
  const metaTitle = `${character.name}, ${handleSpecies(character.species)} - ${SITE_TITLE}`
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <Navbar />

      <Section>
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">        
            <div className="flex justify-center sm:justify-start">
              <Image src={character.image} width={300} height={300} alt={character.name} />
            </div>
            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-1">
                <span className="capitalize flex items-center gap-2">{character.status === 'Alive' ? <BsCircleFill className="text-green-500 animate-pulse" /> : <BsCircleFill className="text-red-500 animate-pulse"  /> }{handleStatus(character.status)}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-4 mt-2">
                <h1 className="text-4xl sm:text-6xl font-bold text-slate-800">{character.name}</h1> 
                <div className="flex gap-2">
                  <span className="text-lg">Gênero: {handleGender(character.gender)}</span>
                  <span>-</span>
                  <span className="text-lg">Espécie: {handleSpecies(character.species)}</span>
                </div>
                <span className="text-lg">Primeira aparição em: <Link href={`/episode/${episodes[0].id}`}><a className="font-bold transition-all duration-300 text-slate-500 hover:text-slate-800">{episodes[0].name}</a></Link></span>
                <span className="text-lg">Último local visto: <Link href={`/location/${location.id}`}><a className="font-bold transition-all duration-300 text-slate-500 hover:text-slate-800">{location.name === 'unknown' ? 'Local desconhecido' : location.name}</a></Link></span>
              </div>          
            </div>
          </div>      
        </Container>  
      </Section>
      <hr />
      <Section>
        <Container>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold text-slate-800 text-center">Episódios</h2>
            <span className="text-center my-2 text-slate-800"><strong>{character.name}</strong> aparece em {episodes.length} {episodes.length > 1 ? 'episódios' : 'episódio'}.</span>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {episodes?.map(episode => {
                return (
                  <Link href={`/episode/${episode.id}`} key={episode.id}>
                    <a className="flex justify-center items-center text-center border border-slate-300 px-2 py-1 transition-all duration-300 hover:bg-slate-500 hover:border-slate-500 hover:text-white">
                    {episode.episode} - {episode.name}
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const dataCharacter = await fetchAPI(CHARACTER_ENDPOINT)

  const paths = dataCharacter.results.map(data => ({
    params: { id: data.id.toString() }
  }));
  
  return {
    paths, 
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {  
  const id = context.params.id;  
  const character = await fetchAPI(`${CHARACTER_ENDPOINT}/${id}`);  
  const location = await fetchAPI(character?.location?.url);
  const episodes = await fetcherArrayUrls(character?.episode);

  return {
    props: { character, episodes, location },
  }
}
