import Head from "next/head";
import CardCharacter from "../../../components/CardCharacter";
import Navbar from "../../../components/Navbar";
import { EPISODE_ENDPOINT, SITE_TITLE } from "../../../data/constants"
import { fetchAPI } from "../../../utils/fetch-api"
import { fetcherArrayUrls } from "../../../utils/fetcher-array-urls";
import { handleDate } from "../../../utils/handle-date";

export default function Episode({ episode, characters }) {
    const metaTitle = `${episode.episode}, ${episode.name} - ${SITE_TITLE}`

    return (
        <>
        <Head>
            <title>{metaTitle}</title>
        </Head>
        <Navbar />

        <section className="w-full my-10">
            <div className="flex flex-col flex-wrap sm:flex-row gap-4 w-full max-w-screen-xl mx-auto justify-center"> 
                <div className="flex flex-col gap-4 items-center w-full">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 text-center">{episode.episode} - {episode.name}</h1>
                    <span className="mb-6">{handleDate(episode.air_date)}</span>                
                </div>     
                <h2 className="w-full text-center text-lg">Personagens presentes no episódio:</h2>  
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