import { useState } from "react"
import { MessagesContext, type Message } from "./MessagesContext"
import api from "../../conf/api"

export const MessagesProvider = ({children}:{children:React.ReactNode})=>{
  const [ messages, setMessages] = useState<Message[][] | undefined >(undefined)
  const getChatMessages = async({chat_id}:{chat_id:string})=>{
    try {
      const token = localStorage.getItem('token')
    } catch (e) {
      console.log(`Error getting messages in chat: ${chat_id}. Error: ${e}`)
    }
  }
  return (
    <MessagesContext.Provider value={{messages, setMessages, getChatMessages}}>
      {children}
    </MessagesContext.Provider>
  )
}