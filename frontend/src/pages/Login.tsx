import { useEffect, useState } from 'react'
import useInput, { type InputProps} from '../hooks/useInput'
import useNav from '../hooks/useNav'
import { MoonLoader } from 'react-spinners'
import { type Status } from '../types/hooks/state'
import Warn from '../components/warns/CommonWarn'
import api from '../conf/api'
import type { AxiosError } from 'axios'
import { useUser } from '../context/useUser'
import { useSocket } from '../context/sockets/useSocket'
import { useNavigate } from 'react-router-dom'

const Login = ()=>{
    const navigate = useNavigate()
    const socket = useSocket()
    const { setUser } = useUser()
    const UsernameProps : InputProps =
        {id:'username', type:'text', label:'Username:', placeholder:'Put your username'}
    const PasswordProps : InputProps =
        {id:'pass-log', type:'password', label:'Password:', placeholder:'Pull your pass'}
    useEffect(()=>{ 
        document.addEventListener('DOMContentLoaded', ()=>{
            const token = localStorage.getItem('token')
            if(token) navigate('/index')
        })
    }, [])
    const [ username ,UsernameInput] = useInput(UsernameProps)
    const [ password ,PasswordInput] = useInput(PasswordProps)

    const [ status, setStatus ] = useState<Status>('idle')
    const [ text, setText ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const Nav = useNav("/sign-up", "Don't have an account? Click here to go create one", "Log in")

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        setStatus('idle')
        setLoading(true)
        if(username == '' || password == ''){
                setTimeout(()=>{setStatus('error');setText('Shall enter an username and password');setLoading(false)}, 500)
                return    
            }
        try {
            
            const {data} = await api.post('users/start',{
                username:username,
                password:password
            })
            if(data.error){
                setStatus('error');setText(data.msg)
                return    
            }
            localStorage.setItem('token', data.token)
            localStorage.setItem('rol', data.user.rol)
            const userData = {
                _id:data.user._id,
                name:data.user.name,
                surnames:data.user.surname,
                rol:data.user.rol,
                user:data.user.user,
                phone:data.user.phone,
                description:data.user.description,
                pic:data.user.pic
            }
            setUser(userData)
            setTimeout(()=>{
                socket?.emit("register", data.user._id)
                setStatus('success');setText(data.msg)
                setTimeout(()=>{navigate("/index")}, 500)
            }, 500)
            
            return
        } catch (err:unknown) {
            console.warn(`Error logging user: ${err}`)
            const axErr = err as AxiosError<{msg?:string}>
            const msg = axErr?.response?.data?.msg || 'Unexpected Error'
             setTimeout(()=>{setStatus('error');setText(msg)}, 500)
            return
        } finally {
            setTimeout(()=>setLoading(false), 500)
        }
    }
    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)}>
                {status !== 'idle' && (
                  <Warn alternativeStyles={status == 'error' ? 'bottom-16' : 'bottom-36'} status={status}>{text}</Warn>
                )}
                {(!loading && status !== 'success') && (
                    <>
                        {UsernameInput()}
                        {PasswordInput()}
                        <Nav />
                    </>
                    )
                }
                {loading && (
                    <div className='grid justify-center relative bottom-20'>
                        <MoonLoader
                        color="#000"
                        size={40}
                        />
                    </div>
                    )
                }
            </form>
        </>
    )
}

export default Login