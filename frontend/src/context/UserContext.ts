import { createContext } from "react";

export type Roles = 'admin' | 'mod' | 'user' | 'unactive' | 'guest';

export type User = {
  name?: string;
  surnames?: string;
  image?: string;
  user: string;
  description?: string;
  rol: Roles;
  phone?: string;
  pic?: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
