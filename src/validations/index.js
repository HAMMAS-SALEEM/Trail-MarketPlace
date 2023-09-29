import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Email Required!"),
    password: Yup.string().min(7, "Invalid Password").required("Password Required!")
})
export const signupSchema = Yup.object({
    email: Yup.string().email().required("Email Required!"),
    password: Yup.string().min(7, 'Password should be greater than 7 digits').required("Password Required!"),
    username: Yup.string().required("User Name Required!"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})