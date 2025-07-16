import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function PublicRoutes({ children }: Props) {
  const [isLogged, setIsLogged] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const rol = localStorage.getItem('rol')
console.log({ token, rol })
    if (token && token !== '') {
      setIsLogged(true)
      if (rol === 'user') nav('/index')
      else if (rol === 'admin') nav('/special-index')
    } else {
      setIsLogged(false)
    }
  }, [nav, setIsLogged])

  if (!isLogged) {
    return <>{children}</>
  }

  return null // <- If already was redirected, do not render anything
}
