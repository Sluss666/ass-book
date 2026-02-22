import { useEffect, useState } from 'react'
import {FriendsContext} from './FriendsContext'
import api from '../../conf/api'
import type { Request, SendRequestResponse } from './FriendsContext'
import type {Friends} from '../../types/Friendships'
import { useUser } from '../useUser'



export const FriendsProvider = ({children}:{children:React.ReactNode})=>{
    const [ isLoading, setIsLoading ] = useState(true)
    const [ friends, setFriends] = useState<Friends[]>([])
    const { user } = useUser()
    useEffect(()=>{
        if(!user?._id && !user?.id) return
        fetchFriends()
    }, [user])
    const fetchFriends = async()=>{
        try{
            setIsLoading(true)

            const token = localStorage.getItem('token')
            console.log('Inside fetch', user)
            if(!user){
                console.error(`user not found or undefined: ${user}`)
                return 
            }
            const {data} = await api.get<Friends[]>(`friends/fetch/${user._id ?? user.id}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(`People has found:`, data)
            setFriends(data.filter(d=>typeof d != 'undefined'))
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
            fetchFriends()
    }, [user])
    return (
        <FriendsContext.Provider value={{isLoading, friends, fetchFriends, requestResponse, sendRequest, setFriends}}>
            {children}
        </FriendsContext.Provider>
    )
}