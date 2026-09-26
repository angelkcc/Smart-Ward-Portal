import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Role } from '../types/enum.types';
import ENV_CONFIG from '../config/env.config';

export interface IJwtPayload {
    _id: mongoose.Types.ObjectId;
    role:Role;
    email:string;
}
interface IJwtReturn extends IJwtPayload{
    iat:number;
    exp:number;
}
//generate jwt token
export const generateJwtToken=(payload:IJwtPayload)=>{
    try{
        return jwt.sign(payload, ENV_CONFIG.JWT_SECRET,{
            expiresIn: ENV_CONFIG.JWT_EXPIRES_IN as any,
        });
    } catch (error) {
        throw new Error('Error generating JWT token');
    }
};
//verify jwt token
export const verifyJwtToken= (token:string):IJwtReturn=>{
    try{
        return jwt.verify(token, ENV_CONFIG.JWT_SECRET) as IJwtReturn;
    } catch (error) {
        throw new Error('Error verifying JWT token');
    }
};