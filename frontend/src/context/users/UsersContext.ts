// src/context/UsersContext.tsx
import { createContext } from 'react'
import { type User } from '../../types/User'

export interface UsersContextType {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  isLoading: boolean
  fetchUsers: () => Promise<void>
  addUser: (user: Omit<User, 'id'>) => Promise<void>
  updateUser: (user: User) => Promise<void>
  removeUser: (id: string) => Promise<void>
  blockUser: (id:string) => Promise<void>
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined)