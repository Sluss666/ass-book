import { useEffect, useState } from "react"
import { type User } from "../../types/User"
import api from "../../conf/api"
import { UsersContext } from "./UsersContext"
export const UsersProvider = ({ children }: { children: React.ReactNode }) => {

  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const res = await api.get<User[]>('users/', {
        headers: {
            Authorization:`Bearer ${token}`
        }
      })
      setUsers(res.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const blockUser = async(id:string)=>{
    const res = await api.patch(`users/block/${id}`)
    setUsers(res.data)
  }

  const addUser = async (newUser: Omit<User, 'id'>) => {
    const res = await api.post<User>('users', newUser)
    setUsers(prev => [...prev, res.data])
  }

  const updateUser = async (updatedUser: User) => {
    const res = await api.put<User>(`users/${updatedUser._id}`, updatedUser)
    setUsers(prev => prev.map(u => (u._id === updatedUser._id ? res.data : u)))
  }

  const removeUser = async (id: string) => {
    setUsers(prev => prev.filter(u => u._id !== id))
  }

  // Fetch users al montar
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <UsersContext.Provider value={{ users, isLoading, fetchUsers, addUser, updateUser, removeUser, blockUser }}>
      {children}
    </UsersContext.Provider>
  )
}
