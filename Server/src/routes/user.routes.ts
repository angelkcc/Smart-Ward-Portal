import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getAllUsers, getById, getProfile } from "../controllers/user.controller";
import { Role } from "../types/enum.types";

const router= express.Router();

//get all users- admin only
router.get("/", authenticate([Role.ADMIN]),getAllUsers);

//get user profile- user only
router.get("/profile", authenticate(),getProfile);

//get user by id- admin only
router.get("/:id", authenticate([Role.ADMIN]),getById);