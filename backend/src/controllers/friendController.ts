import { RequestHandler } from "express";
import FriendRequest from '../models/FriendRequest';
import FriendShip from '../models/FriendShip';
import User from "../models/User";
import { Types } from "mongoose";




const fetchFriends:RequestHandler = async(req, res)=>{
    try {
      const { _id } = req.params;
      const user = await User.findById(_id).lean();
      if (!user) return res.status(404).json({ msg: 'User not found' });
      const fships = await FriendShip.find({
        $or: [{ of: user._id }, { with: user._id }]
      }).lean();
      if(!fships || fships.length === 0) 
          return res.status(404).json({msg:'No Friends'})
      const friendsIds = fships.map(f=> 
        f.of.toString() === user._id.toString() ?
        f.with.toString()
        : f.of.toString()
      )
      const pending = await FriendRequest.find({
        $or: [{from:user._id}, {to:user._id}]
      }).lean()
      const pendingIds = pending.map(p =>
          p.from.toString() === user._id.toString() ?
          p.to.toString()
          : p.from.toString()
      )
      const notFriendsFilter = await User.find({
        _id: {
          $nin: [user._id.toString(), ...friendsIds, ...pendingIds]
        }
      }).lean()
      res.json(notFriendsFilter)
      return
    } catch(e) {
        console.warn(`Error fetching friends: ${e}`)
        return res.status(500).json({error:`Error fetching friends: ${e}`})
    }
}

const fetchRequests:RequestHandler = async(req, res)=>{
    try {
        const { _id } = req.params;
        const user = await User.findById(_id).lean();
        if (!user) 
            return res.status(404).json({ msg: 'User not found' });
        const freqs = await FriendRequest.find({ to: user._id }).populate('from to');
        if (!freqs || freqs.length === 0)
            return res.status(404).json({ msg: 'No Friend Requests' });
        res.json(freqs);
    } catch (error) {
        console.warn(`Error fetching friends requests: ${error}`)
        res.status(500).json({error:`Error fetching friends requests: ${error}`})
    }
}

const friendRequest:RequestHandler = async(req, res)=>{
    const { id_from, to_user } = req.params
    try {
        const fromUser = await User.findById(id_from);
        const toUser = await User.findById(to_user);

    if (!fromUser || !toUser){
        res.status(404).json({ msg: 'Users not found', error: true });
      return 
    }

    const newRequest = new FriendRequest({
      from: fromUser._id,
      to: toUser._id
    });
    await newRequest.save();

    res.status(201).json({ msg: 'Friend request sent', error: false });
  } catch (e) {
    console.error('Error sending friend request:', e);
    res.status(500).json({ msg: 'Unexpected Error. Please try again', error: true });
    } 
}

const requestResponse:RequestHandler = async(req, res)=>{
try {
    const { responseUserId, userSend, state } = req.body;

    const friendRequest = await FriendRequest.findOne({
      from: new Types.ObjectId(userSend as string),
      to: new Types.ObjectId(responseUserId as string)
    });

    if (!friendRequest)
      return res.status(404).json({ error: true, msg: 'Request not found' });

    friendRequest.state = state;
    await friendRequest.save();

    if (state === 'accepted') {
      await FriendShip.create({
        of: new Types.ObjectId(userSend as string),
        with: new Types.ObjectId(responseUserId as string)
      });
    }

    res.status(200).json({ error: false, msg: `Friendship request ${state}` });
  } catch (e) {
    console.error('Error processing friend request response', e);
    res.status(500).json({ error: true, msg: 'Unexpected error. Try again later' });
  }
};



const endFriendShip: RequestHandler = async (req, res) => {
  const { userEndsId, userTwo } = req.params;
  try {
    const userEnds = await User.findById(userEndsId).lean();
    const other = await User.findOne({ user: userTwo }).lean();

    if (!userEnds || !other)
      return res.status(404).json({ error: true, msg: 'Data not found' });

    await FriendShip.findOneAndDelete({
      $or: [
        { of: userEnds._id, with: other._id },
        { of: other._id, with: userEnds._id }
      ]
    });

    res.status(200).json({
      error: false,
      msg: `${userEnds.user} was removed from your friends list`
    });
  } catch (e) {
    console.error('Error removing friendship', e);
    res.status(500).json({ error: true, msg: `Couldn't remove ${userTwo} from your friends list` });
  }
};

export {
  fetchFriends,
  fetchRequests,
  friendRequest,
  requestResponse,
  endFriendShip,
}