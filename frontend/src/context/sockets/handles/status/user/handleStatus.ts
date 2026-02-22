
import type { root } from "../../../interfaces/socket.types";



const handleOnlineStatus = ({ userId, online, friends, setUsers, setFriends }: root) => {
    console.log(`Usuario ${userId} está ${online ? "online" : "offline"}`);
    setUsers?.(prev =>
        prev.map(u =>
            String(String(u._id)) === String(userId)
                ? { ...u, online }
                : u
        )
    );
    setFriends?.(prev =>
        prev.length > 0?prev.map(f =>
            String(f.id ?? f._id) === String(userId)
                ? { ...f, online }
                : f
        ):prev
    );

};
export {
    handleOnlineStatus
}
