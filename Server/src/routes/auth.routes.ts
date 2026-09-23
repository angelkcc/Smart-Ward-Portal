import express from "express";
import { register } from "../controllers/auth.controller";

//express route
const router= express.Router();

//register user
router.post("/register",register);

export default router;

