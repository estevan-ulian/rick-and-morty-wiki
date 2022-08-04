import Link from "next/link";
import { useEffect, useState } from "react";
import { handleDate } from "../utils/handle-date";

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
                        <Link  href={`/episode/${data.id}`}>
                            <a className="flex text-lg font-bold text-slate-800 hover:text-slate-600">
                                <h1 className="w-full text-center"><span className="text-slate-400 font-normal">#{index + 1} </span>{data.episode} - {data.name}</h1>
                            </a>
                        </Link>
                        <span className="text-slate-800 font-medium w-full text-center">Lançado em {handleDate(data.air_date)}</span>
                    </div>
                    );
                })
            }
        </>
    )
}