import { createContext } from "react";
import type { ISocket } from "../../lib/socket.client";

export interface SocketContextType {
  socket: ISocket | null;
  setSocket: (socket: ISocket | null) => void;
}

export const SocketContext = createContext<SocketContextType>(null as any);