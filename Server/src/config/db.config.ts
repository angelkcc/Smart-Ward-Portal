
import mongoose from "mongoose";

const connectDatabase = async (DB_URI: string): Promise<void> => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};

export default connectDatabase;
