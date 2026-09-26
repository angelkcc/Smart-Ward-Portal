import z from "zod";
//login
export const loginValidatorSchema= z.object({
    body:z.object({
    email:z.email("email is required"),
    password: z.string("password is required").regex(/[A-Z]/,"password must contain at least one uppercase letter")
    .regex(/[a-z]/,"password must contain at least one lowercase letter")
    .regex(/[^A-Za-z0-9]/,"password must contain at least one special character").min(6,"password must be at least 6 characters long")
    }),
});

//register
export const registerValidatorSchema= z.object({
    body:z.object({
        full_name: z.string("full_name is required").min(2,"full_name must be at least 2 characters long").max(100,"full_name must be at most 100 characters long"),
        email: z.email("email is required"),
        password: z.string("password is required").regex(/[A-Z]/,"password must contain at least one uppercase letter")
        .
        regex(/[a-z]/,"password must contain at least one lowercase letter").regex(/[0-9]/,"password must contain at least one number")
        .regex(/[^A-Za-z0-9]/,"password must contain at least one special character").min(6,"password must be at least 6 characters long"),
        phone_number: z.string().regex(/^\d{10}$/,"phone_number must be 10 digits long and contain only numbers").optional(),
    }),
});

