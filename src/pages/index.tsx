import Head from "next/head";
import { useEffect, useState } from "react";
import { BsSearch } from 'react-icons/bs';
import CardCharacter from "../components/CardCharacter";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { CHARACTER_ENDPOINT } from "../data/constants";
import { fetchAPI } from "../utils/fetch-api";

export default function Home({ characters }) {
  const { info, results: defaultResults = [] } = characters;
  const [results, setResults] = useState(defaultResults);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState({
    ...info,
    current: CHARACTER_ENDPOINT
  });
  const { current } = page;
  const metaTitle = `Rick & Morty - Wiki Brasil`;

  useEffect(() => {
    if ( current === CHARACTER_ENDPOINT ) return;
    if ( current === null ) return document.querySelector('.load-more').classList.add('hidden');

    async function request() {
      const nextData = await fetchAPI(current);
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

    // function handleSearch(e) {
    //   e.preventDefault();
    //   const { value } = e.target;
    //   setSearch(value);

    //   let endPoint = `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`;

    //   if(value === '') {endPoint = CHARACTER_ENDPOINT};

    //   setPage({
    //     current: endPoint
    //   });
    // }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <Navbar />
      <Section>
        <Container>
          <div className="flex flex-col w-full">
            <Heading text={`center`}>{`Rick & Morty - Wiki Brasil`}</Heading>
            {/* <div className="h-28 flex justify-center items-center px-4">
             <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full justify-center">
                <input onChange={e => handleSearch(e)} value={search} type="search" placeholder="Pesquisar personagem..." name="query" className="w-full sm:w-2/5" />
                 <button className="w-8 flex justify-center items-center hover:bg-gray-200"><BsSearch className="w-5 h-5" /></button> 
              </form>
            </div> */}

            <div className="flex flex-wrap gap-4 justify-center w-full mx-auto px-2 mt-10">        
              <CardCharacter results={results} />
            </div>
            <div className="load-more flex items-center justify-center py-4 mt-4">
              <button onClick={() => handleLoadMore()} className="flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105">+ Carregar mais personagens</button>
            </div>
          </div>
        </Container>
      </Section>    
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const characters = await fetchAPI(CHARACTER_ENDPOINT);
  
  return {
    props: {
      characters
    },
  };
}
