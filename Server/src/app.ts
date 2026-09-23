import express, { NextFunction, Request, Response } from "express";

//importing routes
import routes from "./routes/index.routes";
import errorHandler from "./middlewares/errorHandler.middleware";
import AppError from "./utils/appError.utlis";



//express app
const app = express();
app.use(express.json({limit:"10mb"}));

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
app.use("/api/v1/",routes);


//path not found
app.use((req:Request, _:Response, next:NextFunction) => {
   const message= `can not ${req.method} on ${req.path}`;
   const error: any = new Error(message);
   error.statusCode= 404;
    error.status= "fail";
    error.success= false;
    next(new AppError(message,404));
});

//error handler middleware
app.use(errorHandler);

export default app;