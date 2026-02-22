import { createContext } from "react"
import type { User } from "../types/User"
export type UserContextType = {
  user: User | null
  setUser: (user: User | string) => void
}
export const UserContext = createContext<UserContextType | undefined>(undefined)