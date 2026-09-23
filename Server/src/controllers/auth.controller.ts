import User from "../models/user.model";
import AppError from "../utils/appError.utlis";
import { hashPassword } from "../utils/bcrypt.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";

//register
export const register= catchAsync(async(req,res)=>{
    const {full_name,email,password,phone_number}=req.body;

    if(!full_name)
    {
        throw new AppError("Full name is required", 400);
    }
    if(!email)
    {
        throw new AppError("Email is required", 400);
    }
    if(!password)
    {
        throw new AppError("Password is required", 400);
    }
    if(password.length<6)
    {
        throw new AppError("Password must be at least 6 characters long", 400);
    }
    if(!phone_number)
    {
        throw new AppError("Phone number is required", 400);
    }
    const user = new User({
        full_name,
        email,
        password,
        phone_number,
    });

    //password hashing
    const hash= await hashPassword(password);
    user.password=hash;

    //save user to database
    await user.save();

     const { password: _, ...rest } = user.toObject();

    //send response
    res.status(201).json({
        statusCode:201,
        message:"User registered successfully",
        data:rest
    });
});



//login


