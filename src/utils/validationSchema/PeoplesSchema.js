import * as Yup from "yup";

export const supplierSchema = Yup.object().shape({
  name: Yup.string().required("Supplier Name is required"),
  email: Yup.string().required("Supplier Email is required"),
  phoneNumber: Yup.string().required("Supplier Number is required"),
  country: Yup.string().required("Supplier Country is required"),
  city: Yup.string().required("Supplier City is required"),
  address: Yup.string().required("Supplier Address is required"),
});
