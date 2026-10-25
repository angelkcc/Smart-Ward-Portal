
import mongoose from "mongoose";
import Complaint from "../models/complaint.model";
import Department from "../models/department.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";
import { Role } from "../types/enum.types";
import {
    ComplaintStatus,
} from "../types/complaint.types";

// CREATE COMPLAINT
export const createComplaint = catchAsync(async (req, res) => {
    const {
        title,
        description,
        category,
        location,
        image,
    } = req.body;

    const complaint = await Complaint.create({
        title,
        description,
        category,
        location,
        image,
        created_by: req.user._id,
    });

    sendResponse(res, {
        message: "Complaint created successfully",
        data: complaint,
        statusCode: 201,
    });
});

// GET ALL COMPLAINTS
export const getAllComplaints = catchAsync(async (req, res) => {
    const filter =
        req.user.role === Role.ADMIN
            ? {}
            : { created_by: req.user._id };

    const complaints = await Complaint.find(filter)
        .populate("created_by", "full_name email")
        .populate("assigned_to", "full_name email")
        .populate("department")
        .sort({ createdAt: -1 });

    sendResponse(res, {
        message: "Complaints fetched successfully",
        data: complaints,
        statusCode: 200,
    });
});

// GET COMPLAINT BY ID
export const getComplaintById = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid complaint ID", 400);
    }

    const complaint = await Complaint.findById(id)
        .populate("created_by", "full_name email")
        .populate("assigned_to", "full_name email")
        .populate("department");

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    if (
        req.user.role !== Role.ADMIN &&
        complaint.created_by._id.toString() !== req.user._id.toString()
    ) {
        throw new AppError("You are not allowed to view this complaint", 403);
    }

    sendResponse(res, {
        message: "Complaint fetched successfully",
        data: complaint,
        statusCode: 200,
    });
});

// ASSIGN COMPLAINT TO A DEPARTMENT
export const assignComplaintDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { department_id } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid complaint ID", 400);
    }

    if (!mongoose.isValidObjectId(department_id)) {
        throw new AppError("Valid department_id is required", 400);
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    const department = await Department.findById(department_id);

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    if (!department.active) {
        throw new AppError("Cannot assign a complaint to an inactive department", 400);
    }

    complaint.department = department._id as mongoose.Types.ObjectId;

    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
        .populate("created_by", "full_name email")
        .populate("assigned_to", "full_name email")
        .populate("department");

    sendResponse(res, {
        message: "Complaint assigned to department successfully",
        data: updatedComplaint,
        statusCode: 200,
    });
});

// UPDATE COMPLAINT STATUS
export const updateComplaintStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid complaint ID", 400);
    }

    if (!Object.values(ComplaintStatus).includes(status)) {
        throw new AppError("Invalid complaint status", 400);
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    complaint.status = status;
    await complaint.save();

    sendResponse(res, {
        message: "Complaint status updated successfully",
        data: complaint,
        statusCode: 200,
    });
});

// ASSIGN COMPLAINT TO A USER
export const assignComplaint = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { assigned_to } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid complaint ID", 400);
    }

    if (!mongoose.isValidObjectId(assigned_to)) {
        throw new AppError("Valid assigned_to user ID is required", 400);
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    complaint.assigned_to = new mongoose.Types.ObjectId(assigned_to);
    complaint.status = ComplaintStatus.ASSIGNED;

    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
        .populate("created_by", "full_name email")
        .populate("assigned_to", "full_name email")
        .populate("department");

    sendResponse(res, {
        message: "Complaint assigned to user successfully",
        data: updatedComplaint,
        statusCode: 200,
    });
});

// DELETE COMPLAINT
export const deleteComplaint = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid complaint ID", 400);
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    await Complaint.findByIdAndDelete(id);

    sendResponse(res, {
        message: "Complaint deleted successfully",
        data: null,
        statusCode: 200,
    });
});
