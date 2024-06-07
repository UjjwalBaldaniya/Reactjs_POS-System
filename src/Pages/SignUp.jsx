import React from "react";
import pos from "../assets/img/sign-In/pos-logo.png";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import SignUpSchema from "../components/validationSchema/SignUpSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SignInLoginSideImage from "./SignInLoginSideImage";
import SignUpSchema from './../Components/validationSchema/SignUpSchema';

const SignUp = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="container-fluid">
      <secrtion className="">
        <div className="row">
          <div className="col-12 col-lg-6 px-5">
            <div className="sign-in-inner">
              <img src={pos} className="pos-logo" alt="" />
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  countryCode: "",
                  phoneNumber: "",
                  confirmPassword: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                  // Handle form submission
                  localStorage.setItem("userData", JSON.stringify(values));
                  handleRegisterClick();
                }}
              >
                {({ errors, touched }) => (
                  <Form action="">
                    <div className="sign-up">
                      <h1>Create New Account</h1>
                      <div className="sign-in-btn">
                        <p>Already have an account?</p>
                        <button onClick={() => handleRegisterClick()}>
                          <div className="d-flex">
                            <i>
                              <FaUser />
                            </i>

                            <div>Login</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="user-pass row mb-3">
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Username</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="text"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.username && errors?.username
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                id="username"
                                name="username"
                                placeholder="Enter username or email address"
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor=""> Email Address</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="email"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.email && errors?.email
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                name="email"
                                placeholder="Enter email address"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="user-pass row mb-3">
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Country Code</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="text"
                                name="countryCode"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.countryCode && errors?.countryCode
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                placeholder="Country Code"
                              />
                              <ErrorMessage
                                name="countryCode"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Phone Number</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="text"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.phoneNumber && errors?.phoneNumber
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                name="phoneNumber"
                                placeholder="Enter phone number"
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="user-pass row mb-3">
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Password</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="text"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.password && errors?.password
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                name="password"
                                placeholder="Enter Password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Confirm Password</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="text"
                                name="confirmPassword"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.confirmPassword &&
                                  errors?.confirmPassword
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                placeholder="Enter Confirm Password"
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up-policies">
                      <span className="span-first">
                        By registering, I agree to the{" "}
                        <span className="span-second">
                          flavours platform policies
                        </span>
                      </span>
                    </div>
                    <button className="login-btn">
                      <div className="login">Next</div>
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div
            className="col-12 col-lg-6 pe-0"
            style={{ height: "100vh", overflow: "auto" }}
          >
            <SignInLoginSideImage />
          </div>
        </div>
      </secrtion>
    </div>
  );
};

export default SignUp;
