import mongoose, { Document } from "mongoose";

export enum ProjectStatus {
    PLANNED = "PLANNED",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON_HOLD",
}

export interface IProject extends Document {
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
    published: boolean;
    created_by: mongoose.Types.ObjectId;
}