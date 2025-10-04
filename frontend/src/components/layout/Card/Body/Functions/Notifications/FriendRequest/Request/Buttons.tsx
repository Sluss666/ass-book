import type { FRequest, FShipStates } from "../../../../../../../../types/Friendships"
import api from "../../../../../../../../conf/api"
import { useResponse } from "../../../../../../../../context/res/useResponse"

const Buttons = ({request, setRequestState}:{request:FRequest, setRequestState:React.Dispatch<React.SetStateAction<FShipStates>>}) => {
    const {setResponse} = useResponse()
   const responseRequest = async (state:FShipStates)=>{
    try {
      const token = localStorage.getItem('token')
      const {data} = await api.post('friends/response-request', {
        
         responseUserId:request.to._id,
         userSend:request.from._id,
         state:state
      }, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      )
      if(data.error){
        setResponse({msg:data.msg, error:data.error})
        return
      }
      setRequestState(state)
    } catch(e){
      console.error(`error accepting request ${e}`)
      setResponse({msg:'Error Ocurred. Please Try Again.', error:true})
    }
  }
  return (
    <section className="w-1/3 grid gap-2">
        <button className="bg-blue-900/80 hover:bg-blue-900 border border-white/40 text-white py-1 rounded-md text-sm w-full"
        onClick={()=>responseRequest('accepted')}>
          Accept
        </button>
        <button className="shadow-md bg-slate-500 hover:bg-slate-700 text-white py-1 rounded-md text-sm w-full border border-white/40"
        onClick={()=>responseRequest('declined')}>
          Decline
        </button>
      </section>
  )
}
export default Buttons

// About to complete this component and the others on this path
// File: frontend/src/components/layout/Card/Body/Functions/Notifications/FriendRequest.tsx
// --- a/file:///c%3A/Users/jdmap/Documents/GitHub