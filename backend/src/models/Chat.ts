import {model, Schema, Types, Document} from 'mongoose'
export interface ChatITFace extends Document {
    _id:Types.ObjectId
    one:Types.ObjectId
    two:Types.ObjectId
    archived:boolean
    new_message:boolean
    createdAt?: Date
    updatedAt?: Date
}
const $Schema = new Schema<ChatITFace>(
    {
        one:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        two:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        archived:{
            default:false,
            type:Boolean
        },
        new_message:{
            default:true,
            type:Boolean
        }
    },
    {
        timestamps:true
    }
)
const Chat = model<ChatITFace>('Chat', $Schema)
export default Chat