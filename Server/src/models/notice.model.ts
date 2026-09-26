
import mongoose from "mongoose";
import { NoticeCategory } from "../types/notice.types";

interface INotice extends Document {
    title: string;
    description: string;
    category: string;
    published: boolean;
    created_by: mongoose.Types.ObjectId;
}


const noticeSchema = new mongoose.Schema<INotice>(
    {
        title: {
            type: String,
            required: [true, "Notice title is required"],
            minlength: [3, "Notice title must be at least 3 characters long"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Notice description is required"],
            minlength: [10, "Notice description must be at least 10 characters long"],
            trim: true,
        },

        category: {
            type: String,
            enum: Object.values(NoticeCategory),
            required: [true, "Notice category is required"],
            
        },

        published: {
            type: Boolean,
            default: true,
        },

        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Notice creator is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Notice = mongoose.model<INotice>("notice", noticeSchema);

export default Notice;
