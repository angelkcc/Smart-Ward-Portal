
import express from "express";
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
} from "../controllers/appointment.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const router = express.Router();

// Authenticated citizens and admins
router.get("/", authenticate(), getAllAppointments);
router.get("/:id", authenticate(), getAppointmentById);
router.post("/", authenticate(), createAppointment);

// Admin-only action
router.patch("/:id", authenticate([Role.ADMIN]), updateAppointment);

export default router;
