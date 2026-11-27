
import "dotenv/config";
import app from "./app";
import http from "http";
import connectDatabase from "./config/db.config";
import ENV_CONFIG from "./config/env.config";

const PORT = ENV_CONFIG.PORT;
const DB_URI = ENV_CONFIG.DB_URI;

const startServer = async () => {
    try {
        // Connect to database first
        await connectDatabase(DB_URI);

        // Create HTTP server
        const server = http.createServer(app);

        // Start listening
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();


