import type { User } from "./User"
export type FShipStates = 'pending' | 'declined' | 'accepted' | 'removed'
export type FShip = {
    _id:string
    of?:User
    with?:User
}

export interface Friends extends FShip{
    user?: string;
    online?: boolean;
}
export type FRequest = {
    _id:string
    from:User
    to:User
    state: FShipStates    
}