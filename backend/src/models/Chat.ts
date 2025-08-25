import {model, Schema, Types, Document, Model} from 'mongoose'
import { type MessageITFace } from './Message'
export interface ChatITFace extends Document {
    _id:Types.ObjectId
    one:Types.ObjectId
    two:Types.ObjectId
    archived:boolean
    new_message:boolean
    createdAt?: Date
    updatedAt?: Date
    messages:MessageITFace[][]
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
        },
        
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    {
        timestamps:true
    }
)
const Chat:Model<ChatITFace> = model<ChatITFace>('Chat', $Schema)
export default Chat