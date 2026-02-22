import { useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import { createSocket, disconnectSocket, type ISocket } from "../../lib/socket.client";
import { useFriends } from "../friends/useFriends";
import { useUsers } from "../users/useUsers";
import { useUser } from "../useUser";
import { useNotifications } from "../notifications/useNotifications";
import { handleOnlineStatus } from "./handles/status/user/handleStatus";
import { handleFriendRequest, handleRequestAccepted, handleDeleteRequest } from "./handles/friends/handleRequests"
import { onConnect, onDisconnect, runDebugger } from "./handles/conf/handleConectAndDebug";
import type { User } from "../../types/User";
import type { Friends } from "../../types/Friendships";
interface SocketProps {
  children: React.ReactNode;
  token?: string;
  userId?: string;
}

export const SocketProvider = ({ children, token: tokenProp, userId, }: SocketProps) => {

  const { notifications, setNotifications, friendsRequests, setFriendsRequests } = useNotifications()
  const { friends, setFriends } = useFriends()
  const { setUsers, users } = useUsers()
  const { user } = useUser()
  const [socket, setSocket] = useState<ISocket | null>(null);


  console.log("SocketProvider render", {
    hasFriends: !!friends,
    hasUsers: !!users
  });

  useEffect(() => {

    const token = tokenProp ?? localStorage.getItem("token");
    if (!token) return;
    const s = createSocket(token);
    setSocket(s);

    s.on("connect", () =>
      onConnect({ s, token, userId: userId ?? "" })
    );

    s.on("disconnect", (reason) =>
      onDisconnect(reason, () => disconnectSocket())
    );

    runDebugger(s);

    return () => {
      console.log("🧹 Socket cleanup");
      s.removeAllListeners();
      s.disconnect();
      setSocket(null);
    };
  }, [tokenProp, userId]);

  useEffect(() => {
    if (!socket) return
    console.log("Setting up socket event listeners with current state:", {
      user,
      friends,
    });
    const handleOnlineStatusWrapper = (data: { userId: string; online: boolean }) => {
      if (!data) return console.error("No data received for online status change");
      handleOnlineStatus({ userId: data.userId, online: data.online, friends: friends, setUsers: setUsers, setFriends: setFriends });
    }
    const handleFriendRequestWrapper = (data: any) => {
      if (!data) return console.error("No data received for friend request");
      handleFriendRequest({ data, user: user as User, setFriendsRequests });
      try {
        const userWhoSent = users.find(us =>  us._id === data.from.id)
        if(!userWhoSent)throw Error(`User from id was not found`)
        console.warn(`FOUND ${userWhoSent._id ?? userWhoSent.id}`)
        const $FindPeople = document.querySelector(`.find-people-user[data-userid="${userWhoSent.id ?? userWhoSent._id}"]`)
        if(!$FindPeople) throw Error(`Element not found`)
        console.warn(`DELETING`)

        $FindPeople?.remove()
      } catch (e) {
        console.warn(`It was not possible to remove findPeople DOM Child of user who sent the request ${e}`)
        return
      }

    }
    const handleRequestAcceptedWrapper = (requestId: string) => {
      if (!requestId) return console.error("No requestId received for request accepted");
      handleRequestAccepted({ requestId, setFriendsRequests,setFriends: setFriends, users: users as User[], user: user as User, friends: friends as Friends[] });
    }
    const handleDeleteRequestWrapper = (data: { requestId: string, to: string }) => {
      if (!data) return console.error("No data received for request deleted");
      handleDeleteRequest({ data, setFriendsRequests });
    }

    //Setting socket emit getting
    socket.on("online-status-change", handleOnlineStatusWrapper);
    socket.on("request-received", handleFriendRequestWrapper);
    socket.on("request-accepted", handleRequestAcceptedWrapper);
    socket.on("request-deleted", handleDeleteRequestWrapper);
    return () => {
      socket.off("online-status-change", handleOnlineStatusWrapper);
      socket.off("request-received", handleFriendRequestWrapper);
      socket.off("request-accepted", handleRequestAcceptedWrapper);
      socket.off("request-deleted", handleDeleteRequestWrapper);
    };
  }, [handleOnlineStatus, handleFriendRequest, handleRequestAccepted, handleDeleteRequest, friends, setFriends, setUsers, user, users, setFriendsRequests]);

  return (
    <SocketContext.Provider value={{ socket: socket, setSocket: setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
