import {model, Schema, Types, Document} from 'mongoose'
export type ReqStates = 'pending' | 'accepted' | 'declined'

export interface FriendRequestITFace extends Document {
    _id:Types.ObjectId
    from:Types.ObjectId
    to:Types.ObjectId
    state:ReqStates
    createdAt?:Date
    updatedAt?:Date
}
const $Schema = new Schema<FriendRequestITFace>(
    {
        from:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        to:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        state:{
            type:String,
            required:true,
            enum:['pending', 'accepted', 'declined'] ,
            default:'pending'
        }
    },
    {
        timestamps:true
    }
)
const FriendRequest = model<FriendRequestITFace>('FriendRequest', $Schema)
export default FriendRequest