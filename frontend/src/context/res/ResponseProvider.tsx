import { useState } from "react";
import {  type res , ResponseContext } from "./responseContext";

export const ResponseProvider = ({children}:{children:React.ReactNode})=>{
    const [ response, setResponse ] = useState<res>({msg:'', error:undefined})
    return (
        <ResponseContext.Provider value={{response, setResponse}}>
            {children}
        </ResponseContext.Provider>
    )
}