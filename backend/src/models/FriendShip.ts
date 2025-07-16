import {model, Types, Schema, Document } from 'mongoose'
export interface FriendShipITFace extends Document {
    _id:Types.ObjectId
    of:Types.ObjectId
    with:Types.ObjectId
    createdAt?:Date
    updatedAt?:Date
}
const $Schema = new Schema<FriendShipITFace>(
    {
        of:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        with:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps:true
    }
)
const FriendShip = model<FriendShipITFace>('FriendShip', $Schema)
export default FriendShip