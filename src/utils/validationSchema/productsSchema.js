import * as Yup from "yup";

export const baseUnitSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
});
