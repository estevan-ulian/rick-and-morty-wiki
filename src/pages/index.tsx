import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCircleFill, BsSearch } from 'react-icons/bs';
import { CHARACTER_ENDPOINT } from "../data/constants";
import { fetchAPI } from "../utils/fetch-api";

export default function Home({ characters }) {
  const { info, results: defaultResults = [] } = characters;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({
    ...info,
    current: CHARACTER_ENDPOINT
  });
  const { current } = page;

  useEffect(() => {
    if ( current === CHARACTER_ENDPOINT ) return;

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

    function handleOnSubmitSearch(e) {
      e.preventDefault();      
      const { currentTarget = {} } = e;
      const fields = Array.from(currentTarget?.elements);
      // eslint-disable-next-line
      // @ts-ignore
      const fieldQuery = fields.find(field => field.name === 'query');
      // eslint-disable-next-line
      // @ts-ignore
      const value = fieldQuery.value || '';
      const endPoint = `https://rickandmortyapi.com/api/character/?name=${value}`
      if(value) {
        return setPage({
          current: endPoint
        });
      } else {
        return (
          <div>
            nao funcionou
          </div>
        )
      }      
    }


  return (
    <>
    <Head>
      <title>Rick and Mory - Wiki Brasil</title>
    </Head>
    <div className="py-4 flex justify-center bg-slate-500">
      <h1 className="text-white text-2xl">Rick and Morty - Wiki Brasil</h1>
    </div>
    <div className="h-28 flex justify-center items-center px-4">
      <form onSubmit={handleOnSubmitSearch} className="flex gap-2 w-full justify-center">
        <input type="search" placeholder="Pesquisar personagem..." name="query" className="w-full sm:w-2/5" />
        <button className="w-8 flex justify-center items-center hover:bg-gray-200"><BsSearch className="w-5 h-5" /></button>
      </form>
    </div>

      <div className="flex flex-wrap gap-4 justify-center w-full mx-auto">        
        {
          results.map((item, index) => {
            return (
              <div key={item.id} className="border border-slate-200 transition-all duration-300 hover:scale-105">
                <Link href={`/character/${item.id}`}>
                  <a>
                    <article className={`w-full sm:w-72`}>
                      <Image src={item.image} width={300} height={300} alt={item.name} />
                      <div className="p-2 flex flex-col gap-2">                      
                        <div className="flex justify-between items-center flex-wrap">
                          <h2 className="text-slate-800 font-bold text-base sm:text-lg"><span className="text-slate-500 font-light">#{index + 1 } </span>{item.name}</h2>
                          <span>{item.status === 'Alive' ? <BsCircleFill className="fill-green-500" /> : <BsCircleFill className="fill-red-500" />}</span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                          <span>Espécie: {item.species === 'unknown' ? 'Desconhecida' : item.species}</span>
                          <span>Gênero: {item.gender === 'unknown' ? 'Desconhecido' : item.gender}</span>
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
              </div>
            )
          })
        }
      </div>
      <div className="flex items-center justify-center py-4 mt-4">
        <button onClick={() => handleLoadMore()} className="flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105">+ Carregar mais personagens</button>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const characters = await fetchAPI(CHARACTER_ENDPOINT);
  
  return {
    props: {
      characters
    },
    revalidate: 10,
  };
}
