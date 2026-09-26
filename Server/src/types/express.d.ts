import { IJwtPayload } from "../utils/jwt.utlis";

declare global {
    namespace Express {
        interface Request {
            user: IJwtPayload;
        }
    }
}
export{};