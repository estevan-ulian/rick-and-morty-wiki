import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { InfoParams } from "..";
import CardLocation from "../../components/CardLocation";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";
import { SITE_TITLE } from "../../data/constants";
import { DEFAULT_ENDPOINT, getAllLocation } from "../../lib/requests";

type ResultParans = {
    dimension: string,
    id: number,
    name: string,
    type: string,
    created: string,
    residents: ResultParans[],
    url: string,
}

interface LocationsProps {
    locations: {
        info: InfoParams,
        results: ResultParans[],
    }
}

export default function Locations({ locations }: LocationsProps) {
    const { info, results: defaultResults = [] } = locations;    
    const [name, setName] = useState<string>('');
    const [results, setResults] = useState<ResultParans[]>(defaultResults);
    const [page, setPage] = useState({
        ...info,
        pageNumber: 1,
        current: `${DEFAULT_ENDPOINT}/location`
      });
    const { next, current } = page;

    useEffect(() => {
        if (current === `${DEFAULT_ENDPOINT}/location`) return;

        async function request() {            
            const { data: nextData } = await axios.get(current);
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

    }, [next, current]);


    useEffect(() => {
        if(name === '') setResults(defaultResults);

        const endpoint = `${DEFAULT_ENDPOINT}/location/?name=${name}` 

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    function handleLoadMore() {
        setPage(prev => {
            return {
              ...prev,
              current: page?.next
            }
          })
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
                    <div className="flex flex-col w-full">
                        <Heading text="center">Locais</Heading>
                        <div className="w-full flex justify-center my-4">

                            <input className="w-3/4 rounded-lg" 
                                type="search" 
                                placeholder="Procurar local..." 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />

                        </div>
                        <div className="max-w-screen-xl w-full flex justify-center flex-wrap gap-4 mx-auto my-10">                            
                            <CardLocation results={results} />
                        </div>

                        <span className="load-more flex items-center justify-center py-4">
                            <button onClick={() => handleLoadMore()} className={`flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 rounded-lg transition-all duration-300 hover:scale-105 ${name !== '' && 'hidden'}`}>+ Carregar mais localidades</button>
                        </span>
                    </div>             
                </Container>
            </Section>
            <Footer />
        </>
    )
}


export async function getStaticProps() {
    const locations = await getAllLocation();    

    return {
        props: { locations }
    }
}