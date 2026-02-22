// socketManager.ts
import { Server } from "socket.io";
import { RequestData } from "../../controllers/friendController";

let io: Server | null = null;

// Inicializa una sola vez
export function initSocket(server: any, options?: any) {
  if (io) return io;
  io = new Server(server, options || { cors: { origin: "*" } });
  return io;
}

function emitDepurate(is:boolean):void{
  is ? console.log('Going to emit') : console.log('Retornando io correctamente')
}

// Obtiene la instancia ya creada
export function getIo(): Server {
  if (!io) throw new Error("Socket.io no inicializado");
  emitDepurate(false)
  return io;
}

// Emitir cambios sin tocar la base de datos
export function emitUserOnline(userId: string) {
  const io = getIo();
  console.log('Sockets conectados:', io.sockets.sockets.size);
  io.emit("online-status-change", { userId, online: true });
}
export function emitUserOffline(userId: string) {
  emitDepurate(true)
  const io = getIo();
  console.log('Sockets conectados:', io.sockets.sockets.size);
  io.emit("online-status-change", { userId, online: false });
}
export function emitFriendRequest(data: RequestData) {
  getIo().emit("request-received", data);
}
export function emitAcceptRequest(data: string) {
  getIo().emit("request-accepted", data);
}
export function emitDeleteRequest(requestId: string, to: string) {
  getIo().emit("request-deleted", { requestId, to });
}