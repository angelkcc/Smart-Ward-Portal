
import mongoose from "mongoose";

// Notice categories
export enum NoticeCategory {
    GENERAL = "GENERAL",
    HEALTH = "HEALTH",
    EDUCATION = "EDUCATION",
    EVENT = "EVENT",
    EMERGENCY = "EMERGENCY",
    ROAD = "ROAD",
    WATER = "WATER",
}

// Notice interface
export interface INotice {
    title: string;
    description: string;
    category: NoticeCategory;
    published: boolean;
    created_by: mongoose.Types.ObjectId;
}

