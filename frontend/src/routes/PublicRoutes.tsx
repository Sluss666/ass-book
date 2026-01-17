import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function PublicRoutes({ children }: Props) {
  const [isLogged, setIsLogged] = useState<boolean | null>(null)
  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const rol = localStorage.getItem('rol')
    const userData = localStorage.getItem('userData')

    if (token && userData?.length) {
      setIsLogged(true)
      if (rol === 'admin') nav('/special-index')
      else nav('/index')
    } else {
      localStorage.clear()
      setIsLogged(false)
    }
  }, [nav])

  // Mientras determina el estado de login, no renderiza nada
  if (isLogged === null) return null

  // Si NO está logueado, muestra la ruta pública
  if (!isLogged) return <>{children}</>

  // Si está logueado, no muestra nada (ya redirigió)
  return null
}
