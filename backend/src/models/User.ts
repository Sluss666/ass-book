import {Document, Schema, model, Types} from "mongoose"
type Roles = 'admin' | 'mod' | 'user' | 'unactive'
export interface UserITFace extends Document {
    _id: Types.ObjectId
    name: string
    surnames: string
    user: string
    description:string
    rol: Roles
    phone: string
    password:string
    pic:string
    online:boolean
    blockedUsers: string[]
    createdAt?: Date
    updatedAt?: Date
}
const $Schema = new Schema<UserITFace>( 
    {   
        name: {
            type: String,
            trim: true
        },
        surnames: {
            type: String,
            trim: true
        },
        user:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type:String,
            trim:true
        },
        rol:{
            type: String,
            required: true,
            enum: ['admin', 'mod', 'user', 'unactive'],
        },
        pic:{
            type:String,
            trim:true
        },
        online:{
            type:Boolean,
            default:false
        },
        phone:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        blockedUsers: [
            { 
                type: Schema.Types.ObjectId, ref: 'User' 
            }
        ]
    },
    {
        timestamps:true
    }
)
const User = model<UserITFace>("User", $Schema)
export default User