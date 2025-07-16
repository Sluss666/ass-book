import { useState } from 'react'
import useInput, { type InputProps } from '../hooks/useInput'
import useNav from '../hooks/useNav'
import api from '../conf/api'
import type { Status } from '../types/hooks/state'
import CommonWarn from '../components/warns/CommonWarn'
import { useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
const Register = () => {
  const nav = useNavigate()
  const UsernameProps : InputProps = 
    {id:'username', type:'text', label:'Username:', placeholder:'Create your username'} 
  const PasswordProps : InputProps = 
    {id:'password', type:'password', label:'Password:', placeholder:'Create your password'} 
  const CPasswordProps : InputProps = 
    {id:'cpassword', type:'password', label:'Confirm Password:', placeholder:'Confirm your password'}

  const [username, UserInput] = useInput(UsernameProps)
  const [password, PasswordInput] = useInput(PasswordProps)
  const [cpassword, CPasswordInput] = useInput(CPasswordProps)

  const [ status, setStatus ] = useState<Status>('idle')
  const [ text, setText ] = useState('')

  const Nav = useNav('/', 'Has an account? Log in', 'Sign Up')

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
    if(username == '' || password == '' || cpassword == ''){
      setStatus('error'); setText("All Camps are required")
      return
    }
    if(password !== cpassword){
      setStatus('error'); setText("Passwords don't match")
      return
    }
    if(password.length<8||cpassword.length<8){
      setStatus('error'); setText("Password too short")
      return
    }
    try {
      const {data} = await api.put('users/start', {
        username:username,
        password:password,
        cpassword:cpassword
      })
      if(data.error){
        setStatus('error'); setText(data.msg)
        return
      }
      setStatus('success'); setText(data.msg)
      setTimeout(()=>{
        nav('/')
      }, 2000)
      return
    }catch(err:unknown){
      console.warn(`Error registering user: ${err}`)
      const axErr = err as AxiosError<{msg?:string}>
      const etext = axErr?.response?.data?.msg || 'Unexpected error'
      setStatus('error'); setText(etext)
      return
    }
    
  }
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
        {status !== 'idle' && (
          <CommonWarn alternativeStyles='bottom-10' status={`${status}`}>{text}</CommonWarn>
        )}
        {UserInput()}
        {PasswordInput()}
        {CPasswordInput()}
        <Nav />
    </form>
  )
}
export default Register