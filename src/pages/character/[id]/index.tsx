import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from 'react-icons/bi'
import { BsCircleFill } from "react-icons/bs";
import { CHARACTER_ENDPOINT, EPISODE_ENDPOINT, LOCATION_ENDPOINT } from "../../../data/constants";
import { fetcherArrayUrls } from "../../../utils/fetcher-array-urls";
import { fetchAPI } from "../../../utils/fetch-api";

export default function Character({ character, episodes }) {
  return (
    <>
      <header className="w-full bg-slate-500">
        <div className="py-4 flex justify-between items-center max-w-screen-xl px-3">
          <Link href='/'><a className="text-white flex gap-2 items-center border border-slate-200 py-1 px-3 transition-all duration-300 hover:bg-slate-700 hover:border-slate-700"><BiArrowBack /> Voltar</a></Link>             
          <h1 className="text-white text-lg sm:text-2xl">Rick and Morty - Wiki Brasil</h1>
          <div className="hidden sm:block"></div>
        </div>
      </header>

      <section className="w-full my-10">
        <div className="flex flex-col sm:flex-row gap-4 max-w-screen-xl mx-2 justify-center">        
          <div className="flex">
            <Image src={character.image} width={300} height={300} alt={character.name} />
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-1">
              <span className="">{character.status === 'Alive' ? <BsCircleFill className="fill-green-500" /> : <BsCircleFill className="fill-red-500" />}</span>
              <span className="">{character.species}</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <h1 className="text-4xl sm:text-6xl font-bold text-slate-800">{character.name}</h1> 
              <span className="">Gênero: {character.gender}</span>
              <span className="text-lg">Visto pela última vez em: <Link href={`/location/${character.id}`}><a className="font-bold text-slate-800">{character.origin.name === 'unknown' ? 'local desconhecido' : character.origin.name}</a></Link></span>
            </div>          
          </div>
        </div>        
      </section>
      <hr className="my-8" />
      <section className="mb-8">
        <div className="flex flex-col gap-2 max-w-screen-xl mx-2 justify-center">
        <h2 className="text-3xl font-bold text-slate-800 text-center">Episódios</h2>
        <span className="text-center mb-4">{character.name} está presente nos seguintes episódios:</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {episodes?.map(episode => {
            return (
              <Link href={`/episode/${episode.id}`} key={episode.id}>
                <a className="flex justify-center items-center text-center border border-slate-300 px-2 py-1 transition-all duration-300 hover:bg-slate-500 hover:border-slate-500 hover:text-white">
                  {episode.name}
                </a>
              </Link>
            )
          })}
        </div>
        </div>
      </section>
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
    fallback: false
  }
}

export async function getStaticProps(context) {  
  const id = context.params.id;  
  const character = await fetchAPI(`${CHARACTER_ENDPOINT}/${id}`);  
  const episodes = await fetcherArrayUrls(character?.episode);

  return {
    props: { character, episodes }
  }
}
