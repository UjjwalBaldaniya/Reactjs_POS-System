import React, { useEffect, useState } from "react";
import pos from "../assets/img/sign-In/pos-logo.png";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SignInLoginSideImage from "./SignInLoginSideImage";
import Abc from "../Components/validationSchema/Abc";
import { useAuth } from "../Context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showError, setShowError] = useState(false);
  console.log("🚀 ~ file: SignIn.jsx:12 ~ SignIn ~ showError:", showError);
  const [errorWrongPass, setErrorWrongPass] = useState(false);
  console.log(
    "🚀 ~ file: SignIn.jsx:13 ~ SignIn ~ errorWrongPass:",
    errorWrongPass
  );

  const handelShowError = () => {
    setErrorWrongPass(true);
    setShowError(false);
  };

  const handleRegisterClick = () => {
    navigate("/sign-up");
  };
  const handleLogin = () => {
    localStorage.setItem("authUser", true);
    login();
  };
  return (
    <div className="container-fluid">
      <secrtion className="">
        <div className="row flex-column-reverse flex-lg-row">
          <div className="col-12 col-lg-6 px-5">
            <div className="sign-in-inner">
              <img src={pos} className="pos-logo" alt="" />
              <Formik
                initialValues={{
                  usernameOrEmail: "",
                  password: "",
                }}
                validationSchema={Abc}
                onSubmit={(values) => {
                  // Retrieve userData from localStorage
                  const userData = JSON.parse(localStorage.getItem("userData"));
                  console.log("userData", userData);
                  if (userData === null) {
                    setShowError(true);
                  }
                  // Check if username or email and password match
                  if (
                    (values.usernameOrEmail === userData.username ||
                      values.usernameOrEmail === userData.email) &&
                    values.password === userData.password
                  ) {
                    // Redirect to dashboard

                    handleLogin();
                    setShowError(false);
                    navigate("/dashboard");
                  } else {
                    // Handle incorrect credentials
                    values.usernameOrEmail === userData.username ||
                    (values.usernameOrEmail === userData.email &&
                      values.password !== userData.password)
                      ? handelShowError()
                      : setShowError(true);

                    console.log("Invalid username/email or password");
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form action="">
                    <div className="sign-in">
                      <h1>Login</h1>
                      <div className="sign-in-btn d-flex justify-content-between">
                        <p>Not registered yet?</p>
                        <button onClick={() => handleRegisterClick()}>
                          <div className="d-flex">
                            <i>
                              <FaUser />
                            </i>

                            <div>Register</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="user-pass row mb-3">
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Username or Email Address</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="text"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.usernameOrEmail &&
                                  errors?.usernameOrEmail
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                id="username"
                                name="usernameOrEmail"
                                placeholder="Enter username or email address"
                              />
                              <ErrorMessage
                                name="usernameOrEmail"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">Password</label>
                          <div className="input-div">
                            <div className="input-div-inner">
                              <Field
                                type="password"
                                // className="login-input"
                                className={`login-input ${
                                  touched?.password && errors?.password
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                id="username"
                                name="password"
                                placeholder="Enter password"
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
                    </div>
                    {showError ? (
                      <div className="error-msg">
                        {" "}
                        User does not exist , please Register
                      </div>
                    ) : errorWrongPass ? (
                      <div className="error-msg"> Password incorrect</div>
                    ) : (
                      ""
                    )}

                    <a className="forgotpass" href="/">
                      Forgot Password?
                    </a>
                    <button className="login-btn">
                      <div className="login">Login</div>
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-12 col-lg-6 pe-0 signin-side">
            <SignInLoginSideImage />
          </div>
        </div>
      </secrtion>
    </div>
  );
};

export default SignIn;
