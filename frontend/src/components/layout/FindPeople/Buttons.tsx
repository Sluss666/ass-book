import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'

function Buttons() {
  return (
    <div className="grid gap-2">
                            <button type="button" id="" className="px-3 h-8 rounded-full text-sm bg-white font-semibold ">Add&nbsp;Friend</button>
                            <button type="button" id="" className="px-3 h-8 rounded-full text-sm bg-black font-semibold 
                        text-white flex justify-center items-center gap-2"
                            >
                                Talk <HiOutlineChatBubbleOvalLeft fontSize={24} />
                            </button>
                        </div>
  )
}

export default Buttons