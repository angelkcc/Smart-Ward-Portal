import mongoose ,{Document} from "mongoose";
import { Role } from "../types/enum.types";

interface IUser extends Document {
    full_name:string;
    email:string;
    password:string;
    role:Role;
    phone_number?:string;
}

//user schema
const userSchema= new mongoose.Schema<IUser>({
    full_name:{
        type:String,
        required:[true,"Full name is required"],
        minlength:[3,"Full name must be at least 3 characters long"],
        trim: true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"],
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false,
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER,
    },
    phone_number:{
        type:String,
        length:[10,"Phone number must be 10 digits long"],
        default:null,
    },

},{timestamps:true});

//model
const User= mongoose.model<IUser>("User",userSchema);
export default User;