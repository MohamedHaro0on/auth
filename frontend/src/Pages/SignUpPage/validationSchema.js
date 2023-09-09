import * as yup from "yup";
const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .required("First Name is required"),

  lastName: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),

  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),

  role: yup.mixed().oneOf(["admin", "user"]).defined(),

  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),

  confirmPassword: yup
    .string("Enter your password")
    .min(8, "Confirm Password should be of minimum 8 characters length")
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export default validationSchema;
