import { useContext } from "react"
import { type IMessagesContext, MessagesContext } from './MessagesContext'

export const useMessages = ():IMessagesContext=>{
  const context = useContext(MessagesContext)
  if(!context)throw new Error("useMessages must be used within a MessagesProvider")
  return context
}
