import { useEffect, useState } from 'react'
import {FriendsContext} from './FriendsContext'
import type { FShip } from '../../types/Friendships';
import api from '../../conf/api';
export const FriendsProvider = ({children}:{children:React.ReactNode})=>{
    const [ isLoading, setIsLoading ] = useState(true)
    const [ friends, setFriends] = useState<FShip[]>([])

    const fetchFriends = async()=>{
        try{
            setIsLoading(true)
            const token = localStorage.getItem('token')
            const res = await api.get<FShip[]>('friends/fetch', {
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
    const sendRequest = async()=>{

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