import { Form, Formik } from "formik";
import { t } from "i18next";
import React from "react";
import { FaUser } from "react-icons/fa";
import { signIn } from "../api/services/authService";
import DynamicFormField from "../common/DynamicFormField";
import SignInLoginSideImage from "../components/signIn/SignInLoginSideImage";
import SignInContainer from "../container/signIn.container";
import { formFields } from "../description/signIn.description";
import Abc from "../utils/validationSchema/Abc";

const SignIn = () => {
  const { language, navigateToSignUp, navigateToDashboard } = SignInContainer();

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
            <div className="sign-in">
              <h1>{t("login.login")}</h1>
              <div className="sign-in-btn d-flex justify-content-between">
                <p>{t("login.notRegister")}</p>
                <button onClick={() => navigateToSignUp()}>
                  <div className="d-flex">
                    <i>
                      <FaUser />
                    </i>
                    <div>{t("login.register")}</div>
                  </div>
                </button>
              </div>
            </div>

            <Formik
              initialValues={{
                usernameOrEmail: "",
                password: "",
              }}
              validationSchema={Abc}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                setSubmitting(true);
                const newValue = {
                  usernameOrEmail: values.usernameOrEmail,
                  password: values.password,
                };

                try {
                  const response = await signIn(newValue);
                  if (response) {
                    localStorage.setItem("userData", JSON.stringify(newValue));
                    navigateToDashboard();
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
              {({ errors, touched, isSubmitting }) => (
                <Form action="">
                  <div className="row mb-3">
                    <div className="row mb-3">
                      {formFields.map((field) => (
                        <DynamicFormField
                          key={field.name}
                          name={field.name}
                          type={field.type}
                          label={field.label}
                          placeholder={field.placeholder}
                          mainClassName={field.mainClassName}
                          touched={touched}
                          errors={errors}
                        />
                      ))}
                    </div>
                  </div>

                  <a className="forgotpass" href="/">
                    {t("login.forgotPassword")}
                  </a>
                  <button
                    className="login-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span
                        className="spinner-border spinner-border-md"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <div className="login">{t("login.login")}</div>
                    )}
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
