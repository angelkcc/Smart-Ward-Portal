import mongoose, { Document } from "mongoose";
import { ProjectStatus } from "../types/project.types";
interface IProject extends Document {
    title: string;
    description: string;
    category: string;
    location: string;
    budget?: number;
    status: ProjectStatus;
    progress: number;
    start_date?: Date;
    expected_completion_date?: Date;
    image_url?: string;
    image_public_id?: string;
    published: boolean;
    created_by: mongoose.Types.ObjectId;
    
}

const projectSchema = new mongoose.Schema<IProject>(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            minlength: [3, "Project title must be at least 3 characters long"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Project description is required"],
            minlength: [10, "Project description must be at least 10 characters long"],
            trim: true,
        },

        category: {
            type: String,
            required: [true, "Project category is required"],
            trim: true,
        },

        location: {
            type: String,
            required: [true, "Project location is required"],
            trim: true,
        },

        budget: {
            type: Number,
            min: [0, "Budget cannot be negative"],
        },

        status: {
            type: String,
            enum: Object.values(ProjectStatus),
            default: ProjectStatus.PLANNED,
            required: true,
        },

        progress: {
            type: Number,
            min: [0, "Progress cannot be less than 0"],
            max: [100, "Progress cannot exceed 100"],
            default: 0,
        },

        start_date: {
            type: Date,
        },

        expected_completion_date: {
            type: Date,
        },

        image_url: {
        type: String,
        trim: true,
        default: null,
        },

        image_public_id: {
        type: String,
        default: null,
        },

        published: {
            type: Boolean,
            default: true,
        },

        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Project creator is required"],
        },
    },
    { timestamps: true }
);

const Project = mongoose.model<IProject>("project", projectSchema);

export default Project;