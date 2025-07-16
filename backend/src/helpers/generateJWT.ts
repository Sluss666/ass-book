import jwt from 'jsonwebtoken'
import {Types} from 'mongoose'
const WebToken = (id : Types.ObjectId) => {
    const secret = process.env.SECRET_WORD
    if(!secret) throw new Error(`No se ha encontrado la variable de entorno SECRET_WORD`)
    return jwt.sign({id}, secret, {expiresIn:"30d"})
}

export default WebToken