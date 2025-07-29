import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
type Menu = {
    handleLogout:()=>Promise<void>
}
const Menu = ({handleLogout}:Menu) =>{
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  return (
    <>
      <motion.div whileTap={{ scale: 1.2 }}>
        <HiBars3
          className="cursor-pointer "
          size={35}
          color={menuOpen ? "gray" : "black"}
          onClick={toggleMenu}
        />
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <div className="absolute flex w-screen">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative top-3 right-20 w-[11.8%] mt-2 bg-slate-200 rounded-md 
                                                    shadow-md border border-gray-400/20 z-50 overflow-hidden rounded-b-[22px] pb-[0.5%]"
            >
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                Settings
              </button>
              <button
                className="w-[95%] py-1 grid mx-auto mt-2 text-white font-semibold rounded-full text-center 
                                                    bg-red-600 hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;
