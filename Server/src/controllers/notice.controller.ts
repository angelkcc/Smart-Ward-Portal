

import Notice from "../models/notice.model";
import AppError from "../utils/appError.utlis";
import { catchAsync } from "../utils/catchAsync.utlis";
import sendResponse from "../utils/SendResponse.utlis";

//create notice
export const createNotice = catchAsync(async (req, res) => {

    const {
        title,
        description,
        category,
        published,
    } = req.body;

    // Get the logged-in admin's ID
    const { _id } = req.user;

    const notice = new Notice({
        title,
        description,
        category,
        published,
        created_by: _id,
    });

    await notice.save();

    sendResponse(res, {
        message: "Notice created successfully",
        data: notice,
        statusCode: 201,
    });
});

//get all notices
export const getAllNotices = catchAsync(async (req, res) => {

    const notices = await Notice.find({
        published: true,
    })
        .populate("created_by", "full_name email")
        .sort({ createdAt: -1 });

    sendResponse(res, {
        message: "Notices fetched successfully",
        data: notices,
        statusCode: 200,
    });
});

// GET NOTICE BY ID
export const getNoticeById = catchAsync(async (req, res) => {

    const { id } = req.params;

    const notice = await Notice.findOne({
        _id: id,
        published: true,
    }).populate("created_by", "full_name email");

    if (!notice) {
        throw new AppError("Notice not found", 404);
    }

    sendResponse(res, {
        message: "Notice fetched successfully",
        data: notice,
        statusCode: 200,
    });
});

// UPDATE NOTICE
export const updateNotice = catchAsync(async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        category,
        published,
    } = req.body;

    const notice = await Notice.findById(id);

    if (!notice) {
        throw new AppError("Notice not found", 404);
    }

    // Update only the fields provided
    if (title !== undefined) {
        notice.title = title;
    }

    if (description !== undefined) {
        notice.description = description;
    }

    if (category !== undefined) {
        notice.category = category;
    }

    if (published !== undefined) {
        notice.published = published;
    }

    await notice.save();

    sendResponse(res, {
        message: "Notice updated successfully",
        data: notice,
        statusCode: 200,
    });
});


// DELETE NOTICE
export const deleteNotice = catchAsync(async (req, res) => {

    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
        throw new AppError("Notice not found", 404);
    }

    await Notice.findByIdAndDelete(id);

    sendResponse(res, {
        message: "Notice deleted successfully",
        data: null,
        statusCode: 200,
    });
});

