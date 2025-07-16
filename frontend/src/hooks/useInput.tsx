import { useState, type JSX } from "react";

export interface InputProps {
    id:string
    type:string
    label:string 
    placeholder:string
}

type UseInputReturn = [string, ()=> JSX.Element]

function useInput( {id, type, label, placeholder}:InputProps):UseInputReturn{
    const [ value, setValue ] = useState('') 
    const Input = ()=>(
        
            <div className="min-w-50 grid justify-center mb-5">
                <label htmlFor={id} className="block">{label}</label>
                <input 
                    className="md:bg-gray-400/20 focus:bg-white md:outline-gray-950 rounded-md px-2 py-1 " 
                    id={id} name={id} 
                    type={type} 
                    value={value} 
                    onChange={e=>setValue(e.target.value)}
                    placeholder={placeholder}
                    />
            </div>
    )
    return [ value, Input ]
}

export default useInput