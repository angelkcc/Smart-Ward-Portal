
import mongoose, { Document } from "mongoose";
import { DepartmentCategory } from "../types/department.types";

interface IDepartment extends Document {
    name: string;
    description: string;
    category: DepartmentCategory;
    contact_email?: string;
    contact_phone?: string;
    active: boolean;
}

const departmentSchema = new mongoose.Schema<IDepartment>(
    {
        name: {
            type: String,
            required: [true, "Department name is required"],
            minlength: [3, "Department name must be at least 3 characters long"],
            trim: true,
            unique: true,
        },

        description: {
            type: String,
            required: [true, "Department description is required"],
            minlength: [10, "Department description must be at least 10 characters long"],
            trim: true,
        },

        category: {
            type: String,
            enum: Object.values(DepartmentCategory),
            required: [true, "Department category is required"],
        },

        contact_email: {
            type: String,
            trim: true,
            lowercase: true,
            default: null,
        },

        contact_phone: {
            type: String,
            trim: true,
            default: null,
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

const Department = mongoose.model<IDepartment>(
    "Department",
    departmentSchema,
);

export default Department;
