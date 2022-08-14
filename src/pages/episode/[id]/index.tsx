import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { CharacterResultParams } from "../..";
import CardCharacter from "../../../components/CardCharacter";
import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Heading from "../../../components/Heading";
import Navbar from "../../../components/Navbar";
import Section from "../../../components/Section";
import { SITE_TITLE } from "../../../data/constants";
import { getAllEpisodes, getDataFromArrayOfUrls, getEpisodeById } from "../../../lib/requests";
import { handleDate } from "../../../utils/handle-date";

type EpisodeRequest = {
    air_date: string,
    characters: CharacterResultParams[],
    created: string,
    url: string,
    episode: string,
    id: number,
    name: string,
}

interface EpisodeProps {
    episode: EpisodeRequest;
    characters: CharacterResultParams[];
}

export default function Episode({ episode, characters } : EpisodeProps) {
    const metaTitle = `${episode.episode}, ${episode.name} - ${SITE_TITLE}`
    const title = `${episode.episode} - ${episode.name}`
    return (
        <>
        <Head>
            <title>{metaTitle}</title>
        </Head>
        <Navbar />

        <Section>
            <Container>
                <div className="flex flex-col gap-4 w-full max-w-screen-xl mx-auto justify-center"> 
                    <Heading text="center">{title}</Heading>
                    <span className="mb-6 text-center">{handleDate(episode.air_date)}</span>                
                    <div className="w-full flex flex-col justify-center items-center mb-10">
                        <h2 className="text-3xl font-medium text-slate-800 text-center">{characters.length} {characters.length > 1 ? 'personagens presentes em' : 'personagem presente em'}  <span className="font-light">{episode.name}</span></h2>
                    </div>  
                    <div className="flex flex-wrap gap-4 justify-center w-full mx-auto mt-8 px-2">        
                        <CardCharacter results={characters} />
                    </div>
                </div>
            </Container>            
        </Section>

        <Footer />
        </>
    )
}

export async function getStaticPaths() {
    const data = await getAllEpisodes();
    const paths = data.results.map(data => ({
        params: { id: data.id.toString() }
      }));

      return {
        paths, fallback: false,
      }
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const id = context.params.id;

    const episode = await getEpisodeById(id);
    const characters = await getDataFromArrayOfUrls(episode?.characters);
    return {
        props: { episode, characters },
    }
}