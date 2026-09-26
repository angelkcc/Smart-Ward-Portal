import ENV_CONFIG from "../config/env.config";
import User from "../models/user.model";
import AppError from "../utils/appError.utlis";
import { comparePassword, hashPassword } from "../utils/bcrypt.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import { generateJwtToken } from "../utils/jwt.utlis";
import sendResponse from "../utils/SendResponse.utlis";

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
export const login= catchAsync(async(req,res)=>{
    const {email,password}= req.body;
    if(!email)
    {
        throw new AppError("Email is required", 400);
    }
    if(!password)
    {
        throw new AppError("Password is required", 400);
    }
    //find user by email
    const user= await User.findOne({email}).select("+password");

    if(!user)
    {
        throw new AppError("Invalid email or password", 401);
    }
    //compare password
    const isPasswordMatched= await comparePassword(password,user.password);
    
    if(!isPasswordMatched)
    {
        throw new AppError("Invalid email or password", 401);
    }

    //access token generation
    const access_token= generateJwtToken({
        _id:user._id,
        role:user.role,
        email:user.email,
    })

    //set cookie header
    res.cookie("accessToken", access_token,{
        secure:ENV_CONFIG.NODE_ENV==="development"?false:true,
        httpOnly:ENV_CONFIG.NODE_ENV==="development"?false:true,
        maxAge:ENV_CONFIG.COOKIE_EXPIRES_IN*24*60*60*1000,
        sameSite:ENV_CONFIG.NODE_ENV==="development"?"lax":"none",
    })

    const { password: _, ...rest } = user.toObject();

    //send response
   sendResponse(res,{
    message:"User logged in successfully",
    data:{
        user:rest,
        access_token
    },
    statusCode:201
   });

});


