import Head from "next/head";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import { EPISODE_ENDPOINT } from "../../data/constants"
import { fetchAPI } from "../../utils/fetch-api";
import CardEpisode from '../../components/CardEpisode'
import Heading from "../../components/Heading";

export default function Episodes({ episodes }) {
    const { info, results: defaultResults = [] } = episodes;    
    const [results, setResults] = useState(defaultResults);
    const [page, setPage] = useState({
        ...info,
        current: EPISODE_ENDPOINT
      });
    const { current } = page;
    console.log(results)

    useEffect(() => {
        if ( current === EPISODE_ENDPOINT ) return;        
        if ( current === null ) return document.querySelector('.load-more').classList.add('hidden');

        async function request() {
            const res = await fetch(current);
            const nextData = await res.json();      
            setPage({
              current,
              ...nextData.info
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
          };
          request();          
    }, [current]);

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
                    <div className="flex flex-col">
                        <Heading text="center">Episódios</Heading>
                        <div className="flex flex-wrap gap-4 justify-center w-full mx-auto mt-10 px-2">
                            
                            <CardEpisode results={results} />
                        
                            <span className="load-more flex items-center justify-center py-4">
                                <button onClick={() => handleLoadMore()} className="flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105">+ Carregar mais episódios</button>
                            </span>
                        </div>
                    </div>
                </Container>
            </Section>
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    const episodes = await fetchAPI(EPISODE_ENDPOINT);  
    
    return {
        props: { episodes }
    }
}