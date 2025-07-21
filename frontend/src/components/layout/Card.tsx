import { AnimatePresence, motion } from 'framer-motion'
import { HiBell, HiChatBubbleLeftRight, HiBars3 } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { type UserContextType } from '../../context/UserContext';
import { useState } from 'react';

const Card = ({ user, setUser }: UserContextType) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = ()=>setMenuOpen(prev => !prev)
    
    const isPage = ($Segments: string[]): boolean => {
        const slicedPath = location.pathname.split("/").slice(1)
        return $Segments.every((segment, index) => slicedPath[index] == segment)
    }

    const handleLogout = () => {
        setUser({
            name: "",
            surnames: "",
            rol: "guest",
            user: "",
            phone: "",
            description: "",
            pic: "",
        })
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
        navigate("/")
    }


    return (
        <div className="absolute flex top-4 right-6 md:right-28 w-1/4 p-2 bg-slate-200 rounded-md">
            <img
                className="md:w-14 rounded-full shadow-md"
                alt="profile-picture"
                src={
                    user?.pic && user.pic !== ""
                        ? user?.pic
                        : "/assets/profile_pictures/default-profile-pic.jpg"
                }
            />
            <div className="pl-2">
                <Link to={"self"} className="block mt-1 select-text">
                    <strong>{user?.user || "NoUser"}</strong>
                </Link>
                {!isPage(["index", "self"]) && (
                    <span className="absolute">
                        {user?.name && user?.surnames
                            ? `${user?.name} ${user?.surnames}`
                            : "NoName"}
                    </span>
                )}
            </div>
            <div className="hidden md:flex mx-auto items-center gap-2">
                <motion.div whileTap={{ scale: 1.2 }}>
                    <HiBell className="cursor-pointer" size={35} />
                </motion.div>
                <motion.div whileTap={{ scale: 1.2 }}>
                    <HiChatBubbleLeftRight className="cursor-pointer" size={35} />
                </motion.div>
                <div className="relative select-none">
                    <motion.div whileTap={{ scale: 1.2 }}>
                        <HiBars3
                            className="cursor-pointer "
                            size={35}
                            color={menuOpen ? 'gray' : 'black'}
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
                                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Settings</button>
                                    <button className="w-[95%] py-1 grid mx-auto mt-2 text-white font-semibold rounded-full text-center 
                                        bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}

export default Card