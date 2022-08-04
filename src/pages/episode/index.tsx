import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import { EPISODE_ENDPOINT } from "../../data/constants"
import { fetchAPI } from "../../utils/fetch-api";
import { handleDate } from "../../utils/handle-date";

export default function Episodes({ episodes }) {
    const { info, results: defaultResults = [] } = episodes;    
    const [results, setResults] = useState(defaultResults);
    const [page, setPage] = useState({
        ...info,
        current: EPISODE_ENDPOINT
      });
    const { current } = page;

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

    function loadEpisodes(results) {
        return results.map( (data, index) => {
            return (
                <div key={data.id} className="">
                    <Link  href={`/episode/${data.id}`}>
                        <a className="text-2xl font-bold text-slate-800 hover:text-slate-600">
                            <h1 className="max-w-fit">{data.episode} - {data.name}</h1>
                        </a>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-800 font-medium">Lançado em {handleDate(data.air_date)}</h2>
                        <h2 className="text-slate-800 mt-2">Personagens presentes {data.name}</h2>
                        <div>
                            {data.characters.map((character, index) => {  
                                const characters = async () => {
                                    const res = await fetch(character);
                                    const data = await res.json();
                                    return data;
                                };                                
                                return <span key={index}>{character}, </span>;
                                
                            })}
                        </div>
                    </div>
                    <hr className="my-4" />
                </div>
            );
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
                        {loadEpisodes(results)}
                    
                        <span className="load-more flex items-center justify-center py-4">
                            <button onClick={() => handleLoadMore()} className="flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105">+ Carregar mais episódios</button>
                        </span>
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