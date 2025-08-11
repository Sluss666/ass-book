import { createContext } from "react";
import type { FShip } from "../../types/Friendships";
export type SendRequestResponse = { 
     error?: string | boolean
     msg?:string
     data?:string[]
    }
export type Request = {
_id:string
}
type Response = {
    requestId:string
    response?: 'ok' | 'decline'
}
export interface FSContext {
    friends:FShip[]
    fetchFriends:()=>Promise<void>
    sendRequest:({_id}:Request)=>Promise<SendRequestResponse>
    requestResponse:({requestId, response}:Response)=>Promise<void>
    isLoading:boolean
}

export const FriendsContext = createContext<FSContext|undefined>(undefined)