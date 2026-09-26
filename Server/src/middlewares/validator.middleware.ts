import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../utils/appError.utlis";

export const validate= (schema:ZodObject)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const result= schema.safeParse({
            body:req.body,
            query:req.query,
            params:req.params
        });

        if(result.error){
            console.log(result.error.issues);
            const errors= result.error.issues.map(({path,message})=>({
                message,
                path:path.join(".")
            }));
            next(new AppError("Validation error",400,errors));
            return;
        }
        req.body= result.data.body;
        Object.assign(req.query,result.data.query);
        Object.assign(req.params,result.data.params);
        next();

    };
};
