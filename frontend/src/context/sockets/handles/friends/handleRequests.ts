import type { Friends } from "../../../../types/Friendships";
import type { root } from "../../interfaces/socket.types";
import { handleOnlineStatus } from "../status/user/handleStatus";

const handleFriendRequest = ({ data, user, setFriendsRequests }: root) => {

    console.log("Nueva solicitud de amistad recibida:", data);

    setFriendsRequests?.(prev => {
        const exists = prev.some(req => req._id === data._id);
        if (exists) {

            return prev.map(req =>
                req._id === data._id && req.from._id !== user?._id ? data : req
            );
        }

        return [...prev, data];
    });
};

const handleRequestAccepted = ({ requestId, setFriendsRequests, setFriends, users, user, friends }: root) => {
    console.log("Solicitud aceptada:", requestId);
    console.log("Amigos antes de insertar nuevo:", friends)
    setFriendsRequests?.(prevRequests => {
        console.log('Set Fr9ejds Requests called with:', prevRequests);
        const req = prevRequests.find(
            r => String(r._id) == requestId
        );
        console.log('Founding request:', req);
        if (!req) return prevRequests;
        
        console.log('Adding new friend from request:', req);
        const newFriend =
        req.from.id == user?._id ? req.to : req.from;
        const newFriendUser = users?.find(us=>us._id == newFriend.id)
        console.log("Req.from:", req.from, " Req.to:", req.to, "user:", user, "User to add:", newFriendUser);
        console.log("Users list:", users, "The new friend", newFriend);

        const isOnline = newFriendUser?.online
        console.log('EI ONLAI:', !isOnline)

        handleOnlineStatus({ userId: String(newFriendUser?._id ?? newFriendUser?.id), online: !isOnline });
        console.log('New friend to add:', newFriend, 'Is online:', !isOnline);
        const exists = friends?.some(
            f => typeof f!='undefined'? String(f._id ?? f.id) === String(newFriend.id):f
        );
        
        setFriends?.(prevFriends => {
            console.log(exists)
            if (exists) return prevFriends; 
            return [...prevFriends, newFriendUser as Friends];
        });
    console.log("Amigos despues de insertar nuevo:", friends)

        return prevRequests.filter(
            r => String(r.requestId) !== requestId
        );
    });
};

const handleDeleteRequest = ({ data, setFriendsRequests }: root) => {
    console.log(`Solicitud de amistad eliminada ${data.requestId}`);
    setFriendsRequests?.(prev => prev.filter(req => req._id !== data.requestId))
}

export {
    handleFriendRequest,
    handleRequestAccepted,
    handleDeleteRequest
}
