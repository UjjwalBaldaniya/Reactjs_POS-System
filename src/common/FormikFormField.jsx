import { ErrorMessage, Field } from "formik";
import React from "react";
import Select from "react-select";

const FormikFormField = ({ fields, setFieldValue, values }) => {
  return (
    <div>
      {fields.map((field) => {
        console.log("🚀 ~ {fields.map ~ field:", field);
        return (
          <div className={`${field.rowClass ? "row" : ""}`} key={field.name}>
            <div key={field.name} className={field.className}>
              <label htmlFor={field.name} className="formField-label">
                {field.label}
              </label>
              {field.type === "select" ? (
                <Select
                  id={field.name}
                  options={field.options}
                  value={values[field.name]}
                  onChange={(option) => setFieldValue(field.name, option)}
                />
              ) : field.type === "textarea" ? (
                <Field
                  as="textarea"
                  id={field.name}
                  name={field.name}
                  className={field.className}
                  placeholder={field.placeholder}
                />
              ) : (
                <Field
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  className={field.className}
                  placeholder={field.placeholder}
                />
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="error"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormikFormField;
