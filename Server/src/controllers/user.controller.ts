import User from "../models/user.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";

//get all users
export const getAllUsers= catchAsync(async(req,res)=>{
    const users= await User.find({});

    sendResponse(res,{
        message:"Users fetched successfully",
        data:users,
        statusCode:200
    });
})
//Get profile
export const getProfile= catchAsync(async(req,res)=>{
    const {_id}= req.user;
    const user= await User.findById(_id);
    if(!user)
    {
        throw new AppError("User not found", 404);
    }
    sendResponse(res,{
        message:"User profile fetched successfully",
        data:user,
        statusCode:200
    });
});
//* GET USER BY ID (ADMIN)
export const getById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("user not found", 404);
  }

  sendResponse(res, {
    message: "user fetched",
    data: user,
    statusCode: 200,
  });
});

