import { ErrorMessage, Field } from "formik";
import "../css/formField.css";

const FormField = ({ label, name, type, placeholder }) => (
  <div className="mt-3">
    <label className="formField-label">{label}</label>
    <Field
      type={type}
      name={name}
      className="formField-input"
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

export default FormField;
