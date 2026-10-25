
import express from "express";
import {
    assignComplaint,
    createComplaint,
    deleteComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
} from "../controllers/complaint.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const router = express.Router();

// Get complaints: citizens see their own; admins see all.
router.get("/", authenticate(), getAllComplaints);

// Get one complaint: citizens can see their own; admins can see all.
router.get("/:id", authenticate(), getComplaintById);

// Submit a complaint: authenticated users.
router.post("/", authenticate(), createComplaint);

// Update complaint status: admin only.
router.patch(
    "/:id/status",
    authenticate([Role.ADMIN]),
    updateComplaintStatus,
);

// Assign complaint to an official: admin only.
router.patch(
    "/:id/assign",
    authenticate([Role.ADMIN]),
    assignComplaint,
);

// Delete complaint: admin only.
router.delete(
    "/:id",
    authenticate([Role.ADMIN]),
    deleteComplaint,
);

export default router;
