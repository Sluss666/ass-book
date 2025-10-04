import { RequestHandler } from "express"
import Chat from "../models/Chat"
import User from "../models/User"

const startChat:RequestHandler = async(req, res)=>{
    const { _id, user_with_id } = req.body
    const startedWithUser = await User.findById(user_with_id)
    if(!startedWithUser){
        res.status(404).json({error:true, msg:`Unexcepted Error has ocurred`})
        return
    }
    const alreadyCreated = await Chat.find({
        $or: [
            {one:_id, two:startedWithUser._id},
            {one:startedWithUser._id, two:_id}
        ]
    }).lean()
    if(alreadyCreated.length > 0){
        console.warn(`Lean Error Starting Chat: Already created ${alreadyCreated}`)
        res.status(400).json({error:true, msg:`This chat already exists.`})
        return
    }
    try {
        const chat = new Chat({one:_id, two:startedWithUser._id})
        await chat.save()
        const mirrorChat = new Chat({one:startedWithUser._id, two:_id})
        mirrorChat.save()
        res.status(200).json({error:false, chat_id:chat._id, mirror_id:mirrorChat._id})
    }catch(e){
        console.warn(`Catch Error Starting Chat: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error has ocurred`})
        return
    }
}
const existsChat:RequestHandler = async(req, res)=>{
    const { _id, two_id } = req.params

    const secondUser = await User.findOne({user:two_id})// User who 'user' has a chat with
    if(!secondUser){
        res.status(404).json({error:true, msg:`Unexpected Error ocurred`})
        return
    }

    const chat = await Chat.findOne({one:_id,two:secondUser._id})
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