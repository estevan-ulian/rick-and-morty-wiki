import Link from "next/link";
import { useEffect, useState } from "react";
import { handleDimension, handleType } from "../utils/handle-info-strings";

export default function CardLocation({ results }) {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true)
      }, [results])

    if(!results) return <div>Nada encontrado.</div>

    return(
        <>
            {mount && results?.map( (data, index) => {
                return (                    
                    <div key={data.id} className="border border-slate-300 p-4 flex flex-col items-center w-full sm:w-auto">
                        <Link  href={`/location/${data.id}`}>
                            <a className="flex text-lg font-bold text-slate-800 hover:text-slate-600">
                                <h1 className="w-full text-center"><span className="text-slate-400 font-normal">#{index + 1} </span> {data.name}</h1>
                            </a>
                        </Link>
                        <div className="flex flex-col">
                            <span className={`capitalize ${data.type ? 'block' : 'hidden'}`}>Tipo: {handleType(data.type)}</span>
                            <span className={`capitalize ${data.dimension ? 'block' : 'hidden'}`}>Dimensão: {handleDimension(data.dimension)}</span>
                        </div>
                    </div>
                );
            })
            }
        </>
    )
}