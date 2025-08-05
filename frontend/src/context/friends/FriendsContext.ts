import { createContext } from "react";
import type { FShip } from "../../types/Friendships";

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
    sendRequest:({_id}:Request)=>Promise<string | null>
    requestResponse:({requestId, response}:Response)=>Promise<void>
    isLoading:boolean
}

export const FriendsContext = createContext<FSContext|undefined>(undefined)