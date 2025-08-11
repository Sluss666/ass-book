import { useResponse } from "../../context/res/useResponse"

const Alert = ({children, text='Close'}:{children:React.ReactNode, text?:string}) => {
  const { setResponse } = useResponse()
  return (
    <div className='fixed h-screen w-screen bg-black/50 flex justify-center items-center z-[100]'>
        <div className='h-fit w-fit max-w-1/3  bg-white rounded-sm p-4 pb-12 grid items-center gap-3'>
            <span className="font-semibold">
              {children}
            </span>
          <div className="relative flex justify-center">
            <button type="button" className="absolute top-2 rounded-md w-fit bg-black text-white py-[2px] hover:bg-black/95 px-6 text-center" onClick={()=>setResponse({msg:'', error:undefined})}>
              {text}
            </button>
            </div>
        </div>
    </div>
  )   
}

export default Alert