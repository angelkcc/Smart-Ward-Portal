import express from "express";
import { createNotice, deleteNotice, getAllNotices, getNoticeById, updateNotice } from "../controllers/notice.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";
const router= express.Router();

//get all notices- citizen + admin
router.get("/",authenticate(),getAllNotices);

//get notice by id- citizen + admin
router.get("/:id",authenticate(),getNoticeById);

//create notice- admin only
router.post("/createNotice",authenticate([Role.ADMIN]),createNotice);

//update notice- admin only
router.put("/updateNotice/:id",authenticate([Role.ADMIN]),updateNotice);

//delete notice- admin only
router.delete("/deleteNotice/:id",authenticate([Role.ADMIN]),deleteNotice);