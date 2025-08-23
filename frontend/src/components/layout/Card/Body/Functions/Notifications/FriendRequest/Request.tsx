import type { FRequest, FShipStates } from "../../../../../../../types/Friendships"
import Buttons from "./Request/Buttons"

const Request = ({request, setRequestState}:{request:FRequest, setRequestState:React.Dispatch<React.SetStateAction<FShipStates>>}) => {
  return (
    <div className="w-full flex border-y border-black p-2">
      <section className="w-2/3">
        <p className="font-bold uppercase">
          @{request.from.user}
        </p>
        <span>
          {request.from.name && request.from.surnames
            ? `${request.from.name} ${request.from.surnames}`
            : "Nameless"}
        </span>
      </section>
      <Buttons setRequestState={setRequestState} request={request}/>
    </div>
  )
}

export default Request