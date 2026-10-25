
import express from "express";
import {
    assignComplaint,
    assignComplaintDepartment,
    createComplaint,
    deleteComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
} from "../controllers/complaint.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const router = express.Router();

// Authenticated users
router.get("/", authenticate(), getAllComplaints);
router.get("/:id", authenticate(), getComplaintById);
router.post("/", authenticate(), createComplaint);

// Admin-only actions
router.patch(
    "/:id/department",
    authenticate([Role.ADMIN]),
    assignComplaintDepartment,
);

router.patch(
    "/:id/status",
    authenticate([Role.ADMIN]),
    updateComplaintStatus,
);

router.patch(
    "/:id/assign",
    authenticate([Role.ADMIN]),
    assignComplaint,
);

router.delete("/:id", authenticate([Role.ADMIN]), deleteComplaint);

export default router;
