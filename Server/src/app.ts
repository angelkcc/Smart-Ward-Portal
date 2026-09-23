import express, { Request, Response } from "express";

//importing routes



//express app
const app = express();

//using middlewares



//health check route
app.get("/",(_:Request, res:Response)=>{
    res.status(200).json({
        message:"server is up and running !!!!",
        status:"success",
        success:true,
        data:null,
    });
});

//using routes


//path not found



//error handler middleware

export default app;