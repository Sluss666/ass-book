import { RequestHandler } from "express"
import Message from '../models/Message'
import User from '../models/User'
import Chat from '../models/Chat'
const newMessage:RequestHandler = async(req, res)=>{
    try{
        const { _id, to, message } = req.body
        const file = req.file

        const userFrom = await User.findById(_id)
        const userTo = await User.findOne({user:to})

        const chat = await Chat.findOne({one:userFrom?._id, two:userTo?._id}).lean()
        const mirrorChat = await Chat.findOne({one:userTo?._id, two:userFrom?._id}).lean()
        if(!chat || !mirrorChat){
            res.status(404).json({error:true,msg:`Chat Doesn't exist`})
            return
        }

        const newMessage = new Message({
            chat:chat._id,
            from: userFrom?._id,
            to: userTo?._id,
            message: message,
            gotImage: file ? true : false,
            image: file ? file.path : null,
            seen:false
        })
        const mirrorMessage = new Message({
            chat:mirrorChat._id,
            from: userFrom?._id,
            to: userTo?._id,
            message: message,
            gotImage: file ? true : false,
            image: file ? file.path : null,
            seen:false
        })
        await newMessage.save()
        await mirrorMessage.save()
        res.status(200).json(
            {
                error:false,
                message_id:newMessage._id,
                mirror_id:mirrorMessage._id
            }
        )
        return
    } catch(e){
        console.warn(`Error Sending Message: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error ocurred`})
        return
    }
}
const getMessages:RequestHandler = async(req, res)=>{
    const { _id, two, chat_id } = req.params

    const secondUser = await User.findOne({user:two})// User who 'user' has a chat with
    if(!secondUser){
        res.status(404).json({error:true, msg:`Unexcepted Error ocurred`})
        return
    }

    const ownChat = await Chat.findOne({_id:chat_id, one:_id}).lean()// Logged user's chat view
    if(!ownChat){
        res.status(404).json({error:true, msg:`Chat doesn't exist`})
        return
    }

    const messages = await Message.find({chat:ownChat._id}).lean()
    if(!messages){
        res.status(404).json({error:true, msg:`Unexcepted Error ocurred getting messages`})
        return
    }
    res.status(200).json({error:false, messages:messages})
    return
}

const emptyChat:RequestHandler = async(req, res)=>{
    const { chat_id } = req.body
    const messages = await Message.find({chat:chat_id}).lean()
    if(!messages){
        res.status(404).json({error:true, msg:`Chat already empty`})
        return
    }
    try {
        messages.forEach(async (message)=>{await message.deleteOne()})
        res.status(200).json({error:false, msg:`It's empty now`})       
        return
    } catch (e) {
        console.warn(`Error Deleting Chat Messages: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error ocurred`})
        return
    }
}

const deleteMessage:RequestHandler = async(req, res)=>{
    const { _id, chat_id, message_id } = req.body
    const ownChat = await Chat.findOne({chat:chat_id,one:_id}).lean()
    if(!ownChat){
        res.status(404).json({error:true, msg:`Unexpected error ocurred`})
        return
    }
    try{
        const message = await Message.findById(message_id).lean()
        await message?.deleteOne()
        res.status(200).json({error:false, msg:`Message deleted`})
    } catch(e){
        console.warn(`Error Deleting Message: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error ocurred`})
        return
    }

}
const editMessage:RequestHandler = async(req, res)=>{
    // second_id it's the each other id to update in both parts
    const { chat_id, mirrorchat_id, message_id, mirrormessage_id, newMessage } = req.body
    const ownChat = await Chat.findOne({_id:chat_id}).lean()
    const mirrorChat = await Chat.findOne({_id:mirrorchat_id}) // Other persons' chat
    if(!ownChat || !mirrorChat){
        res.status(404).json({error:true, msg:`Unexpected error ocurred`})
        return
    }
    const message = await Message.findById(message_id).lean()
    const mirrorMessage = await Message.findById(mirrormessage_id).lean()
    if(!message || !mirrorMessage){
        res.status(401).json({error:true, msg:`Unavailable to edit`})
        return
    }
    try {
        message.message = newMessage
        mirrorMessage.message = newMessage
        await message.save()
        await mirrorMessage.save()
        res.status(200).json({error:false, msg:`Message edited`})
        return
    } catch(e){
        console.warn(`Error Deleting Message: ${e}`)
        res.status(500).json({error:true, msg:`Unexpected Error ocurred`})
        return
    }

}

export {
    newMessage,
    getMessages,
    emptyChat,
    deleteMessage,
    editMessage
}