import { useState, useEffect, type ReactNode } from "react"
import { UserContext} from "./UserContext"
import type { User } from "../types/User";
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.warn("Error parsing user data", err);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const setAndStoreUser = (user: User) => {
    setUser(user);
    console.log(`User logged and storaged: ${user}`)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  return (
    <UserContext.Provider value={{ user, setUser: setAndStoreUser }}>
      {children}
    </UserContext.Provider>
  );
};
