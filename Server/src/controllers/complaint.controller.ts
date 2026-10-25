
import mongoose from "mongoose";
import Complaint from "../models/complaint.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";
import { ComplaintStatus } from "../types/complaint.types";
import { Role } from "../types/enum.types";

// CREATE COMPLAINT
export const createComplaint = catchAsync(async (req, res) => {
    const {
        title,
        description,
        category,
        location,
        image,
    } = req.body;

    // Get the logged-in user's ID
    const { _id } = req.user;

    const complaint = new Complaint({
        title,
        description,
        category,
        location,
        image,
        created_by: _id,
    });

    await complaint.save();

    sendResponse(res, {
        message: "Complaint submitted successfully",
        data: complaint,
        statusCode: 201,
    });
});

// GET ALL COMPLAINTS
export const getAllComplaints = catchAsync(async (req, res) => {
    // Citizens can only see their own complaints.
    // Admins can see all complaints.
    const filter =
        req.user.role === Role.ADMIN
            ? {}
            : { created_by: req.user._id };

    const complaints = await Complaint.find(filter)
        .populate("created_by", "full_name email")
        .populate("assigned_to", "full_name email")
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
        .populate("assigned_to", "full_name email");

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    // Citizens may only see complaints they submitted.
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

// ASSIGN COMPLAINT TO AN OFFICIAL
export const assignComplaint = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { assigned_to } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid complaint ID", 400);
    }

    if (!assigned_to || !mongoose.isValidObjectId(assigned_to)) {
        throw new AppError("A valid assigned_to user ID is required", 400);
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
        throw new AppError("Complaint not found", 404);
    }

    complaint.assigned_to = new mongoose.Types.ObjectId(assigned_to);

    // Move it to ASSIGNED when an official is assigned.
    complaint.status = ComplaintStatus.ASSIGNED;

    await complaint.save();

    sendResponse(res, {
        message: "Complaint assigned successfully",
        data: complaint,
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
