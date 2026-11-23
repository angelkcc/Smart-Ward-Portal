import express from "express";
import {
    createProject,
    deleteProject,
    getAllProjects,
    getAllProjectsAdmin,
    getProjectById,
    updateProject,
} from "../controllers/project.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const router = express.Router();

// GET ALL PUBLISHED PROJECTS - PUBLIC
router.get("/", getAllProjects);

// GET ALL PROJECTS - ADMIN
// Keep this before /:id so "admin/all" isn't treated as an ID.
router.get("/admin/all", authenticate([Role.ADMIN]), getAllProjectsAdmin);

// GET PROJECT BY ID - PUBLIC
router.get("/:id", getProjectById);

// CREATE PROJECT - ADMIN
router.post("/", authenticate([Role.ADMIN]), createProject);

// UPDATE PROJECT - ADMIN
router.put("/:id", authenticate([Role.ADMIN]), updateProject);

// DELETE PROJECT - ADMIN
router.delete("/:id", authenticate([Role.ADMIN]), deleteProject);

export default router;