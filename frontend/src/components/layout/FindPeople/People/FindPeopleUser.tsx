import { useState } from "react";
import {AnimatePresence } from "framer-motion";
import Buttons from "../Buttons";
import type { User } from "../../../../types/User";
import RemoveButton from "./RemoveButton";
import Info from './Info'

const FindPeopleUser = ({ u }: { u: User }) => {
  const [reqSent, setReqSent] = useState(false);
  const [stay, setStay] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setStay(false), 900); // exit wait lapse
  };

  return (
    stay && (
      <li className={`border-y border-slate-600 flex justify-evenly p-3 py-0 w-full h-24 ${reqSent ? 'bg-green-600':'bg-white/90'} relative overflow-hidden`}>

        {reqSent ? (
          <div className="bg-green-600 relative w-[100%] h-full flex items-center p-3">
            <p className="text-center text-white font-bold">Request Sent :D</p>
          </div>
        ) : (
          <>
            {/* Remove user of find people list */}
            <AnimatePresence>
              {!closing && (
                <RemoveButton onClose={handleClose} />
              )}
            </AnimatePresence>

            {/* User information */}
            <Info u={u} />

            {/* Actions  */}
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
  );
};

export default FindPeopleUser;
