import { createContext } from "react"

export interface ChatsContext {
  newChat:()=>void
  openChat:()=>void
  setChat(number:number):()=>void
}

export const ChatContext = createContext<ChatsContext|undefined>(undefined)