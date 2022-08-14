import Link from "next/link";
import { useEffect, useState } from "react";
import { EpisodesResultsParams } from "../pages/episode";
import { handleDate } from "../utils/handle-date";

interface ResultsProps {
    results: EpisodesResultsParams[]
}

export default function CardLocation({ results }: ResultsProps) {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true)
      }, [results])

    if(!results.length) return <div>Nada encontrado.</div>;

    return(
        <>
            {mount && results?.map( (data, index) => {
                return (
                    <div key={data.id} className="border border-slate-300 rounded-xl p-4 flex flex-col items-center w-full sm:w-auto">
                        <Link  href={`/episode/${data.id}`}>
                            <a className="flex text-lg font-bold text-slate-800 hover:text-slate-600">
                                <h1 className="w-full text-center"><span className="text-slate-400 font-normal">#{data.id} </span>{data.episode} - {data.name}</h1>
                            </a>
                        </Link>
                        <span className="text-slate-800 font-light w-full text-center">Lançado em {handleDate(data.air_date)}</span>
                    </div>
                    );
                })
            }
        </>
    )
}