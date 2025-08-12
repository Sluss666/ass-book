import { useState } from 'react'
import Buttons from '../Buttons'
import type { User } from '../../../../types/User'

const FindPeopleUser = ({u}:{u:User}) => {
  const [reqSent, setReqSent] = useState(false)
  const [stay, setStay] = useState(true)
  return (
    stay && (
              <li
                className="border-y border-slate-600 flex justify-evenly p-3 py-0 w-full h-24 bg-white/90"
              >
                {reqSent ? (
                  <div className="bg-green-600 w-full h-full flex items-center p-3">
                    <p className="text-center text-white font-bold">Request Sent:D</p>
                  </div>
                ) : (
                  <>
                  <div className='relative'>
                    <div className="absolute grid cursor-pointer
                                border-r h-[94px] top-0
                                min-w-7 -ms-3 border-red-600/20 self-center items-center 
                                active:text-white hover:text-white hover:border-red-400/90 hover:bg-red-500
                                active:bg-red-500 hover:min-w-10 hover:active:min-w-[18.8em] transition-all   " onClick={()=>setStay(false)}>
                    <span className="text-center" >&times;</span>

                    </div>
                    </div>
                    <div className="flex items-center ms-6">
                      <img
                        className="md:w-12 h-12 rounded-full shadow-md"
                        alt="profile-picture"
                        src={
                          u?.pic && u.pic !== ""
                            ? u?.pic
                            : "/assets/profile_pictures/default-profile-pic.jpg"
                        }
                      />
                      <section className="mx-2 min-w-24 max-w-32">
                        <strong className="cursor-pointer">{u.user}</strong>
                        {u.name !== "" && u.surnames !== "" && (
                          <p>
                            {u.name} {u.surnames}
                          </p>
                        )}
                      </section>
                    </div>
                    <Buttons
                      userOf={u}
                      stay={stay}
                      reqSent={reqSent}
                      setReqSent={setReqSent}
                      setStay={setStay}
                    />
                  </>
                )}
              </li>
            )
  )
}

export default FindPeopleUser