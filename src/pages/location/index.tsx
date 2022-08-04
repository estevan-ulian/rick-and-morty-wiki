import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { LOCATION_ENDPOINT, SITE_TITLE } from "../../data/constants";
import { fetchAPI } from "../../utils/fetch-api";
import { handleDimension, handleType } from "../../utils/handle-info-strings";

export default function Locations({ locations }) {
    const { info, results: defaultResults = [] } = locations;    
    const [results, setResults] = useState(defaultResults);
    const [page, setPage] = useState({
        ...info,
        current: LOCATION_ENDPOINT
      });
    const { current } = page;

    useEffect(() => {
        if ( current === LOCATION_ENDPOINT ) return;        
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

    function loadData(results) {
        return results?.map( (data, index) => {
            return (
                <div key={data.id} className="">
                    <Link  href={`/location/${data.id}`}>
                        <a className="block text-2xl font-bold text-slate-800 hover:text-slate-600">
                            <h1 className="max-w-fit">{data.name}</h1>
                        </a>
                    </Link>
                    <div className="flex flex-col">
                        <span className={`capitalize ${data.type ? 'block' : 'hidden'}`}>Tipo: {handleType(data.type)}</span>
                        <span className={`capitalize ${data.dimension ? 'block' : 'hidden'}`}>Dimensão: {handleDimension(data.dimension)}</span>
                        <div>
                            <span className={`${data.residents.length < 1 ? 'hidden' : 'block'}`}>{data.residents.length > 1 ? 'Personagens vistos recentemente em' : 'Personagem visto recentemente em'} {data.name}: </span>
                            {data.residents.length >= 1 && data.residents.map((character, index) => {  
                                    const characters = async () => {
                                        const res = await fetch(character);
                                        const data = await res.json();
                                        return data;
                                    };                                
                                    return (
                                        <span key={index}>{character}{data.residents.length > 1 && ', '}</span>
                                    );
                                })
                            }
                        </div>
                    </div>
                    
                    <hr className="my-4" />
                </div>
            );
        });
    };    

    function handleLoadMore() {
        setPage(prev => {
            return {
            ...prev,
            current: page?.next
            }
        });
    };

    const metaTitle = `Todas Localidades - ${SITE_TITLE}`;
    return (
        <>
            <Head>
                <title>{metaTitle}</title>
            </Head>
            <Navbar />
            <section className="w-full my-10">
                <div className="max-w-screen-xl mx-auto px-3">
                    {loadData(results)}
                </div>
            <div className="load-more flex items-center justify-center py-4 my-4">
                <button onClick={() => handleLoadMore()} className="flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105">+ Carregar mais episódios</button>
            </div>
            </section>
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    const locations = await fetchAPI(LOCATION_ENDPOINT);  
    
    return {
        props: { locations }
    }
}