import { NextFunction, Request, Response } from "express"
import { Role } from "../types/enum.types"
import AppError from "../utils/appError.utlis";
import { verifyJwtToken } from "../utils/jwt.utlis";

export const authenticate=(roles?:Role[])=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        try{
            //get access token
            const token= req.cookies["access_token"];
            if(!token)
            {
                throw new AppError("Access token is required", 401);
            }
            //verify token
            const decoded_data= verifyJwtToken(token);
            if(!decoded_data)
            {
                throw new AppError("Invalid access token", 401);
            }

            //role based access
            if(roles && !roles.includes(decoded_data.role)){
                throw new AppError("You are not authorized to access this resource", 403);
            }
            req.user={ 
                _id:decoded_data._id,
                role:decoded_data.role,
                email:decoded_data.email
            };
            next();
        } catch (error) {
            next(error);
            }

        }

    };
