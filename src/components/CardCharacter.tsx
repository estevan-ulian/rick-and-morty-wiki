import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs"
import { fallbackImage } from "../data/constants";
import { handleGender, handleSpecies } from "../utils/handle-info-strings";

interface CardCharacterProps {
  results: any,
  isLoading?: boolean,
}

export default function CardCharacter({ results, isLoading }: CardCharacterProps) {
    const [mount, setMount] = useState(false);

    useEffect(() => {
      setMount(true)
    }, [results])

    if(isLoading) return (
      <div className="animate-spin">
        <AiOutlineLoading3Quarters style={{height : '32px', width: '32px',}} />
      </div>
    )

    if(!results) {
      return <div>Nenhum personagem encontrado.</div>
    }

    return (
        <>
        { mount && results.map((item, index) => { 
          const image = !item.image ? fallbackImage : item?.image;
            return (
              <div key={item.id} className="max-w-[300px] mx-auto flex justify-center border border-slate-200 transition-all duration-300 hover:scale-105">
                <Link href={`/character/${item.id}`}>
                  <a>
                    <article className={`w-full sm:w-72`}>
                      <div className="w-full flex justify-center">
                        <Image src={image} width={300} height={300} alt={item.name} />
                      </div>
                      <div className="p-2 flex flex-col gap-2">                      
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-light">#{item.id} </span>
                            <span className="flex justify-end self-center">{item.status === 'Alive' ? <BsCircleFill className="fill-green-500" /> : <BsCircleFill className="fill-red-500" />}</span>
                          </div>
                          <div className="flex justify-between flex-wrap gap-1">
                            <h2 className="w-full self-center text-slate-800 font-bold text-base sm:text-lg">{item.name}</h2>
                            <span className="text-sm">Espécie: {handleSpecies(item.species)}</span>
                            <span className="text-sm">Gênero: {handleGender(item.gender)}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
              </div>
            )
          })
        }
        </>
    )
}