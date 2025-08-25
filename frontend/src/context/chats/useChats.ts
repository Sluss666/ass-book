import { useContext } from "react";
import { ChatContext, type ChatsContext } from './ChatsContext';

export const useChats = ():ChatsContext=>{
  const context = useContext(ChatContext)
  if(!context) throw new Error("useChats must be used within a ChatsProvider")
    return context
}