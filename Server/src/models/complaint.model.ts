
import mongoose, { Document } from "mongoose";
import {
    ComplaintCategory,
    ComplaintStatus,
} from "../types/complaint.types";

interface IComplaint extends Document {
    title: string;
    description: string;
    category: ComplaintCategory;
    location: string;
    image?: string | null;
    status: ComplaintStatus;
    created_by: mongoose.Types.ObjectId;
    assigned_to?: mongoose.Types.ObjectId | null;
    department?: mongoose.Types.ObjectId | null;
}

const complaintSchema = new mongoose.Schema<IComplaint>(
    {
        title: {
            type: String,
            required: [true, "Complaint title is required"],
            minlength: [3, "Complaint title must be at least 3 characters long"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Complaint description is required"],
            minlength: [10, "Complaint description must be at least 10 characters long"],
            trim: true,
        },
        category: {
            type: String,
            enum: Object.values(ComplaintCategory),
            required: [true, "Complaint category is required"],
        },
        location: {
            type: String,
            required: [true, "Complaint location is required"],
            trim: true,
        },
        image: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: Object.values(ComplaintStatus),
            default: ComplaintStatus.PENDING,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Complaint creator is required"],
        },
        assigned_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            default: null,
        },
    },
    { timestamps: true },
);

const Complaint = mongoose.model<IComplaint>(
    "complaint",
    complaintSchema,
);

export default Complaint;
