import * as yup from 'yup'
//yup validation for login
export const loginSchema= yup.object({
    email:yup.string().email('invalid email format').required('email is required'),
    password:yup.string().required('password is required')
});

//register
export const registerSchema= yup.object({
    email:yup
     .string()
     .email("invalid email format")
     .required("email is required"),
    full_name:yup.string().required("full name is required"),
    password:yup
        .string()
        .min(6,"at least 6 characters required")
        .matches(/[A-Z]/,"at least one uppercase letter required")
        .matches(/[^A-Za-z0-9]/,"at least one special character is required")
        .matches(/[0-9]/,"at least one number required")
        .required("password is required"),
    c_password:yup
        .string()
        .required('confirm password is required')
        .oneOf([yup.ref("password")],"passwords must match")
        ,
    phone:yup
        .string()
        .matches(/^[0-9]+$/,"phone number must be a number")
        .optional()

});