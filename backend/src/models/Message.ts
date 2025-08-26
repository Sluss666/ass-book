import { model, Schema, Types, Document } from 'mongoose'
export interface MessageITFace extends Document {
    _id:Types.ObjectId
    chat:Types.ObjectId
    mirror_chat:Types.ObjectId
    from:Types.ObjectId
    to:Types.ObjectId
    message:string
    gotImage:boolean
    image:string
    seen:boolean
    createdAt?: Date
    updatedAt?: Date
}
const $Schema = new Schema<MessageITFace>(
    {   
        chat:{
            type:Schema.Types.ObjectId,
            ref:'Chat',
            required:true
        },
        mirror_chat:{
            type:Schema.Types.ObjectId,
            ref:'MirrorChat',
            required:true
        },
        from:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        to:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        message:{
            type:String
        },
        gotImage:{
            required:true,
            type:Boolean
        },
        image:{
            type:String
        },
        seen:{
            default:false,
            type:Boolean
        }
    },{
        timestamps:true
    }
)
const Message = model<MessageITFace>('Message', $Schema)
export default Message