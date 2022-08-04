import Head from "next/head";
import { useEffect, useState } from "react";
import CardLocation from "../../components/CardLocation";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import { LOCATION_ENDPOINT, SITE_TITLE } from "../../data/constants";
import { fetchAPI } from "../../utils/fetch-api";

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
            <Section>
                <Container>
                    <div className="flex flex-col">
                        <Heading text="center">Locais</Heading>
                        <div className="max-w-screen-xl flex justify-center flex-wrap gap-4 mx-auto my-10">
                            <CardLocation results={results} />
                        </div>

                        <div className="load-more flex items-center justify-center py-4">
                            <button onClick={() => handleLoadMore()} className="flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105">+ Carregar mais locais</button>
                        </div>
                    </div>                    
                </Container>
            </Section>
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