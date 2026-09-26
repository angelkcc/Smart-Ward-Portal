
import { z } from "zod";
import { NoticeCategory } from "../types/notice.types";

export const createNoticeValidatorSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters long")
            .trim(),

        description: z
            .string()
            .min(10, "Description must be at least 10 characters long")
            .trim(),

        category: z.enum(NoticeCategory),

        published: z
            .boolean()
            .optional()
            .default(true),
    }),

    query: z.object({}),

    params: z.object({}),
});

// UPDATE NOTICE VALIDATOR

export const updateNoticeValidatorSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(3, "Title must be at least 3 characters long")
            .trim()
            .optional(),

        description: z
            .string()
            .min(10, "Description must be at least 10 characters long")
            .trim()
            .optional(),

        category: z
            .enum(NoticeCategory)
            .optional(),

        published: z
            .boolean()
            .optional(),
    }),

    query: z.object({}),

    params: z.object({
        id: z
            .string()
            .min(1, "Notice ID is required"),
    }),
});



// GET NOTICE BY ID VALIDATOR

export const getNoticeByIdValidatorSchema = z.object({
    body: z.object({}),

    query: z.object({}),

    params: z.object({
        id: z
            .string()
            .min(1, "Notice ID is required"),
    }),
});

// DELETE NOTICE VALIDATOR


export const deleteNoticeValidatorSchema = z.object({
    body: z.object({}),

    query: z.object({}),

    params: z.object({
        id: z
            .string()
            .min(1, "Notice ID is required"),
    }),
});

