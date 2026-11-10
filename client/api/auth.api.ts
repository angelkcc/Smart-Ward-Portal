import { LoginInput, RegisterInput } from "../types/auth.types";
import axios, { AxiosError } from "axios";
import api from "./index";

//* mutation function
export const login = async (data: LoginInput) => {
  try {
    // send post req
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }
  }
};

// register
export const createAccount = async (data: RegisterInput) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }
  }
};


