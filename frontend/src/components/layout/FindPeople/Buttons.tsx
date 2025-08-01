import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import type {MouseEvent} from 'react'
import type { User } from '../../../types/User'
interface ButtonProps {
  user:User
}
function Buttons({user}:ButtonProps) {
  const sendRequest = (e:MouseEvent<HTMLButtonElement>)=>{
    const id = e.currentTarget.dataset.id
    console.log(id)
  }
  return (
    <div className="grid gap-2">
                            <button type="button" data-id={`${user._id}`} onClick={(e)=>sendRequest(e)} id="send-friend-request" className="px-3 h-8 rounded-full text-sm bg-white font-semibold ">Add&nbsp;Friend</button>
                            <button type="button" data-id={`${user._id}`} id="start-chat" className="px-3 h-8 rounded-full text-sm bg-black font-semibold 
                        text-white flex justify-center items-center gap-2"
                            >
                                Talk <HiOutlineChatBubbleOvalLeft fontSize={24} />
                            </button>
                        </div>
  )
}

export default Buttons