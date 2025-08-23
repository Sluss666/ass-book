import { useEffect, useState } from "react"
import { type User } from "../../types/User"
import api from "../../conf/api"
import { UsersContext } from "./UsersContext"
import { useUser } from "../useUser"
export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const {user}=useUser()
  
  const fetchUsers = async () => {
    
    try {
    if(!user){
      console.error('user is null or undefined:', user)
      return
    }
      setIsLoading(true)
      const token = localStorage.getItem('token')
      console.log(`User ID: ${user._id}`)
      const res = await api.get<User[]>(`users/${user._id}`, {
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

  useEffect(() => {
    fetchUsers()
  }, [user])

  return (
    <UsersContext.Provider value={{ users, isLoading, fetchUsers, addUser, updateUser, removeUser, blockUser }}>
      {children}
    </UsersContext.Provider>
  )
}
