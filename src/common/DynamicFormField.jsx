import { ErrorMessage, Field } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

const DynamicFormField = ({
  name,
  type,
  label,
  placeholder,
  mainClassName,
  touched,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <div className={mainClassName}>
      <label className="formField-label" htmlFor={name}>
        {t(label)}
      </label>
      <Field
        type={type}
        className={`formField-input ${
          touched?.[name] && errors?.[name] ? "form-control-invalid" : ""
        }`}
        id={name}
        name={name}
        placeholder={t(placeholder)}
      />
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default DynamicFormField;
