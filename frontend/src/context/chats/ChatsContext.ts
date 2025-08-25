import { createContext } from "react";
import type { Props } from "./ChatsProvider";

export interface ChatsContext {
  newChat: (userToId:string) => void;
  openChat: (chatId:string) => void;
  setChat: (chat: Props)  => void;
}

export const ChatContext = createContext<ChatsContext | undefined>(undefined);


