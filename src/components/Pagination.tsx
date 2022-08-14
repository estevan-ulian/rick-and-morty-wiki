import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr'
import { DEFAULT_ENDPOINT } from '../lib/requests';

interface PaginationProps {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string,
        current: string,
        pageNumber: number,
    },
    status: string,
    gender: string,
    species: string,
    handleNextBtn: () => void,
    handlePrevBtn: () => void,
    paginate: (itemUrl: string, index: number) => void,
}

type PageNumbersParams = {
    index: number,
    url: string
}

function Pagination({ info, status, gender, species, handleNextBtn, handlePrevBtn, paginate }: PaginationProps) {
    const { pages, count, next, prev, pageNumber } = info;
    const [loading, setLoading] = useState(true);


    let pageNumbers: PageNumbersParams[] = [];

    for(let i = 1; i <= Math.ceil(pages); i++) {
        pageNumbers.push({
            index: i,
            url: `${DEFAULT_ENDPOINT}/character/?page=${i}&status=${status}&gender=${gender}&species=${species}`
        });
    }
    
    useEffect(() => {
        setLoading(false)
    }, []);

    return (        
        <div className='w-full my-8'>   
            {!loading &&
                    <ul className='flex gap-2 flex-wrap justify-center items-center'>
                        <li className={`flex justify-center items-center`}>
                            <button onClick={handlePrevBtn}
                                disabled={!prev}
                                className={`flex items-center justify-center rounded-md border border-slate-300 hover:bg-slate-300 h-6 w-6 disabled:cursor-not-allowed`}
                            >
                                <GrPrevious size={10} />
                            </button>
                        </li>

                        {                        
                            pageNumbers.map(page => {
                                const {index, url} = page;
                                const currentPage = pageNumber === index;

                                return (
                                    <li key={index}>
                                        <button 
                                            onClick={() => paginate(url, index)} 
                                            disabled={currentPage}
                                            className={`flex items-center justify-center rounded-md border border-slate-300 hover:bg-slate-700 hover:text-white h-6 w-6 text-sm ${currentPage ? 'bg-slate-700 text-white' : ''}`}
                                        >
                                            {index}
                                        </button>
                                    </li>
                                )})
                        }

                        <li className={`justify-center items-center`}>
                            <button onClick={handleNextBtn} 
                                disabled={!next}
                                className={`flex items-center justify-center rounded-md border border-slate-300 hover:bg-slate-300 h-6 w-6 disabled:cursor-not-allowed`}
                            >
                                <GrNext size={10} />
                            </button>
                        </li>
                    </ul>   
            }        
        </div>
    )
}

export default Pagination;