import "dotenv/config";

const ENV_CONFIG ={
    NODE_ENV:process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT) || 8000,
    DB_URI: process.env.DB_URI ?? "",
}
export default ENV_CONFIG;