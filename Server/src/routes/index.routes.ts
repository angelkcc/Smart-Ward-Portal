import express from "express";
import authRoutes from "./auth.routes";

const router= express.Router();

//using routes
router.use('/auth',authRoutes);

export default router;