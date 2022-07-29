import Image from "next/image";
import { useEffect, useState } from "react";

const publicEndpoint = 'https://rickandmortyapi.com/api/character';

export async function getStaticProps() {
  const res = await fetch(publicEndpoint);
  const data = await res.json();  
  
  return {
    props: {
      data
    },
    revalidate: 10,
  };
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({
    ...info,
    current: publicEndpoint
  });
  const { current } = page;

  useEffect(() => {
    if ( current === publicEndpoint ) return;

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
      const fieldQuery = fields.find(field => field.name === 'query');
      const value = fieldQuery.value || '';
      const endPoint = `https://rickandmortyapi.com/api/character/?name=${value}`
      setPage({
        current: endPoint
      });
    }


  return (
    <>
      <form onSubmit={handleOnSubmitSearch}>
        <input type="search" name="query" />
        <button>Pesquisar</button>
      </form>
      <div className="flex flex-wrap gap-2 w-full mx-auto">        
        {
          results.map(item => {
            return (
              <article key={item.id} className={`min-w-max`}>
                <Image src={item.image} width={300} height={300} alt={item.name} />
                <h3 className="font-bold">{item.name}</h3>
              </article>
            )
          })
        }
      </div>
        <button onClick={() => handleLoadMore()}>Load More</button>

    </>
  )
}
