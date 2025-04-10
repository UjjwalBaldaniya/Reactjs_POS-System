import { ErrorMessage, Field, Form, Formik } from "formik";
import { t } from "i18next";
import { FaUser } from "react-icons/fa";
import Select from "react-select";

import { signUp } from "../api/services/authService";
import SignInLoginSideImage from "../components/signIn/SignInLoginSideImage";
import SignUpContainer from "../container/signUp.container";
import { countryCodes } from "../description/signUp.description";
import SignUpSchema from "../utils/validationSchema/SignUpSchema";

const SignUp = () => {
  const { language, navigateToSignIn } = SignUpContainer();

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
                username: "",
                email: "",
                password: "",
                countryCode: countryCodes[0].value,
                phoneNumber: "",
                confirmPassword: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                const newValue = {
                  username: values.username,
                  email: values.email,
                  countryCode: values.countryCode,
                  phoneNumber: values.phoneNumber,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                };

                try {
                  const response = await signUp(newValue);
                  if (response) {
                    localStorage.setItem("userData", JSON.stringify(newValue));
                    navigateToSignIn();
                  }
                } catch (error) {
                  setFieldError(
                    "general",
                    error.response?.data?.msg || "An error occurred"
                  );
                }
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form action="">
                  <div className="sign-up">
                    <h1>{t("signup.createNewAccount")}</h1>
                    <div className="sign-in-btn">
                      <p>{t("signup.alreadyAccount")}</p>
                      <button onClick={() => navigateToSignIn()}>
                        <div className="d-flex">
                          <i className="ms-2">
                            <FaUser />
                          </i>

                          <div>{t("login.login")}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="user-pass row mb-3">
                    <div className=" col-12  col-md-6">
                      <div className="label-input">
                        <label htmlFor="">{t("signup.username")}</label>
                        <div className="input-div">
                          <div className="input-div-inner">
                            <Field
                              type="text"
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
                      <div className="label-input">
                        <label htmlFor="">{t("signup.emailAddress")}</label>
                        <div className="input-div">
                          <div className="input-div-inner">
                            <Field
                              type="email"
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
                      <div className="label-input">
                        <label htmlFor="">{t("signup.countryCode")}</label>
                        <div className="input-div">
                          <div className="input-div-inner">
                            <Select
                              value={countryCodes.find(
                                (option) => option.value === values.countryCode
                              )}
                              options={countryCodes}
                              name="countryCode"
                              className={`${
                                errors?.countryCode && touched?.countryCode
                                  ? "form-control-invalid"
                                  : ""
                              }`}
                              onChange={(option) =>
                                setFieldValue("countryCode", option.value)
                              }
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
                      <div className="label-input">
                        <label htmlFor="">{t("signup.phoneNumber")}</label>
                        <div className="input-div">
                          <div className="input-div-inner">
                            <Field
                              type="text"
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
                      <div className="label-input">
                        <label htmlFor="">{t("login.password")}</label>
                        <div className="input-div">
                          <div className="input-div-inner">
                            <Field
                              type="text"
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
                      <div className="label-input">
                        <label htmlFor="">{t("signup.confirmPassword")}</label>
                        <div className="input-div">
                          <div className="input-div-inner">
                            <Field
                              type="text"
                              name="confirmPassword"
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
                  <button className="login-btn mb-3">
                    <div className="login">{t("signup.next")}</div>
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

export default SignUp;
