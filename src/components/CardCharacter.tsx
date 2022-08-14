import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs"
import { fallbackImage } from "../data/constants";
import { handleGender, handleSpecies, handleStatus } from "../utils/handle-info-strings";

type ResultsParams = {
  id: number,
  name: string,
  image: string,
  species: string,
  gender: string,
  status: string,
}

interface CardCharacterProps {
  results: ResultsParams[],
}

export default function CardCharacter({ results }: CardCharacterProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false)
    }, [results])

    if(!results.length) {
      return <div>Nenhum personagem encontrado.</div>
    }   

    return (
        <>
        { !loading && results.map((item, index) => { 
          const image = !item.image ? fallbackImage : item?.image;
            return (
                <Link href={`/character/${item.id}`} key={item.id}>
                  <a className="max-w-[300px] mx-auto flex justify-center bg-gradient-to-t from-slate-800 via-slate-600 to-transparent rounded-b-2xl transition-all duration-300 hover:scale-105">
                    <article className={`flex flex-col w-full sm:w-72`}>
                      <div className="w-full flex justify-center">
                        <Image src={image} width={300} height={300} alt={item.name} className='rounded-t-2xl' />
                      </div>
                      <div className="px-2 pb-4 flex flex-col">                      
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between my-2">
                            <span className="text-slate-400 font-light">#{item.id} </span>
                            <span className="flex justify-end self-center">
                              {handleStatus(item.status) === 'vivo' && <BsCircleFill className="fill-green-500" />}
                              {handleStatus(item.status) === 'morto' && <BsCircleFill className="fill-red-500" />}
                              {handleStatus(item.status) === 'desconhecido' && <BsCircleFill className="fill-yellow-500" />}                              
                            </span>
                          </div>
                          <div className="flex justify-between flex-wrap gap-1 text-slate-100">
                            <h2 className="w-full self-center font-bold text-base sm:text-lg">{item.name}</h2>
                            <span className="text-sm capitalize">Espécie: {handleSpecies(item.species)}</span>
                            <span className="text-sm capitalize">Gênero: {handleGender(item.gender)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
            )
          })
        }
        </>
    )
}