import { useState } from 'react'
import Buttons from '../Buttons'
import type { User } from '../../../../types/User'

const FindPeopleUser = ({u}:{u:User}) => {
  const [reqSent, setReqSent] = useState(false)
  const [stay, setStay] = useState(true)
  return (
    stay && (
              <li
                className="border-y border-slate-600 flex justify-evenly p-3 w-full h-24 bg-white/90"
              >
                {reqSent ? (
                  <div className="bg-green-600 w-full h-full flex items-center">
                    <p className="text-center text-white font-bold">Request Sent:D</p>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                    <span className="absolute -top-3">&times;</span>

                    </div>
                    <div className="flex items-center ">
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