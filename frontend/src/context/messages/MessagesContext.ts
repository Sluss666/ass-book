import { createContext } from "react"

export type Message = {
  _id:string
  chat:string
  mirror_chat:string
  from:string
  to:string
  message:string
  gotImage:boolean
  image:string
  seen:boolean
  createdAt?: Date
}

export interface IMessagesContext {
  messages:Message[][]|undefined
  setMessages:React.Dispatch<React.SetStateAction<Message[][]|undefined>>
  getChatMessages:({chat_id}:{chat_id:string})=>Promise<void>
}

export const MessagesContext = createContext<IMessagesContext|undefined>(undefined)