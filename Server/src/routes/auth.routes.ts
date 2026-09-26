import express from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidatorSchema, registerValidatorSchema } from "../validators/auth.validator";

//express route
const router= express.Router();

//register user
router.post("/register",validate(registerValidatorSchema),register);

//login user
router.post("/login",validate(loginValidatorSchema),login);

export default router;

