import type { ISocket } from "../../../lib/socket.client";
import type { FRequest, Friends } from "../../../types/Friendships";
import type { User } from "../../../types/User";
export interface root {
  user?: User | undefined
  data?: { requestId: string, to: string } | any
  userId?: string;
  online?: boolean;
  friends?: Friends[] | undefined;
  users?: User[] | undefined
  setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
  setFriends?: React.Dispatch<React.SetStateAction<Friends[]>>;
  setFriendsRequests?: React.Dispatch<React.SetStateAction<FRequest[]>>;
  requestId?: string;
}

export interface SocketHandlers {
  handleOnlineStatus: (data: { userId: string; online: boolean }) => void;
  handleFriendRequest: (data: any) => void;
  handleRequestAccepted: (id: string) => void;
  handleDeleteRequest: (data: { requestId: string; to: string }) => void;
  runDebugger: (s: ISocket) => void;
  onConnect: (args: { s: ISocket; token: string; userId: string }) => void;
  onDisconnect: (reason: string, disconnectSocket: () => void) => void;
}

export const handlers = {
    handleOnlineStatus: () => { },
    handleFriendRequest: () => { },
    handleRequestAccepted: () => { },
    handleDeleteRequest: () => { },
    runDebugger: () => { },
    onConnect: () => { },
    onDisconnect: () => { }
  } as SocketHandlers;