import User from "../models/User"
import  jwt, {JwtPayload}  from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { UserITFace } from "../models/User"

interface AuthRequest extends Request {
  user?: UserITFace | null
}
interface PayloadID extends JwtPayload {
    id:string
}

const checkAuth = async (req:AuthRequest, res:Response, next:NextFunction) =>{

    const auth = req.headers.authorization
    if(!auth?.startsWith('Bearer ')){
        res.status(401).json({msg:'Token faltante o invalido'})
        return
    }
    try {
        const secret = process.env.SECRET_WORD
        if (!secret) {
        throw new Error('Falta la variable de entorno SECRET_WORD')
        }

        const token = auth.split(' ')[1]
        console.log('Token:', auth.split(' ')[1])
        const decoded = jwt.verify(token, secret) as PayloadID
        req.user = await User.findById(decoded.id)
        next()
    }catch {
        res.status(401).json({msg:'Token invalido'})
    }
}

export default checkAuth