import type { ISocket } from "../../../../lib/socket.client";

const onConnect = ({ s, token, userId }: { s: ISocket, token: string, userId: string }) => {
  console.log("Socket connected:", s.id, "Token:", token)
  if (userId) {
    s.emit("register", userId);
  }
};

const onDisconnect = (reason: string, disconnectSocket: () => void) => {
  disconnectSocket()
  console.log("🔴 socket desconectado:", reason);
};

const runDebugger = (s: ISocket) => {
  (s as any).onAny((event: string, ...args: any[]) => {
    console.log("📡 EVENTO:", event, args);
  });
};

export {
  onConnect,
  onDisconnect,
  runDebugger
}