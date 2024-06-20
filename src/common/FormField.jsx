import { ErrorMessage, Field } from "formik";
import "../css/formField.css";
import Select from "react-select";

const FormField = ({
  key,
  field,
  setFieldValue,
  values,
  mainClassName,
  errors,
}) => (
  <>
    <div key={key} className={mainClassName}>
      <label className="formField-label">{field.label}</label>
      {field.type === "select" ? (
        <Select
          id={field.name}
          name={field.name}
          value={field.options.find(
            (option) => option.value === values[field.name]
          )}
          onChange={(option) => setFieldValue(field.name, option.value)}
          options={field.options}
          placeholder={field.placeholder}
          className={` ${errors?.[field.name] ? "form-control-invalid" : ""}`}
        />
      ) : (
        <Field
          type={field.type}
          name={field.name}
          className={`formField-input ${
            errors?.[field.name] ? "form-control-invalid" : ""
          }`}
          placeholder={field.placeholder}
        />
      )}
      <ErrorMessage name={field.name} component="div" className="text-danger" />
    </div>
  </>
);

export default FormField;
