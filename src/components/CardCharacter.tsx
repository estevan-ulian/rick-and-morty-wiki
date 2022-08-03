import Image from "next/image"
import Link from "next/link"
import { BsCircleFill } from "react-icons/bs"

export default function CardCharacter({ results }) {

    return (
        <>
        {
          results.map((item, index) => {
            return (
              <div key={item.id} className="max-w-fit mx-auto flex justify-center border border-slate-200 transition-all duration-300 hover:scale-105">
                <Link href={`/character/${item.id}`}>
                  <a>
                    <article className={`w-full sm:w-72`}>
                      <div className="w-full flex justify-center">
                        <Image src={item.image} width={300} height={300} alt={item.name} />
                      </div>
                      <div className="p-2 flex flex-col gap-2">                      
                        <div className="flex justify-between w-full">
                          <h2 className="w-4/5 self-center text-slate-800 font-bold text-base sm:text-lg"><span className="text-slate-500 font-light">#{index + 1 } </span>{item.name}</h2>
                          <span className="w-1/5 flex justify-end self-center">{item.status === 'Alive' ? <BsCircleFill className="fill-green-500" /> : <BsCircleFill className="fill-red-500" />}</span>
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
        </>
    )
}