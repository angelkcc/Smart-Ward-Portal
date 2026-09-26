import express from "express";
import { createNotice, deleteNotice, getAllNotices, getNoticeById, updateNotice } from "../controllers/notice.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";
import { validate } from "../middlewares/validator.middleware";
import { createNoticeValidatorSchema, deleteNoticeValidatorSchema, getNoticeByIdValidatorSchema, updateNoticeValidatorSchema } from "../validators/notice.validator";
const router= express.Router();

//get all notices- citizen + admin
router.get("/",authenticate(),getAllNotices);

//get notice by id- citizen + admin
router.get("/:id",authenticate(),validate(getNoticeByIdValidatorSchema),getNoticeById);

//create notice- admin only
router.post("/createNotice",authenticate([Role.ADMIN]),validate(createNoticeValidatorSchema),createNotice);

//update notice- admin only
router.put("/updateNotice/:id",authenticate([Role.ADMIN]),validate(updateNoticeValidatorSchema),updateNotice);

//delete notice- admin only
router.delete("/deleteNotice/:id",authenticate([Role.ADMIN]),validate(deleteNoticeValidatorSchema),deleteNotice);

export default router;