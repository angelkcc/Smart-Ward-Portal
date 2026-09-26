import express from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import {  registerValidatorSchema } from "../validators/auth.validator";

//express route
const router= express.Router();

//register user
router.post("/register",validate(registerValidatorSchema),register);

//login user
router.post("/login",login);

//logout user
router.post("/logout",logout);

export default router;

