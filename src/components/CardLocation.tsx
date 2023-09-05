import Link from "next/link";
import { useEffect, useState } from "react";
import { handleDimension, handleType } from "../utils/handle-info-strings";

type ResultData = {
  id: number;
  name: string;
  dimension: string;
  type: string;
};

interface CardLocationParams {
  results: ResultData[];
}

export default function CardLocation({ results }: CardLocationParams) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!results.length) return <div>Nada encontrado.</div>;

  return (
    <>
      {!loading &&
        results?.map((data, index) => {
          let key = data.id;
          return (
            <div
              key={key === data.id && index * 1000}
              className="border border-slate-300 rounded-xl p-4 flex flex-col items-center w-full sm:w-auto"
            >
              <Link
                href={`/location/${data?.id}`}
                className="flex text-lg font-bold text-slate-800 hover:text-slate-600"
              >
                <h1 className="w-full text-center">
                  <span className="text-slate-400 font-normal">
                    #{data?.id}{" "}
                  </span>{" "}
                  {data?.name}
                </h1>
              </Link>
              <div className="flex flex-col">
                <span
                  className={`capitalize text-center ${
                    data?.type ? "block" : "hidden"
                  }`}
                >
                  Tipo: {handleType(data?.type)}
                </span>
                <span
                  className={`capitalize text-center ${
                    data?.dimension ? "block" : "hidden"
                  }`}
                >
                  Dimensão: {handleDimension(data?.dimension)}
                </span>
              </div>
            </div>
          );
        })}
    </>
  );
}
