import { createContext } from "react";
import type { FShip } from "../../types/Friendships";

type Request = {
from:string
to:string
}
type Response = {
    requestId:string
    response: 'ok' | 'decline'
}
export interface FSContext {
    friends:FShip[]
    fetchFriends:()=>Promise<void>
    sendRequest:({from, to}:Request)=>Promise<void>
    requestResponse:({requestId, response}:Response)=>Promise<void>
    isLoading:boolean
}

export const FriendsContext = createContext<FSContext|undefined>(undefined)