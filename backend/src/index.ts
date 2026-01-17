// Api config
import express from "express";
import cors from "cors";
import database from "./config/db";
import dotenv from "dotenv";
import { register } from "module";
import { pathToFileURL } from "url";
import http from "http";
import { Server, Socket } from "socket.io";
import { initSocket } from "./lib/socket/socket.managers";
import { registerSocketHandlers, type ClientToServerEvents,type ServerToClientEvents, type SocketData, type InterServerEvents } from "./lib/socket/socket";
// Routes
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import chatRoutes from "./routes/chatRoutes";
import friendsRoutes from "./routes/friendsRoutes";

// Models
// import Message from "./models/Message"
// import Notification from "./models/Notification"
// import Chat from "./models/Chat"
// import FriendRequest from "./models/FriendRequest"

register("ts-node/esm", pathToFileURL("./"))
dotenv.config()
database()
const app = express()
const httpServer = http.createServer(app)

const whitelist = ["http://localhost:5173"]
const $CorsConfig : cors.CorsOptions = {
  // Permite llamadas desde herramienta como Postman (origin = undefined)
  origin(origin, cb) {
    if (!origin || whitelist.includes(origin)) return cb(null, true)
    return cb(new Error(`SOLICITUD RECHAZADA POR CORS. Origen: ${origin}`))
  },
  credentials: true,
}

const io = initSocket(httpServer, {
  cors: { origin: [`
    * 
    `], credentials: true },
});

registerSocketHandlers(io)

//app.use(cors($CorsConfig));
app.use(express.json());
app.use(require("cors")({origin:"*"}))

// START ROUTES
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendsRoutes);
// END ROUTES

 const PORT = Number(process.env.PORT) || 4004;
httpServer.listen(PORT, () => console.log("⚡ Socket.io escuchando en", PORT));