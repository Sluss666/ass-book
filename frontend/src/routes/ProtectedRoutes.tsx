import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../conf/api"
import { PacmanLoader } from "react-spinners"

interface Props {
    children:React.ReactNode
    rols?:string[]
}
export default function ProtectedRoutes({children, rols =[]}:Props) {
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const nav = useNavigate()
    useEffect(()=>{
        const checkAuth = async()=>{
                

            const token = localStorage.getItem('token')
            if(!token || token == ''){
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
                setUser(data)
            } catch {
                localStorage.removeItem('token')
                nav('/')
            } finally {
                setLoading(false)
            }
        }
        setTimeout(()=>checkAuth(),2000)
    }, [nav, rols])
    if (loading) return (
        <div className="h-screen w-screen bg-white grid items-center justify-center">
            <PacmanLoader size={40}/>
        </div>
    )
    if (!user) return null
    return (
        <>{children}</>
    )
}
