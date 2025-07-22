import { RequestHandler } from "express";
import FriendRequest from '../models/FriendRequest';
import FriendShip from '../models/FriendShip';
import User from "../models/User";

const friendRequest:RequestHandler = async(req, res)=>{
    const { id_from, to_user } = req.params
    try {
        const fromUser = await User.findById(id_from).lean()
        const toUser = await User.findOne({user:to_user})
        const requestData = {
            from:fromUser,
            to:toUser
        }
        const friendRequest = new FriendRequest(requestData)
        await friendRequest.save()
    } catch(e) {
        console.error('Error sending friend request:', e)
        res.status(500).json({msg:'Unexcepted Error. Please try again', error:true})
        return
    }
}

const requestResponse:RequestHandler = async(req, res)=>{
    try {
        const { responseUserId, userSend, state } = req.body
        const friendRequest = await FriendRequest.findOne({from:userSend, to:responseUserId})
        if(!friendRequest){
            console.error('Request not found')
            res.status(404).json({error:true, msg:'Error. Try Again'})
            return
        }
        friendRequest.state = state
        await friendRequest.save()
        if(friendRequest.state == 'accepted'){
            const ofUser = await User.findOne({user:userSend}).lean()
            const withUser = await User.findById(responseUserId)
            const friendShip = new FriendShip({of:ofUser, with:withUser})
            await friendShip.save()
        }
        res.status(200).json({error:false, msg:`Friendship request ${state}`})
    } catch(e) {
        console.error('Error processing friend request response', e)
        res.status(500).json({error:true, msg:'Unexcepted error. Try again later'})
        return
    }

}

const endFriendShip:RequestHandler = async(req, res)=>{
    const { userEndsId, userTwo } = req.body
    const userEnds = await User.findById(userEndsId).lean()
    const other = await User.findOne({user:userTwo}).lean()
    if(!userEnds || !other){
        res.status(404).json({error:true, msg:'Data not found'})
        return
    }
    try{
        await FriendShip.findOneAndDelete({userEnds,other})
        res.status(200).json({error:false, msg:`${userEnds.user} was removed from your friends list`})
    }catch(e){
        console.error('Error removing friendship', e)
        res.status(500).json({error:true, msg:`Couldn't remove ${userTwo} from your friends list`})
        return
    }
    
}

export {
    friendRequest,
    requestResponse,
    endFriendShip
}