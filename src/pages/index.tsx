import Head from "next/head";
import { useEffect, useState } from "react";
import CardCharacter from "../components/CardCharacter";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { CHARACTER_ENDPOINT } from "../data/constants";
import { fetchAPI } from "../utils/fetch-api";
import Select from "react-select";
import { genderOptions, speciesOptions, statusOptions } from "../data/query";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home({ characters }) {
  const { info, results: defaultResults } = characters;

  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({ ...info, current: CHARACTER_ENDPOINT });

  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');

  const { current } = page;

  const metaTitle = `Rick & Morty - Wiki Brasil`;

  useEffect(() => {
    async function request() {
      const nextData = await fetchAPI(current);
      setPage({ current, ...nextData.info });

      setResults( [...nextData.results]);
    };
    request();
    }, [current]);

  function handlePrev() {
    setPage({ current: page?.prev });
    if(page.prev === null) return;
  }
  
  function handleNext() {
    setPage({current: page?.next});
    if(page.next === null) return;
  }

  function handleSelectGender(values) {
    setGender(values.value);
  }
  
  function handleSelectStatus(values) {
    setStatus(values.value);
  }

  function handleSelectSpecies(values) {
    setSpecies(values.value);
  }
  
  async function handleSubmitFilter (e) {
    e.preventDefault();   
    const queryAPI = await fetchAPI(`${CHARACTER_ENDPOINT}/?page=${current}&status=${status}&gender=${gender}&species=${species}`);
    setResults(queryAPI.results);
    setPage({ current, ...queryAPI.info });
    document.querySelector('.button-reset-query').classList.remove('hidden');
  }

  function handleReset() {
    setResults(defaultResults);
    setPage({ current, ...info });
    document.querySelector('.button-reset-query').classList.add('hidden');
  }

  function handleTheme(theme) {
    return {
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary: '#64748B',
        neutral0: '#f8f8f8',        
        neutral20: '#CBD5E1',      
      }
    }
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <Navbar />
      <Section>
      <Heading text={`center`}>{`Rick & Morty - Wiki Brasil`}</Heading>
        <Container>          
          <div className="flex flex-col w-full">
            <form onSubmit={(e) => handleSubmitFilter(e)} id='filterOptions' className="flex flex-col mt-8 px-3 gap-4 justify-center"> 
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Select
                  getOptionLabel={option => `${option.label}`}
                  getOptionValue={option => `${option.value}`}
                  options={statusOptions}
                  instanceId="status"
                  placeholder='Status'
                  onChange={(values) => handleSelectStatus(values)}
                  className='w-full text-slate-600' 
                  form='filterOptions'
                  theme={theme => handleTheme(theme)}
                />
                <Select
                  getOptionLabel={option => `${option.label}`}
                  getOptionValue={option => `${option.value}`}
                  options={genderOptions}
                  instanceId="gender"
                  placeholder='Gênero'
                  onChange={(values) => handleSelectGender(values)}
                  className='w-full text-slate-600'
                  form='filterOptions'  
                  theme={theme => handleTheme(theme)}             
                />
                <Select
                  getOptionLabel={option => `${option.label}`}
                  getOptionValue={option => `${option.value}`}
                  options={speciesOptions}
                  instanceId="species"
                  placeholder='Espécie'
                  onChange={(values) => handleSelectSpecies(values)}
                  className='w-full text-slate-600'
                  form='filterOptions'
                  theme={theme => handleTheme(theme)}
                  
                />              
                <input type="submit" value='Filtrar' className="bg-slate-500 text-white px-10 h-10 cursor-pointer" />
              </div>
                <input type="reset" form="filterOptions" value='Limpar Pesquisa' className="w-full sm:w-36 h-10 self-center sm:self-end bg-red-400 hover:bg-red-500 text-white cursor-pointer button-reset-query hidden" onClick={() => handleReset()} />
            </form>
            <div className="flex flex-wrap gap-4 justify-center w-full mx-auto px-2 mt-10">
              <CardCharacter results={results} />
            </div>
            <div className="load-more flex items-center justify-center py-4 mt-4 gap-2">
              <button onClick={() => handlePrev()} 
              className={`flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105 ${page.prev === null ? 'hidden' : 'block'}`}>Anterior</button>
              <button onClick={() => handleNext()} 
              className={`flex items-center justify-center gap-2 border px-4 py-2 border-slate-300 transition-all duration-300 hover:scale-105 ${page.next === null ? 'hidden' : 'block'}`}>Próximo</button>
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
