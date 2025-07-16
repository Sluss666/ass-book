import { RequestHandler } from "express"
import Chat from "../models/Chat"
import User from "../models/User"

const startChat:RequestHandler = async(req, res)=>{
    const { _id, user } = req.body
    const startedWithUser = await User.findOne({user}).lean()
    if(!startedWithUser){
        res.status(404).json({error:true, msg:`Unexcepted Error has ocurred`})
        return
    }
    try {
        const chat = new Chat({one:_id, two:startedWithUser._id})
        await chat.save()
        const mirrorChat = new Chat({one:startedWithUser._id, two:_id})
        mirrorChat.save()
        res.status(200).json({error:false, chat_id:chat._id, mirror_id:mirrorChat._id})
    }catch(e){
        console.warn(`Error Starting Chat: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error has ocurred`})
        return
    }
}
const existsChat:RequestHandler = async(req, res)=>{
    const { _id, two } = req.params

    const secondUser = await User.findOne({user:two})// User who 'user' has a chat with
    if(!secondUser){
        res.status(404).json({error:true, msg:`Unexpected Error ocurred`})
        return
    }

    const chat = await Chat.findOne({one:_id,two:secondUser._id}).lean()
    const mirrorChat = await Chat.findOne({one:secondUser._id})
    if(!chat || !mirrorChat){
        res.status(404).json({found:false})
        return
    }
    res.status(200).json({found:true, chat_id:chat._id, mirror_id:mirrorChat._id})
    return
}
const deleteChat:RequestHandler = async(req, res)=>{
    const { oneuser, twouser } = req.body
    const chat = await Chat.findOne({one:oneuser,two:twouser})
    if(!chat){
        res.status(404).json({error:true, msg:`Chat doesn't exists`})
        return
    }
    try{
        chat.deleteOne()
        res.status(200).json({error:false, msg:`Chat Deleted`})
    }catch(e){
        console.warn(`Error Deleting Chat: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error has ocurred`})
        return
    }
}

export {
    startChat,
    existsChat,
    deleteChat
}