import Head from "next/head";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import CardEpisode from '../../components/CardEpisode'
import Heading from "../../components/Heading";
import { DEFAULT_ENDPOINT, getAllEpisodes } from "../../lib/requests";
import { InfoParams } from "..";
import axios from "axios";

export type EpisodesResultsParams = {
    air_date: string,
    characters: string[],
    created: string,
    episode: string,
    id: number,
    name: string,
    url: string
}

interface EpisodesProps {
    episodes: {
        info: InfoParams,
        results: EpisodesResultsParams[]
    }
}

export default function Episodes({ episodes }: EpisodesProps) {
    const { info, results: defaultResults = [] } = episodes;    
    const [name, setName] = useState<string>('');
    const [results, setResults] = useState<EpisodesResultsParams[]>(defaultResults);
    const [page, setPage] = useState({
        ...info,
        pageNumber: 1,
        current: `${DEFAULT_ENDPOINT}/episode`
      });
    const { current, next } = page;
    
    useEffect(() => {
        if (current === `${DEFAULT_ENDPOINT}/location`) return;

        async function request() {
            const { data: nextData} = await axios.get(current);    
            setPage({
                ...nextData.info,
              current
            });
      
            if ( !nextData.info?.prev ) {                
                setResults(nextData.results);
                return;
            }
            
            setResults(prev => {
              return [
                ...prev,
                ...nextData.results
              ]
            });
          }

          request();     
          
          if ( !next ) return document.querySelector('.load-more').classList.add('hidden');

    }, [current, next]);

    useEffect(() => {
        if(name === '') setResults(defaultResults);

        const endpoint = `${DEFAULT_ENDPOINT}/episode/?name=${name}` 

        async function request() {
            try {
                const { data: nextData } = await axios.get(endpoint);
                setResults(nextData.results);
            } catch (err) {
                console.log('Nenhum local encontrado com o termo: ', name)
                setResults([]);
            }
        }

        request(); 
    }, [name]);

    function handleLoadMore() {
        setPage(prev => {
            return {
            ...prev,
            current: page?.next
            }
        });
    }; 

    const metaTitle = `Todos Episódios - Rick & Morty Wiki`
    return (
        <>
            <Head>
                <title>{metaTitle}</title>
            </Head>
            <Navbar />

            <Section>
                <Container>
                    <div className="flex flex-col w-full">
                        <Heading text="center">Episódios</Heading>
                        <div className="w-full flex justify-center my-4">

                            <input className="w-3/4 rounded-lg" 
                                type="search" 
                                placeholder="Procurar episódio..." 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />

                        </div>
                        <div className="flex flex-wrap gap-4 justify-center w-full mx-auto my-10 px-2">                            
                            <CardEpisode results={results} />                        
                        </div>
                        <span className="load-more flex items-center justify-center py-4">
                            <button onClick={() => handleLoadMore()} className={`flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 rounded-lg transition-all duration-300 hover:scale-105 ${name !== '' && 'hidden'}`}>+ Carregar mais episódios</button>
                        </span>
                    </div>
                </Container>
            </Section>
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    const episodes = await getAllEpisodes();  
    
    return {
        props: { episodes }
    }
}