import { ErrorMessage, Field, useField } from "formik";
import Select from "react-select";
import React from "react";

const ProductTextField = ({ label, name, placeholder, touched, errors }) => {
  return (
    <div className="col-12 col-md">
      <label htmlFor={name} className="formField-label">
        {label}
      </label>
      <Field
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className={`formField-input ${
          touched?.[name] && errors?.[name] ? "form-control-invalid" : ""
        }`}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

const ProductSelectField = ({
  label,
  name,
  options,
  placeholder,
  setFieldValue,
  value,
  touched,
  errors,
  className = "",
}) => {
  const selectedOption =
    options?.find((option) => option?.value === value?.value) || null;

  return (
    <div className="col-12 col-md">
      <label htmlFor={name} className="formField-label">
        {label}
      </label>
      <Select
        id={name}
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={(option) => setFieldValue(name, option)}
        value={selectedOption}
        className={`${className} ${
          touched?.[name] && errors?.[name] ? "form-control-invalid" : ""
        }`}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

const ProductTextAreaField = ({
  label,
  name,
  placeholder,
  touched,
  errors,
}) => {
  return (
    <div className="col-12 col-md">
      <label htmlFor={name} className="formField-label">
        {label}
      </label>
      <Field
        as="textarea"
        rows={4}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`formField-textarea ${
          touched?.[name] && errors?.[name] ? "form-control-invalid" : ""
        }`}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

const ProductPercentageField = ({
  label,
  name,
  placeholder,
  touched,
  errors,
  symbol,
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="col-12 col-md">
      <label className="formField-label">{label}</label>
      <div
        className={`input-percentage ${
          meta.touched && meta.error ? "form-control-invalid" : ""
        }`}
      >
        <input
          {...field}
          type="number"
          placeholder={placeholder}
          className={`formField-input-percentage ${
            meta.touched && meta.error ? "form-control-invalid" : ""
          }`}
        />
        <span className="input-symbol-percentage">{symbol}</span>
      </div>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export {
  ProductTextField,
  ProductSelectField,
  ProductTextAreaField,
  ProductPercentageField,
};
