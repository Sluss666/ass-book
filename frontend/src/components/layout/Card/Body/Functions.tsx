import { motion } from "framer-motion";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import type { CardBody } from '../Body';
import { useUser } from "../../../../context/useUser";
import api from "../../../../conf/api";
import Menu from "./Functions/Menu";
import Notifications from "./Functions/Notifications";

function Functions({ setIsLoading, setError, setText }: CardBody) {
    const { user, setUser } = useUser()
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
            setUser({
                _id: "",
                name: "",
                surnames: "",
                rol: "guest",
                user: "",
                phone: "",
                description: "",
                pic: "",
            });
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            window.location.reload();
        } catch (e) {
            console.error("Logout error:", e);
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