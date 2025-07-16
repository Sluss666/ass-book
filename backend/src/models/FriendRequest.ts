import {model, Schema, Types, Document} from 'mongoose'
export interface FriendRequestITFace extends Document {
    _id:Types.ObjectId
    from:Types.ObjectId
    to:Types.ObjectId
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
        }
    },
    {
        timestamps:true
    }
)
const FriendRequest = model<FriendRequestITFace>('FriendRequest', $Schema)
export default FriendRequest