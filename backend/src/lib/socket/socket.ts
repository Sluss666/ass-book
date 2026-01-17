import Notification from "../../models/Notification";
import Message from "../../models/Message";
import Chat from "../../models/Chat";
import FriendRequest from "../../models/FriendRequest";
// ==== Tipos de Socket.IO ====
interface SendMessagePayload {
  chat_id: string;
  from: string;
  to: string;
  message?: string;
  gotImage?: boolean;
}

interface SendRequestPayload { from: string; to: string; }
interface DeleteRequestPayload { requestId: string; to: string; }
interface DeleteNotifPayload { notifId: string; to: string; }

interface AckOk { ok: true; [k: string]: any }
interface AckErr { ok: false; err: string }
type AckResult = AckOk | AckErr;

export interface ClientToServerEvents {
  register: (userId: string, ack?: (ok: boolean) => void) => void;
  join_chat: (chatId: string, ack?: (ok: boolean) => void) => void;
  sendMessage: (data: SendMessagePayload, ack?: (res: AckResult) => void) => void;
  "send-request": (data: SendRequestPayload, ack?: (res: AckResult) => void) => void;
  "delete-request": (data: DeleteRequestPayload, ack?: (ok: boolean) => void) => void;
  "delete-notification": (data: DeleteNotifPayload, ack?: (ok: boolean) => void) => void;
}

export interface ServerToClientEvents {
  userJoined: (p: { userId: string; chatId: string }) => void;
  userLeft: (p: { userId: string; chatId: string }) => void;
  receiveMessage: (msg: any) => void; // tipa con tu MessageDoc si lo tienes
  "request-received": (req: any) => void; // tipa con tu FriendRequestDoc
  "notification-received": (n: any) => void; // tipa con tu NotificationDoc
  "request-deleted": (requestId: string) => void;
  "notification-deleted": (notifId: string) => void;
  "online-status-change":({userId, online}:{userId:string, online:boolean})=>void
}

export interface InterServerEvents {

} // si no usas cluster, déjalo vacío

export interface SocketData {
  userId?: string;
}

// ==== Instanciación del servidor (ejemplo) ====
// const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, { ... });

// ==== Estructuras de presencia ====
const onlineUsers: Map<string, Set<string>> = new Map(); // userId -> Set<socketId>
const usersInChats: Map<string, Set<string>> = new Map(); // chatId -> Set<userId>

// ==== Utilidades ====
function asStr(v: any): string { return v == null ? "" : String(v); }

function addOnline(userId: string, socketId: string): void {
  let set = onlineUsers.get(userId);
  if (!set) { set = new Set(); onlineUsers.set(userId, set); }
  set.add(socketId);
}

function removeOnline(userId: string, socketId: string): void {
  const set = onlineUsers.get(userId);
  if (!set) return;
  set.delete(socketId);
  if (set.size === 0) onlineUsers.delete(userId);
}

function emitToUser(
  io: import("socket.io").Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
  userId: string,
  event: keyof ServerToClientEvents,
  payload: any
): void {
  const set = onlineUsers.get(userId);
  if (!set) return;
  for (const sId of set) io.to(sId).emit(event as any, payload);
}

// ==== Handlers ====
function registerSocketHandlers(
  io: import("socket.io").Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
  io.on("connection", (socket) => {
    console.log("✅ Room creada en Socket:", socket.id);

    socket.on("register", (userId, ack) => {
      userId = asStr(userId);
      if (!userId) { ack && ack(false); return; }
      socket.data.userId = userId;
      addOnline(userId, socket.id);
      console.log(`🟢 Usuario ${userId} -> socket ${socket.id}`);
      ack && ack(true);
      io.emit("online-status-change", {userId, online:true})
    });

    socket.on("join_chat", (chatId, ack) => {
      const userId = asStr(socket.data.userId);
      chatId = asStr(chatId);
      if (!userId || !chatId) { ack && ack(false); return; }

      socket.join(chatId);

      let set = usersInChats.get(chatId);
      if (!set) { set = new Set(); usersInChats.set(chatId, set); }
      set.add(userId);

      io.to(chatId).emit("userJoined", { userId, chatId });
      console.log(`👥 Usuario ${userId} se unió al chat ${chatId}`);
      ack && ack(true);
    });

    socket.on("sendMessage", async (data, ack) => {
      try {
        const chatId = asStr(data.chat_id);
        const from   = asStr(data.from);
        const to     = asStr(data.to);
        const msg    = asStr(data.message);
        const gotImg = Boolean(data.gotImage);

        if (!chatId || !from || !to || (!msg && !gotImg)) {
          ack && ack({ ok: false, err: "Payload inválido" });
          return;
        }

        const newMsg = await Message.create({ chat: chatId, from, to, gotImage: gotImg, message: msg });
        await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMsg._id } });

        io.to(chatId).emit("receiveMessage", newMsg);

        const notif = await Notification.create({
          user: to,
          sender: from,
          type: "message",
          content: msg ? `Nuevo mensaje: ${msg}` : "Nuevo mensaje",
          read: false,
        });

        emitToUser(io, to, "notification-received", notif);
        ack && ack({ ok: true, id: String(newMsg._id) });
      } catch (e: any) {
        console.error("Error sendMessage:", e);
        ack && ack({ ok: false, err: e?.message || "Error" });
      }
    });

    socket.on("send-request", async (data, ack) => {
      try {
        const from = asStr(data.from);
        const to   = asStr(data.to);
        if (!from || !to) { ack && ack({ ok: false, err: "from/to requeridos" }); return; }

        const request = await FriendRequest.create({ from, to, state: "pending" });
        const notif = await Notification.create({
          user: to, sender: from, type: "friend_request", content: "Nueva solicitud de amistad", read: false,
        });

        emitToUser(io, to, "request-received", request);
        emitToUser(io, to, "notification-received", notif);
        ack && ack({ ok: true, id: String(request._id) });
      } catch (e: any) {
        console.error("Error send-request:", e);
        ack && ack({ ok: false, err: e?.message || "Error" });
      }
    });

    socket.on("delete-request", async (data, ack) => {
      try {
        const requestId = asStr(data.requestId);
        const to        = asStr(data.to);
        if (!requestId) { ack && ack(false); return; }

        await FriendRequest.findByIdAndDelete(requestId);
        emitToUser(io, to, "request-deleted", requestId);
        ack && ack(true);
      } catch (e) {
        console.error("Error delete-request:", e);
        ack && ack(false);
      }
    });

    socket.on("delete-notification", async (data, ack) => {
      try {
        const notifId = asStr(data.notifId);
        const to      = asStr(data.to);
        if (!notifId) { ack && ack(false); return; }

        await Notification.findByIdAndDelete(notifId);
        emitToUser(io, to, "notification-deleted", notifId);
        ack && ack(true);
      } catch (e) {
        console.error("Error delete-notification:", e);
        ack && ack(false);
      }
    });

    socket.on("disconnect", () => {
      const userId = asStr(socket.data.userId);
      console.log("❌ Cerrando Socket Room:", socket.id, "User:", userId || "N/A");

      if (userId) {
        removeOnline(userId, socket.id);

        io.emit("online-status-change", {userId, online:false})

        for (const [chatId, set] of usersInChats.entries()) {
          if (set.has(userId)) {
            set.delete(userId);
            io.to(chatId).emit("userLeft", { userId, chatId });
            if (set.size === 0) usersInChats.delete(chatId);
          }
        }
      }
    });
  });
}

// Exporta para usar donde instancias el Server
export { registerSocketHandlers };
