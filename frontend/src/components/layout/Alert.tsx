import { Fragment } from "react/jsx-runtime"
import { useResponse } from "../../context/res/useResponse"

const Alert = ({text='Close'}:{ text?:string}) => {
  const { setResponse, response } = useResponse()
  return (
    <div className='fixed h-screen m-0 w-screen bg-black/50 flex justify-center items-center z-[100]'>
        <div className='h-fit w-fit max-w-1/3 pt-5  bg-white rounded-sm p-4 pb-14 grid items-center gap-3'>
            <span className="font-semibold text-center">
              {response.msg?.split('\n').map((line, i) => (
                <Fragment key={i}>
                  {line}
                  <br />
                </Fragment>
              ))}
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