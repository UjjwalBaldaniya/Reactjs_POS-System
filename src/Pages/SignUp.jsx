import React from "react";
import pos from "../assets/img/sign-In/pos-logo.png";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import SignUpSchema from "../components/validationSchema/SignUpSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SignInLoginSideImage from "./SignInLoginSideImage";
import SignUpSchema from "./../Components/validationSchema/SignUpSchema";
import Select from "react-select";
import { t } from "i18next";

const SignUp = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/sign-in");
  };

  const countryCodes = [
    { label: "Afghanistan +93", value: "+93" },
    { label: "Albania", value: "+355" },
    { label: "Algeria", value: "+213" },
    { label: "American Samoa", value: "+1-684" },
    { label: "Andorra", value: "+376" },
  ];

  return (
    <div className="container-fluid">
      <secrtion className="">
        <div className="row flex-column-reverse flex-lg-row">
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
                {({ values, errors, touched, setFieldValue }) => (
                  <Form action="">
                    <div className="sign-up">
                      <h1>{t("signup.createNewAccount")}</h1>
                      <div className="sign-in-btn">
                        <p>{t("signup.alreadyAccount")}</p>
                        <button onClick={() => handleRegisterClick()}>
                          <div className="d-flex">
                            <i>
                              <FaUser />
                            </i>

                            <div>{t("login.login")}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="user-pass row mb-3">
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">{t("signup.username")}</label>
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
                                placeholder={t("login.enterEmail")}
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
                          <label htmlFor="">{t("signup.emailAddress")}</label>
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
                                placeholder={t("signup.enterEmailAdd")}
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
                          <label htmlFor="">{t("signup.countryCode")}</label>
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
                                placeholder={t("signup.countryCode")}
                              />
                              <ErrorMessage
                                name="countryCode"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            {/* <div className="input-div-inner">
                              {console.log("fdfhdfgh", errors?.countryCode)}
                              <Select
                                value={values.countryCode}
                                options={countryCodes}
                                name="countryCode"
                                className={`${
                                  errors?.countryCode
                                    ? "form-control-invalid"
                                    : ""
                                }`}
                                onChange={(values)=>setFieldValue("countryCode",values)}
                                placeholder="Country Code"
                              />
                              <ErrorMessage
                                name="countryCode"
                                component="div"
                                className="error-message"
                              />
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">{t("signup.phoneNumber")}</label>
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
                                placeholder={t("signup.enterPhoneNo")}
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
                          <label htmlFor="">{t("login.password")}</label>
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
                      <div className=" col-12  col-md-6">
                        <div className="lable-input">
                          <label htmlFor="">
                            {t("signup.confirmPassword")}
                          </label>
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
                                placeholder={t("signup.enterConfirmPassword")}
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
                        {t("signup.byRegister")}
                        <span className="span-second">
                          {t("signup.flavours")}
                        </span>
                      </span>
                    </div>
                    <button className="login-btn">
                      <div className="login">{t("signup.next")}</div>
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div
            // className="col-12 col-lg-6 pe-0"
            // style={{ height: "100vh", overflow: "auto" }}
            className="col-12 col-lg-6 pe-0 signin-side"
          >
            <SignInLoginSideImage
              language={language}
              setLanguage={setLanguage}
            />
          </div>
        </div>
      </secrtion>
    </div>
  );
};

export default SignUp;
