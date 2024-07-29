import "../css/inputWithSelect.css";

import { Field } from "formik";

const InputWithSelect = ({
  fieldName,
  typeName,
  values,
  setFieldValue,
  productTableData,
  preventNegative,
}) => {
  return (
    <div className="input-per-table border-bottom">
      <Field name={fieldName}>
        {({ field }) => (
          <input
            {...field}
            type="number"
            className="formField-input-per-table"
            placeholder="0.00"
            disabled={productTableData?.length === 0}
            onChange={(event) =>
              preventNegative(event, setFieldValue, fieldName)
            }
          />
        )}
      </Field>
      <select
        className="input-symbol-per-table px-1 px-xl-3"
        name={typeName}
        value={values[typeName]}
        onChange={(e) => setFieldValue(typeName, e?.target?.value)}
      >
        <option value="%">%</option>
        <option value="$">$</option>
      </select>
    </div>
  );
};

export default InputWithSelect;
