import { useEffect, useState } from "react"
import { NotificationsContext, type notification} from "./NotificacionsContext"
import { useUser } from "../useUser"
import api from "../../conf/api"
import type { FRequest } from "../../types/Friendships"

export const NotificationsProvider = ({children}:{children:React.ReactNode})=>{
  const [ isLoading, setIsLoading ] = useState<boolean>()
  const [notifications, setNotifications] = useState<notification[]>([])
  const [ friendsRequests, setFriendsRequests] = useState<FRequest[]>([])
  const {user}= useUser()
  const fetchFriendRequests = async()=>{
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      console.log('Inside fetch FRequests', user)
      if(!user?.id && !user?._id){
        console.error(`user not found or undefined: ${user}`)
        return 
      }
      const {data}= await api.get<FRequest[]>(`friends/fetch-requests/${user._id}`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log('Friends Requests:',data)
      setFriendsRequests(data as FRequest[])
    } catch(e){
      console.error('Error fetching friend requests:', e)
    } finally {
      setIsLoading(false)
    }
  }
  const fetchNotifications = async()=>{
    return
  }
  useEffect(()=>{
    fetchFriendRequests()
  }, [user])
  return (
    <NotificationsContext.Provider value={{isLoading, friendsRequests, notifications, fetchNotifications, setNotifications, fetchFriendRequests, setFriendsRequests}}>
      {children}
    </NotificationsContext.Provider>
  )
}