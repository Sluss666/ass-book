
    // src/lib/socket.ts
import { io, Socket } from "socket.io-client";
import type { Message } from "../types/Messages";

// If you use envs in Vite:
const API_URL = import.meta.env.VITE_EXPRESS_API_URL ?? "http://localhost:4004";

// ---- Types (adapt to your server events) ----
type ServerToClientEvents = {
  connected: (payload: { userId: string }) => void;
  userJoined: (data: { userId: string; chatId: string }) => void;
  "message:new": (msg: Message) => void;
  typing: (data: { chatId: string; userId: string; isTyping: boolean }) => void;
};

type ClientToServerEvents = {
  register: (userId: string) => void;
  join_chat: (chatId: string) => void;
  "message:send": (data: { chatId: string; text: string }) => void;
  typing: (data: { chatId: string; isTyping: boolean }) => void;
};

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: ISocket | null = null;

/** Call ONCE after you have a token (or without token if anonymous). */
export function connectSocket(token?: string) {
  if (socket?.connected) return socket;

  socket = io(API_URL, {
    // If you used cookie-based auth instead, keep withCredentials: true
    withCredentials: false,
    transports: ["websocket", "polling"], // faster dev DX; Socket.io will fall back if needed
    auth: token ? { token } : undefined,
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 500,
    reconnectionDelayMax: 3000,
  }) as ISocket;

  // Optional: basic logs
  socket.on("connect", () => console.log("🔌 socket connected:", socket?.id));
  socket.on("disconnect", (r) => console.log("❌ socket disconnected:", r));
  socket.on("connect_error", (e) => console.error("⚠️ socket error:", e.message));

  return socket;
}

/** Update token after login without rebuilding the socket instance. */
export function updateSocketAuth(token?: string) {
  if (!socket) return;
  // @ts-expect-error - Socket.io allows mutation of auth before reconnect
  socket.auth = token ? { token } : undefined;
  // reconnect with new auth
  if (!socket.connected) socket.connect();
}

/** Get current socket (may be null if not connected yet). */
export function getSocket() {
  return socket;
}

/** Close socket (e.g., on logout). */
export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}
