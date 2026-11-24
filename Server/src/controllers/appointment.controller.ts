
import mongoose from "mongoose";
import Appointment from "../models/appointment.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";
import { Role } from "../types/enum.types";
import {
    AppointmentService,
    AppointmentStatus,
} from "../types/appointment.types";

// CREATE APPOINTMENT - CITIZEN
export const createAppointment = catchAsync(async (req, res) => {
    const {
        full_name,
        phone_number,
        service,
        preferred_date,
        preferred_time,
        reason,
    } = req.body;

    if (!full_name || !phone_number || !service ||
        !preferred_date || !preferred_time || !reason) {
        throw new AppError("Please provide all required appointment details", 400);
    }

    if (!Object.values(AppointmentService).includes(service)) {
        throw new AppError("Invalid appointment service", 400);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferred_date)) {
        throw new AppError("Invalid appointment date", 400);
    }

    if (!/^\d{2}:\d{2}$/.test(preferred_time)) {
        throw new AppError("Invalid appointment time", 400);
    }

    const [year, month, day] = preferred_date.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        throw new AppError("Invalid appointment date", 400);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
        throw new AppError("Appointment date cannot be in the past", 400);
    }

    const [hours, minutes] = preferred_time.split(":").map(Number);

    if (hours > 23 || minutes > 59) {
        throw new AppError("Invalid appointment time", 400);
    }

    const appointment = await Appointment.create({
        full_name,
        phone_number,
        service,
        preferred_date,
        preferred_time,
        reason,
        created_by: req.user._id,
    });

    sendResponse(res, {
        message: "Appointment request submitted successfully",
        data: appointment,
        statusCode: 201,
    });
});


// GET APPOINTMENTS
// Admin gets all appointments.
// Citizens get only their own appointments.
export const getAllAppointments = catchAsync(async (req, res) => {
    const filter =
        req.user.role === Role.ADMIN
            ? {}
            : { created_by: req.user._id };

    const appointments = await Appointment.find(filter)
        .populate("created_by", "full_name email")
        .sort({ createdAt: -1 });

    sendResponse(res, {
        message: "Appointments fetched successfully",
        data: appointments,
        statusCode: 200,
    });
});


// GET APPOINTMENT BY ID
export const getAppointmentById = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid appointment ID", 400);
    }

    const appointment = await Appointment.findById(id)
        .populate("created_by", "full_name email");

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (
        req.user.role !== Role.ADMIN &&
        appointment.created_by._id.toString() !== req.user._id.toString()
    ) {
        throw new AppError("You are not allowed to view this appointment", 403);
    }

    sendResponse(res, {
        message: "Appointment fetched successfully",
        data: appointment,
        statusCode: 200,
    });
});


// UPDATE APPOINTMENT - ADMIN ONLY
export const updateAppointment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status, admin_note, preferred_date, preferred_time } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid appointment ID", 400);
    }

    if (!Object.values(AppointmentStatus).includes(status)) {
        throw new AppError("Invalid appointment status", 400);
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (admin_note !== undefined && typeof admin_note !== "string") {
        throw new AppError("Invalid admin note", 400);
    }

    if (status === AppointmentStatus.RESCHEDULED ||
        status === AppointmentStatus.APPROVED) {

        const dateToCheck = preferred_date ?? appointment.preferred_date;
        const timeToCheck = preferred_time ?? appointment.preferred_time;

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateToCheck) ||
            !/^\d{2}:\d{2}$/.test(timeToCheck)) {
            throw new AppError("A valid appointment date and time are required", 400);
        }

        const [year, month, day] = dateToCheck.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            throw new AppError("Invalid appointment date", 400);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
            throw new AppError("Appointment date cannot be in the past", 400);
        }

        const [hours, minutes] = timeToCheck.split(":").map(Number);

        if (hours > 23 || minutes > 59) {
            throw new AppError("Invalid appointment time", 400);
        }

        if (status === AppointmentStatus.APPROVED) {
            const existingAppointment = await Appointment.findOne({
                _id: { $ne: appointment._id },
                preferred_date: dateToCheck,
                preferred_time: timeToCheck,
                status: AppointmentStatus.APPROVED,
            });

            if (existingAppointment) {
                throw new AppError(
                    "This appointment time is already booked. Please select another time.",
                    409,
                );
            }
        }

        appointment.preferred_date = dateToCheck;
        appointment.preferred_time = timeToCheck;
    }

    appointment.status = status;

    if (admin_note !== undefined) {
        appointment.admin_note = admin_note.trim();
    }

    await appointment.save();

    const updatedAppointment = await Appointment.findById(appointment._id)
        .populate("created_by", "full_name email");

    sendResponse(res, {
        message: "Appointment updated successfully",
        data: updatedAppointment,
        statusCode: 200,
    });
});
