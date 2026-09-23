import express from "express";
import { login, register } from "../controllers/auth.controller";

//express route
const router= express.Router();

//register user
router.post("/register",register);

//login user
router.post("/login",login);

export default router;

