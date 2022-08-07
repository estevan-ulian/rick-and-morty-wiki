import { useState } from "react";
import { handleGender, handleSpecies, handleStatus } from "../utils/handle-info-strings"

interface SelectProps {
    data: [];
    type: string;
    placeholder: string;
}

export default function Select({ data, type, placeholder}: SelectProps) {   

    const [select, setSelect] = useState('');
    function handleSelect(e) {
        setSelect(e.target.value || null)
    }

    function handleItem(item) {
        if(type === 'status') return handleStatus(item);
        if(type === 'gender') return handleGender(item);
        if(type === 'species') return handleSpecies(item);
    }

    const options = [...new Set(data)];

    const arr = options.map((item, i) => {
        return (
            <option key={i} value={item}>{handleItem(item)}</option>
        )
    });

    return (
        <select onChange={(e) => handleSelect(e)} 
            className="capitalize border border-slate-300 focus:border-slate-400 p-1 disabled:text-slate-400"
            value={select || ''}
        >
            <option value='' disabled>{placeholder}</option>
            {arr}
        </select>
    )
}