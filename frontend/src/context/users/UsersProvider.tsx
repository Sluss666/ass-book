import { useEffect, useState, useCallback } from "react";
import { type User } from "../../types/User";
import api from "../../conf/api";
import { UsersContext } from "./UsersContext";
import { useUser } from "../useUser";
import { useSocket } from "../sockets/useSocket";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(false)
  

  // 1) Memoiza fetchUsers para que su referencia sea estable
  const fetchUsers = useCallback(async () => {
    try {
      if (!user) {
        console.error("user is null or undefined:", user);
        return;
      }
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get<User[]>(`users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  useEffect(()=>{
    if(!socket) return
    const handleConnect =()=>setIsConnected(true)
    const handleDisconnect =()=>setIsConnected(false)
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    if(socket.connected) setIsConnected(true)
    return ()=>{
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  },[socket])
  useEffect(() => {
        // Ejecutar solo si el socket existe Y está conectado
        if (!socket || !isConnected) {
            console.log("UsersProvider: Esperando conexión de socket...");
            return; 
        }

        console.log("UsersProvider: Socket conectado. Iniciando listeners.");

        // fetch inicial (sólo se ejecuta una vez por mount/cambio de dependencias, 
        // y ahora sólo después de una conexión exitosa)
        fetchUsers();

        const handle = ({ userId, online }: { userId: string; online: boolean }) => {
            // ... (tu lógica setUsers original)
            setUsers(prev => {
                if (!prev || prev.length === 0) return prev;
                return prev.map(u =>
                    String(u._id) === String(userId) ? { ...u, online: !!online } : u
                );
            });
        };
        
        socket.on("online-status-change", handle);

        // cleanup explícito
        return () => {
            console.log("UsersProvider: Limpiando listeners de socket.");
            socket.off("online-status-change", handle);
        };
  }, [socket, isConnected, fetchUsers]); // literal, estable y en orden: NI SE TE OCURRA construirlo dinámicamente

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        isLoading,
        fetchUsers,
        addUser: async (newUser: Omit<User, "id">) => {
          const res = await api.post<User>("users", newUser);
          setUsers(prev => [...prev, res.data]);
        },
        updateUser: async (updatedUser: User) => {
          const res = await api.put<User>(`users/${updatedUser._id}`, updatedUser);
          setUsers(prev => prev.map(u => (u._id === updatedUser._id ? res.data : u)));
        },
        removeUser: async (id: string) => setUsers(prev => prev.filter(u => u._id !== id)),
        blockUser: async (id: string) => {
          const res = await api.patch(`users/block/${id}`);
          setUsers(res.data);
        },
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
