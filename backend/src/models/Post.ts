import { Schema, model, Document, Types } from 'mongoose'
type PrivacyLevel = 'public' | 'friends' | 'private'
export interface PostITFace extends Document{
    _id:Types.ObjectId
    postUser:Types.ObjectId
    text:string
    gotImage:boolean
    image:string
    likes:number
    comments:number
    shares:number
    privation: PrivacyLevel
    createdAt?: Date
    updatedAt?: Date
}
const $Schema = new Schema<PostITFace>(
    {
        postUser:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        text:{
            required:false,
            type:String
        },    
        gotImage:{
            required:true,
            type:Boolean
        },
        image:{
            type:String
        },
        likes:{
            default:0,
            type:Number
        },
        comments:{
            default:0,
            type:Number
        },
        shares:{
            default:0,
            type:Number
        },
        privation: {
            trim:true,
            required:true,
            enum:['public', 'friends', 'private']
        }

    },
    {
        timestamps:true
    }
)
const Post = model<PostITFace>('Post', $Schema)
export default Post