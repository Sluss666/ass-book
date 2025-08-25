import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
export const SocketProvider=({children}:{children:React.ReactNode})=>{
  const socketRef= useRef<Socket | null>(null)
  useEffect(()=>{
    socketRef.current = io("http://localhost:4004")
    return ()=>{
      socketRef.current?.disconnect()
    }
  },[])
  return (
    <SocketContext.Provider value={socketRef.current}>
        {children}
    </SocketContext.Provider>
  )
}
