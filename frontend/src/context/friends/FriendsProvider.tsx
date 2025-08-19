import { useEffect, useState } from 'react'
import {FriendsContext} from './FriendsContext'
import type { FShip } from '../../types/Friendships';
import api from '../../conf/api';
import type { Request, SendRequestResponse } from './FriendsContext';
import { useUser } from '../useUser';
export const FriendsProvider = ({children}:{children:React.ReactNode})=>{
    const [ isLoading, setIsLoading ] = useState(true)
    const [ friends, setFriends] = useState<FShip[]>([])
    const { user } = useUser()
    const fetchFriends = async()=>{
        try{
            setIsLoading(true)

            const token = localStorage.getItem('token')
            console.log('Inside fetch', user)
            if(!user){
                console.error(`user not found or undefined: ${user}`)
                return 
            }
            const res = await api.get<FShip[]>(`friends/fetch/_id:${user._id}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(`People has found: ${res.data}`)
            setFriends(res.data)
        } catch(error){
         console.error('Error fetching friends:', error)

        } finally {
            setIsLoading(false)
        }
    }
    const sendRequest = async({_id}:Request):Promise<SendRequestResponse>=>{
        try {
            setIsLoading(true)
            if(!user){
                return {msg:'Error ocurred', error:true}
            }
            const token = localStorage.getItem('token')
            const { data } = await api.get(`friends/send-request/${user._id}/${_id}`, 
                {
                    headers:{
                        Authorization: `Bearer ${token} `
                    }
                }
            )
            return data
        } catch (error) {
            console.error('Error sending request:', error)
            return {msg:'Error sending friend request'}
        } finally {
            setIsLoading(false)
        }
    }
    const requestResponse = async()=>{

    }
    useEffect(()=>{
        if(!user) return
        fetchFriends()
    }, [user])
    return (
        <FriendsContext.Provider value={{isLoading, friends, fetchFriends, requestResponse, sendRequest}}>
            {children}
        </FriendsContext.Provider>
    )
}