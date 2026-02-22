import { createContext } from "react"
import type { FRequest } from "../../types/Friendships"
export type notification = {
  _id:string
  type:string 
  titular:string
  action:string
}
export interface notificationsContext {
    setNotifications:React.Dispatch<React.SetStateAction<notification[]>>
    notifications:notification[]
    fetchNotifications:()=>Promise<void>
    setFriendsRequests:React.Dispatch<React.SetStateAction<FRequest[]>>
    fetchFriendRequests:()=>Promise<void>
    isLoading:boolean|undefined
    friendsRequests:FRequest[]
}
export const NotificationsContext = createContext<notificationsContext | undefined>(undefined)