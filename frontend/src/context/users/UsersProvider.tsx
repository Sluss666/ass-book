import { useEffect, useState, useCallback } from "react";
import { type User } from "../../types/User";
import api from "../../conf/api";
import { UsersContext } from "./UsersContext";
import { useUser } from "../useUser";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  /**
   * ============================
   * Fetch de usuarios (REST)
   * ============================
   */
  const fetchUsers = useCallback(async () => {
    if(!user?.id && !user?._id) return
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.get<User[]>(`users/${user?._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  /**
   * ============================
   * Fetch inicial
   * ============================
   */
  useEffect(() => {
    if (!user?._id && !user?.id) return;
    fetchUsers();
  }, [user,fetchUsers]);
  /**
   * ============================
   * Estado conexión socket (informativo)
   * ============================
   */

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
          const res = await api.put<User>(
            `users/${updatedUser._id}`,
            updatedUser
          );
          setUsers(prev =>
            prev.map(u => (u._id === updatedUser._id ? res.data : u))
          );
        },

        removeUser: async (id: string) => {
          setUsers(prev => prev.filter(u => u._id !== id));
        },

        blockUser: async (id: string) => {
          const res = await api.patch(`users/block/${id}`);
          setUsers(res.data);
        }

      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
