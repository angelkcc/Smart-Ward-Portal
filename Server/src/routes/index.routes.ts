import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import noticeRoutes from "./notice.routes";

const router= express.Router();

//using routes
router.use('/auth',authRoutes);
router.use('/users',userRoutes);
router.use('/notices',noticeRoutes);


export default router;