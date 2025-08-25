import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { type MouseEvent } from "react";
import type { User } from "../../../types/User";
import { useFriends } from "../../../context/friends/useFriends";
import { useResponse } from "../../../context/res/useResponse";
import { useChats } from "../../../context/chats/useChats";
interface ButtonProps {
  userOf: User;
  reqSent: boolean;
  setReqSent: React.Dispatch<React.SetStateAction<boolean>>;
  stay: boolean;
  setStay: React.Dispatch<React.SetStateAction<boolean>>;
}
function Buttons({ userOf, reqSent, setReqSent, stay, setStay }: ButtonProps) {
  const { sendRequest } = useFriends()
  const { setResponse } = useResponse()
  const {newChat}=useChats()
  const sendFriendRequest = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!stay || reqSent) return;
    try {
      const userToId = userOf._id;
      if (!userToId) {
        setResponse({msg:'Error ocurred. Try again later', error:true})
        return;
      }
      const res = await sendRequest({ _id: userToId });
      if (!res) {
        console.error("Error sending request");
        setResponse({msg:'Error ocurred sending request. Try again', error:true})
        return;
      }
      if (res.error) {
        console.error(`Error sending request: ${res.error}`);
        setResponse({msg:res.msg, error:true})
        return;
      }
      setReqSent(true);
      setTimeout(() => setStay(false), 2000);
    } catch (e) {
      console.log(`Error sending friend request: ${e}`)
      setResponse({msg:'Error ocurred sending request. Try again', error:true})
    }
  };
  const startChat = async (e: MouseEvent<HTMLButtonElement>)=> {
    if(!stay || reqSent) return
    try {
      const userToId = userOf._id
      if(!userToId){
        setResponse({msg:'Error ocurred. Try again later', error:true})
        return
      }
      newChat(userToId)
    } catch(e){
      console.log(`Error starting chat: ${e}`)
      setResponse({msg:'Error ocurred. Try again', error:true})
    }
  }
    
  return (
    <div className="grid my-auto gap-2">
      <button
        type="button"
        onClick={(e) => sendFriendRequest(e)}
        id="send-friend-request"
        className="px-3 h-8 rounded-full text-sm bg-white font-semibold  hover:bg-white/50 active:bg-white/90"
      >
        Add&nbsp;Friend
      </button>
      <button
        type="button"
        id="start-chat"
        data-user-id={userOf._id}
        className="px-3 h-8 rounded-full text-sm bg-black font-semibold 
                        text-white flex justify-center items-center gap-2"
      >
        Talk <HiOutlineChatBubbleOvalLeft fontSize={24} />
      </button>
    </div>
  );
}

export default Buttons;
