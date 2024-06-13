import { ErrorMessage, Field, Form, Formik } from "formik";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Abc from "../utils/validationSchema/Abc";
import SignInLoginSideImage from "./SignInLoginSideImage";

const SignIn = () => {
  const language = useSelector((state) => state?.language?.language);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorWrongPass, setErrorWrongPass] = useState(false);
  const authUser = localStorage.getItem("authUser");

  const handelShowError = () => {
    setErrorWrongPass(true);
    setShowError(false);
  };

  const handleRegisterClick = () => {
    navigate("/sign-up");
  };
  const handleLogin = () => {
    localStorage.setItem("authUser", true);
  };

  useEffect(() => {
    if (authUser === "true") {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-column-reverse flex-lg-row">
        <div className="col-12 col-lg-6 px-5" style={{ background: "white" }}>
          <div className="sign-in-inner">
            <img
              src={
                language === "EN"
                  ? "https://pos.flavours.sa/static/media/flavours-pos-black-en.b8b2609d04a9663fd048.png"
                  : "https://pos.flavours.sa/static/media/flavours-pos-black-ar.99c4ad79aae8977dc721.png"
              }
              className="pos-logo mt-2"
              alt=""
            />
            <Formik
              initialValues={{
                usernameOrEmail: "",
                password: "",
              }}
              validationSchema={Abc}
              onSubmit={(values) => {
                // Retrieve userData from localStorage
                const userData = JSON.parse(localStorage.getItem("userData"));
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
                }
              }}
            >
              {({ errors, touched }) => (
                <Form action="">
                  <div className="sign-in">
                    <h1>{t("login.login")}</h1>
                    <div className="sign-in-btn d-flex justify-content-between">
                      <p>{t("login.notRegister")}</p>
                      <button onClick={() => handleRegisterClick()}>
                        <div className="d-flex">
                          <i>
                            <FaUser />
                          </i>

                          <div>{t("login.register")}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="user-pass row mb-3">
                    <div className=" col-12  col-md-6">
                      <div className="lable-input">
                        <label htmlFor="">{t("login.username")}</label>
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
                              placeholder={t("login.enterEmail")}
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
                        <label htmlFor="">{t("login.password")}</label>
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
                              placeholder={t("login.enterPassword")}
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
                    <div className="error-msg">{t("login.userNotExist")}</div>
                  ) : errorWrongPass ? (
                    <div className="error-msg">
                      {t("login.passwordIncorrect")}
                    </div>
                  ) : (
                    ""
                  )}

                  <a className="forgotpass" href="/">
                    {t("login.forgotPassword")}
                  </a>
                  <button className="login-btn">
                    <div className="login">{t("login.login")}</div>
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-12 col-lg-6 pe-0 signin-side ps-0">
          <SignInLoginSideImage />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
