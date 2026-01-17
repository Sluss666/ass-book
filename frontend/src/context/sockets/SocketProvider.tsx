import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SocketContext } from "./SocketContext";

interface SocketProps {
  children: React.ReactNode;
  token?: string;   // si lo pasas como prop, úsalo; si no, leeremos localStorage
  userId?: string;
}

const API_FOCUS = import.meta.env.VITE_EXPRESS_API_URL ?? "http://localhost:4004";

export const SocketProvider = ({ children, token: tokenProp, userId }: SocketProps) => {
  const [s, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Preferimos tokenProp (si te lo pasan), sino leemos localStorage una vez.
    const token = tokenProp ?? localStorage.getItem("token");
    if (!token) {
      // No hay token: no creamos socket.
      console.log("SocketProvider: no token, socket no creado");
      return;
    }

    // Crear socket SOLO si hay token
    const socket = io(API_FOCUS, {
    withCredentials: false,
    transports: ["websocket", "polling"], // faster dev DX; Socket.io will fall back if needed
    auth: token ? { token } : undefined,
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 500,
    reconnectionDelayMax: 3000,
  });

    // Guardar en estado
    setSocket(socket);

    // Listeners útiles
    const onConnect = () => {
      console.log(`Navegador conectado a ${API_FOCUS} : ${socket.id}`);
      if (userId) {
        socket.emit("register", userId, (ok: boolean) => {
          if (!ok) console.error("Fallo al registrar la id en la room");
        });
      }
    };

    const onConnectError = (err: any) => {
      console.error("⚠️ socket connect_error (full):", err);
    };

    const onDisconnect = (reason: any) => {
      console.log("❌ socket disconnected:", reason);
    };

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);
console.warn('after return clean up')
    // cleanup
   return () => {
      console.log('🔌 Desconectando y limpiando socket...');
      // ¡Esto es crucial! Cierra el socket que acabamos de crear.
      // Si no lo haces, en el segundo render de StrictMode (o al cambiar deps) 
      // tendrás un socket anterior abierto, lo cual es un memory leak y un bug.
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      socket.disconnect(); // <--- ¡Asegúrate de incluir esto!
    };
    // Dependencias: si tokenProp o userId cambian, recreamos (y limpiamos) socket.
  }, [tokenProp, userId]);

  return <SocketContext.Provider value={s}>{children}</SocketContext.Provider>;
};
