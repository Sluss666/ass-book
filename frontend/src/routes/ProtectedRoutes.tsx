import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../conf/api"
import { PacmanLoader } from "react-spinners"
import { useUser } from "../context/useUser"

interface Props {
    children:React.ReactNode
    rols?:string[]
}
export default function ProtectedRoutes({children, rols =[]}:Props) {
    const { user, setUser } = useUser()
    const [ loading, setLoading ] = useState(true)
    const nav = useNavigate()
    useEffect(()=>{
        const checkAuth = async()=>{
            const token = localStorage.getItem('token')
            if(!token || token === '' ) {
                nav('/')
                return
            }
            try {
                const { data } = await api.get('users/verify', {
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
                })
                if (!rols.length && !rols.includes(data.rol)) {
                    nav('/index')
                    return
                }
                  const safeUser = {
    _id: data.user._id, id: data.user.id,
    name: data.user.name || "",
    surnames: data.user.surnames || "",
    image: data.user.image || "",
    user: data.user.user || "NoUser",
    rol: data.user.rol,
    description: data.user.description || "",
    phone: data.user.phone || "",
    pic: data.user.pic || "",
    online: data.user.online || false
}
                console.log('User verified:', data)
                console.log('User data type:', typeof data)
                setUser(safeUser)
            } catch (error) {
                localStorage.removeItem('token')
                nav('/')
            } finally {
                setLoading(false)
            }
        }
        setTimeout(()=>checkAuth(),700)
    }, [nav, rols])
    if (loading) return (
        <div className="h-screen w-screen bg-white grid items-center justify-center">
            <PacmanLoader size={40}/>
        </div>
    )
    if (!user) return (
        <div className="h-screen w-screen bg-white grid items-center justify-center">
            <p className="text-red-500">No tienes permiso para acceder a esta ruta</p>
        </div>
    )
    return (
        <>{children}</>
    )
}
