import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CardCharacter from "../../../components/CardCharacter";
import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Heading from "../../../components/Heading";
import Navbar from "../../../components/Navbar";
import Section from "../../../components/Section";
import { EPISODE_ENDPOINT, SITE_TITLE } from "../../../data/constants"
import { fetchAPI } from "../../../utils/fetch-api"
import { fetcherArrayUrls } from "../../../utils/fetcher-array-urls";
import { handleDate } from "../../../utils/handle-date";

export default function Episode({ episode, characters }) {
    const { data, isLoading } = useQuery(['episode, characters'], { initialData: {characters, episode} });

    const metaTitle = `${episode.episode}, ${episode.name} - ${SITE_TITLE}`;
    const title = `${episode.episode} - ${episode.name}`;

    if(isLoading) return (
        <div className="animate-spin">
          <AiOutlineLoading3Quarters style={{height : '32px', width: '32px',}} />
        </div>
      );
    
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
                    <span className="mb-6 text-center">{handleDate(data.episode.air_date)}</span>                
                    <div className="w-full flex flex-col justify-center items-center mb-10">
                        <h2 className="text-3xl font-medium text-slate-800 text-center">{data.characters.length} {data.characters.length > 1 ? 'personagens presentes em' : 'personagem presente em'}  <span className="font-light">{episode.name}</span></h2>
                    </div>  
                    <div className="flex flex-wrap gap-4 justify-center w-full mx-auto mt-8 px-2">        
                        <CardCharacter results={data.characters} isLoading={isLoading} />
                    </div>
                </div>
            </Container>            
        </Section>

        <Footer />
        </>
    )
}

export async function getStaticPaths() {
    const data = await fetchAPI(EPISODE_ENDPOINT);
    const paths = data.results.map(data => ({
        params: { id: data.id.toString() }
      }));

      return {
        paths, fallback: false,
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