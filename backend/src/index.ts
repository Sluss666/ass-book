import express from "express"
import cors from 'cors'
import database from './config/db'
import dotenv from 'dotenv'
import { register } from 'module'
import { pathToFileURL } from "url"
import userRoutes from './routes/userRoutes'
import messageRoutes from './routes/messageRoutes'
import chatRoutes from './routes/chatRoutes'
import friendsRoutes from './routes/friendsRoutes'
register("ts-node/esm", pathToFileURL('./'))

const app = express()
app.use(express.json())

dotenv.config()
database()
const whitelist = ["http://localhost:5173"]
const $CorsConfig = {
    origin: function (origin: any, callback:(e: Error | null, allow?:boolean)=>void){
        if(!origin || whitelist.includes(origin))
            callback(null, true)
        else 
            callback(new Error(`SOLICITUD RECHAZADA POR CORS. Origen de la solicitud: ${origin}`))
    }
}
app.use(cors($CorsConfig))

// START ROUTES
    app.use('/api/users', userRoutes)
    app.use('/api/chat', chatRoutes)
    app.use('/api/messages', messageRoutes)
    app.use('/api/friends', friendsRoutes)
// END ROUTES

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>
    console.log(`API Corriendo en puerto ${PORT}`)
)