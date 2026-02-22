import { motion } from "framer-motion";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import type { CardBody } from '../Body';
import { useUser } from "../../../../context/useUser";
import api from "../../../../conf/api";
import Menu from "./Functions/Menu";
import Notifications from "./Functions/Notifications";
import { disconnectSocket } from "../../../../lib/socket.client";
import type { User } from "../../../../types/User";
import { useNavigate } from "react-router-dom";

function Functions({ setIsLoading, setError, setText }: CardBody) {
    const navigate = useNavigate()
    const { user, setUser } = useUser() as { user: User | null, setUser: (user: User | null) => void };
    const exit = async () => {
        setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            disconnectSocket();
            navigate("/", {replace: true});
    }
    const handleLogout = async () => {
        console.log(`User is tryna loggin out: `, user);
        setIsLoading(true);
        try {
            const $jwt = localStorage.getItem("token");
            if (!$jwt) {
                setError(true);
                setText("Try Again");
                return;
            }

            const { data } = await api.get(`users/exit/${user?._id}`, {
                headers: {
                    Authorization: `Bearer ${$jwt}`,
                },
            });
            if (data.error) {
                setError(true);
                setText("Try Again");
                return;
            }
            exit();
        } catch (e: any) {

            console.error("Logout error:", e);
            if(e.response?.data?.msg == "You're already logged out"){ console.log("Already logged out"); exit();}
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    };
    return (
        <div className="hidden md:flex mx-auto items-center gap-2">
            <div className="relative select-none">
                <Notifications />
            </div>
            <motion.div whileTap={{ scale: 1.2 }}>
                <HiChatBubbleLeftRight className="cursor-pointer" size={35} />
            </motion.div>
            <div className="relative select-none">
                <Menu handleLogout={handleLogout} />
            </div>
        </div>
    )
}

export default Functions