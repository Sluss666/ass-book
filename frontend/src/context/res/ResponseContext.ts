import { createContext } from "react";
export type res = {
    error?:boolean | string
    msg?:string
}
export interface resContext {
    setResponse:React.Dispatch<React.SetStateAction<res>>
    response:res
}
export const ResponseContext = createContext<resContext|undefined>(undefined)