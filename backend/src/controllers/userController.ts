import {RequestHandler, Request, Response} from 'express'
import User from '../models/User'
import { storeCode, verifyCode } from '../helpers/codeStoring'
import sendSMS from '../helpers/sms'
import { hashPassword, comparePassword } from '../helpers/passwordHasher'
import WebToken from '../helpers/generateJWT'
import { UserITFace } from '../models/User';

interface AuthRequest extends Request {
    user: UserITFace
}

const getUsers:RequestHandler = async(req, res)=>{
    try{
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({ error: "Server error" })
    }
}

const signUpUser:RequestHandler = async(req, res)=>{
    const { username, password, cpassword } = req.body
    const usernameTaken = await User.findOne({user:username})
    if(usernameTaken && usernameTaken.user == username){
        res.status(401).json({error:true, msg:`Username already taken`})
        return
    }

    if(password !== cpassword){
        res.status(401).json({error:true, msg:`Passwords doesn't match`})
        return
    }
    if(password.length < 8 || cpassword.length < 8){
        res.status(401).json({error:true, msg:"Password it's too short"})
        return
    }
    try{
        const hashedPassword = await hashPassword(password)
        const user = new User({user:username, password:hashedPassword, rol:'user'})
        await user.save()
        res.status(200).json({error:false, msg:"User successfully created"})
        return
    } catch (error){
        if (error instanceof Error) {
            console.warn(`Error al registrar usuario: ${error.message}
            raw Error: ${error}`)
        } else {
            console.warn('Error desconocido:', error)
        }
        res.status(500).json({ msg: 'Unexpected Error', error:true })
        return 
    }
}
const loginUser:RequestHandler = async(req, res)=>{
    const { username, password } = req.body
    const user = await User.findOne({user:username})
    if(!user || typeof user == 'undefined'){
        res.status(404).json({error:true, msg:"User and/or Password are incorrect"})
        return
    }
    const $PW_MATCH = await comparePassword(password, user.password)
    if(!$PW_MATCH){
        res.status(404).json({error:true, msg:"User and/or Password are incorrect"})
        return
    }

    try {
        user.online = true
        await user.save()
        console.log(`User status updated: ${user.online ? 'online' : 'disconnected'}`)
        res.status(200).json(
            {
                error:false, 
                msg:'Successfully logged', 
                token:WebToken(user._id),
                user:user
            }
        )
    } catch(e) {
        console.error('Error while login: ', e)
        res.status(400).json({msg:`Error while login. Try again`, error:true})
        return
    }
    
}
const forgotPassword:RequestHandler = async(req, res)=>{
    const { username, phone } = req.body
    try {
        const user = await User.findOne({username, phone}).lean()
        const userId = user?._id
        if(!userId){
            res.status(404).json({msg:`No hay ningún usuario con phone: ${phone}`, error:true})
            return
        }
        const userPhone = user?.phone
        if(!userPhone){
            res.status(404).json({msg:`Este usuario no cuenta con número de telefono para confirmación de identidad.`, error:true})
            return
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        if(storeCode(userPhone, code)){
            try {
                await sendSMS(`+57${userPhone}`, `Tu código de verificación es: ${code}`)
                res.status(200).json({msg:`Codigo de verificación enviado con éxito, presione siguiente.`, error:false})
            } catch(err){
                console.error(`Hubo un error al enviar el codigo de verificación ${err}`)
                res.status(400).json({msg:`No fue posible enviar el codigo de verificación. Intente de nuevo.`, error:true})
            }
        }
    }catch(error){
        console.warn(`Hubo un error la intentar recuperar contraseña: ${error}`)
        return
    }
}

const allowChangePass:RequestHandler = async(req, res)=>{
    try {
        const { code, userPhone } = req.body
        if(!userPhone){
            console.error('No hay número almacenado en el almacenamiento local')
            res.status(400).json({msg:`Hubo un error inesperado. Por favor consulte con un Administrador`, error:true})
            return
        }
        const isValid = verifyCode(userPhone, code)
        if(!isValid){
            console.error('Codigo invalido o no coincide')
            res.status(400).json({msg:`Codigo Incorrecto.`, error:true})
            return
        }
        res.status(200).json({msg:`Verificado con exito, procedamos a cambiar su contraseña.`, error:false})
    } catch(err){
        console.error(`Error al verificar ${err}`)
        res.status(400).json({msg:`Hubo un error al verificar el codigo, intente de nuevo`, error:true})
        return
    }
}
const restorePass:RequestHandler = async(req, res)=>{

}

const changePassword:RequestHandler = async(req, res)=>{
    const { _id, oldpassword, password, cpassword} = req.body
    const user = await User.findOne({_id}).lean()
    if(password !== cpassword){
        res.status(401).json({error:true, msg:`Passwords doesn't match`})
        return
    }
    if(password.length < 8 || cpassword.length < 8){
        res.status(401).json({error:true, msg:"New Password it's too short"})
        return
    }
    if(!user){
        res.status(404).json({error:true, msg:`Unexpected error`})
        return
    }
    if(!comparePassword(oldpassword, user.password)){
        res.status(402).json({error:true, msg:`Incorrect Password`})
        return
    }
    const hashedPassword = await hashPassword(password)
    try {
        user.password = hashedPassword
        user.save()
    }catch(e){
        console.warn(`Error Changing Password: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error`})
        return
    }
}
const changeUser:RequestHandler = async(req, res)=>{
    const { _id, username } = req.body
    const user = await User.findById(_id)
    if(!user){
        res.status(404).json({error:true, msg:`Unexpected error`})
        return
    }
    const usernameTaken = await User.findOne({user:username}).lean()
    if(usernameTaken){
        res.status(400).json({error:true, msg:'Username already taken'})
        return
    }
    try {
        user.user = username
        user.save()
    }catch(e){
        console.warn(`Error Changing User: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error`})
        return
    }
}
const changeDescription:RequestHandler = async(req, res)=>{
    const { _id, description } = req.body
    const user = await User.findById(_id)
    if(!user){
        res.status(404).json({error:true, msg:`Unexpected error`})
        return
    }
    try {
        user.description = description
        user.save()
    }catch(e){
        console.warn(`Error Changing Description: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error`})
        return
    }
}
const changePicture:RequestHandler = async(req, res)=>{
    return
}
const deleteUser:RequestHandler = async(req, res)=>{
    const { _id } = req.body
    const user = await User.findById(_id)
    if(!user){
        res.status(404).json({error:true, msg:`Unexpected error`})
        return
    }
    try {
        await user.deleteOne()
    }catch(e){
        console.warn(`Error Changing Password: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error`})
        return
    }
}

