
import mongoose from "mongoose";
import Department from "../models/department.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";

// CREATE DEPARTMENT
export const createDepartment = catchAsync(async (req, res) => {
    const {
        name,
        description,
        category,
        contact_email,
        contact_phone,
    } = req.body;

    const existingDepartment = await Department.findOne({ name });

    if (existingDepartment) {
        throw new AppError("Department already exists", 409);
    }

    const department = new Department({
        name,
        description,
        category,
        contact_email,
        contact_phone,
    });

    await department.save();

    sendResponse(res, {
        message: "Department created successfully",
        data: department,
        statusCode: 201,
    });
});

// GET ALL DEPARTMENTS
export const getAllDepartments = catchAsync(async (req, res) => {
    const departments = await Department.find()
        .sort({ createdAt: -1 });

    sendResponse(res, {
        message: "Departments fetched successfully",
        data: departments,
        statusCode: 200,
    });
});

// GET DEPARTMENT BY ID
export const getDepartmentById = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid department ID", 400);
    }

    const department = await Department.findById(id);

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    sendResponse(res, {
        message: "Department fetched successfully",
        data: department,
        statusCode: 200,
    });
});

// UPDATE DEPARTMENT
export const updateDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        category,
        contact_email,
        contact_phone,
        active,
    } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid department ID", 400);
    }

    const department = await Department.findById(id);

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    if (name !== undefined) {
        const existingDepartment = await Department.findOne({
            name,
            _id: { $ne: id },
        });

        if (existingDepartment) {
            throw new AppError("Another department already uses this name", 409);
        }

        department.name = name;
    }

    if (description !== undefined) {
        department.description = description;
    }

    if (category !== undefined) {
        department.category = category;
    }

    if (contact_email !== undefined) {
        department.contact_email = contact_email;
    }

    if (contact_phone !== undefined) {
        department.contact_phone = contact_phone;
    }

    if (active !== undefined) {
        department.active = active;
    }

    await department.save();

    sendResponse(res, {
        message: "Department updated successfully",
        data: department,
        statusCode: 200,
    });
});

// DELETE DEPARTMENT
export const deleteDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid department ID", 400);
    }

    const department = await Department.findById(id);

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    await Department.findByIdAndDelete(id);

    sendResponse(res, {
        message: "Department deleted successfully",
        data: null,
        statusCode: 200,
    });
});
