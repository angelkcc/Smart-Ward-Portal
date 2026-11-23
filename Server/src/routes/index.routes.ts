import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import noticeRoutes from "./notice.routes";
import complaintRoutes from "./complaint.routes";
import departmentRoutes from "./department.routes";
import projectRoutes from "./project.routes";

const router= express.Router();

//using routes
router.use('/auth',authRoutes);
router.use('/users',userRoutes);
router.use('/notices',noticeRoutes);
router.use('/complaints',complaintRoutes);
router.use("/departments",departmentRoutes);
router.use("/projects",projectRoutes);


export default router;