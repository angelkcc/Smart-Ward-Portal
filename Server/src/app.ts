import express, { Request, Response } from "express";

//importing routes
import routes from "./routes/index.routes";



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



//error handler middleware

export default app;