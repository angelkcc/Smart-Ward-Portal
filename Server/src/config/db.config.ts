import mongoose from "mongoose";

const connectDatabase =(DB_URI:string)=>{
    mongoose.connect(DB_URI)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error)=>{
        console.log("Database connection failed");
        console.log(error);
    });

};
export default connectDatabase;