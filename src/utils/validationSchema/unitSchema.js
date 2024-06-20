import * as Yup from "yup";

export const unitSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  shortName: Yup.string().required("This field is required"),
  baseUnit: Yup.string().required("This field is required"),
});
