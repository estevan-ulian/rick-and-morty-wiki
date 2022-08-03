import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import CardCharacter from "../../../components/CardCharacter";
import { EPISODE_ENDPOINT } from "../../../data/constants"
import { fetchAPI } from "../../../utils/fetch-api"
import { fetcherArrayUrls } from "../../../utils/fetcher-array-urls";
import { handleDate } from "../../../utils/handle-date";

export default function Episode({ episode, characters }) {

    return (
        <>
        <header className="w-full bg-slate-500">
        <div className="py-4 flex justify-between items-center max-w-screen-xl px-3">
          <Link href='/'><a className="text-white flex gap-2 items-center border border-slate-200 py-1 px-3 transition-all duration-300 hover:bg-slate-700 hover:border-slate-700"><BiArrowBack /> Home</a></Link>             
          <h1 className="text-white text-lg sm:text-2xl">Rick and Morty - Wiki Brasil</h1>
          <div className="hidden sm:block"></div>
        </div>
      </header>

        <section className="w-full my-10">
            <div className="flex flex-col flex-wrap sm:flex-row gap-4 w-full max-w-screen-xl mx-auto justify-center"> 
                <div className="flex flex-col gap-4 items-center w-full">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 text-center">{episode.name} - {episode.episode}</h1>
                    <span className="mb-6">{handleDate(episode.air_date)}</span>                
                </div>     
                <h2 className="w-full text-center">Personagens presentes no episódio:</h2>  
            </div>
            <div className="flex flex-wrap gap-4 justify-center w-full mx-auto mt-8 px-2">        
                <CardCharacter results={characters} />
            </div>
        </section>
        </>
    )
}

export async function getStaticPaths() {
    const data = await fetchAPI(EPISODE_ENDPOINT);
    const paths = data.results.map(data => ({
        params: { id: data.id.toString() }
      }));

      return {
        paths, fallback: "blocking",
      }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const episode = await fetchAPI(`${EPISODE_ENDPOINT}/${id}`);
    const characters = await fetcherArrayUrls(episode.characters)
    return {
        props: { episode, characters },
    }
}