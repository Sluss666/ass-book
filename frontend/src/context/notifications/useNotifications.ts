import { useContext } from "react"
import { NotificationsContext, type notificationsContext } from "./NotificacionsContext"

export const useNotifications = ():notificationsContext=>{
  const context = useContext(NotificationsContext)
  if(!context) throw new Error("useNotifications must be used within a NotificationsProvider")
    return context
}