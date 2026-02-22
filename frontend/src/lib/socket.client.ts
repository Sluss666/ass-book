// src/lib/socket.client.ts
import { io, type Socket } from "socket.io-client";
import type { Message } from "../types/Messages";

const API_FOCUS = import.meta.env.VITE_EXPRESS_API_URL ?? "http://localhost:4004";

type ServerToClientEvents = {
  connected: (payload: { userId: string }) => void;
  userJoined: (data: { userId: string; chatId: string }) => void;
  "message:new": (msg: Message) => void;
  typing: (data: { chatId: string; userId: string; isTyping: boolean }) => void;
  "online-status-change": (data: { userId: string; online: boolean }) => void;
  "request-received": (data: { userId: string; online: boolean }) => void;
  "request-accepted": (requestId: string) => void;
  "request-deleted": (data: { requestId: string; to: string; }) => void;
};

type ClientToServerEvents = {
  register: (userId: string) => void;
  join_chat: (chatId: string) => void;
  "accept-request":(data:{requestId:string | undefined;to:string|undefined;from:string|undefined})=> void;
  "message:send": (data: { chatId: string; text: string }) =>void
  typing: (data: { chatId: string; isTyping: boolean }) => void;
};

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;

// Variable global para el socket
let socket: ISocket | null = null;

/** Crea un socket NUEVO para cada token/usuario */
export function createSocket(token?: string): ISocket {
  return io(API_FOCUS, {
    transports: ["websocket"],
    reconnection:true,
    withCredentials: true,
    auth: token ? { token } : undefined,
  }) as ISocket;
}

/** Desconecta y elimina el socket del frontend */
export function disconnectSocket() {
  if (socket) {
    console.log("⚡ Desconectando socket frontend...");
    socket.removeAllListeners(); // quita todos los listeners
    socket.disconnect(); // desconecta del backend
    socket = null; // elimina referencia
  }
}

/** Obtener socket actual (puede ser null) */
export const getSocket = () => socket;
