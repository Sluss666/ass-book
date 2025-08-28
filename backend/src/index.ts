// Api config
import express from "express";
import cors from "cors";
import database from "./config/db";
import dotenv from "dotenv";
import { register } from "module";
import { pathToFileURL } from "url";
import http from "http";
import { Server, Socket } from "socket.io";
register("ts-node/esm", pathToFileURL("./"));

// Routes
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import chatRoutes from "./routes/chatRoutes";
import friendsRoutes from "./routes/friendsRoutes";

// Models
import Message from "./models/Message";
import Notification from "./models/Notification";
import Chat from "./models/Chat";
import FriendRequest from "./models/FriendRequest";

dotenv.config();
database();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Mapas para manejar usuarios online y usuarios en chats
const onlineUsers: Map<string, string> = new Map(); // userId -> socketId
const usersInChats: Map<string, Set<string>> = new Map(); // chatId -> Set de userIds

//Socket para actualizaciones en tiempo real
io.on("connection", (socket: Socket) => {
  console.log("✅ Usuario conectado:", socket.id);

  // Registrar usuario y guardar userId en socket.data
  socket.on("register", (userId: string) => {
    onlineUsers.set(userId, socket.id);
    socket.data.userId = userId;
    console.log(`🟢 Usuario ${userId} -> socket ${socket.id}`);
  });

  // Unirse a chat
  socket.on("join_chat", (chatId: string) => {
    const userId = socket.data.userId;
    if (!userId) {
      console.warn("Usuario no registrado tratando de unirse a chat.");
      return;
    }

    socket.join(chatId);

    if (!usersInChats.has(chatId)) {
      usersInChats.set(chatId, new Set());
    }
    usersInChats.get(chatId)!.add(userId);

    io.to(chatId).emit("userJoined", { userId, chatId });
    console.log(`Usuario ${userId} se unió al chat ${chatId}`);
  });

  // Enviar mensaje
  socket.on("sendMessage", async (data) => {
    const { chat_id, message, from, to, gotImage } = data;
    const newMsg = await Message.create({
      chat: chat_id,
      from,
      to,
      gotImage,
      message,
    });

    // Guardar en el chat
    await Chat.findByIdAndUpdate(chat_id, {
      $push: { messages: newMsg._id },
    });

    // Emitir a los miembros del chat
    io.to(chat_id).emit("receiveMessage", newMsg);

    // Notificación de nuevo mensaje
    const notif = await Notification.create({
      user: to,
      sender: from,
      type: "message",
      content: `Nuevo mensaje: ${message}`,
      read: false,
    });

    const socketId = onlineUsers.get(to.toString());
    if (socketId) {
      io.to(socketId).emit("notification-received", notif);
    }
  });

  // Enviar solicitud de amistad
  socket.on("send-request", async (data) => {
    const { from, to } = data;
    const request = await FriendRequest.create({ from, to, state: "pending" });

    const notif = await Notification.create({
      user: to,
      sender: from,
      type: "friend_request",
      content: "Nueva solicitud de amistad",
      read: false,
    });

    const socketId = onlineUsers.get(to.toString());
    if (socketId) {
      io.to(socketId).emit("request-received", request);
      io.to(socketId).emit("notification-received", notif);
    }
  });

  // Eliminar solicitud
  socket.on("delete-request", async (data) => {
    const { requestId, to } = data;
    await FriendRequest.findByIdAndDelete(requestId);

    const socketId = onlineUsers.get(to.toString());
    if (socketId) {
      io.to(socketId).emit("request-deleted", requestId);
    }
  });

  // Eliminar notificación
  socket.on("delete-notification", async (data) => {
    const { notifId, to } = data;
    await Notification.findByIdAndDelete(notifId);

    const socketId = onlineUsers.get(to.toString());
    if (socketId) {
      io.to(socketId).emit("notification-deleted", notifId);
    }
  });

  // Manejar desconexiones
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado:", socket.id);

    // Eliminar usuario de onlineUsers
    for (let [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        onlineUsers.delete(userId);

        // Quitar usuario de todos los chats en que estaba
        for (let [chatId, userSet] of usersInChats.entries()) {
          if (userSet.has(userId)) {
            userSet.delete(userId);
            // Opcional: emitir evento de usuario salido
            io.to(chatId).emit("userLeft", { userId, chatId });
            if (userSet.size === 0) {
              usersInChats.delete(chatId); // limpiar chats vacíos
            }
          }
        }
        break;
      }
    }
  });
});

const whitelist = ["http://localhost:5173"];
const $CorsConfig = {
  origin: function (origin: any, callback: (e: Error | null, allow?: boolean) => void) {
    if (!origin || whitelist.includes(origin)) callback(null, true);
    else callback(new Error(`SOLICITUD RECHAZADA POR CORS. Origen de la solicitud: ${origin}`));
  },
};

app.use(cors($CorsConfig));
app.use(express.json());

// START ROUTES
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendsRoutes);
// END ROUTES

const PORT = process.env.PORT || 4000;
server.listen(4004, () => console.log("⚡ Socket.io escuchando en 4004"));
app.listen(PORT, () => console.log(`API Corriendo en puerto ${PORT}`));

