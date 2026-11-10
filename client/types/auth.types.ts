import { loginSchema, registerSchema } from "../schema/auth.schema";
import * as yup from "yup";
import { IImage, TResponse } from "./global.types";
import { Role } from "./enum.types";

// export type LoginInput = { email: string; password: string };
export type LoginInput = yup.InferType<typeof loginSchema>;

export type RegisterInput = yup.InferType<typeof registerSchema>;

export type TUserResponse = {
  full_name: string;
  email: string;
  password?: string;
  profile_image?: IImage;
  phone?: string;
  role: Role;
} & TResponse;