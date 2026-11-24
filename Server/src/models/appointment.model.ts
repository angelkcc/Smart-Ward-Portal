
import mongoose, { Document } from "mongoose";
import {
    AppointmentService,
    AppointmentStatus,
} from "../types/appointment.types";

interface IAppointment extends Document {
    full_name: string;
    phone_number: string;
    service: AppointmentService;
    preferred_date: string;
    preferred_time: string;
    reason: string;
    status: AppointmentStatus;
    admin_note?: string;
    created_by: mongoose.Types.ObjectId;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
    {
        full_name: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [3, "Full name must be at least 3 characters"],
        },
        phone_number: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        service: {
            type: String,
            enum: Object.values(AppointmentService),
            required: [true, "Appointment service is required"],
        },
        preferred_date: {
            type: String,
            required: [true, "Appointment date is required"],
        },
        preferred_time: {
            type: String,
            required: [true, "Appointment time is required"],
        },
        reason: {
            type: String,
            required: [true, "Appointment reason is required"],
            trim: true,
            minlength: [5, "Reason must be at least 5 characters"],
        },
        status: {
            type: String,
            enum: Object.values(AppointmentStatus),
            default: AppointmentStatus.PENDING,
        },
        admin_note: {
            type: String,
            default: "",
            trim: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Appointment creator is required"],
        },
    },
    { timestamps: true },
);

appointmentSchema.index({
    preferred_date: 1,
    preferred_time: 1,
    status: 1,
});

const Appointment = mongoose.model<IAppointment>(
    "Appointment",
    appointmentSchema,
);

export default Appointment;
