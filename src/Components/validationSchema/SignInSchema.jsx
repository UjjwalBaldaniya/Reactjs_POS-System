import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

export default SignInSchema;
