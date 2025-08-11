import { useContext } from "react"
import { ResponseContext, type resContext } from "./responseContext"

export const useResponse = ():resContext=>{
    const context = useContext(ResponseContext)
    if (!context) throw new Error('useResponse must be used within a ResponseProvider')
    return context
}