const logoutSession:RequestHandler = async(req, res)=>{
    const { _id } = req.params
    if(!_id){
        res.status(404).json({error:true, msg:'Error while loggouting. Please try again.'})
        return
    }
    try {
        const user = await User.findById(_id)
        if(!user){
            res.status(500).json({error:true, msg:'Error while loggouting. Please try again.'})
            return
        }
        if(user.online == false){
            res.status(500).json({error:true, msg:"You're already logged out"})
            return
        }
        user.online = false
        await user.save()
        res.status(200).json({error:false, msg:"Successfully logged out"})
        return
    } catch(err) {
        console.error('Error closing session', err)
        res.status(500).json({error:true, msg:"You're already logged out"})
        return
    }
}

const blockUser:RequestHandler = async(req, res)=>{
  const userId = (req as AuthRequest).user.id          // <- Auth user
  const blockedId = req.params.id     // <- User to block
  
  if (userId === blockedId)
    return res.status(400).json({ error: 'Can´t block yourself' })

  const user = await User.findById(userId)
  if(!user)
    return res.status(400).json({ error: 'Unexpected Error. Try Again' })
  if(user.blockedUsers.includes(blockedId))
    return res.status(400).json({ error: 'User already blocked' })

  user.blockedUsers.push(blockedId)
  await user.save()

  res.json({ success: true, blockedUsers: user.blockedUsers })
}


export { 
    signUpUser, 
    loginUser, 
    forgotPassword, 
    allowChangePass, 
    restorePass,
    changeUser, 
    changePassword, 
    changePicture,
    changeDescription,
    deleteUser,
    logoutSession,
    blockUser,
    getUsers
}