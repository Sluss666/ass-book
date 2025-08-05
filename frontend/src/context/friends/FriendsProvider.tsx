import { useEffect, useState } from 'react'
import {FriendsContext} from './FriendsContext'
import type { FShip } from '../../types/Friendships';
import api from '../../conf/api';
import { useUser } from '../useUser';
import type { Request } from './FriendsContext';
export const FriendsProvider = ({children}:{children:React.ReactNode})=>{
    const { user } = useUser()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ friends, setFriends] = useState<FShip[]>([])

    const fetchFriends = async()=>{
        try{
            setIsLoading(true)
            const token = localStorage.getItem('token')
            const res = await api.get<FShip[]>(`friends/fetch/_id:${user?._id}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setFriends(res.data)
        } catch(error){
         console.error('Error fetching friends:', error)

        } finally {
            setIsLoading(false)
        }
    }
    const sendRequest = async({_id}:Request):Promise<string | null>=>{
        try {
            setIsLoading(true)

            const token = localStorage.getItem('token')
            const { data } = await api.get(`friends/send-request/id_from:${user?._id}/${_id}`, 
                {
                    headers:{
                        Authorization: `Bearer ${token} `
                    }
                }
            )
            return data.msg
        } catch (error) {
            console.error('Error sending request:', error)
            return 'Error sending friend request'
        } finally {
            setIsLoading(false)
        }
    }
    const requestResponse = async()=>{

    }
    useEffect(()=>{
        fetchFriends()
    }, [])
    return (
        <FriendsContext.Provider value={{isLoading, friends, fetchFriends, requestResponse, sendRequest}}>
            {children}
        </FriendsContext.Provider>
    )
}