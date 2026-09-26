import "dotenv/config";

const ENV_CONFIG ={
    NODE_ENV:process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT) || 8000,
    DB_URI: process.env.DB_URI ?? "",

    //JWT
    JWT_SECRET: process.env.JWT_SECRET !!,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN ?? "7d",
}
export default ENV_CONFIG;