import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiBell } from "react-icons/hi2";
import { useNotifications } from "../../../../../context/notifications/useNotifications";
import FriendRequest from "./Notifications/FriendRequest";

const Notifications = () => {
  const { friendsRequests } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const toggleMenu = () => setNotificationsOpen((prev) => !prev);
  return (
    <>
      <motion.div whileTap={{ scale: 1.2 }}>
        <HiBell className="cursor-pointer" size={35} onClick={toggleMenu} />
      </motion.div>
      <AnimatePresence>
        {notificationsOpen && (
          <div className="fixed flex w-[125%] -ml-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative top-3 right-20 w-[14%] mt-2 bg-slate-200 rounded-md 
          shadow-md border border-gray-400/20 z-100 overflow-hidden rounded-b-[22px] pb-[0.5%]"
              >
              <div className="my-1">
                <p className="font-bold text-center">Notifications</p>
              </div>
              {friendsRequests.length > 0 && friendsRequests.find(request => request.state == 'pending') ? (
                <>
                  {friendsRequests.map(request=>(    
                       <FriendRequest key={request._id} request={request}/>
                    ))
                  }
                </>
              ) : (
                <div className="p-2 mt-2">
                  <p className="text-center font-bold text-xl">
                    No Notifications to Show
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Notifications;