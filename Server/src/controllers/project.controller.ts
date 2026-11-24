import Project from "../models/project.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";
import { ProjectStatus } from "../types/project.types";
import {
    uploadFileToCloudinary,
    deleteFileFromCloudinary,
} from "../utils/cloudinary.utlis";


// CREATE PROJECT - ADMIN
export const createProject = catchAsync(async (req, res) => {
    const {
        title,
        description,
        category,
        location,
        budget,
        status,
        progress,
        start_date,
        expected_completion_date,
        published,
    } = req.body;

    const { _id } = req.user;

    if (!title || !description || !category || !location) {
        throw new AppError(
            "Title, description, category and location are required",
            400
        );
    }

    if (budget !== undefined && Number(budget) < 0) {
        throw new AppError("Budget cannot be negative", 400);
    }

    if (
        progress !== undefined &&
        (Number(progress) < 0 || Number(progress) > 100)
    ) {
        throw new AppError("Progress must be between 0 and 100", 400);
    }
     let image_url: string | undefined;
     let image_public_id: string | undefined;

    // Upload project image if provided
    if (req.file) {
        const uploadedImage = await uploadFileToCloudinary(
            req.file,
            "/projects"
        );

        image_url = uploadedImage.path;
        image_public_id = uploadedImage.public_id;
    }

    const project = new Project({
        title,
        description,
        category,
        location,
        budget,
        status,
        progress,
        start_date,
        expected_completion_date,
        image_url,
        image_public_id,
        published,
        created_by: _id,
    });

    await project.save();

    sendResponse(res, {
        message: "Project created successfully",
        data: project,
        statusCode: 201,
    });
});


// GET ALL PUBLISHED PROJECTS - PUBLIC
export const getAllProjects = catchAsync(async (req, res) => {
    const projects = await Project.find({
        published: true,
    })
        .populate("created_by", "full_name email")
        .sort({ createdAt: -1 });

    sendResponse(res, {
        message: "Projects fetched successfully",
        data: projects,
        statusCode: 200,
    });
});

// GET ALL PROJECTS - ADMIN
export const getAllProjectsAdmin = catchAsync(async (req, res) => {
    const projects = await Project.find()
        .populate("created_by", "full_name email")
        .sort({ createdAt: -1 });

    sendResponse(res, {
        message: "All projects fetched successfully",
        data: projects,
        statusCode: 200,
    });
});

// GET PROJECT BY ID - PUBLIC
export const getProjectById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findOne({
        _id: id,
        published: true,
    }).populate("created_by", "full_name email");

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    sendResponse(res, {
        message: "Project fetched successfully",
        data: project,
        statusCode: 200,
    });
});


// UPDATE PROJECT - ADMIN
export const updateProject = catchAsync(async (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        category,
        location,
        budget,
        status,
        progress,
        start_date,
        expected_completion_date,
        published,
    } = req.body;

    const project = await Project.findById(id);

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    if (budget !== undefined && Number(budget) < 0) {
        throw new AppError("Budget cannot be negative", 400);
    }

    if (
        progress !== undefined &&
        (Number(progress) < 0 || Number(progress) > 100)
    ) {
        throw new AppError("Progress must be between 0 and 100", 400);
    }

    if (
        status !== undefined &&
        !Object.values(ProjectStatus).includes(status)
    ) {
        throw new AppError("Invalid project status", 400);
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (category !== undefined) project.category = category;
    if (location !== undefined) project.location = location;
    if (budget !== undefined) project.budget = budget;
    if (status !== undefined) project.status = status;
    if (progress !== undefined) project.progress = progress;
    if (start_date !== undefined) project.start_date = start_date;
    if (expected_completion_date !== undefined) {
        project.expected_completion_date = expected_completion_date;
    }
    if (published !== undefined) project.published = published;

    // Replace project image if a new one is uploaded
    if (req.file) {
        const uploadedImage = await uploadFileToCloudinary(
            req.file,
            "/projects"
        );

        // Delete previous image only after new upload succeeds
        if (project.image_public_id) {
            await deleteFileFromCloudinary(project.image_public_id);
        }

        project.image_url = uploadedImage.path;
        project.image_public_id = uploadedImage.public_id;
    }

    await project.save();

    sendResponse(res, {
        message: "Project updated successfully",
        data: project,
        statusCode: 200,
    });
});



// DELETE PROJECT - ADMIN
export const deleteProject = catchAsync(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    // Delete project image from Cloudinary
    if (project.image_public_id) {
        await deleteFileFromCloudinary(project.image_public_id);
    }

    await Project.findByIdAndDelete(id);

    sendResponse(res, {
        message: "Project deleted successfully",
        data: null,
        statusCode: 200,
    });
});
