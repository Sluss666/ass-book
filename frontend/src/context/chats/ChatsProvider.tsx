import { type ReactNode, useState } from "react";
import { ChatContext } from "./ChatsContext";
import api from "../../conf/api";
import { useUser } from "../useUser";
import { useResponse } from "../res/useResponse";

interface ChatProviderProps {
  children: ReactNode;
}

export interface Props {
  chat_id: string;
  mirror_id: string;
}

export const ChatsProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [currentChat, setCurrentChat] = useState<Props | null>(null);
  const { user } = useUser();
  const { setResponse } = useResponse();

  const newChat = async (userToId: string) => {
    console.log("Crear un nuevo chat");
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        "chats/",
        {
          _id: user?._id,
          user_with_id: userToId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.error) {
        setResponse({ msg: data.msg, error: true });
        return;
      }
      setCurrentChat({ chat_id: data.chat_id, mirror_id: data.mirror_id });
    } catch (e) {
      console.error(`Error iniciando un nuevo chat: ${e}`);
    }
  };

  const openChat = async (chatId: string) => {
    console.log("Abrir chat existente");
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get(`chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.error || !data.found) {
        setResponse({ msg: "Error occurred, please try again", error: true });
        return;
      }
      // Aquí puedes hacer setCurrentChat si deseas abrir o mostrar el chat
      setCurrentChat({ chat_id: data.chat_id, mirror_id: data.mirror_id });
    } catch (e) {
      console.error("Error al abrir chat: ", e);
    }
  };

  const setChat = (chat: Props) => {
    console.log("Seleccionar chat:", chat);
    setCurrentChat(chat);
  };

  return (
    <ChatContext.Provider value={{ newChat, openChat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};
