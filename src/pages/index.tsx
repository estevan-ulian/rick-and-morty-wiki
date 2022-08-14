import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import CardCharacter from "../components/CardCharacter";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { genderOptions, speciesOptions, statusOptions } from "../data/query";
import { getAllCharacters, api, DEFAULT_ENDPOINT } from "../lib/requests";
import Select, { Theme } from "react-select";
import Pagination from "../components/Pagination";
import axios from "axios";
import scrollToTop from "../utils/scroll-to-top";
import { handleGender, handleSpecies, handleStatus } from "../utils/handle-info-strings";

export type CharacterResultParams = {
  gender: string,
  name: string,
  species: string,
  status: string,
  id: number,
  image: string,
}

export type InfoParams = {
  count: number,
  next: string | null,
  pages: number,
  prev: string | null,
}

interface HomeProps {
  data: {
    info: InfoParams,
    results: CharacterResultParams[],
  }
}

export default function Home ( { data }: HomeProps ) {
  const { info, results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);

  const [page, setPage] = useState({
    ...info,
    pageNumber: 1,
    current: `${DEFAULT_ENDPOINT}/character`
  });
  const { current, pageNumber } = page;

  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
    
  useEffect(() => {
    if(status === '' && gender === '' && species === '') return;
    async function request() {      
      const queryEndpoint = `${DEFAULT_ENDPOINT}/character/?page=${pageNumber}&status=${status}&gender=${gender}&species=${species}`;

      try {
        const { data }= await api.get(`/character/?page=${pageNumber}&status=${status}&gender=${gender}&species=${species}`);

        setPage (prev => ({...data?.info, current: queryEndpoint, pageNumber: prev.pageNumber}));
        setResults (data?.results);        

      } catch (e) {
        setResults([])
        console.log(`Nenhum personagem encontrado com os parâmetros -> status: ${status}, gênero: ${gender}, espécie: ${species}`);
        return;
      }      
    }    
    request();

    document.querySelector('.button-reset-query').classList.remove('hidden');
    document.querySelector('.results-query').classList.remove('hidden');

    }, [status, gender, species, pageNumber]); 

  const metaTitle = `Rick & Morty - Wiki Brasil`;   
  
  async function handlePrev() {
    if(page?.prev === null) return;
    scrollToTop(500);
    try {
      const { data } = await axios.get(page?.prev);
      setPage(prev => ({...data.info, pageNumber: prev?.pageNumber - 1}));
      setResults (data.results);
    } catch (err) {
      console.log('handlePrev Error: ', err)
      return;
    }
  }
  
  async function handleNext() {
    if(page?.next === null) return;
    scrollToTop(500)
    try {
      const { data } = await axios.get(page?.next);
      setPage(prev => ({...data.info, pageNumber: prev?.pageNumber + 1})) 
      setResults(data?.results);

    } catch (err) {
      console.log('handleNextError: ', err)
    }
  }

  async function paginate(itemUrl, index) {
    if(itemUrl === '') return;
    scrollToTop(500);
    try {
      const { data } = await axios.get(itemUrl);
      setResults(data.results);
      setPage({...data.info, current, pageNumber: index});
    } catch (err) {
      console.log('paginate() error: ', err)
    }
  }

  function handleReset() {
    setResults(defaultResults);
    setPage({...info, current: `${DEFAULT_ENDPOINT}/character`, pageNumber: 1});
    setSpecies('');
    setStatus('');
    setGender('');
    document.querySelector('.button-reset-query').classList.add('hidden');
    document.querySelector('.results-query').classList.add('hidden');
  }

  function handleTheme(theme: Theme) {
    return {
      ...theme,
      borderRadius: 8,
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
          <div className="w-full flex flex-col mt-8 gap-4 justify-center">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Select
                  options={statusOptions}
                  instanceId="status"
                  placeholder='Status'
                  onChange={(values) => setStatus(values.value)}
                  className='w-full text-slate-600'
                  theme={theme => handleTheme(theme)}
                />
                <Select
                  options={genderOptions}
                  instanceId="gender"
                  placeholder='Gênero'
                  onChange={(values) => setGender(values.value)}
                  className='w-full text-slate-600'
                  theme={theme => handleTheme(theme)}
                />
                <Select
                  options={speciesOptions}
                  instanceId="species"
                  placeholder='Espécie'
                  onChange={(values) => setSpecies(values.value)}
                  className='w-full text-slate-600'
                  theme={theme => handleTheme(theme)}
                />       
              </div>
              <input type="button" value='Limpar Pesquisa' className="w-full rounded-lg sm:w-36 h-10 self-center sm:self-end bg-red-400 hover:bg-red-500 text-white cursor-pointer button-reset-query hidden" onClick={() => handleReset()} />

              <span className={`results-query hidden w-full text-center text-xl font-bold`}>
                {results.length ? `${page.count} personagens encontrados` : ''}
              </span>

              <div className="flex gap-4 w-full justify-center">
                <span className={`capitalize ${status !== '' ? '' : 'hidden'}`}><strong>Status:</strong> {handleStatus(status)}</span>
                <span className={`capitalize ${gender !== '' ? '' : 'hidden'}`}><strong>Gênero:</strong> {handleGender(gender)}</span>
                <span className={`capitalize ${species !== '' ? '' : 'hidden'}`}><strong>Espécie:</strong> {handleSpecies(species)}</span>
              </div>
              <hr />
              <div className="flex flex-wrap gap-4 justify-center w-full mx-auto mt-10">
                <CardCharacter results={results} />
              </div>
              <Pagination 
                info={page}
                species={species}
                status={status}
                gender={gender}
                handleNextBtn={() => handleNext()} 
                handlePrevBtn={() => handlePrev()} 
                paginate={paginate}
              />
            </div>
        </Container>
      </Section>    
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const data = await getAllCharacters();

  return {
    props: { data },
  };
}
