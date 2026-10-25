
import express from "express";
import {
    createDepartment,
    deleteDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
} from "../controllers/department.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const router = express.Router();

// View all departments
router.get("/", authenticate(), getAllDepartments);

// View one department
router.get("/:id", authenticate(), getDepartmentById);

// Create department - admin only
router.post(
    "/",
    authenticate([Role.ADMIN]),
    createDepartment,
);

// Update department - admin only
router.patch(
    "/:id",
    authenticate([Role.ADMIN]),
    updateDepartment,
);

// Delete department - admin only
router.delete(
    "/:id",
    authenticate([Role.ADMIN]),
    deleteDepartment,
);

export default router;
